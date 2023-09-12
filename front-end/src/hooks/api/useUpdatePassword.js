import { authApi } from "../../services/authApi";
import UseAsync from "../UseAsync";

export default function useUpdatePassword() {
	const {
		data: updatePasswordData,
		loading: updatePasswordLoading,
		error: updatePasswordError,
		act: updatePassword,
	} = UseAsync(
		(token, password) => authApi.updatePassword(token, password),
		false
	);

	return {
		updatePasswordData,
		updatePasswordLoading,
		updatePasswordError,
		updatePassword,
	};
}
