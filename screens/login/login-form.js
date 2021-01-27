import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Input from "../../components/common/input";
import Form from "../../components/common/form";
import LoginModel from "./login-model";
import LoginValidation from "./login-validation";
import LoginService from "./login-service";
import AuthService from "../../network/auth-service";
import Loading from "../../components/common/loading";
import ValidationService from "./../../shared/validation-service";
import userTypes from "./../../shared/user-types";
import SessionService from "../../network/sesssion-service";

const LoginForm = () => {
  const router = useRouter();
  const schema = new LoginValidation().schema;
  const [loginModel, setLoginModel] = useState(new LoginModel());
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  useEffect(() => {
    const isAthenticated = AuthService.isAthenticated();
    const userData = AuthService.getUserData();
    if (isAthenticated) {
      const student = SessionService.getStudentData();
      userData.student = student;
      routeUserBasedOnHisType(userData);
    }
  }, []);

  const handleCheckBoxChange = ({ currentTarget: input }) => {
    setRememberMe(input.checked);
  };

  const handleChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const errorsList = { ...errors };
    const loginData = Object.assign(new LoginModel(), loginModel);
    loginData[input.name] = input.value;
    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      loginData
    );
    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];
    setErrors(errorsList);
    setLoginModel(loginData);
  };

  function routeUserBasedOnHisType(user) {
    SessionService.setStudentSession(user.student);
    if (user.type === userTypes.student) {
      // check where to route the student to
      if (user.student && user.student.id) {
        debugger
        if (user.student.cv) {
          if(user.student.cv.isCompleted){
            router.push("/student-dashboard");
          }else{
            router.push("/student-personal-information");          
          }
        } else {
            router.push("/select-cv-template");
        }
      } else {
        router.push("/student-information");
      }
    } else if (user.type == userTypes.company) router.push("/company-profile");
    else if (user.type == userTypes.university) router.push("/university-profile")
    else LoginService.logout();
  }

  //calling service
  const handleLogin = async () => {
    setRequesting(true);
    setServerErrorMessage("");
    const isValid = validate();
    if (!isValid) return setRequesting(false);
    try {
      const res = await LoginService.login(loginModel);
      const resData = await res.json();
      debugger
      const user = resData.user;
      if (user.token) {
        if (rememberMe) {
          AuthService.setUserDataToLocalStorage(user);
        } else {
          AuthService.setUserDataToSessionStorage(user);
        }
        debugger
        routeUserBasedOnHisType(user);
      } else {
        setServerErrorMessage(resData.message);
        return setRequesting(false);
      }
    } catch (error) {
      if (error?.status == "400") setServerErrorMessage(error.message);
      else setServerErrorMessage("Invalid email or password");
    }
    setRequesting(false);
  };

  const validate = () => {
    const err = ValidationService.validate(schema, loginModel);
    if (err) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return (
    <Layout pageTitle="login">
      <div className="d-flex flex-row justify-content-left align-items-top">
        <div className="login-side-image"></div>
        <div className="login-content">
          <div>
            <img src="/assets/logo.svg" />
          </div>
          <h1 className="mt-4">Login to your account</h1>
          <Form
            className="form signin-form d-flex flex-column justify-content-between"
            doSubmit={handleLogin}
          >
            <div>
              <div className="form-group">
                <Input
                  name="email"
                  placeholder="Your email"
                  type="email"
                  className="form-control"
                  value={loginModel.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  value={loginModel.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <div className="row justify-content-end mt-4 forget-container">
                <Link href="/forgot-password">
                  <a className="">Forgot password?</a>
                </Link>
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
                  type="submit"
                  className="kh-btn"
                  value="Login"
                />
              </div>
              <div className="custom-control custom-checkbox ml-1 mt-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  className="custom-control-input"
                  id="rememberMe"
                  onChange={handleCheckBoxChange}
                />
                <label className="custom-control-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <div className="Or-login-with mt-4">OR LOGIN WITH</div>
              <div className="hr-login-with"></div>
            </div>
            <div className="mt-4 d-flex flex-row justify-content-center pt-4">
              <div className="social-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                <img src="/assets/002-google.png" className="mr-4" />
                Google
              </div>
              <div className="social-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                <img
                  src="/assets/001-linked-in-logo-of-two-letters.png"
                  className="mr-4"
                />
                Linkedin
              </div>
            </div>
            <div className="gray mt-4 d-flex flex-row justify-content-center pt-4 ">
              Don’t have Khibra account?
              <div className="text-style-1 ml-2 blue">
              <Link href="/register">
              Signup now
              </Link>  
                </div>
              
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
