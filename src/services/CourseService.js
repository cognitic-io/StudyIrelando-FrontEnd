import axios from "axios";
import { BASE_URL } from "./settings";

const URLS = {
  COURSES: BASE_URL + "courses"
};

export default class CourseService {
  static saveCourse = async (course, token) => {
    let config = {
      headers: {
        Authorization: `${token}`
      }
    };
    let url = URLS.COURSES;
    try {
      const { data } = await axios.post(url, course, config);
      return data;
    } catch (err) {
      return err.response.status;
    } finally {
      // this.setState({ loading: false });
    }
  };

  static getCourses = async token => {
    let config = {
      headers: {
        Authorization: `${token}`
      }
    };
    try {
      const { data } = await axios.get(URLS.COURSES, config);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };

  static deleteCourse = async (token, id) => {
    let config = {
      headers: {
        Authorization: `${token}`
      }
    };

    let url = URLS.COURSES + "/" + id;

    try {
      const { data } = await axios.delete(url, config);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };
}
