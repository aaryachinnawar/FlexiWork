import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        freelancer: null,
        client: null,
        token: "",
    });
    axios.defaults.headers.common['Authorization'] = auth?.token
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                client: parseData.client || null,
                freelancer: parseData.freelancer || null,
                token: parseData.token,
            });
        }
    }, []);

     useEffect(() => {
        if (auth?.token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [auth.token]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
