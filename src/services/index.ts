import axios from "../utils/axios";
import api from "./api";

export function indexleft(params?: any) {
  return axios.get(api.indexleft, { params });
}
export function indexmiddle(params?: any) {
    return axios.get(api.indexmiddle, { params });
  }
  export function indexright(params?: any) {
    return axios.get(api.indexright, { params });
  }
