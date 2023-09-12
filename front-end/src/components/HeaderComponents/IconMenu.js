import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { AiOutlineUser } from "react-icons/ai";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/index.css";
import { useNavigate } from "react-router-dom";

export default function IconMenu({ setOpenedMenu }) {
	const navigate = useNavigate();

	function toggleLabel(event) {
		if (event.open === true) {
			setOpenedMenu(true);
		} else {
			setOpenedMenu(false);
		}
	}
	return (
		<Menu
			onMenuChange={toggleLabel}
			menuButton={
				<MenuButton>
					<AiOutlineUser />
				</MenuButton>
			}
			transition
		>
			<MenuItem
				onClick={() => {
					navigate("/login");
				}}
			>
				Logoff
			</MenuItem>
		</Menu>
	);
}
