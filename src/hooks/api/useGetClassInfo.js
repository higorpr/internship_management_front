import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import UseUserToken from "../UseUserToken";

export default function useGetClassInfo() {
	const token = UseUserToken();
	const {
		data: getClassInfoData,
		loading: getClassInfoLoading,
		error: getClassInfoError,
		act: getClassInfo,
	} = UseAsync((classId) => classApi.getClassInfo(token, classId), false);

	return {
		getClassInfoData,
		getClassInfoLoading,
		getClassInfoError,
		getClassInfo,
	};
}
