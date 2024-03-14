import axios, { AxiosResponse } from "axios";

const backendURL = "http://localhost:3000";

export const register = async (
  name: string,
  email: string,
  mobile: string,
  password: string
): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/auth/signup`;

    const payLoad = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };
    const response: AxiosResponse<any> = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/auth/signin`;
    const payLoad = {
      email,
      password,
    };
    const response: AxiosResponse<any> = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};
