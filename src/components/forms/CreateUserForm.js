import React, { useRef, useState } from "react";
import CreateContactForm from "./CreateContactForm";

import api from "../../api";

function CreateUserForm({ actionType, user, userCreated }) {
  const name = useRef();
  const email = useRef();


  function clearFields() {
    name.current.value = "";
    email.current.value = "";
  }

  const saveUser = async () => {
    const user = {
      name: name.current.value,
      email: email.current.value,
    };
    await api.post("users", user);

    userCreated();
    clearFields();
  };


  return (
    <div style={{ display: "block" }}>
      <h2>Create User</h2>

      <p>
        <input type="text" placeholder="name" ref={name}></input>
      </p>
      <p>
        <input type="email" placeholder="email" ref={email}></input>
      </p>

      <p>
        <button onClick={saveUser}>
          {actionType === "edit" ? "Edit User" : "Create User"}{" "}
        </button>
      </p>
    </div>
  );
}

export default CreateUserForm;
