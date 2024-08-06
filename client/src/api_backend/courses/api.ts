import { sendRequest } from "../requestApi";
import { CourseState } from "../../slices/courses/courseSlice";

export const courseApi = {
  createCourse: async (formData: CourseState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/api/courses/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllCourses: async () => {
    try {
      const response = await sendRequest("GET", `/api/courses/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateCourse: async (formData: CourseState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/courses/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteCourse: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/api/courses/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
