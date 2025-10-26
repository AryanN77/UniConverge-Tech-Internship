import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

function SearchBar() {
    const [users, setUsers] = useState([]);
    async function getUsers() {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        const apiData = res.data;
        const saved = localStorage.getItem("users");
        const existing = saved ? JSON.parse(saved) : [];

        const combined = [...apiData, ...existing];

        setUsers(combined);
    }
    const [search, setSearch] = useState("");
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="relative w-full sm:w-64">
            <input
                type="text"
                placeholder="Search by name or email..."
                className="border p-2 rounded w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* 🔽 Dropdown */}
            {searchQuery && (
                <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow-md z-10 max-h-60 overflow-auto">
                    {filtered.length > 0 ? (
                        filtered.map((user, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectUser(index)}
                            >
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500 text-sm">No results found</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default SearchBar
