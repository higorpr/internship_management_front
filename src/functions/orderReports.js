export function orderReports(reportObj) {
	const reportKeys = Object.keys(reportObj);
	const order = ["firstReport", "secondReport", "thirdReport"];
	const sortedKeys = reportKeys.sort(
		(a, b) => order.indexOf(a) - order.indexOf(b)
	);
	const reportsArr = sortedKeys.map((key) => reportObj[key]);

	return reportsArr;
}
