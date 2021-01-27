import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import Form from "../components/common/form";
import FormikSelect from "../components/common/formik-select";
import Loading from "../components/common/loading";
import Layout from "../components/layout";
import Http from "../network/http-service";
import SessionService from "../network/sesssion-service";
import CV from "./../components/cv";


const studentExperience = () => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [studentLanguages, setStudentLanguages] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [languageLevels, setLanguageLevels] = useState([]);
  const [studentCV, setStudentCV] = useState({});

  const formik = useFormik({
    validateOnChange: false,
    validateOnChange: false,
    initialValues: {
      languageId: "",
      languageLevelId: ""
    },
    validationSchema: Yup.object().shape({
      languageId: Yup.number().required("Required field"),
      languageLevelId: Yup.number().required("Required field")
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      try {
        const res = await Http.send({
          url: "v1/cv/languages",
          method: "POST",
          body: values,
        });
        setRequesting(false);


        const list = [...studentLanguages];
        if (list) {
          list.push(res.data.language);
        } else {
          list = [];
          list.push(res.data.language);
        }
        setStudentLanguages(list);
        const student = SessionService.getStudentData();
        student.cv.languages = list;
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
    const list = student.cv?.languages
    if (list) {
      setStudentLanguages(list);
    }

    // load languages.
    Http.send({
      url: "v1/languages",
      method: "GET",
    })
      .then((res) => {
        setLanguages(res.data.languages);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });

    // load languages levels.
    Http.send({
      url: "v1/languages_levels",
      method: "GET",
    })
      .then((res) => {
        setLanguageLevels(res.data.languagesLevels);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });
  }, []);


  const handleNext = async () => {
    setRequesting(true);
    const student = SessionService.getStudentData(); 
    const cvId = student.cv.id;

    try {
      const res = await Http.send({ 
        url: `v1/cv/${cvId}/completed`,
        method: "PUT",
      });
      setRequesting(false);
      student.cv.isCvCompleted = true;
      SessionService.setStudentSession(student);
      debugger
      router.push("/success-cv")
    } catch (error) {
      setLoading(false);
      setServerErrMsg(error.message);
    }

  }

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-start align-items-start bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
              {studentCV && (
                <h1>
                  {studentCV.firstName} {" "}
                  {studentCV.lastName}
                </h1>
              )}
              <h4 className="mt-4">Step 4 of 4</h4>
              <h1 className="mt-4">Languages</h1>
              <p></p>
              <ul className="mt-4">
                {studentLanguages.map((lang) => {
                  return (
                    <li
                      key={lang.id}
                      className="skill m-2 p-2 d-flex justify-content-start align-items-center" >
                      <span className="skill-rate mr-2">{lang?.languageLevel?.name}</span>
                      <h4>{lang.language?.name}</h4>
                    </li>
                  );
                })}
              </ul>
              <a className="mt-2" onClick={(e) => setShowForm(true)}>
                + Add Language
              </a>

              {showForm && (
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <FormikSelect
                        name="languageId"
                        label="Language"
                        className="form-control"
                        values={languages}
                        formik={formik}
                        hiddenValue='id'
                        shownValue='name'
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <FormikSelect
                        name="languageLevelId"
                        label="Degreee"
                        className="form-control"
                        values={languageLevels}
                        formik={formik}
                        hiddenValue='id'
                        shownValue='name'
                      />
                    </div>
                  </div>
                  {serverErrorMessage && (
                    <div className="alert alert-danger">
                      {serverErrorMessage}
                    </div>
                  )}
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
              <div className="form signin-form d-flex flex-column justify-content-between mt-4">
                <div className="d-flex flex-row justify-content-between mt-4">
                  <div>
                    <button
                      disabled={requesting}
                      onClick={handleBack}
                      type="button"
                      className="kh-btn kh-btn-small bg-gray black">Back</button>
                  </div>
                  <div>
                    {requesting && <Loading />}
                    <button
                      disabled={requesting}
                      onClick={handleNext}
                      className="kh-btn kh-btn-small">Next</button>
                  </div>
                </div>
              </div>
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
