import styled from "styled-components";
import ClassThumb from "../../components/ClassThumb";

export default function ClassesPage() {
	const classes = [
		"Teste 1",
		"Teste 2",
		"Teste 3",
		"Turma de Recuperação - Estágio Final",
		"TESTE 8",
		"TESTE 9",
		"TESTE10",
		"TESTE 4",
		"TESTE5",
	];
	return (
		<StyledPage>
			<ClassesContainer>
				{classes.map((c, id) => (
					<ClassThumb key={id} className={c} />
				))}
			</ClassesContainer>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
`;

const ClassesContainer = styled.ul`
	display: flex;
	padding-top: 20px;
	padding-left: 30px;
	box-sizing: border-box;
	flex-wrap: wrap;
`;
