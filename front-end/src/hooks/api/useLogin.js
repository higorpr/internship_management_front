import { authApi } from "../../services/authApi";
import UseAsync from "../UseAsync";

export default function useLogin() {
	const {
		data: loginData,
		loading: loginLoading,
		error: loginError,
		act: login,
	} = UseAsync(authApi.login, false);

	return {
		loginData,
		loginLoading,
		loginError,
		login,
	};
}
