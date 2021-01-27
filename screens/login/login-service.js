import AuthService from "../../network/auth-service";
import DataService from "../../network/data-service";

const LoginService = {
  login(data) {
    return DataService.post("v1/users/login", data);
  },
  logout() {
    return AuthService.removeUserData();
  },
};

export default LoginService;
