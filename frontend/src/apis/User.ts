import axios, { AxiosResponse } from "axios";

const backendURL = "http://localhost:3000";

export const getNotes = async (): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/user/notes`;
    const storedToken = localStorage.getItem("noteJWT");
    const config = {
      headers: {
        token: storedToken,
      },
    };
    const response: AxiosResponse<any> = await axios.get(requrl, config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { error: "An error occurred" };
  }
};

export const editNotes = async (newNote: any): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/user/editNotes`;

    const storedToken = localStorage.getItem("noteJWT");

    const config = {
      headers: {
        token: storedToken,
      },
    };

    const payLoad = {
      $set: { notes: newNote }, // Assuming newNote has the structure { notes: [] }
    };

    console.log(newNote);
    const response: AxiosResponse<any> = await axios.put(
      requrl,
      payLoad,
      config
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};
