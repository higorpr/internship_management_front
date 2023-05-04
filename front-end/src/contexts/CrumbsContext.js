import { createContext } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

const CrumbsContext = createContext();
export default CrumbsContext;

export function CrumbsProvider({ children }) {
	const [crumbs, setCrumbs] = useLocalStorage("crumbs", []);

	return (
		<CrumbsContext.Provider value={{ crumbs, setCrumbs }}>
			{children}
		</CrumbsContext.Provider>
	);
}
