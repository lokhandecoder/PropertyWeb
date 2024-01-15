import axios from "axios";
import { API_URL, Loginperson, TokenByLocalStorage } from "../API_CONFIG";

const person = Loginperson()
export async function AddYourWishList(Data: any): Promise<any> {
    try {
      const response = await axios.post(
        `${API_URL}wishlist`,
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
  export async function GetWishListbyUSerid(): Promise<any>{
    try {
        
        const getData = await axios.get(`${API_URL}wishlist/WishListByUserId/${person.id}`, {
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