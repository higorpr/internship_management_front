export function portugueseStudentStatus(status) {
	switch (status) {
		case "ENROLLED":
			return "Matriculado";
		case "APPROVED":
			return "Aprovado";
		default:
			return "Reprovado";
	}
}
