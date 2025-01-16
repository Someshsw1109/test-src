import { toast } from "react-hot-toast";

import { apiConnector } from "../apniconnect.js";
import { courseEndpoints } from "../apis.js";

const{
  GET_ALL_INSTRUCTOR_ITEMS_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  DELETE_COURSE_API,
}=courseEndpoints






export const fetchAdminItems = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
      console.log("fetchh try mai aaaaya:");
      const response = await apiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_ITEMS_API,
        null,
        {
          Authorisation: `Bearer ${token}`,
        }
      );
      console.log("INSTRUCTOR ITEMS API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses");
      }
      result = response?.data?.data;
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
  };
  





  export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");  // Create a toast with a unique ID
    try {
      console.log("try ke andr aaya:")
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`, 
      });
      console.log("CREATE Item API RESPONSE............", response);
  
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details");
      }
  
      toast.success("Course Details Added Successfully", { id: toastId });  // Update success message on the same toast
      result = response?.data?.data;
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error);
      toast.error(error.response?.data?.message || "Failed to add course details", { id: toastId }); // Update error message on the same toast
    } finally {
      toast.dismiss(toastId);  // Always dismiss the loading toast
    }
    return result;
  };






  export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,
      });
      console.log("EDIT COURSE API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details");
      }
      toast.success("Course Details Updated Successfully");
      result = response?.data?.data;
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
  };

  









  export const fetchCourseCategories = async () => {
    let result = [];
    try {
      const response = await apiConnector("GET", COURSE_CATEGORIES_API);
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories");
      }
      result = response?.data?.data;
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    return result;
  };





  export const addItemToCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
      console.log("addcourse ke try mai aagaya:");
      // Call API with correct authorization header
      const response = await apiConnector(
        "POST",
        ADD_COURSE_TO_CATEGORY_API,
        data,
        {
          Authorisation: `Bearer ${token}`, // Fixed typo here
        }
      );
      console.log("ADD COURSE TO CATEGORY API RESPONSE............", response);
  
      // Ensure you're checking the correct part of the response for success
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could Not Add Course To Category");
      }
  
      toast.success("Course Added To Category");
      success = true;
    } catch (error) {
      success = false;
      console.log("ADD COURSE TO CATEGORY API ERROR............", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      toast.dismiss(toastId); // Ensure the toast is always dismissed
    }
  
    return success;
  };
  






  export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorisation: `Bearer ${token}`,
      });
      console.log("DELETE COURSE API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course");
      }
      toast.success("Course Deleted");
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
  