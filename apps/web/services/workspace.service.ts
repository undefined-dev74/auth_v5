// services
import { APIService } from "@/services/api.service";
import { IWorkspace, IWorkspaceMemberInvitation } from "@repo/types";
// helpers
import { API_BASE_URL } from "@/utils/helpers";
// types

export class WorkspaceService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async userWorkspaces(): Promise<IWorkspace[]> {
    return this.get("/api/users/me/workspaces/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWorkspace(workspaceSlug: string): Promise<IWorkspace> {
    return this.get(`/api/workspaces/${workspaceSlug}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response;
      });
  }

  async createWorkspace(data: Partial<IWorkspace>): Promise<IWorkspace> {
    return this.post("/api/workspaces/", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateWorkspace(workspaceSlug: string, data: Partial<IWorkspace>): Promise<IWorkspace> {
    return this.patch(`/api/workspaces/${workspaceSlug}/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteWorkspace(workspaceSlug: string): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async joinWorkspace(workspaceSlug: string, invitationId: string, data: any): Promise<IWorkspaceMemberInvitation> {
    return this.post(`/workspaces/${workspaceSlug}/invitations/${invitationId}/join`, data, {
      headers: {},
    })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWorkspaceInvitation(workspaceSlug: string, invitationId: string): Promise<any> {
    return this.get(`/workspaces/${workspaceSlug}/invitations/${invitationId}/join`, { headers: {} })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
