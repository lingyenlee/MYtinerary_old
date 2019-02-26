import React from "react";

const Input = props => {
  return (
    <div className="form-group">
      <label className="signUp-input-label" htmlFor={props.name}>
        {props.title}
      </label>
      <input
        className="form-control"
        //   id={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        name={props.name}
      />
    </div>
  );
};

export default Input;
