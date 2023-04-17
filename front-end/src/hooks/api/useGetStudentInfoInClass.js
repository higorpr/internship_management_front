import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";
import { userApi } from "../../services/userApi";

export default function useGetStudentInfoInClass() {
	const token = useUserToken();

	const {
		data: getStudentInfoInClassData,
		loading: getStudentInfoInClassLoading,
		error: getStudentInfoInClassError,
		act: getStudentInfoInClass,
	} = UseAsync(
		(studentId, classId) =>
			userApi.getStudentDataInClass(studentId, classId, token),
		false
	);

	return {
		getStudentInfoInClassData,
		getStudentInfoInClassLoading,
		getStudentInfoInClassError,
		getStudentInfoInClass,
	};
}
