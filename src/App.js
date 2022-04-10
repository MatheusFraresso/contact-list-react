import { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import CreateUserForm from "./components/forms/CreateUserForm";

import api from "./api";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const updatedUsersList = (await api.get("/users")).data;
    setUsers(updatedUsersList);
  }
  const updateList = async () => {
    fetchUsers();
  };

  return (
    <div style={{ width: "1200px" }}>
      <div style={{ width: "400px", float: "left" }}>
        <UsersList users={users} updateList={updateList} />
      </div>

      <div style={{ width: "400px", float: "left" }}>
        <CreateUserForm actiontype="new" userCreated={updateList} />
      </div>
    </div>
  );
}

export default App;
