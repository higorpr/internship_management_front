import styled from "styled-components";
import ColorRingIcon from "../../components/AuxiliaryComponents/ColorRingIcon";

export default function LoadingPage({ iconHeight, iconWidth }) {
	return (
		<StyledLoadingPage>
			<ColorRingIcon height={iconHeight} width={iconWidth} />
			<p>Carregando</p>
		</StyledLoadingPage>
	);
}

const StyledLoadingPage = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;

	p {
		font-size: 20px;
		font-weight: 700;
		color: #545454;
	}
`;
