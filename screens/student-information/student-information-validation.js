import Joi from "@hapi/joi";

export default class StudentInformationValidation {
    schema = Joi.object({
        firstName: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "First name is required";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        midName: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "Middle name is required";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        lastName: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "Last name is required";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        universityId: Joi.number().required()
            .error((errors) => {
                errors.forEach((err) => {
                    if (err.code) {
                        err.message = "Please select a university";
                    }
                });
                return errors;
            }),
        universityEmail: Joi.string()
            .required()
            .error((errors) => {
                debugger
                errors.forEach((err) => {
                    switch (err.code) {
                        default:
                            err.message = "University email is required";
                            break;
                    }
                });
                return errors;
            }),
        backupEmail: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "Backup email is required";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        phone: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "Phone number is required";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
    }).unknown(true);
}
