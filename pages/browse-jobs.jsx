import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "./../components/layout";
import Http from "../network/http-service";
import AuthService from "../network/auth-service";
import { Button, Modal } from "react-bootstrap";
import FormikInput from "../components/common/formik-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import SessionService from '../network/sesssion-service';

const BrowseJob = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const jobTitleRef = useRef();
  const countryOrCityRef = useRef();
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState({});
  const searchCriteria = useRef({ title: "", countryOrCity: "" });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      verificationCode: "",
      newPassword: "",
      retypedPassword: "",
    },
    // We used Yup here.
    validationSchema: Yup.object().shape({
      verificationCode: Yup.number()
        .min(6, "Min length 6 characters")
        .required("Please enter verification code"),
      newPassword: Yup.string()
        .min(6, "Min length 6 characters")
        .required("Please enter new password"),
      retypedPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords not match")
        .min(6, "Min length 6 characters")
        .required("Please retype password"),
    }),
    async onSubmit(values) {
      // call web service.
      setInfo({
        loading: true,
        error: null,
      });
      try {
        const response = await Http.send({
          url: "v1/users/forget_password/verification",
          method: "POST",
          body: {
            email: userEmail,
            code: values.verificationCode.toString(),
            newPassword: values.newPassword,
            retypedPassword: values.retypedPassword,
          },
        });
        setInfo({
          loading: false,
          error: null,
        });
        await router.replace("/login");
      } catch (e) {
        setInfo({
          loading: false,
          error: e.message,
        });
      }
    },
  });

  useEffect(() => {
    loadJobs();
  }, []);

  function loadJobs() {
    const queryParams = {};
    if (searchCriteria.current) {
      const jobTitle = jobTitleRef.current.value;
      const countryOrCity = countryOrCityRef.current.value;
      if (jobTitle !== "") {
        queryParams.title = jobTitle;
      }
      if (countryOrCity !== "") {
        queryParams.countryOrCity = countryOrCity;
      }
    }
    Http.send({
      url: "v1/students/jobs",
      method: "GET",
      queryParams: queryParams,
    })
      .then((res) => {
        const jobs = res.data.jobs;
        if (jobs.length > 0) {
          setSelectedJobIndex(0);
          setSelectedJob(jobs[0]);
        }
        setJobs(jobs);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function applyToJob(job) {
    debugger;
    const user = AuthService.getUserData();
    const student = SessionService.getStudentData();
    const cvId = student.cv.id;
    Http.send({
      url: "v1/students/jobs",
      method: "POST",
      body: {
        email: user.email,
        cvId: cvId,
        phoneCode: "02",
        phone: student.phone,
        jobId: job.id,
      },
    })
      .then((res) => {
        const jobApplication = res.data.jobApplication;
        handleClose();
        router.push("/success-job-apply");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <Layout pageTitle="browse jobs">
      <div className="jobs-head">
        <div className="container">
          <div className="row">
            <h2>Jobs</h2>
            <div className="ml-auto">
              <a className="btn btn-link btn">Current applications</a>
              <a className="btn btn-link btn">Saved jobs</a>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadJobs();
            }}
          >
            <div className="input-group md-form form-sm form-2 pl-0">
              <input
                ref={jobTitleRef}
                className="form-control form-control-lg mr-4 py-1 job_Search"
                type="text"
                placeholder="Search by job title"
                aria-label="Search by job title"
              />
              <div className="Country_icon">
                <i className="fa fa-map-marker"></i>
                <input
                  ref={countryOrCityRef}
                  className="form-control form-control-lg mr-4 py-1 job_Search"
                  type="text"
                  placeholder="City or Country"
                  aria-label="City or Country "
                />
              </div>
              <div className="input-group-append">
                <button
                  type="submit"
                  className="input-group-text amber lighten-3"
                  id="basic-text1"
                >
                  <i className="fa fa-search text-grey" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="block-bg-w mr-n3">
              <p className="Jobsscroll_title">
                We found {jobs.length}+ jobs matches your profile
              </p>
              <img
                className="float-right"
                src="assets/16.png"
                width="22"
                height="18"
                alt=""
              />

              {jobs.map((job, index) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    key={job.id}
                    className={
                      selectedJobIndex == index
                        ? "jobs-matches active"
                        : "jobs-matches"
                    }
                    onClick={() => {
                      setSelectedJobIndex(index);
                      setSelectedJob(jobs[index]);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="mr-2">
                        <img
                          className="img-circle"
                          src="assets/avatar-comp.png"
                          width="50"
                          height="50"
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h5 className="d-inline-block text-dark">
                          <Link href="/browse-jobs" passHref>
                            <a>{job.title}</a>
                          </Link>
                        </h5>
                        <div className="row ml-0 pb-0">
                          <div className="d-inline-block small-badge">
                            <span className={"small-badge"}>
                              {" "}
                              {job.yearsOfExperience?.name}
                            </span>
                          </div>

                          <span className={"small-badge mx-2"}>
                            {" "}
                            {job.workLocation?.city.name}
                          </span>

                          <h7
                            className="small-badge"
                            style={{
                              backgroundColor: "transparent",
                              color: "#93939f",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {job.createdAt.split("T")[0]}
                          </h7>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="block-bg-w ml-n3">
              <ul className="topstats clearfix">
                <li>
                  <span className="title">Start date</span>
                  <h3>
                    {selectedJob?.startDate?.split("T")[0] || "Not found"}
                  </h3>
                </li>
                <li>
                  <span className="title">Availability</span>
                  <h3>{selectedJob?.availability?.name}</h3>
                </li>
                <li>
                  <span className="title">Compensation</span>
                  <h3>
                    {selectedJob?.salary
                      ? selectedJob.salary
                      : "To be discussed"}
                  </h3>
                </li>
                <li>
                  <span className="title">Duration</span>
                  <h3>{selectedJob?.duration?.id}</h3>
                </li>
              </ul>
              <div className="panel panel-primary">
                <h5>About the job</h5>
                <p>{selectedJob?.about}</p>
              </div>
              <h5>Minimum qualifications:</h5>
              <p>{selectedJob?.minQualifications}</p>

              <h5>Minimum qualifications:</h5>
              <p>{selectedJob?.preferredQualifications}</p>

              <h5>Job Location</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d195601.04562769792!2d-75.11803295!3d40.002497999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1401521095201"
                width="100%"
                height="400"
                border="0"
              ></iframe>

              <a href="#" className="btn btn-primary-white btn-lg w-25">
                Save job
              </a>
              {/* {
                <button
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  type="button"
                  onClick={handleShow}
                  className="btn btn-primary btn-lg float-right w-25"
                  disabled={selectedJob.jobApplication ? true : false}
                >
                  Apply
                </button>
              } */}

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Apply to this job</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"570px"}}>
                  <div className="d-flex flex-column">
                    <div className="job-modal-info d-flex flex-column">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          className="img-circle"
                          src="assets/avatar-comp.png"
                          width="50"
                          height="50"
                        />
                        <h5 className="mx-2 mt-0 mb-0">{selectedJob?.title}</h5>
                      </div>
                      <div className="d-flex flex-row mt-3 mb-0 pb-0">
                        <ul
                          className="topstats clearfix"
                          style={{ border: "0px solid" }}
                        >
                          <li>
                            <span className="title">Start date</span>
                            <h3>
                              {selectedJob?.startDate?.split("T")[0] ||
                                "Not found"}
                            </h3>
                          </li>
                          <li>
                            <span className="title">Availability</span>
                            <h3>{selectedJob?.availability?.name}</h3>
                          </li>
                          <li>
                            <span className="title">Compensation</span>
                            <h3>
                              {selectedJob?.salary
                                ? selectedJob.salary
                                : "To be discussed"}
                            </h3>
                          </li>
                          <li>
                            <span className="title">Duration</span>
                            <h3>{selectedJob?.duration?.id}</h3>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="job-modal-info d-flex flex-column mt-4 mb-4">
                      <h4> Contact Information</h4>
                      <div className="d-flex flex-row flex-wrap">
                        <div className="col-md-6">
                          <FormikInput
                            name="email"
                            placeholder="ahmed@gmail.com"
                            className="form-modal"
                            showLabel={false}
                            formik={formik}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="form-modal">
                            <div className="d-flex flex-row align-items-center mt-2">
                              <h6 className="col text-black mb-0">
                                My resume
                              </h6>
                              <p className={'mb-0'} style={{ color: "#93939f", fontSize:'12px' }}>
                                Last update 2020-10-10
                              </p>
                              <span className='ml-2'>
                                <i className="fa fa-arrow-down text-black mb-0"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-modal">
                            <div className="d-flex flex-row align-items-center mt-2">
                              <p
                                className="col mb-0 pb-0"
                                style={{ color: "#93939f" }} >
                                united arab emirates
                              </p>
                              <span>
                                <i className="fa fa-arrow-down text-black"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <FormikInput
                            name="phone"
                            className="form-modal"
                            placeholder="1234567"
                            showLabel={false}
                            formik={formik}
                          />
                        </div>
                        <div className="col-12 d-flex flex-row justify-content-between mt-3">
                          <p style={{ color: "#808080" }}>
                            by applying you agree to our{" "}
                            <span
                              style={{
                                color: "#004aff",
                                borderBottom: "1px solid #004aff",
                              }}
                            >
                              Terms of service
                            </span>
                          </p>
                          <Button
                            variant="primary"
                            style={{width:'160px'}}
                            onClick={() => applyToJob(selectedJob)}  >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          div.active {
            border-bottom: none;
            border: 1px solid #a8c1ff;
          }
          .small-badge {
            background: #f3f7ff;
            padding: 8px 4px;
            border-radius: 4px;
            color: black;
            line-height: inherit;
            height: 40px;
            vertical-align: middle;
            text-align: center;
          }
          .job-modal-info {
            border: 1px solid #a8c1ff;
            border-radius: 4px;
            padding: 20px 15px;
          }

          .text-black {
            color: #000000;
          }
        `}
      </style>
    </Layout>
  );
};

export default BrowseJob;
