import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react';
function UserDetail({ users }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        const res = users.find((user) => user.id == id);
        setUser(res);
    }
    useEffect(() => {
        fetchUser();
    }, [])
    if (!user) return (
        <div className='w-full h-full flex justify-between items-center'>
            <p className='gap-2 flex'>
                <Loader2 className='animate-spin ' />
                <span>Loading...</span>
            </p>

        </div>
    )
    return (
        <div>
            <Link to={"/"}>
                <ArrowLeft />
            </Link>
            <div className="border border-black p-2 my-2 mx-2">
                <h3 className='text-2xl'>{user.name}</h3>
                {user.username && (<p><span className='font-bold text-lg'>Username:</span> {user.username}</p>)}
                <p><span className='font-bold text-lg'>Email:</span> {user.email}</p>{
                    user.address && (
                        <p><span className='font-bold text-lg'>Address:</span> {user.address?.suite}, {user.address?.street}, {user.address?.city} - ({user.address?.zipcode})</p>)}
            </div>
        </div>
    )
}

export default UserDetail
