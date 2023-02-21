import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SingleClassPage() {
	const { classId } = useParams();
	
	return <StyledPage>{classId}</StyledPage>;
}

const StyledPage = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
`;
