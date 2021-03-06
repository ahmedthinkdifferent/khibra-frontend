import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Input from "../components/common/input";
import Form from "../components/common/form";
import Loading from "../components/common/loading";
import AuthService from "../network/auth-service";
import { useRouter } from "next/router";
import CV from "./../components/cv";
import { useFormik } from "formik";
import FormikInput from "../components/common/formik-input";
import * as Yup from "yup";
import Http from "../network/http-service";
import SessionService from "../network/sesssion-service";

const studentExperience = () => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [studentCV, setStudentCV] = useState({}); 

  const formik = useFormik({
    validateOnChange:false,
    validateOnChange:false,
    initialValues: {
      jobTitle: "",
      employer: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Required field"),
      employer: Yup.string().required("Required field"),
      city: Yup.string().required("Required field"),
      startDate: Yup.string().required("Required field"),
      endDate: Yup.string().required("Required field"),
      description: Yup.string().required("Required field"),
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      try {
        const res = await Http.send({
          url: "v1/cv/experiences",
          method: "POST",
          body: values,
        });
        setRequesting(false);

        const list = [...experiences];
        if(list){
          list.push(res.data.experience);
        }else{
          list = [];
          list.push(res.data.experience);
        }
        setExperiences(list);
        const student = SessionService.getStudentData();
        student.cv.experiences = list;
        SessionService.setStudentSession(student);
        
        formik.resetForm();
        setShowForm(false);
      } catch (e) {
        setRequesting(false);
        setServerErrorMessage(e.message);
      }
    },
  });

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const student = SessionService.getStudentData();
    setStudentCV(student);
    const list = student.cv?.experiences
    if (list) {
      setExperiences(list);
    }
  }, []);

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-start align-items-start bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
              {studentCV && (
                <h1>
                  {studentCV.firstName} { " " } {studentCV.lastName}
                </h1>
              )}
              <h4 className="mt-4">Step 4 of 4</h4>
              <h1 className="mt-4">Work Experience</h1>
              <p>
                Worked in the past? Great! Walk employers through your
                experience.
              </p>

              <ul className="mt-4">
                {experiences.map((ex) => {
                  return (
                    <li key={ex.id} className="item m-2 p-2 d-flex justify-content-start align-items-start flex-column">
                      <h4>{ex.jobTitle}</h4>
                      <p className="black">{ex.employer}</p>
                      <p className="gray">
                        {ex.startDate} - {ex.endDate}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <a className="mt-2" onClick={(e) => setShowForm(true)}>
                + Add Experience
              </a>

              {showForm && (
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="employer"
                        placeholder="Employer"
                        label="Employer"
                        type="text"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="jobTitle"
                        placeholder="Job Title"
                        type="text"
                        label="jobTitle"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="city"
                        placeholder="City"
                        type="text"
                        label="City"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="startDate"
                        placeholder="From"
                        type="date"
                        label="From"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                    <div className="col">
                      <FormikInput
                        name="endDate"
                        placeholder="To"
                        type="date"
                        label="To"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="description"
                        placeholder="Desc"
                        type="text"
                        label="Desc"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>
                  {serverErrorMessage && (
                    <div className="alert alert-danger">
                      {serverErrorMessage}
                    </div>
                  )}
                  <div className="form-row">
                    <input
                      disabled={requesting}
                      type="submit"
                      className="kh-btn kh-btn-small"
                      value="Add"
                    />
                  </div>
                </form>
              )}

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Form className="form signin-form d-flex flex-column justify-content-between mt-4">
                <div className="d-flex flex-row justify-content-between mt-4">
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
                      onClick={(e) => router.push("/student-activity")}
                      type="button"
                      className="kh-btn kh-btn-small"
                      value="Next"
                    />
                  </div>
                </div>
              </Form>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="footer d-flex flex-column mt-4">
              <p className="gray m-4">Khibra © 2020. All rights reserved</p>
            </div>
          </div>
        </div>
        <div className="cv-section d-flex flex-column justify-content-start align-items-center">
          <h1 className="blue mb-2">Preview CV</h1>

          <CV user={studentCV}></CV>
        </div>
      </main>
    </Layout>
  );
};

export default studentExperience;
