import React from "react";
import User from "./User";

export default function UsersList({ users, updateList }) {
  const userRemoved = () => {
    updateList();
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2>Users List </h2>
      {users &&
        users.map((user) => {
          return (
            <User key={user._id} user={user} requisitionMade={userRemoved} />
          );
        })}
    </div>
  );
}
