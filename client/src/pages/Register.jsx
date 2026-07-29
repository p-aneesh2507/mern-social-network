import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await API.post("/auth/register", formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }
    };

    return (

        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex justify-center items-center px-4">

            {/* Background */}

            <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>

            <div className="absolute w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-30 bottom-0 right-0 animate-pulse"></div>

            {/* Card */}

            <div className="relative z-10 w-full max-w-md">

                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8">

                    <h1 className="text-4xl font-extrabold text-center text-white">
                        SocialConnect
                    </h1>

                    <p className="text-center text-white/80 mt-2 mb-8">
                        Join the Community
                    </p>

                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        🚀 Create Account
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}

                        <div className="relative">

                            <FaUser className="absolute left-4 top-4 text-white/80" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="
                                w-full
                                pl-12
                                pr-4
                                py-3
                                rounded-xl
                                bg-white/20
                                text-white
                                placeholder-white/70
                                border
                                border-white/30
                                outline-none
                                focus:ring-2
                                focus:ring-white
                                "
                            />

                        </div>

                        {/* Email */}

                        <div className="relative">

                            <FaEnvelope className="absolute left-4 top-4 text-white/80" />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="
                                w-full
                                pl-12
                                pr-4
                                py-3
                                rounded-xl
                                bg-white/20
                                text-white
                                placeholder-white/70
                                border
                                border-white/30
                                outline-none
                                focus:ring-2
                                focus:ring-white
                                "
                            />

                        </div>

                        {/* Password */}

                        <div className="relative">

                            <FaLock className="absolute left-4 top-4 text-white/80" />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="
                                w-full
                                pl-12
                                pr-4
                                py-3
                                rounded-xl
                                bg-white/20
                                text-white
                                placeholder-white/70
                                border
                                border-white/30
                                outline-none
                                focus:ring-2
                                focus:ring-white
                                "
                            />

                        </div>

                        <button
                            type="submit"
                            className="
                            w-full
                            py-3
                            rounded-xl
                            bg-white
                            text-blue-700
                            font-bold
                            text-lg
                            hover:scale-105
                            transition
                            duration-300
                            shadow-lg
                            "
                        >
                            Create Account 🚀
                        </button>

                    </form>

                    <p className="text-center text-white mt-8">

                        Already have an account?

                        <Link
                            to="/login"
                            className="font-bold ml-2 hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </div>

                <p className="text-center text-white/70 mt-6 text-sm">
                    Made with ❤️ by Aneesh
                </p>

            </div>

        </div>

    );
}

export default Register;