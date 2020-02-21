import axios from "axios";
import { BASE_URL } from "./settings";

const URLS = {
  SALES: BASE_URL + "schools/sales"
};

export default class SaleService {
  static getSales = async token => {
    let config = {
      headers: {
        Authorization: `${token}`
      }
    };
    try {
      const { data } = await axios.get(URLS.SALES, config);
      return data;
    } catch (err) {
      return err;
    } finally {
      // this.setState({ loading: false });
    }
  };
}
