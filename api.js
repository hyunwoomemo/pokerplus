import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import request from "./axios";
// import axios from 'axios'

const BASE_URL = "https://www.pokerplus.co.kr";

export const resourceApi = {
  posters: () => request.get(`/resource/posters`),
  policys: (type) => request.get(`/resource/policys/${type}`),
};

export const authApi = {
  login: (data) => request.post(`/account/login`, data),
  info: () => request.get(`/account/info`),
  logout: () => request.post(`/account/logout`),
  authCreate: () => request.get(`/auth/create`),
  validate: (type, data) => request.post(`/account/validate/${type}`, data),
  accountCode: (prefix) => request.get(`/account/code/${prefix}`),
  authInfo: (authkey) => request.get(`/auth/authinfo/${authkey}`),
  join: (data) => request.joinPost("/account/regist", data),
  passwordChange: (userId, authkey, password) => request.post(`/account/passwordChange/${userId}`, { authkey, password }),
  passwordCheck: (data) => request.post("/account/passwordCheck", { password: data }),
  accountEdit: (data) => request.editPost("/account/update", data),
};

export const customerApi = {
  noticeList: ({ board_id, offset, page }) => request.get(`/datatable/list/${board_id}/${offset}/${page}`),
  faqList: (offset, page) => request.get(`/datatable/faq/list/${offset}/${page}`),
  customerConfig: () => request.get("/datatable/customer/config"),
  updateCustomerItem: (dataid, host_id, subject, contents) => request.post(`/datatable/customer/update/${dataid}`, { host_id, subject, contents }),
  customerList: (host, offset, page) => request.get(`/datatable/customer/list/${host}/${offset}/${page}`),
  customerItem: (dataid) => request.get(`/datatable/customer/read/${dataid}`),
};

export const ticketApi = {
  list: () => request.get("/ticket/my"),
  receiveList: (mode, offset, page) => request.get(`/ticket/${mode}/${offset}/${page}`),
  sendList: (mode, offset, page) => request.get(`/ticket/${mode}/${offset}/${page}`),
  findUser: (ph) => request.get(`/ticket/searchRecv/${ph}`),
  send: (data) => request.postXf("/ticket/send", data),
};

export const qrApi = {
  getUrl: () => request.get("/account/qr_url"),
  getInfo: (hash) => request.get(`/account/info_by_qr/${hash}`),
};
