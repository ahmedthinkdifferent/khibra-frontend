import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./../../components/layout";
import Input from "./../../components/common/input";
import Form from "./../../components/common/form";
import RegisterModel from "./register-model";
import RegisterValidation from "./register-validation";
import ValidationService from "./../../shared/validation-service";
import RegisterService from "./register-service";
import AuthService from "./../../network/auth-service";
import Loading from "./../../components/common/loading";
import userTypes from "./../../shared/user-types";
import Http from "../../network/http-service";

const RegisterForm = () => {
  const router = useRouter();
  const schema = new RegisterValidation().schema;
  const [registerModel, setRegisterModel] = useState(new RegisterModel());
  const [errors, setErrors] = useState({});
  const [requesting, setRequesting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [loginTypes, setLoginTypes] = useState([
    {
      id: 1,
      value: userTypes.student,
      checked: true,
      label: "Student",
    },
    {
      id: 2,
      value: userTypes.university,
      checked: false,
      label: "University",
    },
    {
      id: 3,
      value: userTypes.company,
      checked: false,
      label: "Employer",
    },
  ]);

  useEffect(() => {
    const isAthenticated = AuthService.isAthenticated();
    if (isAthenticated) router.push("/");
  }, []);

  const handleCheckBoxChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const regModel = { ...registerModel };
    regModel.type = input.value;
    input.checked = true;
    loginTypes.forEach((lt) => {
      if (lt.value == input.value) lt.checked = true;
      else lt.checked = false;
    });
    setRegisterModel(regModel);
  };

  const handleChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const errorsList = { ...errors };
    const registerData = Object.assign(new RegisterModel(), registerModel);
    registerData[input.name] = input.value;
    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      registerData
    );
    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];
    setErrors(errorsList);
    setRegisterModel(registerData);
  };

  const handleRegister = async () => {
    setRequesting(true);
    setServerErrorMessage("");
    const isValid = validate();
    if (!isValid) {
      setRequesting(false);
      return null;
    }
    try {
      const res = await Http.send({
        url: "v1/users/register",
        method: "POST",
        body: registerModel,
      });
      setRequesting(false);
      router.push("/login");
    } catch (error) {
      setRequesting(false);
      setServerErrorMessage(error.message);
    }
  };

  const validate = () => {
    const err = ValidationService.validate(schema, registerModel);
    if (err) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return (
    <Layout pageTitle="register">
      <div className="d-flex flex-row justify-content-left align-items-top">
        <div className="side-image"></div>
        <div className="login-content">
          <div>
            <img src="/assets/logo.svg" />
          </div>
          <h1 className="mt-4">
            Get started by creating a free account in just a few steps.
          </h1>
          <p>
            Join Khibra's community of students, schools, and employers to find
            internships, land a job, and more.
          </p>

          <div className="mt-4 d-flex flex-row justify-content-center align-items-center sign-up-label">
            Sign up as
          </div>

          <div className="d-flex flex-row justify-content-around align-items-center mb-1 sign-up-label-checks">
            {loginTypes.map((lt) => (
              <div
                key={lt.id}
                className="custom-control custom-checkbox ml-1 mt-1"
              >
                <input
                  type="checkbox"
                  name={lt.label}
                  value={lt.value}
                  checked={lt.checked}
                  className="custom-control-input"
                  id={lt.label}
                  onChange={handleCheckBoxChange}
                />
                <label className="custom-control-label" htmlFor={lt.label}>
                  {lt.label}
                </label>
              </div>
            ))}

            {/* <div className="custom-control custom-checkbox ml-1 mt-1">
              <input
                type="checkbox"
                name="university"
                className="custom-control-input"
                id="university"
                onChange={handleCheckBoxChange}
              />
              <label className="custom-control-label" htmlFor="university">
                University
              </label>
            </div> */}
            {/* <div className="custom-control custom-checkbox ml-1 mt-1">
              <input
                type="checkbox"
                name="employer"
                className="custom-control-input"
                id="employer"
                onChange={handleCheckBoxChange}
              />
              <label className="custom-control-label" htmlFor="employer">
                Employer
              </label>
            </div> */}
          </div>

          <Form className="form signin-form d-flex flex-column justify-content-between">
            <div className="form-row">
              <div className="col">
                <Input
                  name="email"
                  placeholder="Your email"
                  type="email"
                  className="form-control fieldinput-signin"
                  value={registerModel.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control fieldinput-signin"
                  value={registerModel.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <div className="col">
                <Input
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control fieldinput-signin"
                  value={registerModel.password2}
                  onChange={handleChange}
                  error={errors.password2}
                />
              </div>
            </div>

            <div>
              <div className="form-group">
                {serverErrorMessage && (
                  <div className=" alert alert-danger">
                    {serverErrorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                {requesting && <Loading />}
                <input
                  disabled={requesting}
                  onClick={handleRegister}
                  type="button"
                  className="kh-btn"
                  value="Sign up"
                />
              </div>
            </div>

            <div className="d-flex flex-column align-items-center">
              <div className="Or-login-with mt-4">OR LOGIN WITH</div>
              <div className="hr-login-with"></div>
            </div>
            <div className="mt-4 d-flex flex-row justify-content-center pt-4">
              <div className="social-kh-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                <img src="/assets/002-google.png" className="mr-4" />
                Google
              </div>
              <div className="social-kh-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                <img
                  src="/assets/001-linked-in-logo-of-two-letters.png"
                  className="mr-4"
                />
                Linkedin
              </div>
            </div>
            <div className="gray mt-4 d-flex flex-row justify-content-center pt-4 ">
              Have Khibra account?
              <Link href="/login">
                <a className="text-style-1 ml-2 blue">Login now</a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterForm;
