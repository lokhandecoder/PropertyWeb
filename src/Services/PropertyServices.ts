import axios from "axios";
import { API_URL, TokenByLocalStorage } from "../API_CONFIG";

export async function CreateProperty(Data: any): Promise<any> {
    try {
        alert(JSON.stringify(localStorage.getItem("Token")));
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
  
    //   if (error.response) {
    //     // The request was made, and the server responded with a status code
    //     console.log("Server responded with status:", error.response.status);
    //     console.log("Response data:", error.response.data);
  
    //     // You can handle different status codes and response data here
    //     if (error.response.status === 400) {
    //       // Handle validation errors
    //       const validationErrors = error.response.data.errors;
    //       console.log("Validation errors:", validationErrors);
    //       return { error: "Validation errors occurred", validationErrors };
    //     }
    //   } else if (error.message) {
    //     // Request was made but no response was received
    //     console.log("An error occurred:", error.message);
    //     return { error: error.message };
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.error("Unexpected error:", error);
    //     return { error: "Unexpected error occurred" };
    //   }
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

  