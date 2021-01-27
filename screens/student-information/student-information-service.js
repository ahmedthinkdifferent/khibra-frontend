import DataService from "./../../network/data-service";

const RegisterService = {
  create(data) {
    return DataService.post("students", data);
  },
};

export default RegisterService;
