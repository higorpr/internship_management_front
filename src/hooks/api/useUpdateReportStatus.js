import { reportApi } from "../../services/reportApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

export default function useUpdateReportStatus() {
	const token = useUserToken();
	const {
		data: updateReportStatusData,
		loading: updateReportStatusLoading,
		error: updateReportStatusError,
		act: updateReportStatus,
	} = UseAsync((body) => reportApi.updateReportStatus(token, body), false);

	return {
		updateReportStatusData,
		updateReportStatusLoading,
		updateReportStatusError,
		updateReportStatus,
	};
}
