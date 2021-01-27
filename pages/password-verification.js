import { useRouter } from "next/router";
import MustBeGuestGuard from "./../components/guards/guest-guard";
import Layout from "../components/layout";
import Loading from "../components/common/loading";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Http from "./../network/http-service";
import FormikInput from "../components/common/formik-input";

export default function PasswordVerification() {
  const [info, setInfo] = useState({
    loading: false,
    error: null,
  });

  const router = useRouter();
  const userEmail = router.query.email;
  useEffect(function () {
    if (!userEmail) {
      router.replace("/login");
    }
  }, []);

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

  return (
    <MustBeGuestGuard>
      <Layout pageTitle="password-verification">
        <div className="d-flex flex-row justify-content-left align-items-top">
          <div className="side-image" />
          <div className="login-content">
            <div>
              <img src="/assets/logo.svg" />
            </div>
            <h1 className="mt-4">Recover your account</h1>
            <p>
              Enter verification code we sent for you to recover your email.
            </p>
            <form
              className="form signin-form d-flex flex-column justify-content-between"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div>
                <div className="form-group mb-2">
                  <FormikInput
                    type="text"
                    placeholder="Verification code"
                    className="form-control"
                    name="verificationCode"
                    formik={formik}
                  />
                </div>
                <div className="form-group mb-2">
                  <FormikInput
                    type="text"
                    placeholder="New Password"
                    className="form-control"
                    formik={formik}
                    name="newPassword"
                  />
                </div>
                <div className="form-group mb-2">
                  <FormikInput
                    type="text"
                    placeholder="Retype Password"
                    className="form-control"
                    formik={formik}
                    name="retypedPassword"
                  />
                  {info.error && <div className='alert alert-danger'>{info.error}</div>}
                </div>
                <div className="row mt-4">
                  {info.loading && <Loading />}
                  <button
                    disabled={info.loading}
                    type="submit"
                    className="btn ml-3 mr-3 mt-4 mb-4" >
                    Recover Password
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
    </MustBeGuestGuard>
  );
}
