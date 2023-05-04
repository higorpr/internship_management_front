import { useContext } from "react";
import CrumbsContext from "../../contexts/CrumbsContext";

export default function BreadCrumbs() {
	const { crumbs } = useContext(CrumbsContext);
	return <></>;
}
