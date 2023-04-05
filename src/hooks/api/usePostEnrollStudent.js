import { classApi } from "../../services/classApi";
import UseAsync from "../useAsync";
import useUserToken from "../useUserToken";

export default function usePostEnrollStudent() {
	const token = useUserToken();
	const {
		data: postEnrollStudentData,
		loading: postEnrollStudentLoading,
		error: postEnrollStudentError,
		act: postEnrollStudent,
	} = UseAsync((data) => classApi.postEnrollStudent(token, data), false);

	return {
		postEnrollStudentData,
		postEnrollStudentLoading,
		postEnrollStudentError,
		postEnrollStudent,
	};
}
