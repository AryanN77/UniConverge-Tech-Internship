import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AddUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });
    const [users, setUsers] = useState([]);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Invalid email";
        if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Phone must be 10 digits";
        if (!formData.company.trim()) newErrors.company = "Company is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const saved = localStorage.getItem("users");
        const existing = saved ? JSON.parse(saved) : [];
        const newUser = { id: uuidv4(), ...formData }

        const updated = [...existing, newUser]

        setUsers(updated);
        localStorage.setItem("users", JSON.stringify(updated));
        navigate("/");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add User</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                {["name", "email", "phone", "company"].map((field) => (
                    <div key={field}>
                        <label className="block font-medium capitalize">{field}</label>
                        <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            className="border p-2 w-full rounded"
                            value={formData[field]}
                            onChange={handleChange}
                        />
                        {errors[field] && (
                            <p className="text-red-600 text-sm">{errors[field]}</p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save User
                </button>
            </form>
        </div>
    )
}

export default AddUser
