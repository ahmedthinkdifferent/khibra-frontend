import DataService from "./../network/data-service"

const StudentService = {
  cvComplete(cvId) {
    return DataService.put(`v1/cv/${cvId}/completed`);
  },
};

export default StudentService;
