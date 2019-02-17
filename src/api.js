import axios from "axios";

axios.defaults.withCredentials = true;
let apiUrl = "";
if (window.location.href.includes("localhost")) {
  apiUrl = '/cloudForLocalhost.php';
} else apiUrl = '/cloudGet.php';
function get(params) {
  return axios.get(apiUrl, {
    params,
  });
}
export default {
  login(un, pw) {
    const params = {
      function: "WLI",
      un,
      pw,
    };
    return get(params).then(response => response);
  },
  register(un, pw, email) {
    const params = {
      function: "WR",
      un,
      pw,
      email,
    };
    return get(params).then(response => response);
  },
  logout() {
    const params = {
      function: "WLO"
    };
    return get(params).then(response => response);
  },
  viewUserMeta() {
    const params = {
      function: "VUM"
    };
    return get(params).then(response => response);
  },
  isUnique(un) {
    const params = {
      function: "IUU",
      un,
    };
    return get(params).then(response => response);
  },
  fastListMeas(isShared) {
    const params = {
      function: "LMMP"
    };
    if (isShared) {
      params.isShare = "share";
    } else {
      params.isShare = "own";
    }
    return get(params).then(response => response);
  },
  measDetails(id) {
    const params = {
      function: "LMMF",
      id,
    };
    return get(params).then(response => response);
  },
  measData(id, line) {
    const params = {
      function: "VMD",
      id,
    };
    if (line == null) {
      params.line = 1;
    } else {
      params.line = line;
    }
    return get(params).then(response => response);
  }
};
