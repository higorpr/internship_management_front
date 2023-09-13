import { useContext } from "react";
import CrumbsContext from "../../contexts/CrumbsContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function BreadCrumbs() {
	const { crumbs } = useContext(CrumbsContext);
	const navigate = useNavigate();

	return (
		<>
			{crumbs.map((entry, idx) => {
				if (idx + 1 !== crumbs.length) {
					return (
						<StyledText
							key={idx}
							onClick={() => {
								navigate(entry.pageRoute);
							}}
						>
							{entry.pageName} /{" "}
						</StyledText>
					);
				} else {
					return (
						<StyledText
							key={idx}
							onClick={() => {
								navigate(entry.pageRoute);
							}}
						>
							{entry.pageName}
						</StyledText>
					);
				}
			})}
		</>
	);
}

const StyledText = styled.span`
	color: #545454;
	font-size: 25px;
	font-weight: 700;
	margin: 12px 0px 0px 0px;
	font-family: "Lato", sans-serif;
	white-space: pre;
	cursor: pointer;

	@media (max-width: 400px) {
		font-size: 17px;
		margin-left: 10px;
	}
`;
