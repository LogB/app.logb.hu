import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  login(un, pw) {
    return axios
      .post("/cloudFORlocalhost.php", "function=WLI&un=" + un + "&pw=" + pw)
      .then(response => response.data);
  },
  register(un, pw, email) {
    return axios
      .post("/cloudFORlocalhost.php", "function=WR&un=" + un + "&pw=" + pw + "&email=" + email)
      .then(response => response.data);
  },
  viewUserMeta() {
    return axios.post("/cloudFORlocalhost.php", "function=VUM").then(response => response.data);
  },
  async isUnique(un) {
    return await axios.get("/cloudGet.php?function=IUU&un=" + un);
  },
  async fastListMeas(isShared) {
    if (isShared == 'own') {
      return await axios.post('/cloudFORlocalhost.php', "function=LMMP&isShare=own", {
        transformResponse: [function (data) {
          return JSON.parse(data);
        }]
      });
    }
    else {
      return await axios.post('/cloudFORlocalhost.php', "function=LMMP&isShare=share", {
        transformResponse: [function (data) {
          return JSON.parse(data);
        }]
      });
    }

  }
};
