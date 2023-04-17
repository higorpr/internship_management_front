import { authApi } from "../../services/authApi";
import UseAsync from "../UseAsync";

export default function useSignUp() {
	const {
        data:signUpData,
		loading: signUpLoading,
		error: signUpError,
		act: signUp,
	} = UseAsync(authApi.signUp, false);

	return {
        signUpData,
		signUpLoading,
		signUpError,
		signUp,
	};
}
