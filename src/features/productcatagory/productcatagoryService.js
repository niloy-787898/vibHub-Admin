import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProductCatagory = async () => {
  const response = await axios.get(`${base_url}product-catagory/`);

  return response.data;
};

const createProductCategory = async (category) => {
  const response = await axios.post(
    `${base_url}product-catagory/`,
    category,
    config
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}product-catagory/${id}`, config);

  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}product-catagory/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

const deleteProductCategory = async (id) => {
  try {
    const response = await axios.delete(`${base_url}product-catagory/${id}`, config);
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for proper handling in the async action.
  }
};

const productcatagoryService = {
  getProductCatagory,
  createProductCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default productcatagoryService;
