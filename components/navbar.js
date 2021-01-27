import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "../network/auth-service";
import LoginService from "../screens/login/login-service";
import userTypes from "./../shared/user-types";

const NavBar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = AuthService.getUserData();
    setUserData(data);
  }, []);

  const handleLogout = () => {
    debugger
    const isLoggedOut = LoginService.logout();
    if (isLoggedOut) {
      setUserData({});
      router.push("/");
    }
  };

  return (
    <>
      {userData?.token &&
        ((userData?.email && userData.type == userTypes.company) ||
          userData.type == userTypes.university ||
          (userData.student?.firstName &&
            userData.type == userTypes.student)) && (
          <header>
            <main>
              <div className="nav-head d-flex bd-highlight align-items-center">
                {userData.type == userTypes.student && (
                    <Link href="/">
                      <img className="ml-4" src="/assets/logo2.svg" />
                    </Link>
                )}
                {userData.type == userTypes.company && (
                    <Link href="/company-profile" passHref>
                     <a style={{ width: "15%" }}>  <img className="ml-4" src="/assets/logo-small.svg" /></a>
                    </Link>
                )}

                <div className="mr-2 d-flex bd-highlight ml-auto align-items-center">
                  <div className="avatar-img mr-2"></div>
                  <span className="mr-4">
                    {userData.type == userTypes.student
                      ? userData.student.firstName
                      : userData.email}
                  </span>
                  <div className="mr-4 round-border">
                    <img src="/assets/new-notification-icon.png" />
                  </div>
                  <div className="mr-4 round-border">
                    <img src="/assets/search.png" />
                  </div>
                  <div className="dropdown round-border bg-babyblue mr-4">
                    <a
                      className="dropdown-toggle white"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-angle-down m-2 blue"></i>
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div className="dropdown-item">
                        <Link
                          href={
                            userTypes.student == userData.type
                              ? "/student-dashboard"
                              : "/company-dashboard"
                          } ><a>Dashboard</a></Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          href={
                            userTypes.student == userData.type
                              ? "/student-profile"
                              : "/company-profile"
                          } ><a>Profile</a></Link>
                      </div>
                      <a className="dropdown-item blue" onClick={handleLogout}>
                        <i className="fa fa-sign-out mr-2"></i>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </header>
        )}
    </>
  );
};

export default NavBar;
