import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  login(un, pw) {
    return axios
      .post("/cloud.php", "function=WLI&un=" + un + "&pw=" + pw)
      .then(response => response.data);
  },
  register(un, pw, email) {
    return axios
      .post("/cloud.php", "function=WR&un=" + un + "&pw=" + pw + "&email=" + email)
      .then(response => response.data);
  },
  viewUserMeta() {
    return axios.post("/cloud.php", "function=VUM").then(response => response.data);
  },
  isUnique(un) {
    return axios.get("/cloudGet.php?function=IUU&un=" + un);
  },
  fastListMeas(isShared) {
    if (isShared) {
      return axios.post('/cloud.php', "function=LMMP&isShare=share");
    }
    else {
      return axios.post('/cloud.php', "function=LMMP&isShare=own");
    }
  },
  measDetails(id) {
    return axios.post('/cloud.php', "function=LMMF&id=" + id);
  },
  measData(id, line) {
    if (line == null) return axios.post('/cloud.php', "function=VMD&id=" + id + "&line=1");
    return axios.post('/cloud.php', "function=VMD&id=" + id + "&line=" + line);
  },
};
