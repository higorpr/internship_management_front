import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import UseUserToken from "../UseUserToken";

export default function useGetAllClasses() {
	const token = UseUserToken();

	const {
		data: getAllClassesData,
		loading: getAllClassesLoading,
		error: getAllClassesError,
		act: getAllClasses,
	} = UseAsync(() => classApi.getAllClasses(token), false);

	return {
		getAllClassesData,
		getAllClassesLoading,
		getAllClassesError,
		getAllClasses,
	};
}
