export function formatDate(dateString) {
	const UTCDateString = new Date(dateString).toLocaleDateString("pt-BR", {
		timeZone: "Europe/London",
	});
	return UTCDateString;
}
