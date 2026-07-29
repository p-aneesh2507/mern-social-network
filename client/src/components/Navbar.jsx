import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import UserSearch from "./UserSearch";

import {
    FaHome,
    FaBell,
    FaComments,
    FaUser,
    FaSignOutAlt,
    FaChevronDown
} from "react-icons/fa";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const menuRef = useRef();

    useEffect(() => {

        function closeMenu(e) {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {

                setOpen(false);

            }

        }

        document.addEventListener("mousedown", closeMenu);

        return () =>
            document.removeEventListener(
                "mousedown",
                closeMenu
            );

    }, []);

    return (

        <nav
            className="
            sticky
            top-0
            z-50
            backdrop-blur-xl
            bg-white/80
            border-b
            border-gray-200
            px-10
            py-3
            flex
            justify-between
            items-center
            shadow-sm
        "
        >

            {/* Logo */}

            <Link
                to="/home"
                className="
                text-3xl
                font-extrabold
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent
                "
            >
                SocialConnect
            </Link>

            {/* Center */}

            <div className="w-[380px]">

                <UserSearch />

            </div>

            {/* Right */}

            <div
                className="
                flex
                items-center
                gap-6
                "
            >

                <Link
                    to="/home"
                    className="
                    text-gray-600
                    hover:text-blue-600
                    text-xl
                    transition
                    "
                >
                    <FaHome />
                </Link>

                <button
                    className="
                    text-gray-600
                    hover:text-blue-600
                    text-xl
                    transition
                    relative
                    "
                >
                    <FaBell />

                    <span
                        className="
                        absolute
                        -top-2
                        -right-2
                        bg-red-500
                        text-white
                        text-xs
                        rounded-full
                        w-5
                        h-5
                        flex
                        items-center
                        justify-center
                        "
                    >
                        0
                    </span>

                </button>

                <button
                    className="
                    text-gray-600
                    hover:text-blue-600
                    text-xl
                    transition
                    "
                >
                    <FaComments />
                </button>

                {/* Profile */}

                <div
                    className="relative"
                    ref={menuRef}
                >

                    <button

                        onClick={() => setOpen(!open)}

                        className="
                        flex
                        items-center
                        gap-3
                        hover:bg-gray-100
                        rounded-full
                        px-3
                        py-2
                        transition
                        "

                    >

                        <div
                            className="
                            w-11
                            h-11
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            "
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <span
                            className="
                            font-semibold
                            text-gray-700
                            "
                        >
                            {user.name}
                        </span>

                        <FaChevronDown />

                    </button>

                    {

                        open &&

                        <div
                            className="
                            absolute
                            right-0
                            mt-4
                            w-56
                            rounded-2xl
                            bg-white
                            shadow-xl
                            border
                            overflow-hidden
                            animate-fade
                            "
                        >

                            <Link

                                to="/profile"

                                className="
                                flex
                                items-center
                                gap-3
                                px-5
                                py-4
                                hover:bg-gray-100
                                "

                            >

                                <FaUser />

                                Profile

                            </Link>

                            <button

                                onClick={logout}

                                className="
                                flex
                                items-center
                                gap-3
                                w-full
                                px-5
                                py-4
                                text-red-500
                                hover:bg-red-50
                                "

                            >

                                <FaSignOutAlt />

                                Logout

                            </button>

                        </div>

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;