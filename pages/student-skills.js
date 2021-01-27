import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import Input from "../components/common/input";
import Form from "../components/common/form";
import Loading from "../components/common/loading";
import AuthService from "../network/auth-service";
import { useRouter } from "next/router";
import CV from "./../components/cv";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from '../components/common/formik-input';
import FormikSelect from '../components/common/formik-select';
import Http from "../network/http-service";
import SessionService from "../network/sesssion-service";

const studentSkills = () => {
  const router = useRouter();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [skillsLookup, setSkillsLookup] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);
  const [skillsLevels, setSkillsLevels] = useState([]);
  const [studentCV, setStudentCV] = useState({});

  const formik = useFormik({
    validateOnChange:false,
    validateOnChange:false,
    initialValues: {
      skillId: "",
      skillLevelId: "",
    },
    validationSchema: Yup.object().shape({
      skillId: Yup.number().required("Required field"),
      skillLevelId: Yup.number().required("Required field"),
    }),
    async onSubmit(values) {
      // call web service.
      setRequesting(true);
      try {
        const res = await Http.send({
          url: "v1/cv/skills",
          method: "POST",
          body: formik.values,
        });
        setRequesting(false);
        const list = [...studentSkills];
        if(list){
          list.push(res.data.skill);
        }else{
          list = [];
          list.push(res.data.skill);
        }
        setStudentSkills(list);
        const student = SessionService.getStudentData();
        student.cv.skills = list;
        SessionService.setStudentSession(student);
        formik.resetForm();
        setShowAddSkillForm(false);
      } catch (e) {
        setRequesting(false);
        setServerErrorMessage(e.message);
      }
    },
  });

  useEffect(function () {
    const student = SessionService.getStudentData();
    setStudentCV(student);
    const list = student.cv?.skills;
    if(list){
      setStudentSkills(list); 
    }
    // load skills lookups.
    Http.send({
      url: "/v1/skills",
      method: "GET",
    })
      .then((res) => {
        setSkillsLookup(res.data.skills);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });
    // load skills levels.
    Http.send({
      url: "/v1/skills_levels",
      method: "GET",
    })
      .then((res) => {
        setSkillsLevels(res.data.skillsLevels);
      })
      .catch((e) => {
        setServerErrorMessage(e.message);
      });
  }, []);

  const handleBack = () => {
    router.push("/student-objectives");
  };

  function handleNext(){
    router.push('/student-education');
  }

  return (
    <Layout pageTitle="student personal information">
      <main className="d-flex flex-row justify-content-between cv-builder">
        <div className="cv-section justify-content-start align-items-center bg-babyblue d-flex flex-column ">
          <div className="ml-4">
            <div className="pl-4 d-flex flex-column">
            {studentCV && (
                <h1>
                  {studentCV.firstName} { " "} { studentCV.lastName}
                </h1>
              )}
              <h4 className="mt-4">Step 3 of 4</h4>
              <h1 className="mt-4">Technical & Personal Skills</h1>
              <p>
                Tell employers what skills you hold. Pick up to four skills to
                show employers what you're capable of.
              </p>

              <ul className="mt-4">
                {studentSkills?.map((skill) => {
                  return (
                    <li key={skill.id} className="skill m-2">
                      <span className="skill-rate mr-2">{skill.skillLevel.name}</span>
                      {skill.skill.name}
                    </li>
                  );
                })}
              </ul>
              <a className="mt-2" onClick={(e)=>{
                setShowAddSkillForm(true);
              }}>
                + Add Skill
              </a>

              {showAddSkillForm && (
                <form className="signin-form" onSubmit = {formik.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <FormikSelect
                        name="skillId"
                        label="Skill"
                        className="form-control"
                        values={skillsLookup}
                        shownValue = 'name'
                        hiddenValue = 'id'
                        formik={formik}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                    <FormikSelect
                        name="skillLevelId"
                        label="Skill Level"
                        className="form-control"
                        values={skillsLevels}
                        shownValue = 'name'
                        hiddenValue = 'id'
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
                      value="+ Add"
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
              <form className="form signin-form d-flex flex-column justify-content-between mt-4">
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
                      onClick={handleNext}
                      type="button"
                      className="kh-btn kh-btn-small"
                      value="Next"
                    />
                  </div>
                </div>
              </form>
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

export default studentSkills;
