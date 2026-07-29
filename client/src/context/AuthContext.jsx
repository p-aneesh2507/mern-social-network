import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

        setLoading(false);

    }, []);

    // Login
    const login = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

    };

    // Update user after editing profile
    const updateUser = (updatedUser) => {

        setUser(updatedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};