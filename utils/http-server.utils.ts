import axios from "axios";
import getDomain from '@utils/get-domain.utils'
const httpServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_NAME ?? '',
  headers: {
    'Access-Control-Allow-Origin' : '*',
    "x-access-token": process.env.NEXT_PUBLIC_COIN_API_KEY ?? "",
  },
});
export default httpServer;
