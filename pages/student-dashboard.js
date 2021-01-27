import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./../components/layout";
import AuthService from "./../network/auth-service";
import Link from "next/link";

const dashboard = () => {
  const router = useRouter();
  const [student, setStudent] = useState({});
  useEffect(() => {
    debugger;
    const isAthenticated = AuthService.isAthenticated();
    const userData = AuthService.getUserData();
    if (isAthenticated) {
      setStudent(userData.student);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Layout pageTitle="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="col-lg-12">
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <div className="profile-header-img">
                    <img
                      className="img-circle"
                      src="assets/avatar.png"
                      width="170"
                      height="170"
                    />
                  </div>
                </div>
                <div className="flex">
                  <h4 className="font-weight-bold mb-1">
                    {student.firstName} {student.lastName}
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
            </div>
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body d-flex flex-row bd-highlight mb-3">
                  <div className="panel panel-primary-dashbord flex-grow-2">
                    <strong>120</strong> <br />
                    Job applications
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                  <div className="panel panel-primary-dashbord flex-grow-2">
                    <strong>100+</strong> <br />
                    Profile views
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                  <div className="panel panel-primary-dashbord flex-grow-1">
                    <strong className="Inbox">10+</strong> <br />
                    Inbox
                    <img
                      className="float-right"
                      src="assets/inbox.png"
                      width="67"
                      height="53"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="block-bg-w">
                <a className="btn btn-primary-white">
                  <Link href="/browse-jobs">Recent jobs</Link>
                </a>
                <p className="text-black-50 d-sm-inline-flex p-2">Saved jobs</p>
                <div className="input-group md-form form-sm form-2 pl-0">
                  <input
                    className="form-control form-control-lg my-0 py-1 amber-border"
                    type="text"
                    placeholder="Search by job title"
                    aria-label="Search by job title"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="input-group-text amber lighten-3"
                      id="basic-text1"
                    >
                      <i
                        className="fa fa-search text-grey"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
                <p className="title_carousel">
                  We found 30+ jobs matches your profile
                </p>
                <a
                  className="btn btn-link d-sm-inline-flex p-2"
                  href="#"
                  role="button"
                >
                  View all
                </a>
                <div className="float-right carousel_icon">
                  <a
                    className="btn btn-primary-white not-active"
                    href="#"
                    role="button"
                  >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </a>
                  <a className="btn btn-primary-white" href="#" role="button">
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="carousel-inner">
                  <div className="row_carousel">
                    <div className="item_carousel">
                      <div className="caption">
                        <h6>Added 1 hour ago</h6>
                        <img
                          className="img-circle"
                          src="assets/oval.png"
                          width="32"
                          height="32"
                        />
                        <p>Google</p>
                        <h2>Junior Software Engineer</h2>
                        <a className="ui teal tag label a-no-pointer">Fresh Graduate</a>
                        <a className="ui teal tag label a-no-pointer">Dubai</a>
                        <a className="btn btn-mini d-flex justify-content-end">
                          <Link href="/browse-jobs">
                            <i
                              className="fa fa-angle-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </a>
                      </div>
                    </div>
                    <div className="item_carousel">
                      <div className="caption">
                        <h6>Added 1 hour ago</h6>
                        <img
                          className="img-circle"
                          src="assets/oval.png"
                          width="32"
                          height="32"
                        />
                        <p>Google</p>
                        <h2>Junior Software Engineer</h2>
                        <a className="ui teal tag label a-no-pointer">Fresh Graduate</a>
                        <a className="ui teal tag label a-no-pointer">Dubai</a>
                        <a className="btn btn-mini d-flex justify-content-end">
                          <Link href="/browse-jobs">
                            <i
                              className="fa fa-angle-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </a>
                      </div>
                    </div>
                    <div className="item_carousel">
                      <div className="caption">
                        <h6>Added 1 hour ago</h6>
                        <img
                          className="img-circle"
                          src="assets/oval.png"
                          width="32"
                          height="32"
                        />
                        <p>Google</p>
                        <h2>Junior Software Engineer</h2>
                        <a className="ui teal tag label a-no-pointer">Fresh Graduate</a>
                        <a className="ui teal tag label a-no-pointer">Dubai</a>
                        <a
                          className="btn btn-mini d-flex justify-content-end"
                          href="#"
                        >
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-bg-w">
                <h6 className="Card_title">Current applications</h6>
                <div className="caption_wide">
                  <img
                    className="img-circle"
                    src="assets/oval.png"
                    width="32"
                    height="32"
                  />
                  <h2>Junior Software Engineer</h2>
                  <a className="ui teal tag label bg-warning a-no-pointer">Pending review</a>
                  <h6>Applied at 20 Aug, 2020</h6>
                  <a className="btn btn-link btn btn-mini d-flex justify-content-end">
                    <Link href="/browse-jobs">View application</Link>
                  </a>
                </div>
                <div className="caption_wide">
                  <img
                    className="img-circle"
                    src="assets/oval.png"
                    width="32"
                    height="32"
                  />
                  <h2>Junior Software Engineer</h2>
                  <a className="ui teal tag label bg-success a-no-pointer">Shortlisted</a>
                  <h6>Applied at 20 Aug, 2020</h6>
                  <a className="btn btn-link btn btn-mini d-flex justify-content-end">
                    <Link href="/browse-jobs">View application</Link>
                  </a>
                </div>
              </div>
              <div className="panel panel-primary jobs-dashbord d-flex justify-content-center">
                <div className="d-flex flex-column">
                  <strong>You applied only for</strong> 2 jobs
                  <a className="btn btn-primary btn-lg white">
                    <Link href="/browse-jobs">Apply for more</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row profile-dashbord_row">
              <div className="cards card-body cv_dashbord">
                <div className="d-flex align-items-center">
                  <div className="flex">
                    <a
                      className="btn btn-link d-flex justify-content-end"
                      href="#"
                    >
                      View Resume
                    </a>
                  </div>
                  <div className="mr-3">
                    <div>
                      <img className="img-circle" src="assets/resume.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cards card-body qr_dashbord">
                <img src="assets/qr.png" width="43" height="43" alt="" />
              </div>
            </div>
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
                  <p className="font-weight-bolder mb-0">Add work experience</p>
                  <a className="btn btn-primary-white  " href="#" role="button">
                    ADD
                  </a>
                </div>
              </div>
            </div>
            <div className="cards header_block2">
              <div className="card-body d-flex align-items-center">
                <div className="mr-4">
                  <img src="assets/scanner.png" width="62" height="51" alt="" />
                </div>
                <div className="flex">
                  <h4 className="font-weight-bold mb-1">
                    Attach university degree
                  </h4>
                  <p className="font-weight-bolder mb-0">
                    Easily scan and upload
                  </p>
                  <a className="btn btn-primary-white  " href="#" role="button">
                    Scan your degree
                  </a>
                </div>
              </div>
            </div>
            <div className="cards header_block2">
              <div className="card-body">
                <h6 className="Card_title">Career adviser</h6>
                <a href="#" className="btn btn-primary   btn-lg white">
                  <i className="fa fa-commenting-o" aria-hidden="true"></i> Ask
                  an expert for career advice
                </a>
                <a className="btn btn-primary-white" href="#" role="button">
                  Popular topics
                </a>
                <p className="text-black-50 d-sm-inline-flex p-2">
                  Most recent
                </p>
                <ul className="list-group">
                  <li className="list-group-item">A pathway to jobs</li>
                  <li className="list-group-item">
                    What companies like Google look for
                  </li>
                  <li className="list-group-item">
                    Tips from our top experts!
                  </li>
                  <li className="list-group-item">
                    What companies like Google look for
                  </li>
                </ul>
                <a
                  className="btn btn-primary-white   btn-lg a-no-pointer"
                  href="#"
                  role="button"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="cards header_block2">
              <div className="card-body">
                <h6 className="Card_title">Upcoming events</h6>
                <div className="caption_wide">
                  <h6>Applied at 20 Aug, 2020</h6>
                  <h6 className="d-flex justify-content-end">4:00 pm</h6>
                  <h2>Khibra job hunting jam </h2>
                  <a className="Remind_me">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    Remind me
                  </a>
                </div>
                <div className="caption_wide">
                  <h6>Applied at 20 Aug, 2020</h6>
                  <h6 className="d-flex justify-content-end">4:00 pm</h6>
                  <h2>Khibra job hunting jam </h2>
                  <a className="Remind_me_active">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    Remind me
                  </a>
                </div>
                <a
                  className="btn btn-primary-white   btn-lg"
                  href="#"
                  role="button"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dashboard;
