import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { endpoints } from "../apis.js"
import {apiConnector} from "../apniconnect.js"
import {setProgress} from "../../slices/loadingBarSlice.jsx"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
} = endpoints


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            console.log("Initiating SENDOTP API call...");
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            dispatch(setProgress(100));
            navigate("/verify-email");
        } catch (error) {
            console.error("SENDOTP API Error", error);
            const errorMessage =
                error?.response?.data?.message || error?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            dispatch(setProgress(100)); // Optional: Reset or remove if progress is irrelevant on error
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


export function signUp(
  role,
  name,
  email,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        role,
        name,
        email,
        password,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setProgress(100));
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      dispatch(setProgress(100));
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}







export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setProgress(100))
      toast.success("Login Successful")
      dispatch(setToken(response.data.token))

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`

      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))

      navigate("/")

    } catch (error) {
      dispatch(setProgress(100))
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


// export function forgotPassword(email,setEmailSent) {
//   return async (dispatch) => {
//     //const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", RESETPASSTOKEN_API, {
//         email,
//       })

//       console.log("FORGOTPASSWORD RESPONSE............", response)

//       if (!response.data.success) {
//         toast.error(response.data.message)
//         throw new Error(response.data.message)
//       }

//       toast.success("Reset Email Sent");
//       setEmailSent(true)
//     } catch (error) {
//       console.log("FORGOTPASSWORD ERROR............", error)
//     }
//     // toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }