import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios-http-config";
import { User } from "../models/User.model";

const baseURL = "/user";

class UserServices {

  async listUsers(): Promise<AxiosResponse<{
    details: User[]
  }>> {

    return await axiosInstance.get(baseURL);
  }

  async deleteUser(id: string): Promise<void>{
    await axiosInstance.delete(baseURL + `/${id}` )

  }

  async createUser(data: {
    name: string,
    surname: string,
    email: string,
    password: string,
    access_level: number,
  }): Promise<void> {
    
    await axiosInstance.post(baseURL, data)
  }


  async updateUser(data: {
    id: string,
    name: string;
    surname: string;
    email: string;
    password: string;
    access_level: number;
    is_enabled: boolean
  
  }): Promise<void> {
    
     await axiosInstance.put(baseURL+ `/${data.id}`, data)
  }


}


const usersServices = new UserServices();

export { usersServices };