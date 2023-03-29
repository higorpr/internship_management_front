import { classApi } from "../../services/classApi";
import UseAsync from "../useAsync";
import useUserToken from "../useUserToken";

export default function useGetAllClasses() {
	const token = useUserToken();

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
