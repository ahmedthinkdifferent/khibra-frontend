import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/common/loading";
import Layout from "../components/layout";
import AuthService from "../network/auth-service";
import Http from "../network/http-service";
import { useRouter } from 'next/router';

const cvTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrMsg, setServerErrMsg] = useState("");
  const userRef = useRef({});
  const router = useRouter();


  async function createCv() {
    setLoading(true);
    setServerErrMsg("");
    Http.send({
      url: "v1/cv",
      method: "POST",
      body: {
        templateId: 1,
      },
    })
      .then((res) => {
        setLoading(false);
        userRef.current.cv = res.data.cv;
        AuthService.setUserDataToLocalStorage(userRef.current);
        AuthService.setUserDataToSessionStorage(userRef.current);
        router.push('/student-personal-information');
      })
      .catch((e) => {
        setLoading(false);
        setServerErrMsg(e.message);
      });
  }

  useEffect(() => {
    userRef.current = AuthService.getUserData();
  }, []);

  return (
    <Layout pageTitle="home">
      <main className="mt-4 mb-4 d-flex flex-row justify-content-center align-items-center cv-select-content">
        <div className="mr-4">
          <img src="/assets/resumeartwork.png" />
        </div>
        <div className="d-flex flex-column ml-4">
          <h1 className="blue">
            Create beautiful, professional resumes in minutes, for free.
          </h1>
          <p className="gray">
            A wide range of templates to choose from. Select a template to get
            started.
          </p>
        </div>
      </main>
      <main className="mt-4 d-flex justify-content-center template-categories">
        <div>All</div>
        <div className="selected">Creative</div>
        <div>Business</div>
        <div>Operations</div>
      </main>
      <main className="p-4 bg-babyblue logo-pattern d-flex flex-column">
      <div className="col row justify-content-center align-items-center">
          {loading && <Loading />}
          {serverErrMsg && (
            <div className="alert alert-danger">{serverErrMsg}</div>
          )}
        </div>
        <div className="col row justify-content-center align-items-center">
          <div>
            <img
              src="/assets/arrow-forward-circle-sharp-copy.png"
              className="m-2"
            />
          </div>
          <div>
            <img src="/assets/cv-temp-1.png" className="m-2" />
          </div>
          <div>
            <a>
              <img
                src="/assets/cv-temp-2.png"
                className="m-2 template-img"
                onClick={createCv}
              />
            </a>
          </div>
          <div>
            <img src="/assets/cv-temp-1.png" className="m-2" />
          </div>
          <div>
            <img src="/assets/cv-temp-1.png" className="m-2" />
          </div>
          <div>
            <img src="/assets/arrow-forward-circle-sharp.png" className="m-2" />
          </div>
        </div>
      </main>
      <main className="bg-babyblue p-4">
        <div className="container footer d-flex flex-column m-4">
          <p className="gray m-4">Khibra © 2020. All rights reserved</p>
        </div>
      </main>
    </Layout>
  );
};

export default cvTemplate;
