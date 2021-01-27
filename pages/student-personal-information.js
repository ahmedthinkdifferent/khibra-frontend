import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Loading from "../components/common/loading";
import AuthService from "./../network/auth-service";
import { useRouter } from "next/router";
import CV from "./../components/cv";
import { useFormik } from "formik";
import * as Yup from "yup";
import Http from "../network/http-service";
import FormikInput from "../components/common/formik-input";
import FormikSelect from "../components/common/formik-select";
import SessionService from "../network/sesssion-service";

const studentPersonalInformation = () => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false); 
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [studentCV, setStudentCV] = useState({});
   
  const formik = useFormik({
    validateOnChange:false,
    validateOnChange:false,
    initialValues: {
      firstName: "",
      midName: "",
      lastName: "",
      birthDate: "",
      nationalityId: "",
      countryId: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
      email: "",
    },
    // We used Yup here.
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Please enter your first name"),
      midName: Yup.string().required("Please enter your mid name"),
      lastName: Yup.string().required("Please enter your last name"),
      birthDate: Yup.date().required("Please enter your birthdate"),
      nationalityId: Yup.number().required("Please choose your nationality"),
      countryId: Yup.number().required("Please choose your country"),
      address: Yup.string().required("Please enter your address"),
      city: Yup.number().required("Please enter your city"),
      phone: Yup.string()
        .required("Please enter phone number")
        .matches(/^[0-9]{5,}$/),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter email address"),
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      try {
        const response = await Http.send({
          url: "v1/cv/personal_information",
          method: "POST",
          body: formik.values,
        });
        setRequesting(false);
        const student = response.data.student;
        SessionService.setStudentSession(student);
        router.push("/student-objectives");
      } catch (e) {
        setRequesting(false);
        setServerErrorMessage(e.message);
      }
    },
  });

  const handleBack = () => {
    router.push("/select-cv-template");
  };

  useEffect(() => {
    const student = SessionService.getStudentData();
    if(!student){
      router.push('/login');
      return;
    }
    setStudentCV(student);
    const personalInformation = student.personalInformation;
    
    const infoModel = {
      firstName: student.firstName ,
      midName: student.midName,
      lastName: student.lastName ,
      birthDate: personalInformation?.birthDate ,
      nationalityId: personalInformation?.nationalityId ,
      countryId: personalInformation?.countryId ,
      address: personalInformation?.address ,
      city: personalInformation?.city ,
      zipCode: personalInformation?.zipCode ,
      phone: student.phone ,
      email: student.universityEmail ,
    };
    formik.setValues(infoModel, false);
    // load countries.
    Http.send({
      url: "v1/countries",
      method: "GET",
    })
      .then((res) => {
        setCountries(res.data.countries);
        setCities([]);
        if(infoModel.countryId)
         loadCities(infoModel.countryId);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });
  }, []);

  async function loadCities(countryId) {
    setCities([]);
    try {
      const response = await Http.send({
        url: "v1/countries/" + countryId + "/cities",
        method: "GET",
      });
      setCities(response.data.cities);
    } catch (e) {
      setCities([]);
      setServerErrorMessage(e.message);
    }
  }

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-center align-items-center bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
              <h1>{formik.values.firstName} {" "}{formik.values.lastName}</h1>
              <h4 className="mt-4">Step 1 of 4</h4>
              <h1 className="mt-4">Tell us a little about yourself</h1>
              <p>
                Let us know who you are, how employers can get in touch with
                you, and what your profession is.
              </p>
              <form
                className="form signin-form d-flex flex-column justify-content-between"
                onSubmit={formik.handleSubmit} >
                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      placeholder="Your First Name"
                      label="Your First Name"
                      type="text"
                      
                      className="form-control "
                      formik={formik}
                      name={"firstName"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      placeholder="Your Mid Name"
                      label="Your Mid Name"
                      type="text"
                      className="form-control "
                      formik={formik}
                      name={"midName"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      placeholder="Your Last Name"
                      label="Your Last Name"
                      type="text"
                      className="form-control "
                      formik={formik}
                      name={"lastName"}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      label="Date Of Birth"
                      placeholder="Date Of Birth"
                      type="date"
                      className="form-control "
                      formik={formik}
                      name={"birthDate"}
                    />
                  </div>
                  <div className="col">
                    <FormikSelect
                      label={"Nationality"}
                      name={"nationalityId"}
                      formik={formik}
                      className={"form-control"}
                      hiddenValue={"id"}
                      shownValue={"name"}
                      values={countries}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikSelect
                      label={"Country"}
                      name={"countryId"}
                      formik={formik}
                      className={"form-control"}
                      onChange={(e) => {
                        loadCities(e.target.value);
                      }}
                      hiddenValue={"id"}
                      shownValue={"name"}
                      values={countries}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikSelect
                      label={"City"}
                      name={"city"}
                      formik={formik}
                      className={"form-control"}
                      hiddenValue={"id"}
                      shownValue={"name"}
                      values={cities}
                    />
                  </div>
                  <div className="col">
                    <FormikInput
                      label={"Zip (Optional)"}
                      name="zipCode"
                      placeholder="Zip (Optional)"
                      type="text"
                      className="form-control"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      placeholder="Address"
                      label="Address"
                      type="text"
                      className="form-control "
                      formik={formik}
                      name={"address"}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      name="email"
                      placeholder="Email"
                      label="Email"
                      type="text"
                      className="form-control"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col">
                    <FormikInput
                      name="text"
                      placeholder="Phone"
                      label="Phone"
                      type="text"
                      name="phone"
                      className="form-control"
                      formik={formik}
                    />
                  </div>
                </div>

                <div className="form-group">
                  {serverErrorMessage && (
                    <div className=" alert alert-danger">
                      {serverErrorMessage}
                    </div>
                  )}
                </div>

                <div className="d-flex flex-row justify-content-between">
                  <div>
                  {requesting && <Loading />}
                    <input
                    
                      disabled={requesting}
                      onClick={handleBack}
                      type="button"
                      className="kh-btn kh-btn-small bg-gray black"
                      value="Back"
                    />
                  </div>
                  <div>
                    {requesting && <Loading />}
                    <input
                      disabled={requesting}
                      type="submit"
                      className="kh-btn kh-btn-small"
                      value="Next"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="footer d-flex flex-column mt-4">
              <p className="gray m-4">Khibra © 2020. All rights reserved</p>
            </div>
          </div>
        </div>
        <div className="cv-section d-flex flex-column justify-content-start align-items-start">
          <div
            className="d-flex justify-content-between pl-4 pr-4"
            style={{ width: "100%" }}
          >
            <h4 className="blue mb-2">Preview CV</h4>
          </div>
          <CV user={studentCV} />
        </div>
      </main>
    </Layout>
  );
};

export default studentPersonalInformation;
