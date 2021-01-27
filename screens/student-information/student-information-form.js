import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import StudentInformationModel from "./student-information-model";
import StudentInformationValidation from "./student-information-validation";
import ValidationService from "./../../shared/validation-service";
import AuthService from "./../../network/auth-service";
import Form from "./../../components/common/form";
import Input from "./../../components/common/input";
import Loading from "./../../components/common/loading";
import Layout from "./../../components/layout";
import Http from "../../network/http-service";
import SessionService from "../../network/sesssion-service";


const StudentInformationForm = () => {
  // state
  const router = useRouter();
  const schema = new StudentInformationValidation().schema;
  const [studentInformationModel, setStudentInformationModel] = useState(
    new StudentInformationModel()
  );
  const [errors, setErrors] = useState({});
  const [requesting, setRequesting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [universities, setUniversities] = useState([]);
  const [phoneCode, setPhoneCode] = useState({
    d1: "1",
    d2: "2",
    d3: "3",
    d4: "4",
    d5: "5",
    d6: "6",
  });
  const userRef = useRef();

  //lifecycle.
  useEffect(() => {
    debugger
    const student = SessionService.getStudentData();
    if(student && student.isVerified) router.push("/");
    if(student && !student.isVerified) setStep(3);

    Http.send({
      method: "GET",
      url: "v1/universities_lookup",
    })
      .then((response) => {
        setUniversities(response.data.universities);
      })
      .catch((ex) => {
        setServerErrorMessage(ex.message);
      });
    userRef.current = AuthService.getUserData();
    if (userRef.current.student) {
      const studentData =  userRef.current.student
      SessionService.setStudentSession(studentData)
      if (!userRef.current.isVerified) {
        setStep(3);
      }
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const errorsList = { ...errors };
    const studentData = Object.assign(
      new StudentInformationModel(),
      studentInformationModel
    );
    studentData[input.name] = input.value;
    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      studentData
    );
    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];
    setErrors(errorsList);
    setStudentInformationModel(studentData);
  };

  const handleSubmit = async () => {
    setRequesting(true);
    setServerErrorMessage("");

    const isValid = validate();
    if (!isValid) return setRequesting(false);

    try {
      const response = await Http.send({
        url: "v1/students",
        method: "POST",
        body: studentInformationModel,
      });
      const student = response.data.student;
     SessionService.setStudentSession(student)
      setStep(3);
    } catch (ex) {
      setServerErrorMessage(ex.message);
    }
    setRequesting(false);
  };

  const verify = async () => {
    if (
      phoneCode.d1 === "" ||
      phoneCode.d2 === "" ||
      phoneCode.d3 === "" ||
      phoneCode.d4 === "" ||
      phoneCode.d5 === "" ||
      phoneCode.d6 === ""
    ) {
      setServerErrorMessage("Invalid verification code");
    } else {
      try {
        const student = SessionService.getStudentData()
        const response = await Http.send({
          method: "POST",
          url: "v1/phone_verification/verify",
          body: {
            phone: student.phone,
            code:
              phoneCode.d1 +
              phoneCode.d2 +
              phoneCode.d3 +
              phoneCode.d4 +
              phoneCode.d5 +
              phoneCode.d6,
          },
        });
        userRef.current.isVerifed = true;
        AuthService.setUserDataToSessionStorage(userRef.current);
        AuthService.setUserDataToLocalStorage(userRef.current);
        router.push("/welcome");
      } catch (e) {
        console.log(e);
        setServerErrorMessage(e.message);
      }
    }
  };

  const goNextStep = () => {
    if (
      !studentInformationModel.firstName ||
      !studentInformationModel.midName ||
      !studentInformationModel.lastName
    )
      return;
    setStep(2);
  };

  const validate = () => {
    const err = ValidationService.validate(schema, studentInformationModel);
    if (err) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const getUserId = () => {
    return AuthService.getUserData().id;
  };

  return (
    <Layout pageTitle="student information">
      <div className="d-flex flex-row justify-content-left align-items-top">
        <div className="side-image"></div>
        <div className="login-content">
          <div>
            <img src="/assets/logo.svg" />
          </div>
          <h1 className="mt-4">
            Launch the next step in your career,{" "}
            <span className="blue">set up your Khibra account.</span>
          </h1>

          <Form className="form signin-form d-flex flex-column justify-content-between">
            {step === 1 && (
              <div className="step1">
                <div className="mt-4 d-flex flex-row justify-content-start align-items-center step-label">
                  <div className="step-number mr-2">1</div>
                  <div className="d-flex flex-column align-items-start justify-contenet-start">
                    <label className="step-of">step 1 of 3</label>
                    <h4>Personal Information</h4>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="firstName"
                      placeholder="First name"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="midName"
                      placeholder="Middle name"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.midName}
                      onChange={handleChange}
                      error={errors.midName}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                    />
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    {serverErrorMessage && (
                      <div className=" alert alert-danger mt-2">
                        {serverErrorMessage}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    {requesting && <Loading />}
                    <input
                      disabled={requesting}
                      onClick={goNextStep}
                      type="button"
                      className="kh-btn"
                      value="Next"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step2">
                <div className="mt-4 d-flex flex-row justify-content-start align-items-center step-label">
                  <div className="step-number mr-2">2</div>
                  <div className="d-flex flex-column align-items-start justify-contenet-start">
                    <label className="step-of">step 2 of 3</label>
                    <h4>Academic Background</h4>
                  </div>
                </div>

                <div className="form-row mt-4">
                  <div className="col form-group">
                    <select
                      id={"university"}
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.universityId}
                      name="universityId"
                      onChange={handleChange}>
                      <option key={0} value={null} >
                          Select a univerity
                      </option>
                      {universities.map((university) => {
                        return (
                          <option key={university.id} value={university.id} >
                            {university.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.universityId && <div className="alert alert-danger">{errors.universityId}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="universityEmail"
                      placeholder="University email"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.universityEmail}
                      onChange={handleChange}
                      error={errors.universityEmail}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="backupEmail"
                      placeholder="Backup email"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.backupEmail}
                      onChange={handleChange}
                      error={errors.backupEmail}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Input
                      name="phone"
                      placeholder="Phone"
                      type="text"
                      className="form-control fieldinput-signin"
                      value={studentInformationModel.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    {serverErrorMessage && (
                      <div className=" alert alert-danger mt-2">
                        {serverErrorMessage}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    {requesting && <Loading />}
                    <input
                      disabled={requesting}
                      onClick={handleSubmit}
                      type="button"
                      className="kh-btn"
                      value="Next"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step3">
                <div className="mt-4 d-flex flex-row justify-content-start align-items-center step-label">
                  <div className="step-number mr-2">3</div>
                  <div className="d-flex flex-column align-items-start justify-contenet-start">
                    <label className="step-of">step 3 of 3</label>
                    <h4>Mobile Verification</h4>
                  </div>
                </div>

                <div className="mt-4">
                  <h1>OTP Authentication</h1>
                  <p>
                    We have sent 6 digit code on your number{" "}
                    {userRef.current.student?.phone}, enter the code below to
                    verify.
                  </p>
                </div>

                <div className="d-flex flex-row justify-content-around align-items-center">
                  <input
                    name="d1"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d1 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d1}
                  />

                  <input
                    name="d2"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d2 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d2}
                  />

                  <input
                    name="d3"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d3 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d3}
                  />

                  <input
                    name="d4"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d4 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d4}
                  />

                  <input
                    name="d5"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d5 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d5}
                  />

                  <input
                    name="d6"
                    placeholder="-"
                    type="text"
                    className="txt-digit"
                    onChange={(e) => {
                      phoneCode.d6 = e.target.value;
                      setPhoneCode(Object.assign({}, phoneCode));
                    }}
                    value={phoneCode.d6}
                  />
                </div>

                <div>
                  <div className="form-group">
                    {serverErrorMessage && (
                      <div className=" alert alert-danger mt-2">
                        {serverErrorMessage}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    {requesting && <Loading />}
                    <input
                      disabled={requesting}
                      onClick={verify}
                      type="button"
                      className="kh-btn"
                      value="Verify"
                    />
                  </div>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default StudentInformationForm;
