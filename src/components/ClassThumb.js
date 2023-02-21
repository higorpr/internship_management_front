import styled from "styled-components";
import { imageRepository } from "../assets/imageUrls";

export default function ClassThumb({ className }) {
	const bcolor = "#000000";
	return (
		<StyledListEntry>
			<ThumbHeader>
				<Background backcolor={bcolor}>
					<img src={imageRepository.classThumbnail} alt="" />
				</Background>
				<Title>{className}</Title>
			</ThumbHeader>
		</StyledListEntry>
	);
}

const StyledListEntry = styled.li`
	display: flex;
	flex-direction: column;
	height: 250px;
	width: 250px;
	/* background-color: red; */
	border: 1px solid rgba(156, 150, 153, 0.3);
	box-sizing: border-box;
	margin: 0px 30px 20px 0px;
	border-radius: 10px;
`;

const ThumbHeader = styled.div`
	width: 100%;
	height: 35%;
	position: relative;
`;

const Background = styled.div`
	background-color: ${(props) => props.backcolor};
	height: 100%;
	width: 100%;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	img {
		width: 100%;
		height: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
`;

const Title = styled.p`
	color: white;
	font-size: 20px;
	font-weight: 700;
	font-family: "Lato", sans-serif;
	position: absolute;
	top: 15px;
	left: 10px;
	width: 90%;
	height: 70px;
	overflow-wrap: break-word;
`;
