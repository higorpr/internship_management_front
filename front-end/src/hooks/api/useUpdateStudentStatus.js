import { userApi } from "../../services/userApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

export default function useUpdateReportStatus() {
	const token = useUserToken();
	const {
		data: updateStudentStatusData,
		loading: updateStudentStatusLoading,
		error: updateStudentStatusError,
		act: updateStudentStatus,
	} = UseAsync((body) => userApi.updateStudentStatus(token, body), false);

	return {
		updateStudentStatusData,
		updateStudentStatusLoading,
		updateStudentStatusError,
		updateStudentStatus,
	};
}
