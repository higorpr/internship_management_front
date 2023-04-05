import { classApi } from "../../services/classApi";
import UseAsync from "../useAsync";
import useUserToken from "../useUserToken";

export default function useGetStudentClasses() {
	const token = useUserToken();

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
