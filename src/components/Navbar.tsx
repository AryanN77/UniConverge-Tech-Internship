import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ users, searchQuery, setSearchQuery }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [filtered, setFiltered] = useState([]);

    const showSearch = location.pathname !== "/add-user"; // hide search on Add User page

    // filter users as you type
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFiltered([]);
            return;
        }

        const results = users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFiltered(results);
    }, [searchQuery, users]);

    // navigate when user clicked in dropdown
    const handleSelectUser = (index) => {
        setSearchQuery("");
        setFiltered([]);
        navigate(`/user/${index}`);
    };

    return (
        <nav className="relative p-4 bg-gray-100 flex flex-col md:flex-row sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="items-center gap-4 hidden md:flex">
                <Link to="/" className="font-bold text-lg text-blue-500">
                    UniConverge
                </Link>
            </div>

            {showSearch && (
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="border p-2 rounded w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* 🔽 Dropdown */}
                    {filtered.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow-md z-10 max-h-60 overflow-auto">
                            {filtered.map((user, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectUser(index)}
                                >
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <div className="">
                <Link to="/addUser" className="text-blue-600 hover:underline">
                    Add User
                </Link>
            </div>
        </nav>
    );
}
