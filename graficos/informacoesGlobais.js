const url = "https://raw.githubusercontent.com/silviosnjr/CienciaDeDados-CriandoGraficosDinamicosComJavaScript/Aula01/transporte/transporte-dados-globais.json";

async function vizualizarInformacoesGlobais() {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Não foi possível buscar os dados.");
        const dados = await resposta.json();

        // Protege contra dados faltando
        const pessoasMundo = dados.total_pessoas_mundo ? dados.total_pessoas_mundo / 1e9 : 0;
        const trabalhadoresMundo = dados.total_trabalhadores_mundo ? dados.total_trabalhadores_mundo / 1e9 : 0;
        // Se valor for string, converte corretamente
        let tempoMedio = Number(dados.tempo_medio_deslocamento_para_trabalho) || 0;
        const tempoDesTrabalho = Math.floor(tempoMedio);
        const minutos = Math.round((tempoMedio - tempoDesTrabalho) * 60);

        // Cria o texto principal
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('graficos-container_texto');
        paragrafo.innerHTML = `O mundo tem <span>${pessoasMundo.toFixed(2)}</span> bilhões de pessoas. Destas, aproximadamente <span>${trabalhadoresMundo.toFixed(2)}</span> bilhões são trabalhadores. O tempo médio de deslocamento para o trabalho global é de <span>${tempoDesTrabalho}</span> horas e <span>${minutos}</span> minutos por dia.`;

        // Cria o texto final sobre o mundo (garante que sempre apareça no final)
        const paragrafoFinal = document.createElement('p');
        paragrafoFinal.classList.add('graficos-container_texto');
        paragrafoFinal.innerHTML = `Esses dados mostram o panorama global do deslocamento para trabalho no mundo.`;

        const container = document.getElementById('graficos-container');
        if (container) {
            container.appendChild(paragrafo);
            container.appendChild(paragrafoFinal); // adiciona o texto final ao fim do container
        } else {
            console.warn("Elemento #graficos-container não encontrado.");
        }
    } catch (e) {
        console.error("Erro ao buscar ou processar dados globais:", e);
    }
}
