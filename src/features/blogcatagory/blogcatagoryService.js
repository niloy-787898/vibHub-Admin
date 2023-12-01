import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogCatagories = async () => {
  const response = await axios.get(`${base_url}blog-catagory/`);

  return response.data;
};

const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blog-catagory/`, bcat, config);

  return response.data;
};

const blogcatagoryService = {
    getBlogCatagories,
    createBlogCategory
};

export default blogcatagoryService;