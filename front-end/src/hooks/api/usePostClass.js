import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import UseUserToken from "../UseUserToken";

export default function usePostClass() {
	const token = UseUserToken();
	const {
		data: postClassData,
		loading: postClassLoading,
		error: postClassError,
		act: postClass,
	} = UseAsync((data) => classApi.postNewClass(token, data), false);

	return {
		postClassData,
		postClassLoading,
		postClassError,
		postClass,
	};
}
