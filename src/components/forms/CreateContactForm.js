import React, { useRef, useState } from "react";
import CreateContactForm from "./CreateContactForm";

import api from "../../api";

function CreateUserForm({ actionType, user, contactCreated, contact }) {
  const name = useRef();
  const type = useRef();
  const value = useRef();

  const [contacts, setContacts] = useState([]);
  const [addContact, setAddContact] = useState(false);

  function clearFields() {
    name.current.value = "";
    type.current.value = "";
    value.current.value = "";
  }

  const saveContact = async () => {
    const contact = {
      name: name.current.value,
      type: type.current.value,
      value: value.current.value,
    };
    await api.post(`users/${user._id}/contacts`, { contacts: [contact] });

    contactCreated();
    clearFields();
  };

  const editContact = async () => {
    const contact = {
      name: name.current.value || undefined,
      type: type.current.value || undefined,
      value: value.current.value || undefined,
    };
    await api.patch(`/contacts`, contact);

    contactCreated();
    clearFields();
  };

  return (
    <div style={{ display: "block", paddingLeft: "30px" }}>
      <p>
        <input
          type="text"
          placeholder={contact ? contact.name : "name"}
          ref={name}
        ></input>
      </p>
      <p>
        <select ref={type}>
          <option value="telphone">Telephone</option>
          <option value="whatsapp">Whatsapp</option>
          <option value="email">Email</option>
        </select>
      </p>
      <p>
        <input
          type="email"
          placeholder={contact ? contact.value : "value"}
          ref={value}
        ></input>
      </p>

      <p>
        <button onClick={actionType === "new" ? saveContact : editContact}>
          {actionType === "edit" ? "Edit Contact" : "Create Contact"}{" "}
        </button>
      </p>
    </div>
  );
}

export default CreateUserForm;
