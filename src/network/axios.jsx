import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    "api_key": "564287af7d18d4c141f315b8479ad5e2"
  }
});

export default axiosInstance;