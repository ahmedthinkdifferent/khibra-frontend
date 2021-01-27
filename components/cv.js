const CV = ({ user, hideSave }) => {
  const student = user || {};
  return (
    <div className="col-12">
      <div className="row  preview-cv">
        <div className="col-3 cv1-bg-left-side pt-2">
          <h4>
            {student?.firstName} {student?.lastName}
          </h4>
          <p>IT Manager</p>
          <h5 className="pl-2 pt-1 pb-1">Personal Information</h5>
          <h6>Address</h6>
          <p>{student.personalInformation?.address}</p>
          <h6>Phone</h6>
          <p>{student?.phone}</p>
          <h6>Email</h6>
          <p>{student?.universityEmail}</p>
          <h6>Linkedin</h6>
          <p>Linkedin</p>
          <h5 className="pl-2 pt-1 pb-1">Skills</h5>
          {student.cv?.skills?.map((skill) => (
            <p key={skill.id}>{skill.skill.name}</p>
          ))}
          <h5 className="pl-2 pt-1 pb-1">Languages</h5>
          {student.cv?.languages?.map((lang) => (
            <p key={lang.id}>{lang.language?.name}</p>
          ))}
        </div>
        <div className="col-9 pl-1 pt-2  cv1-bg-right-side">
          {student.cv?.objective && <p className="black">{student.cv?.objective.objective}</p>}
          {student.cv?.experiences && (
            <>
              <hr /> <h5 className="p-2 pl-3">Experience</h5>
            </>
          )}
          {student.cv?.experiences?.map((exp) => (
            <div key={exp.id} className="col-12">
              <div className="row">
                <div className="col-4">
                  <p>{exp.startDate + " " + exp.endDate}</p>
                </div>
                <div className="col-8">
                  <h5>{exp.jobTitle}</h5>
                  <h5>{exp.employer}</h5>
                </div>
              </div>
              <hr />
            </div>
          ))}
          {student.cv?.educations && <hr />}
          {student.cv?.educations && <h5 className="p-2 pl-3">Education</h5>}
          {student.cv?.educations?.map((edu) => (
            <div key={edu.id} className="col-12">
              <div className="row">
                <div className="col-4">
                  <p>{edu.fromDate}</p>
                </div>
                <div className="col-8">
                  <h5>{edu.degree}</h5>
                </div>
              </div>
              <hr />
            </div>
          ))}
          {student.cv?.courses && <hr />}
          {student.cv?.courses && <h5 className="p-2 pl-3">Activities</h5>}
          {student.cv?.courses?.map((course) => (
            <div key={course.id} className="col-12">
              <div className="row">
                <div className="col-4">
                  <p>{course.startDate+" "+course.endDate}</p>
                </div>
                <div className="col-8">
                  <h5>{course.name}</h5>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {!hideSave && (
        <div className="d-flex flex-column mt-4 justify=content-center align-items-center">
          <a className="kh-btn kh-btn-big mt-4 white">
            Save and Continue Later
          </a>

          <a className="mt-2">Exit without saving</a>
        </div>
      )}
    </div>
  );
};

export default CV;
