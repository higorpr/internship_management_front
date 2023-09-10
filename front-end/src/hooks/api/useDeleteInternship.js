import { internshipApi } from "../../services/internshipApi";
import UseAsync from "../UseAsync";
import useUserToken from "../UseUserToken";

export default function useDeleteInternship() {
	const token = useUserToken();

	const {
		data: deleteInternshipData,
		loading: deleteInternshipLoading,
		error: deleteInternshipError,
		act: deleteInternship,
	} = UseAsync(
		(internshipId) => internshipApi.deleteInternship(token, internshipId),
		false
	);

	return {
		deleteInternshipData,
		deleteInternshipLoading,
		deleteInternshipError,
		deleteInternship,
	};
}
