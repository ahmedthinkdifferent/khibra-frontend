import Layout from "../components/layout";
import Link from "next/link";

const profile = () => {
  return (
    <Layout pageTitle="profile">
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
              <img className="mr-3" src="/assets/jobs.svg" />
              <a className="gray">
                <Link href="/job-post">Jobs</Link>
              </a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/msg.svg" />
              <a className="gray">Messaging</a>
            </div>
            <div className="side-menu-item d-flex flex-row justify-content-start mb-4 pl-4 align-items-center">
              <img className="mr-3" src="/assets/company-profile-blue.svg" />
              <a className="blue">Company Profile</a>
            </div>
          </div>
          <div style={{ width: "83%" }}>
            <div className="jumbotron">
              <div className="container">
                <div className="d-flex mb-4 flex-row justify-content-start align-items-center">
                  <div className="logo-container mr-4"></div>
                  <div className="d-flex flex-column">
                    <div className="company-title">Google</div>
                    <div className="company-major">Internet and software</div>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="h-tab selected">About</div>
                  <div className="h-tab">Posted jobs</div>
                  <div className="h-tab">Locations</div>
                </div>
              </div>
              <div className="container">
                <div className="d-flex flex-row">
                  <div style={{ width: "50%" }} className=" block-bg-w mr-4">
                    <a
                      className="btn btn-primary Rectangle_info icon"
                      href="#"
                      role="button"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                    <br />
                    <h6 className="Card_title">About us</h6>
                    <p className="Card_body">
                      Google’s mission is to organize the world‘s information
                      and make it universally accessible and useful. In 1998, we
                      started with two computer science students in a university
                      dorm room and now have thousands of employees in offices
                      around the world. A lot has changed since the first Google
                      search engine appeared. But some things haven’t changed:
                      our dedication to our users and our belief in the
                      possibilities of the Internet itself. To learn more about
                      our job opportunities, offices, teams and workplace
                      culture, visit careers.google.com.
                    </p>
                  </div>

                  <div style={{ width: "50%" }} className="d-flex flex-column">
                    <div className="d-flex flex-column mb-1 block-bg-w">
                      <a
                        className="btn btn-primary Rectangle_info icon"
                        href="#"
                        role="button"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </a>

                      <div className="d-flex flex-row">
                        <div style={{ width: "50%" }} className="mr-4">
                          <h6 className="Card_title">Headquarters</h6>
                          <p className="Card_body" style={{ fontSize: "14px" }}>
                            Mountain View, California, United States
                          </p>
                        </div>
                        <div style={{ width: "50%" }}>
                          <h6 className="Card_title">Employees</h6>
                          <p className="Card_body" style={{ fontSize: "14px" }}>
                            10,000+
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-row block-bg-w">
                      <div
                        style={{ width: "100%" }}
                        className="d-flex flex-column"
                      >
                        <h6 className="Card_title">Web site</h6>
                        <div className="social-link mb-4">
                          https://about.google
                        </div>
                        <div className="d-flex flex-row mb-2">
                          <div
                            style={{ width: "50%" }}
                            className="mr-4 d-flex flex-row align-items-center justify-content-start"
                          >
                            <div className="avatar-img mr-2"></div>
                            <div className="social-link">
                              www.facebook.com/google
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center justify-content-start">
                            <div className="avatar-img mr-2"></div>
                            <div className="social-link">
                              www.youtube.com/google
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div
                            style={{ width: "50%" }}
                            className="mr-4 d-flex flex-row align-items-center justify-content-start"
                          >
                            <div className="avatar-img mr-2"></div>
                            <div className="social-link">
                              www.twitter.com/google
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center justify-content-start">
                            <div className="avatar-img mr-2"></div>
                            <div className="social-link">
                              www.instagram.com/google
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="d-flex flex-row">
                  <div style={{ width: "100%" }} className=" block-bg-w">
                    <a
                      className="btn btn-primary Rectangle_info icon"
                      href="#"
                      role="button"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                    <br />
                    <h6 className="Card_title">Photos</h6>
                    <div className="Card_body d-flex flex-row justify-content-center align-items-center ">
                      <div className="m-1 company-photo"></div>
                      <div className="m-1 company-photo"></div>
                      <div className="m-1 company-photo"></div>
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
