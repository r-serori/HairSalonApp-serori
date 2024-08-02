import { sendRequest } from "../requestApi";
import { CourseState } from "../../slices/courses/courseSlice";

export const courseApi = {
  createCourse: async (formData: CourseState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/courses/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllCourses: async () => {
    try {
      const response = await sendRequest("GET", `/webReq/courses/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateCourse: async (formData: CourseState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/courses/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteCourse: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/webReq/courses/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
