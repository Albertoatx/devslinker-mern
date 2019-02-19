/* CONVERT IT to a Functional component  ********************************************
/* (because ListEducation doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = (props) => {

  // dashboard passes 'educations' array and 'deleteEdu' fn in the 'props' to this component 
  const { educations, deleteEdu } = props;

  const educationList = educations.map(education => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td>{education.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{education.from}</Moment> - {}
        {education.to === null ? (
          'Now'
        ) : (
            <Moment format="YYYY/MM/DD">{education.to}</Moment>
          )}
      </td>
      <td>
        {/* Wrap 'onDeleteClick' inside a function to keep it from going off automatically */}
        <button
          onClick={() => deleteEdu(education._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const educationResults = educations.length ? (
    <table className="table">
      <thead>
        <tr>
          <th>School</th>
          <th>Degree</th>
          <th>Years</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {educationList}
      </tbody>
    </table>
  ) : (
      <h6 className="text-danger">You have no Education registered!</h6>
    )

  return (
    <div>
      <br />
      <h4 className="mb-4">Education Credentials</h4>
      {educationResults}
    </div>
  )

  // return (
  //   <div>
  //     <h4 className="mb-4">Education Credentials</h4>
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th>School</th>
  //           <th>Degree</th>
  //           <th>Years</th>
  //           <th />
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {educationList}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

Education.propTypes = {
  deleteEdu: PropTypes.func.isRequired
}


export default Education;