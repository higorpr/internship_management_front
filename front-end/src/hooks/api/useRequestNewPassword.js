import { authApi } from "../../services/authApi";
import UseAsync from "../UseAsync";

export default function useRequestNewPassword() {
	const {
		data: requestNewPasswordData,
		loading: requestNewPasswordLoading,
		error: requestNewPasswordError,
		act: requestNewPassword,
	} = UseAsync((email) => authApi.requestNewPassword(email), false);

	return {
		requestNewPasswordData,
		requestNewPasswordLoading,
		requestNewPasswordError,
		requestNewPassword,
	};
}
