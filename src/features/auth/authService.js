import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login-admin`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/all-orders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/geta-order/${id}`, config);
  return response.data;
};

const updateOrder = async ( data) => {
  const response = await axios.put(
    `${base_url}user/updatea-order/${data.id}`,
    data,
    config
  );
  return response.data;
};
const getMonthlyOrders = async ( ) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};
const getyearlyStates = async ( ) => {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  updateOrder,
  getMonthlyOrders,
  getyearlyStates
};

export default authService;
