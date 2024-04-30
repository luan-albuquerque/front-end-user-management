import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios-http-config";

const baseURL = "/auth";

class AuthServices {

  async login(email: string, password: string): Promise<AxiosResponse<{ token: string }>> {

    return await axiosInstance.post(baseURL + "/login", {
      email,
      password,
    });
  }

  async emailRepairPassword(email: string): Promise<void> {

    return await axiosInstance.patch(baseURL + "/email-repair-password", { email });
  }

  async verifyToken(token: string): Promise<void> {

    return await axiosInstance.patch(baseURL + "/verify-token-password", { token });
  }

  async updatePassword(token: string, password: string, confirmpassword: string): Promise<void> {

    return await axiosInstance.put(baseURL + "/redefine-password", { token, password, confirmpassword });
  }

  async validateToken(): Promise<
    AxiosResponse<{
      sub: {
        id: string,
        name: string,
        surname: string,
        email: string,
        access_level: number,
        is_enabled: boolean,
        createdAt: Date,
        updateAt: Date
      };
      permissions: number;
      iat: number;
      exp: number;
    }>
  > {

    return await axiosInstance.patch(baseURL + "/validate-token");
  }


}


const authServices = new AuthServices();

export { authServices };