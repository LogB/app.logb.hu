import axios from "axios";
axios.defaults.withCredentials = true;
function get(params) {
  return axios.get("/cloudGet.php", {
    params: params
  })
}
export default {
  login(un, pw) {
    let params = {
      function: "WLI",
      un: un,
      pw: pw
    }
    return get(params).then(response => response);
  },
  register(un, pw, email) {
    let params = {
      function: "WR",
      un: un,
      pw: pw,
      email: email
    }
    return get(params).then(response => response);
  },
  logout() {
    let params = {
      function: "WLO"
    }
    return get(params).then(response => response);
  },
  viewUserMeta() {
    let params = {
      function: "VUM"
    }
    return get(params).then(response => response);
  },
  isUnique(un) {
    let params = {
      function: "IUU",
      un: un
    }
    return get(params).then(response => response);
  },
  fastListMeas(isShared) {
    let params = {
      function: "LMMP"
    }
    if (isShared) {
      params["isShare"] = "share"
    }
    else {
      params["isShare"] = "own"
    }
    return get(params).then(response => response);
  },
  measDetails(id) {
    let params = {
      function: "LMMF",
      id: id
    }
    return get(params).then(response => response);
  },
  measData(id, line) {
    if (line == null) {
      let params = {
        function: "IDM",
        id: id,
        line: 1
      }
    }
    else {
      let params = {
        function: "IDM",
        id: id,
        line: 1
      }
    }
    return get(params).then(response => response);
  },
};
