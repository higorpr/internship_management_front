export function formatDate(dateString) {
	if (dateString === null) {
		return "-";
	}
	const UTCDateString = new Date(dateString).toLocaleDateString("pt-BR", {
		timeZone: "Europe/London",
	});
	return UTCDateString;
}
