const url = "https://raw.githubusercontent.com/silviosnjr/CienciaDeDados-CriandoGraficosDinamicosComJavaScript/refs/heads/Aula01/transporte/transporte-dados-globais.json";

async function vizualizarInformacoesGlobais() {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Não foi possível buscar os dados.");
        const dados = await resposta.json();

        // Protege contra dados faltando
        const pessoasMundo = dados.total_pessoas_mundo ? (dados.total_pessoas_mundo / 1e9).toFixed(2) : "0.00";
        const trabalhadoresMundo = dados.total_trabalhadores_mundo ? (dados.total_trabalhadores_mundo / 1e9).toFixed(2) : "0.00";
        let tempoMedio = Number(dados.tempo_medio_deslocamento_para_trabalho) || 0;
        const tempoDesTrabalho = Math.floor(tempoMedio);
        const minutos = Math.round((tempoMedio - tempoDesTrabalho) * 60);

        const textoFinal = `O mundo tem <span>${pessoasMundo}</span>  bilhões de pessoas, dessas pessoas, aproximadamente <span>${trabalhadoresMundo}</span>   bilhões estão empregadas e passam em média  <span>${tempoDesTrabalho} horas</span> e <span>${minutos} minutos</span> por dia no caminho para o trabalho. Temos, portanto, mais da metade da população mundial que não exerce trabalhos com vínculos empregatícios legais. O que pode significar que há longevidade e desse modo, muitas pessoas aposentadas. Porém, também pode significar muitos postos de trabalho chamados informais.`;

        const paragrafoFinal = document.createElement('p');
        paragrafoFinal.classList.add('graficos-container_texto');
        paragrafoFinal.innerHTML = textoFinal;

        const container = document.getElementById('graficos-container');
        if (container) {
            container.appendChild(paragrafoFinal); // sempre adiciona o texto final ao final do container
        } else {
            console.warn("Elemento #graficos-container não encontrado.");
        }
    } catch (e) {
        console.error("Erro ao buscar ou processar dados globais:", e);
    }
}
