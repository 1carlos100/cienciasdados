const url = "https://raw.githubusercontent.com/silviosnjr/CienciaDeDados-CriandoGraficosDinamicosComJavaScript/refs/heads/Aula01/transporte/transporte-dados-globais.json"

async function vizualizarInformacoesGlobais() {
    try {
        const resposta = await fetch(url)
        const dados = await resposta.json()

        const pessoasMundo = (dados.total_pessoas_mundo / 1e9)
        const trabalhadoresMundo = (dados.total_trabalhadores_mundo / 1e9)
        const tempoDesTrabalho = parseInt(dados.tempo_medio_deslocamento_para_trabalho)
        const minutos = Math.round((dados.tempo_medio_deslocamento_para_trabalho - tempoDesTrabalho) * 60)

        const paragrafo = document.createElement('p')
        paragrafo.classList.add('graficos-container_texto')

        paragrafo.innerHTML = `O mundo tem <span>${pessoasMundo.toFixed(2)}</span> bilhões de pessoas, dessas pessoas, aproximadamente <span>${trabalhadoresMundo.toFixed(2)}</span> bilhões estão empregadas e passam em média <span>${tempoDesTrabalho} horas e ${minutos} minutos</span> se deslocando para o trabalho.`

        const container = document.getElementById('graficos-container')
        container.appendChild(paragrafo)
    } catch (e) {
        console.error("Erro ao buscar ou processar dados globais:", e)
    }
}
