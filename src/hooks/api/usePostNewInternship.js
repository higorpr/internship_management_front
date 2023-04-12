import { internshipApi } from "../../services/internshipApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

export default function usePostNewInternship() {
	const token = useUserToken();

	const {
		data: postNewInternshipData,
		loading: postNewInternshipLoading,
		error: postNewInternshipError,
		act: postNewInternship,
	} = UseAsync((body) => internshipApi.postNewInternship(token, body), false);

	return {
		postNewInternshipData,
		postNewInternshipLoading,
		postNewInternshipError,
		postNewInternship,
	};
}
