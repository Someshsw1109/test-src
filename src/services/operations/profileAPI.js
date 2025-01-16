import { apiConnector } from "../apniconnect.js";
import { settingsEndpoints } from "../apis.js";
import { toast } from "react-hot-toast";


export async function deleteAccount(token,dispatch,navigate){
    const toastId = toast.loading("Deleting...");
    try {
      const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,null,{
        Authorisation: `Bearer ${token}`,
      });
      console.log("DELETE_ACCOUNT_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Account Deleted Successfully");
      dispatch(logout(navigate))
    }
    catch (error) {
      console.log("DELETE_ACCOUNT_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }
  
  