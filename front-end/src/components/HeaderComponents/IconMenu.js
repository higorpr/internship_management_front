import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { AiOutlineUser } from "react-icons/ai";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/index.css";
import { useNavigate } from "react-router-dom";

export default function IconMenu() {
	const navigate = useNavigate();
	return (
		<Menu
			menuButton={
				<MenuButton>
					<AiOutlineUser />
				</MenuButton>
			}
			transition
		>
			<MenuItem
				onClick={() => {
					navigate("/");
				}}
			>
				Logoff
			</MenuItem>
		</Menu>
	);
}
