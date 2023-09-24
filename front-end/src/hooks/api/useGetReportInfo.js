import { classApi } from "../../services/classApi";
import UseAsync from "../UseAsync";
import UseUserToken from "../UseUserToken";

export default function useGetReportInfo() {
	const token = UseUserToken();
	const {
		data: getReportInfoData,
		loading: getReportInfoLoading,
		error: getReportInfoError,
		act: getReportInfo,
	} = UseAsync((classId) => classApi.getReportInfo(token, classId), false);

	return {
		getReportInfoData,
		getReportInfoLoading,
		getReportInfoError,
		getReportInfo,
	};
}
