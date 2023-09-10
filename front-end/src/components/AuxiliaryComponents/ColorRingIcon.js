import { ColorRing } from "react-loader-spinner";

export default function ColorRingIcon({ height, width }) {
	return (
		<ColorRing
			visible={true}
			height={height}
			width={width}
			ariaLabel="circle-loading"
			wrapperStyle={{}}
			wrapperClass="blocks-wrapper"
			colors={["#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d"]}
		/>
	);
}
