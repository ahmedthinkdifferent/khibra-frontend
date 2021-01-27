import Layout from "../components/layout";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const router = useRouter();

  const selectCVTemplate = () => {
    router.push("/select-cv-template");
  };

  return (
    <Layout pageTitle="home">
      <main className="bg-babyblue d-flex flex-column justify-content-center align-items-center">
        <h1
          className="blue"
          style={{ textAlign: "center", marginTop: "100px" }}
        >
          Congratulations on applying to the job!{" "}
        </h1>
        <img src="/assets/undraw-high-five-u-364-2.png" />
        <h1 style={{ textAlign: "center", fontSize: "26px" }}>
          Employers are eager to meet you!{" "}
        </h1>
        <button
          className="kh-btn kh-btn-big mt-4"
          type="button"
          onClick={()=>router.push("/browse-jobs")}
          value="Browse jobs"
        >
          Browse jobs
        </button>
        <Link href="/student-dashboard"><a className="mt-2">Skip for now</a></Link>

        <img className="tiangle-bottom" src="/assets/fill-4.png" />
      </main>
    </Layout>
  );
};

export default Index;
