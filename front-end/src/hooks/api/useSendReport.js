import { reportApi } from "../../services/reportApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

export default function useSendReport() {
	const token = useUserToken();

	const {
		data: sendReportData,
		loading: sendReportLoading,
		error: sendReportError,
		act: sendReport,
	} = UseAsync((formData) => reportApi.sendReport(token, formData), false);

	return {
		sendReportData,
		sendReportLoading,
		sendReportError,
		sendReport,
	};
}
