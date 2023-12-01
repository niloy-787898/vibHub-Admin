import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getEnquaries = async () => {
  const response = await axios.get(`${base_url}enquary/`);

  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquary/${id}`, config);
  return response.data;
  
}
const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquary/${id}`);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquary/${enq.id}`,
    { status: enq.enqData },
    config
  );
  console.log("enq", enq)
  return response.data;
};

const enquaryService = {
    getEnquaries,
    deleteEnquiry,
    getEnquiry,
    udpateEnquiry,
};

export default enquaryService;
