export default function updateCrumbArray(
	crumbs,
	setCrumbs,
	crumbIndex,
	pageName,
	pageRoute
) {
	const tempCrumbs = [...crumbs];
	tempCrumbs[crumbIndex] = {
		pageName: pageName,
		pageRoute: pageRoute,
	};
	for (let i = crumbIndex + 1; i < crumbs.length; i++) {
		tempCrumbs.pop();
	}
	setCrumbs(tempCrumbs);
}
