import axios from "axios";
import { API_URL, TokenByLocalStorage } from "../API_CONFIG";

export async function CreateProperty(Data: any): Promise<any> {
    try {
      const response = await axios.post(
        `${API_URL}property`,
        Data,
        {
          headers: {
            Authorization: `Bearer ${TokenByLocalStorage}`,
          },
        }
      );
      console.log("send data from api", response);
  
      return response;
    } catch (error : any) {
      console.log("error from api", error);

    }
  }
  export async function UpdateProperty(id : string,Data: any): Promise<any> {
    try {
      const response = await axios.put(
        `${API_URL}property/${id}`,
        Data,
        {
          headers: {
            Authorization: `Bearer ${TokenByLocalStorage}`,
          },
        }
      );
      console.log("send data from api", response);
  
      return response;
    } catch (error : any) {
      console.log("error from api", error);

    }
  }
  export async function DeleteProperty(id : string): Promise<any> {
    try {
      const response = await axios.delete(
        `${API_URL}property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${TokenByLocalStorage}`,
          },
        }
      );
      console.log("send data from api", response);
  
      return response;
    } catch (error : any) {
      console.log("error from api", error);

    }
  }
  
  export async function GetProperties(): Promise<any>{
    try {
        
        const getData = await axios.get(`${API_URL}property`, {
            headers: {
              Authorization: `Bearer ${TokenByLocalStorage}`,
            },
          })

          console.log("getData",getData.data)
          return getData.data;
    } catch (error) {
        console.error(error)
    }

  }

  