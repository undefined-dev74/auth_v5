import { ApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { validateAllowedHostnames } from "@/lib/api/validate-allowed-hostnames";
import { prefixWorkspaceId } from "@/lib/api/workspace-id";
import { deleteWorkspace } from "@/lib/api/workspaces";
import { withWorkspace } from "@/lib/auth";
// import { getFeatureFlags } from "@/lib/edge-config";
// import { storage } from "@/lib/storage";
import {
  WorkspaceSchema,
  WorkspaceSchemaExtended,
  updateWorkspaceSchema,
} from "@/lib/zod/schemas/workspaces";
import { prisma } from "@app/prisma";
import { NextResponse } from "next/server";

// GET /api/workspaces/[idOrSlug] – get a specific workspace by id or slug
export const GET = withWorkspace(
  async ({ workspace, headers }) => {
    return NextResponse.json(
      {
        ...WorkspaceSchemaExtended.parse({
          ...workspace,
          id: prefixWorkspaceId(workspace.id),
        }),
      },
      { headers }
    );
  },
  {
    requiredPermissions: ["workspaces.read"],
  }
);

// PATCH /api/workspaces/[idOrSlug] – update a specific workspace by id or slug
export const PATCH = withWorkspace(
  async ({ req, workspace }) => {
    const { name, slug, logo, conversionEnabled, allowedHostnames } =
      await updateWorkspaceSchema.parseAsync(await parseRequestBody(req));

    if (["free", "pro"].includes(workspace.plan) && conversionEnabled) {
      throw new ApiError({
        code: "forbidden",
        message: "Conversion tracking is not available on free or pro plans.",
      });
    }

    const validHostnames = allowedHostnames
      ? validateAllowedHostnames(allowedHostnames)
      : undefined;

    // const logoUploaded = logo
    //   ? await storage.upload(
    //       `workspaces/${prefixWorkspaceId(workspace.id)}/logo_${nanoid(7)}`,
    //       logo
    //     )
    //   : null;

    try {
      const response = await prisma.project.update({
        where: {
          slug: workspace.slug,
        },
        data: {
          ...(name && { name }),
          ...(slug && { slug }),
          // ...(logoUploaded && { logo: logoUploaded.url }),
          ...(conversionEnabled !== undefined && { conversionEnabled }),
          ...(validHostnames !== undefined && {
            allowedHostnames: validHostnames,
          }),
        },
        include: {
          // domains: true,
          users: true,
        },
      });

      if (slug !== workspace.slug) {
        await prisma.user.updateMany({
          where: {
            defaultWorkspace: workspace.slug,
          },
          data: {
            defaultWorkspace: slug,
          },
        });
      }

      // if (logoUploaded && workspace.logo) {
      //   // waitUntil(storage.delete(workspace.logo.replace(`${R2_URL}/`, "")));
      // }

      return NextResponse.json(
        WorkspaceSchema.parse({
          ...response,
          id: prefixWorkspaceId(response.id),
        })
      );
    } catch (error) {
      if (error.code === "P2002") {
        throw new ApiError({
          code: "conflict",
          message: `The slug "${slug}" is already in use.`,
        });
      } else {
        throw new ApiError({
          code: "internal_server_error",
          message: error.message,
        });
      }
    }
  },
  {
    requiredPermissions: ["workspaces.write"],
  }
);

export const PUT = PATCH;

// DELETE /api/workspaces/[idOrSlug] – delete a specific project
export const DELETE = withWorkspace(
  async ({ workspace }) => {
    await deleteWorkspace(workspace);

    return NextResponse.json(workspace);
  },
  {
    requiredPermissions: ["workspaces.write"],
  }
);
