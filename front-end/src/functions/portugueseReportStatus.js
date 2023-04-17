export function portugueseReportStatus(status) {
	switch (status) {
		case "WAITING":
			return "Aguardando";
		case "ACCEPTED":
			return "Aprovado";
		case "REFUSED":
			return "Reprovado";
		case "LATE":
			return "Atrasado";
		case "DELIVERED":
			return "Entregue";
		default:
			return "A definir";
	}
}
