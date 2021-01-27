import Layout from "../components/layout";
// import { useRouter } from "next/router";
import CV from "../components/cv";
import { useEffect, useState } from "react";
import Link from "next/link";
import SessionService from "../network/sesssion-service";

const Index = () => {
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    let userData = SessionService.getStudentData();
    setStudentData(userData);
  }, []);

  return (
    <Layout pageTitle="home">
      <main className="bg-babyblue d-flex flex-column justify-content-center align-items-center">
        <h1
          className="blue"
          style={{ textAlign: "center", marginTop: "100px" }}
        >
          Your resume is ready!
        </h1>

        <p className="gray" style={{ textAlign: "center", fontSize: "14px" }}>
          Land an internship or entry-level job at a cutting edge startup,
          Fortune 500, or anything in between. Start Applying Now.
        </p>
        <a className="kh-btn kh-btn-big mt-4 white">
          <Link href="/browse-jobs">Browse Jobs</Link>
        </a>

        <button
          className="kh-btn-outine kh-btn-big mt-4"
          type="button"
          value="Browse Jobs"
        >
          Download Your CV
        </button>

        <a className="mt-2 gray mt-2">share</a>
        <div className="mt-4" style={{ width: "800px" }}>
          <CV hideSave="true" user={studentData}></CV>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
