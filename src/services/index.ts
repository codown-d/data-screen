import api from "./api";
import axios from "./axios";

export function indexleft(params?: any) {
  return axios.get(api.indexleft, { params });
}
export function indexmiddle(params?: any) {
    return axios.get(api.indexmiddle, { params });
  }
  export function indexright(params?: any) {
    return axios.get(api.indexright, { params });
  }
