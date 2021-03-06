import axios from "axios";
import { BASE_URL } from "./settings";

const URLS = {
  USERS: BASE_URL + "users",
  SCHOOLS: BASE_URL + "schools"
};

export default class CategoryService {
  static getUsers = async token => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const { data } = await axios.get(URLS.USERS, config);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };

  static getUser = async (id, token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    let url = URLS.USERS + "/" + id;
    try {
      const { data } = await axios.get(url, config);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };

  static register = async user => {
    let url = URLS.SCHOOLS;
    try {
      const { data } = await axios.post(url, user);
      return data;
    } catch (err) {
      return err.response.status;
    } finally {
      // this.setState({ loading: false });
    }
  };
}
