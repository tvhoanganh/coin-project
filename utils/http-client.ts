import axios from "axios";
import getDomain from '@utils/get-domain'
const http = axios.create({
  baseURL: getDomain(),
  headers: {
    'Access-Control-Allow-Origin' : '*',
    "x-access-token": process.env.NEXT_PUBLIC_COIN_API_KEY ?? "",
  },
});
export default http;
