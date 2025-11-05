import React, { useState } from "react";
import "./UserForm.css";

function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="form-container">
      <div className="form-image"></div>
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>User Information</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="age" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="height" placeholder="Height (cm)" onChange={handleChange} />
        <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
        <select name="activity" onChange={handleChange}>
          <option value="">Activity Level</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
