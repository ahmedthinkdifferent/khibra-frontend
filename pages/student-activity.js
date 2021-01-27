import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Input from "../components/common/input";
import Form from "../components/common/form";
import Loading from "../components/common/loading";
import AuthService from "../network/auth-service";
import { useRouter } from "next/router";
import CV from "./../components/cv";
import { useFormik } from "formik";
import * as Yup from "yup";
import Http from "../network/http-service";
import FormikInput from "../components/common/formik-input";
import SessionService from "../network/sesssion-service";

const studentExperience = () => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
const [studentCV, setStudentCV] = useState({});

  const formik = useFormik({
    validateOnChange:false,
    validateOnChange:false,
    initialValues: {
      name: "",
      institution: "",
      city: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required field"),
      institution: Yup.string().required("Required field"),
      city: Yup.string().required("Required field"),
      startDate: Yup.string().required("Required field"),
      endDate: Yup.string().required("Required field"),
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      try {
        const res = await Http.send({
          url: "v1/cv/courses",
          method: "POST",
          body: values,
        });
        setRequesting(false);

        const list = [...courses];
        if(list){
          list.push(res.data.course);
        }else{
          list = [];
          list.push(res.data.course);
        }
        setCourses(list);
        const student = SessionService.getStudentData();
        student.cv.courses = list;
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
    const list = student.cv?.courses
    if (list) {
      setCourses(list);
    }
  }, []);

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-start align-items-center bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
              {studentCV && (
                <h1>
                  {studentCV.firstName } {" "} {studentCV.lastName}
                </h1>
              )}
              <h4 className="mt-4">Step 4 of 4</h4>
              <h1 className="mt-4">Extra Activity and Courses</h1>
              <p>
                Played in the university's soccer team? Volunteered at a charity
                event? Show employers what you did besides academics.
              </p>

              <ul className="mt-4">
                {courses.map((course) => {
                  return (
                    <li
                      key={course.id}
                      className="item m-2 p-2 d-flex justify-content-start align-items-start flex-column"
                    >
                      <h4>{course.name}</h4>
                      <p className="black">{course.institution}</p>
                      <p className="gray">
                        {course.startDate} - {course.endDate}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <a className="mt-2" onClick={(e) => setShowForm(true)}>
                + Add activity or course
              </a>

              {showForm && (
                <form className="signin-form" onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="institution"
                        placeholder="Institute"
                        type="text"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikInput
                        name="name"
                        placeholder="Activity or Course"
                        type="text"
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
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                    <div className="col">
                      <FormikInput
                        name="endDate"
                        placeholder="To"
                        type="date"
                        className="form-control"
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                  {requesting && <Loading />}
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
                    
                    <input
                      disabled={requesting}
                      onClick={handleBack}
                      type="button"
                      className="kh-btn kh-btn-small bg-gray black"
                      value="Back"
                    />
                  </div>
                  <div>
                    
                    <input
                      disabled={requesting}
                      onClick={(e) => router.push("/student-language")}
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
