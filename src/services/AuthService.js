import axios from "axios";
import { BASE_URL } from "./settings";

const URLS = {
  CATEGORIES: BASE_URL + "auth/login"
};

export default class AuthService {
  static login = async user => {
    let url = URLS.CATEGORIES;
    try {
      const { data } = await axios.post(url, user);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };
}
