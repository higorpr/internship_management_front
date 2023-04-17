import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import UseUserToken from "../UseUserToken";

export default function useGetStudentClasses() {
	const token = UseUserToken();

	const {
		data: getStudentClassesData,
		loading: getStudentClassesLoading,
		error: getStudentClassesError,
		act: getStudentClasses,
	} = UseAsync(() => classApi.getStudentClasses(token), false);

	return {
		getStudentClassesData,
		getStudentClassesLoading,
		getStudentClassesError,
		getStudentClasses,
	};
}
