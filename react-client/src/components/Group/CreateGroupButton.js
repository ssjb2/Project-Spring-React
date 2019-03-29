import React from "react";
import { Link } from "react-router-dom";
const CreateGroupButton = () => {
  return (
    <React.Fragment>
      <Link to="/addGroup" className="btn btn-lg btn-info">
        Create a Group
      </Link>
    </React.Fragment>
  );
};
export default CreateGroupButton;
