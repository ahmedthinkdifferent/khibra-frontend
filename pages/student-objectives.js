import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import FormikTextArea from "../components/common/formik-text-area";
import Loading from "../components/common/loading";
import Layout from "../components/layout";
import Http from "../network/http-service";
import SessionService from "../network/sesssion-service";
import CV from "./../components/cv";

const studentObjectives = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [objectives, setObjectives] = useState([]);
 
  const [studentCV, setStudentCV] = useState({});

  const formik = useFormik({
    initialValues: {
      objective: "",
    },
    validationSchema: Yup.object().shape({
      objective: Yup.string().required("Required field"),
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      const obj = {objective : formik.values?.objective};
      try {
        const response = await Http.send({
          url: "v1/cv/objectives",
          method: "POST",
          body: obj,
        });
        setRequesting(false);
        const objectiveData = response.data.objective;
        const studentData = SessionService.getStudentData();
        studentData.cv.objective = objectiveData;
        SessionService.setStudentSession(studentData);
        router.push("/student-skills");
      } catch (e) {
        setRequesting(false);
        setServerErrorMessage(e.message);
      }
    },
  });

  useEffect(function () {
    const student = SessionService.getStudentData();
    setStudentCV(student);
    formik.setValues({objective:student?.cv?.objective}, false);
    // load objective templates.
    Http.send({
      url: "v1/cv_objective_templates",
      method: "GET",
    })
      .then((res) => {
        setObjectives(res.data.objectiveTemplates);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });
  }, []);

  const handleBack = () => {
    router.push("/student-personal-information");
  };

  const takeACopy = (objective) => {
    formik.setValues({
      objective:objective.objective
    }, false);
    window.scrollTo(0, 0);
  };

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-center align-items-center bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
              {studentCV && (
                <h1>
                  {studentCV.firstName} {" "} {studentCV.lastName}
                </h1>
              )}
              <h4 className="mt-4">Step 2 of 4</h4>
              <h1 className="mt-4">Now, let's work on your resume objective</h1>
              <p>
                This appears near the top of your resume. Impress employers with
                a strong opening statement that sums up your strengths and
                experience.
              </p>
              <form className="form signin-form d-flex flex-column justify-content-between" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                  <div className="col">
                    <FormikTextArea
                      name="objective"
                      rows="7"
                      className="p-4"
                      formik={formik}
                    />
                  </div>
                </div>

                <h4 className="mt-4">Career Objective Samples</h4>
                <p>(Select one and edit the industries section)</p>
                <div>
                  {objectives.map((ob) => {
                    return (
                      <p
                        key={ob.id}
                        className="saved-objective m-2 p-4"
                        onClick={(e)=>{
                          takeACopy(ob);
                        }}
                      >
                        {ob.objective}
                      </p>
                    );
                  })}
                </div>
                <div>
                  <div className="form-group">
                    {serverErrorMessage && (
                      <div className=" alert alert-danger">
                        {serverErrorMessage}
                      </div>
                    )}
                  </div>
                  <div className="form-group"></div>
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
                      type='submit'
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
        <div className="cv-section d-flex flex-column justify-content-start align-items-center">
          <h1 className="blue mb-2">Preview CV</h1>

          <CV user={studentCV}></CV>
        </div>
      </main>
    </Layout>
  );
};

export default studentObjectives;
