import { createContext, useReducer } from "react";
import reducer from "./reducer";

const token = JSON.parse(localStorage.getItem("token")) || undefined;

const initState = {
    token: token,
    user: token ? true : false,
};

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}
