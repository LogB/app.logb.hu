import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  login(un, pw) {
    return axios
      .post("/", "function=WLI&un=" + un + "&pw=" + pw)
      .then(response => response.data);
  },
  register(un, pw, email) {
    return axios
      .post("/", "function=WR&un=" + un + "&pw=" + pw + "&email=" + email)
      .then(response => response.data);
  },
  viewUserMeta() {
    return axios.post("/", "function=VUM").then(response => response.data);
  }
};
