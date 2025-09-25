import { validDomainRegex } from "@app/utils";
import { ApiError } from "./errors";

const MAX_HOSTNAMES_ALLOWED = 10;

export const validateAllowedHostnames = (
  allowedHostnames: string[] | undefined
) => {
  if (!allowedHostnames) {
    return [];
  }

  allowedHostnames = [...new Set(allowedHostnames)];

  const results = allowedHostnames.map(
    (hostname) =>
      validDomainRegex.test(hostname) ||
      hostname === "localhost" ||
      hostname.startsWith("*.")
  );

  const invalidHostnames = results.filter((result) => !result);

  if (invalidHostnames.length > 0) {
    throw new ApiError({
      code: "unprocessable_entity",
      message: "Invalid hostnames.",
    });
  }

  if (allowedHostnames && allowedHostnames.length > MAX_HOSTNAMES_ALLOWED) {
    throw new ApiError({
      code: "unprocessable_entity",
      message: `Maximum of ${MAX_HOSTNAMES_ALLOWED} hostnames allowed.`,
    });
  }

  return allowedHostnames;
};
