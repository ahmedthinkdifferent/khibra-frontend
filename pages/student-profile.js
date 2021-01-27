import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthService from "./../network/auth-service";
import Layout from "../components/layout";

const profile = () => {
  const router = useRouter();
  const [student, setStudent] = useState({});
  useEffect(() => {
    const isAthenticated = AuthService.isAthenticated();
    const userData = AuthService.getUserData();
    if (isAthenticated) {
      setStudent(userData.student);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Layout pageTitle="profile">
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="card-body block1">
                <div className="header_block d-flex align-items-center">
                  <div className="mr-3">
                    <div className="profile-header-img">
                      <img
                        className="img-circle"
                        src="assets/avatar.png"
                        width="101"
                        height="100"
                      />
                      <div className="rank-label-container">
                        <span className="label label-default rank-label">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <h4 className="font-weight-bold mb-1">
                      {student.firstName} {" "} {student.lastName}
                    </h4>
                    <p className="font-weight-bolder mb-0">
                    {student.cv?.educations[0]?.degree}
                    </p>
                    <p className="font-weight-normal mb-0">
                    {student.cv?.educations[0]?.school} - {student.cv?.educations[0]?.endDate}
                    </p>
                    <p className="font-weight-lighter mb-0">
                    {student.cv?.educations[0]?.city}
                    </p>
                  </div>
                </div>
                <p className="font-weight-bolder mb-0">Contact information</p>
                <div className="btn btn-secondary Rectangle_info a-no-pointer">
                {student.phone}
                </div>
                <div className="btn btn-secondary Rectangle_info a-no-pointer">
                {student.universityEmail}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cards header_block2">
                <div className="card-body d-flex align-items-center">
                  <div className="mr-4">
                    <div className="easypie margin-b-50" data-percent="20">
                      <span>20%</span>
                      {/* <p>Completed</p> */}
                    </div>
                  </div>
                  <div className="flex">
                    <h4 className="font-weight-bold mb-1">Step 1 of 3</h4>
                    <p className="font-weight-bolder mb-0">
                      Add work experience
                    </p>
                    <a className="btn btn-primary-white" href="#" role="button">
                      ADD
                    </a>
                  </div>
                </div>
              </div>
              <button type="button" className="public-profile-view blue">
                Profile public view
              </button>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cards card-body">
                <div className="d-flex align-items-center header_block3">
                  <div className="mr-3">
                    <div>
                      <img className="img-circle" src="assets/resume.png" />
                    </div>
                  </div>
                  <div className="flex">
                    <h4 className="mb-0">Resume Builder</h4>
                  </div>
                </div>
                <p className="MyResume">My Resume</p>
                <p className="font-weight-lighter">
                  Last update at 20 Aug, 2020
                </p>
                <a
                  className="btn btn-primary Rectangle_info icon"
                  href="#"
                  role="button"
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                </a>
                <a
                  className="btn btn-primary Rectangle_info icon"
                  href="#"
                  role="button"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row block-bg-w">
            <div className="col-lg-6">
              <a
                className="btn btn-primary Rectangle_info icon"
                href="#"
                role="button"
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </a>
              <br />
              <h6 className="Card_title">My Business Card</h6>
              <p className="Card_body">
                Third year finance student. I’m great at problem solving and
                enjoy working in challenging projects. Currently, I’m Interested
                in developing my understanding of local and regional financial
                markets, adding value in team engagements, and assisting the
                company’s future growth. “An independent and self-motivated
                business student with proven and tested business, procurement,
                sales, and marketing skills.” “An award-winning and confident
                communication graduate, able to establish rapport quickly and
                conduct training sessions with clarity and enthusiasm.”
              </p>
            </div>
            <div className="col-lg-6">
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/hometown.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      Hometown
                    </small>
                    <small className="js-lists-values-project">
                      <strong>{student.personalInformation?.address}, {student.personalInformation?.city} City, {student.personalInformation?.country}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/school.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      School
                    </small>
                    <small className="js-lists-values-project">
                      <strong>{student.cv?.educations[0]?.school}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/college.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      College
                    </small>
                    <small className="js-lists-values-project">
                      <strong>{student.cv?.educations[0]?.school}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/college.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      Recent Transfer
                    </small>
                    <small className="js-lists-values-project">
                      <strong>{student.personalInformation?.address}, {student.personalInformation?.city} City, {student.personalInformation?.country}</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/abroad-studies.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      Abroad studies
                    </small>
                    <small className="js-lists-values-project">
                      <strong>Washington D.C., USA</strong>
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="media_info flex-nowrap align-items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="avatar avatar-sm mr-8pt">
                  <img src="assets/interned.png" alt="" />
                </div>
                <div className="media-body">
                  <div className="d-flex flex-column">
                    <small className="js-lists-values-location text-50">
                      Interned
                    </small>
                    <small className="js-lists-values-project">
                      <strong>NBK Capital, Kuwait</strong>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row block-bg-w">
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body p-t-10">
                  <a
                    className="btn btn-primary Rectangle_info icon float-right"
                    href="#"
                    role="button"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                  <h4 className="mb-0 Card_title"> Overview </h4>
                  <div className="panel panel-primary">
                    <strong>Experience</strong> <br />
                    Fresh Graduate
                  </div>
                  <div className="panel panel-primary">
                    <strong>Availability</strong> <br />
                    Full time
                  </div>
                  <div className="panel panel-primary">
                    <strong>Key Highlights</strong> <br />
                    <i
                      className="fa fa-check text-primary"
                      aria-hidden="true"
                    ></i>
                    Training Program Certificates <br />
                    <i
                      className="fa fa-check text-primary"
                      aria-hidden="true"
                    ></i>
                    Prior Internships <br />
                    <i
                      className="fa fa-check text-primary"
                      aria-hidden="true"
                    ></i>
                    Club Affiliations
                  </div>
                  <div className="panel panel-primary">
                    <strong>Skills</strong> <br />
                    {student.cv?.skills?.map((skill)=>
                       <>{skill?.skill?.name} <br /></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="panel panel-default">
                <div className="panel-body p-t-10">
                  {!student.cv?.experiences?.length && <><h5 className="mb-0 Card_title">
                    <i className="mdi mdi-briefcase mr-1"></i> Experience
                  </h5>
                   <div className="panel panel-primary panel-empty">
                    You didn’t add work experience yet
                  </div></>}
                  {student.cv?.experiences?.length && <>
                    <h5 className="mb-0 Card_title"> Experience </h5>
                  <div className="panel panel-primary">
                    {student.cv?.experiences[0]?.jobTitle}
                    <br />
                    {student.cv?.experiences[0]?.employer}
                    <br />
                    {student.cv?.experiences[0]?.startDate} - {student.cv?.experiences[0]?.endDate}
                    <br />
                  </div>
                  </>}

                  {!student.cv?.educations?.length && <><h5 className="mb-0 Card_title">
                    <i className="mdi mdi-briefcase mr-1"></i> Education
                  </h5>
                   <div className="panel panel-primary panel-empty">
                    You didn’t add work any education yet
                  </div></>}
                  {student.cv?.educations?.length && <>
                    <h5 className="mb-0 Card_title"> Education </h5>
                  <div className="panel panel-primary">
                    {student.cv?.educations[0]?.degree}
                    <br />
                    {student.cv?.educations[0]?.school}
                    <br />
                    {student.cv?.educations[0]?.startDate} - {student.cv?.educations[0]?.endDate}
                    <br />
                  </div>
                  </>}
                  {/* <h5 className="mb-0 Card_title"> Education </h5>
                  <div className="panel panel-primary">
                    Msc. Information Systems
                    <br />
                    Gulf University
                    <br />
                    2012 - 2014
                    <br />
                  </div> */}

{!student.cv?.courses?.length && <><h5 className="mb-0 Card_title">
                    <i className="mdi mdi-briefcase mr-1"></i> Extra Activity & Courses
                  </h5>
                   <div className="panel panel-primary panel-empty">
                    You didn’t add work any extra Activity & Courses yet
                  </div></>}
                  {student.cv?.courses?.length && <>
                    <h5 className="mb-0 Card_title"> Extra Activity & Courses </h5>
                  <div className="panel panel-primary">
                    {student.cv?.courses[0]?.name}
                    <br />
                    {student.cv?.courses[0]?.institute}
                    <br />
                    {student.cv?.courses[0]?.startDate} - {student.cv?.courses[0]?.endDate}
                    <br />
                  </div>
                  </>}
                  {/* <h5 className="mb-0 Card_title">
                    {" "}
                    Extra Activity & Courses{" "}
                  </h5>
                  <div className="panel panel-primary">
                    Personal Development <br />
                    Gulf Institute of Business Practices <br />
                    2012 - 2014 <br />
                  </div> */}
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
