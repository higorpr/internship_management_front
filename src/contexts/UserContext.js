import { createContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
	const [userData, setUserData] = useLocalStorage("userData", {});

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
}
