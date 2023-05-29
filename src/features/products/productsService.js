import axios from "axios";

const getAllProducts = async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
};

const authService = {
    getAllProducts
};

export default authService;