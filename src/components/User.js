import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import CreateContactForm from "../components/forms/CreateContactForm";

export default function UsersList({ user, requisitionMade }) {
  const name = useRef();
  const email = useRef();

  const [contacts, setContacts] = useState([]);

  const [editContact, setEditContact] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const updatedContactsList = await (
      await api.get(`/users/${user._id}/contacts`)
    ).data;
    setContacts(updatedContactsList);
  }

  const removeUser = async (_id) => {
    await api.delete(`/users/${user._id}`);
    requisitionMade();
  };

  const editUser = async (_id) => {
    console.log(_id);
    user = {
      name: name.current.value || undefined,
      email: email.current.value || undefined,
    };
    await api.patch(`/users/${_id}`, user);
    requisitionMade();
  };

  const updateContactList = async () => {
    fetchContacts();
  };

  const removeContact = async (_id) => {
    await api.delete(`/contacts/${_id}`);
    fetchContacts();
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ marginBottom: "40px" }}>
        <p>
          <label htmlFor={`${user.name}-${user._id}`}>Name</label>{" "}
        </p>
        <p>
          <input
            id={`${user.name}-${user._id}`}
            placeholder={user.name}
            tex={user.name}
            ref={name}
          ></input>
        </p>
        <p>
          <label htmlFor={`${user.emai}-${user._id}`}>Email</label>
        </p>
        <p>
          <input
            id={`${user.email}-${user._id}`}
            placeholder={user.email}
            ref={email}
          ></input>
        </p>

        <button
          style={{ marginLeft: "20px" }}
          onClick={() => removeUser(user._id)}
        >
          Remove
        </button>

        <button
          style={{ marginLeft: "20px" }}
          onClick={() => editUser(user._id)}
        >
          Edit
        </button>

        <CreateContactForm
          actiontype="new"
          user={user}
          contactCreated={updateContactList}
        />
      </div>
      {contacts.length > 0 && (
        <>
          <h3>
            User <strong>{user.name}</strong> contact List{" "}
          </h3>
          <table style={{ marginBottom: "20px", marginLeft: "20px" }}>
            <tbody>
              <tr>
                <th style={{ paddingLeft: "30px" }}>Name</th>
                <th style={{ paddingLeft: "30px" }}>Type</th>
                <th style={{ paddingLeft: "30px" }}>Value</th>
                <th style={{ paddingLeft: "30px" }}>Actions</th>
              </tr>
              {contacts.map((contact) => {
                let editContact = false;
                return (
                  <>
                    <tr>
                      <td style={{ paddingLeft: "30px" }}> {contact.name}</td>
                      <td style={{ paddingLeft: "30px" }}>{contact.type}</td>
                      <td style={{ paddingLeft: "30px" }}>{contact.value}</td>
                      <td style={{ paddingLeft: "30px" }}>
                        <button onClick={() => removeContact(contact._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                    {editContact === contact._id && (
                      <CreateContactForm
                        actiontype="edit"
                        user={user}
                        contactCreated={updateContactList}
                        contact={contact}
                      />
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <hr
        style={{
          borderTop: "2px solid #bbb",
          borderRadius: "5px",
        }}
      ></hr>
    </div>
  );
}
