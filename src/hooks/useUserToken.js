import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function useUserToken() {
	const { userData: user } = useContext(UserContext);

	return user.token;
}
