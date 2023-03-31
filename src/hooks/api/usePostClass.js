import { classApi } from "../../services/classApi";
import UseAsync from "../useAsync";
import useUserToken from "../useUserToken";

export default function usePostClass() {
	const token = useUserToken();
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
