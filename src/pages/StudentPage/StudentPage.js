import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function StudentPage() {
	const { studentId } = useParams();
	const { userData } = useContext(UserContext);
	console.log(userData);
	return (
		<StyledPage>
			<p>{`Hello ${userData.user.name}`}</p>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
`;
