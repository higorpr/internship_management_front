import { authApi } from "../../services/authApi";
import UseAsync from "../UseAsync";

export default function useValidateEmail() {
	const {
		data: validateEmailData,
		loading: validateEmailLoading,
		error: validateEmailError,
		act: validateEmail,
	} = UseAsync((email, confirmationCode) => authApi.postEnrollStudent(email, confirmationCode), false);

	return {
		validateEmailData,
		validateEmailLoading,
		validateEmailError,
		validateEmail,
	};
}