// services
import { APIService } from "@/services/api.service";
// helper
import { API_BASE_URL } from "@/utils/helpers";
// types
import { IAppConfig } from "@repo/types";

export class AppConfigService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async envConfig(): Promise<IAppConfig> {
    return this.get("/api/configs/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
