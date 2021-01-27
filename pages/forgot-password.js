import Link from "next/link";
import Layout from "../components/layout";
import GuestGuard from "../components/guards/guest-guard";
import { useFormik } from "formik";
import { useState } from "react";
import Http from "../network/http-service";
import * as Yup from "yup";
import Loading from "../components/common/loading";
import { useRouter } from "next/router";

function ForgotPassword() {
  // set loading state , init validation form.
  const [info, setInfo] = useState({
    loading: false,
    error: null,
  });

  const router = useRouter();

  const formik = useFormik({
    validateOnChange:false,
    validateOnChange:false,
    initialValues: {
      email: "",
    },
    // We used Yup here.
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,'Please enter valid email address')
        .required("Please enter your email"),
    }),
    async onSubmit(values) {
      // call web service.
      setInfo({
        loading: true,
        error: null,
      });
      try {
        const response = await Http.send({
          url: "v1/users/forget_password",
          method: "POST",
          body: {
            email: formik.values.email,
          },
        });
        setInfo({
          loading: false,
          error: null,
        });
        await router.push({
          pathname: "/password-verification",
          query: {
            email: values.email,
          },
        });
      } catch (e) {
        setInfo({
          loading: false,
          error: e.message,
        });
      }
    },
  });

  return (
    <GuestGuard>
      <Layout pageTitle="forgot password">
        <div className="d-flex flex-row justify-content-left align-items-top">
          <div className="side-image" />
          <div className="login-content">
            <div>
              <img src="/assets/logo.svg" />
            </div>
            <h1 className="mt-4">Forgot your password</h1>
            <p>
              Fill in your university email or back up email and we will send a
              reset password link to your email.
            </p>
            <form
              className="form signin-form d-flex flex-column justify-content-between"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="form-control"
                    id="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div className="form-group">
                  {formik.errors && formik.errors.email && (
                    <div className=" alert alert-danger">
                      {formik.errors.email}
                    </div>
                  )}
                  {info.error && (
                    <div className=" alert alert-danger">{info.error}</div>
                  )}
                </div>
                <div className="row mt-4">
                  {info.loading && <Loading />}
                  <button
                    disabled={info.loading}
                    type="submit"
                    className="btn ml-3 mr-3 mt-4 mb-4"
                  >
                    Send reset link
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="Or-login-with mt-4">OR LOGIN WITH</div>
                <div className="hr-login-with" />
              </div>
              <div className="mt-4 d-flex flex-row justify-content-center pt-4">
                <div className="social-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                  <img src="/assets/002-google.png" className="mr-4" />
                  Google
                </div>
                <div className="social-btn d-flex flex-row justify-content-center align-items-center mr-4 ml-4">
                  <img
                    src="/assets/001-linked-in-logo-of-two-letters.png"
                    className="mr-4"
                  />
                  Linkedin
                </div>
              </div>
              <div className="gray mt-4 d-flex flex-row justify-content-center pt-4 ">
                Already have Khibra account?{" "}
                <Link href="/login">
                  <a className="text-style-1 ml-2">Login now</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </GuestGuard>
  );
}

export default ForgotPassword;
