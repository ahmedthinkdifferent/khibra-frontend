import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Http from "../network/http-service";
import FormikSelect from "../components/common/formik-select";
import FormikInput from "../components/common/formik-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const profile = () => {
  const [fields, setFields] = useState([]);
  const [yearsOfExp, setYearsOfExp] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [durations, setDurations] = useState([]);

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      fields: "",
      yearsOfExperienceId: "",
      universities: "",
      majors: "",
      jobType: "",
      duration: "",
      isGccNational: "",
      compoensation: "",
      discuess: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Required field"),
      fields: Yup.number().required("Required field"),
      yearsOfExperienceId: Yup.number().required("Required field"),
      universities: Yup.string().required("Required field"),
      majors: Yup.string().required("Required field"),
      jobType: Yup.string().required("Required field"),
      duration: Yup.string().required("Required field"),
      isGccNational: Yup.string().required("Required field"),
      compoensation: Yup.string().required("Required field"),
      discuess: Yup.string().required("Required field"),
      starttDate: Yup.string().required("Required field"),
      endDate: Yup.string().required("Required field"),
    }),
    async onSubmit(values) {
      // call web service.
    },
  });

  useEffect(() => {
    loadFields();
    loadYearsOfExp();
    loadUniversities();
    loadMajors();
    loadJobTypes();
    loadDurations();
  }, []);

  function loadFields() {
    Http.send({
      method: "GET",
      url: "v1/work_fields",
    })
      .then((res) => {
        setFields(res.data.workFields);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loadYearsOfExp() {
    Http.send({
      url: "v1/years_of_experience",
      method: "GET",
    })
      .then((res) => {
        setYearsOfExp(res.data.yearsOfExperience);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loadUniversities() {
    Http.send({
      method: "GET",
      url: "/v1/universities_lookup",
    })
      .then((res) => {
        setUniversities(res.data.universities);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loadMajors() {
    Http.send({
      method: "GET",
      url: "/v1/majors",
    })
      .then((res) => {
        setMajors(res.data.majors);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loadJobTypes() {
    Http.send({
      method: "GET",
      url: "/v1/job_types",
    })
      .then((res) => {
        setJobTypes(res.data.availabilityTypes);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loadDurations() {
    Http.send({
      url: "/v1/job_durations",
      method: "GET",
    })
      .then((res) => {
        setDurations(res.data.jobDurations);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Layout pageTitle="post a job">
      <div className="container-fluid">
        <div className="d-flex flex-row">
          <div className="company-side-menu d-flex flex-column justify-content-start align-items-center pt-4">
            <div className="small-logo-container m-2"></div>
            <div className="side-company-title m-2">Google</div>
            <div className="side-company-major">Internet and Software</div>
            <hr className="m-4" />
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/home-icon.svg" />
              <a className="gray">Dashboard</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/candidates.svg" />
              <a className="gray">Candidates</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/talent-search.svg" />
              <a className="gray">Talent search</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/jobs-blue.svg" />
              <a className="blue">Jobs</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/msg.svg" />
              <a className="gray">Messaging</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/company-profile.svg" />
              <a className="gray">
                <Link href="/company-profile">Company Profile</Link>
              </a>
            </div>
          </div>
          <div style={{ width: "83%" }}>
            <div className="jumbotron">
              <div className="container">
                <div className="d-flex mb-4 flex-row justify-content-start align-items-center">
                  <div className="d-flex flex-column">
                    <div className="company-title">Add a new Job</div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="d-flex flex-row">
                  <div style={{ width: "100%" }} className=" block-bg-w mr-4">
                    <form className="form">
                      <div className="d-flex flex-row justify-content-between">
                        <div className="col-5">
                          <div className="form-group">
                            <FormikInput
                              placeholder="Job title"
                              label="Job title"
                              type="text"
                              className="form-control"
                              name="jobTitle"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <FormikSelect
                              label="Related fields of experience"
                              values={fields}
                              hiddenValue="id"
                              shownValue="name"
                              className="form-control"
                              name="fields"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikSelect
                              label="How many years?"
                              values={yearsOfExp}
                              hiddenValue="id"
                              shownValue="name"
                              className="form-control"
                              name="yearsOfExperienceId"
                              formik={formik}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-between">
                        <div className="col-12">
                          <div className="form-group">
                            <FormikSelect
                              label="Target Universities"
                              values={universities}
                              hiddenValue="id"
                              shownValue="name"
                              name="universities"
                              className="form-control"
                              formik={formik}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-between">
                        <div className="col-3">
                          <div className="form-group">
                            <FormikSelect
                              label="Target Majors"
                              values={majors}
                              hiddenValue="id"
                              shownValue="name"
                              className="form-control"
                              name="majors"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikSelect
                              label="Job type"
                              values={jobTypes}
                              hiddenValue="id"
                              shownValue="name"
                              name="jobType"
                              className="form-control"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikSelect
                              label="Duration"
                              values={durations}
                              hiddenValue="id"
                              shownValue="name"
                              name="duration"
                              className="form-control"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikInput
                              label="GCC National"
                              placeholder="I'm a GCC national"
                              type="text"
                              className="form-control"
                              name="isGccNational"
                              formik={formik}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row justify-content-start">
                        <div className="col-3">
                          <div className="form-group">
                            <FormikInput
                              label="Compensation"
                              placeholder="Amount in USD"
                              type="text"
                              className="form-control"
                              name="compoensation"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikInput
                              label="discussed"
                              placeholder="To be discussed"
                              type="text"
                              className="form-control"
                              name="discuess"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikInput
                              label="Start date"
                              placeholder="choose date"
                              type="date"
                              name="startDate"
                              className="form-control"
                              formik={formik}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <FormikInput
                              label="End Date"
                              placeholder="choose date"
                              type="date"
                              name="endDate"
                              className="form-control"
                              formik={formik}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="d-flex flex-row">
                  <div
                    className="d-flex flex-column"
                    style={{ width: "100%" }}
                    className=" block-bg-w mr-4"
                  >
                    <div>Choose position location </div>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="job-position mr-1 d-flex justify-content-center align-items-center">
                        Mountain View, California, United States
                      </div>
                      <div className="job-position mr-1 d-flex justify-content-center align-items-center">
                        Al Hamra Tower
                      </div>
                      <div className="job-position mr-1 d-flex justify-content-center align-items-center">
                        Jlt, Cluster F, Smart City, Google
                      </div>
                      <div className="job-position d-flex justify-content-center align-items-center">
                        Jlt, Cluster F, Smart City, Google
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
