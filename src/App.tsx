import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home.tsx"
import UserDetail from "./components/UserDetail.tsx"
import AddUser from "./components/AddUser.tsx"
import Navbar from "./components/Navbar.tsx"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const apiData = res.data;
    const saved = localStorage.getItem("users");
    const existing = saved ? JSON.parse(saved) : [];

    const combined = [...apiData, ...existing];

    setUsers(combined);
  }
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getUsers();
  }, [users])
  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Navbar
          users={users}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route path="/" element={<Home users={users} />} />
          <Route path="/user/:id" element={<UserDetail users={users} />} />
          <Route path="/addUser" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
