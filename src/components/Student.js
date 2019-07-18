import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents, fetchSchools } from '../store/store';

const _Product = ({ student, selectedSchool }) => {
  if (!student){
    return null;
  }
  return (
    <div>
        <h2>{ student[0].firstName }{ student[0].lastName }</h2>
        <img src = {selectedSchool[0].imageURL} />
        <p>GPA: {student[0].GPA}</p>
    </div>
  );
};

const mapStateToProps = ({ students, schools }, { match }) => {
  const student = students.studentsList.filter(stud => stud.id === match.params.id);
  const selectedSchool = schools.schoolsList.filter( school => {
      console.log("selectedSchool student",student)
      if (school.id === student[0].schoolId) {
        return school
      }
  })
  console.log("mapStateToProps", student)
  return {
    student,
    students,
    schools,
    selectedSchool
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: () => {
            dispatch(fetchStudents());
            dispatch(fetchSchools());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Product);
