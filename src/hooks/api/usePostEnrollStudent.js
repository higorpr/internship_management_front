import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

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
