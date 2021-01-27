import DataService from "./../../network/data-service";

const RegisterService = {
  register(data) {
    return DataService.post("v1/users/register", data);
  },
};

export default RegisterService;
