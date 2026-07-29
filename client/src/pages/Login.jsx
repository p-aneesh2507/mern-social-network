import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
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
            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            login(response.data.user);

            navigate("/home");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center px-4">

            {/* Background Blur Circles */}

            <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>

            <div className="absolute w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-30 bottom-0 right-0 animate-pulse"></div>

            {/* Login Card */}

            <div className="relative z-10 w-full max-w-md">

                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8">

                    <h1 className="text-4xl font-extrabold text-center text-white">
                        SocialConnect
                    </h1>

                    <p className="text-center text-white/80 mt-2 mb-8">
                        Connect • Share • Inspire
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        👋 Welcome Back
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

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

                        <div className="text-right">

                            <button
                                type="button"
                                className="text-white text-sm hover:underline"
                            >
                                Forgot Password?
                            </button>

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
                            Continue →
                        </button>

                    </form>

                    <p className="text-center text-white mt-8">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="font-bold ml-2 hover:underline"
                        >
                            Register
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

export default Login;