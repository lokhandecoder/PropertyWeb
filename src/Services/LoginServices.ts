import axios from "axios";
import { API_URL } from "../API_CONFIG";

export async function Login(Data: any): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}login`, Data);
    console.log("send data from api", response);

    return response;
  } catch (error: any) {
    console.log("erro from api", error.message);
    if (error.message) {
      const Error = error.message;
      return { error: Error };
    } else {
      console.log("An error occurred:", error?.message);
      return { error: error?.message };
    }
  }
}
export async function Signup(Data: any): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}user`, Data);

    return response;
  } catch (error: any) {
    console.log("erro from api", error);
  }
}
