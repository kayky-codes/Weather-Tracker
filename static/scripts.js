// Função para criar um gráfico
function graficoUmidade(valor){
    // Pegamos o elemento <canvas> do HTML pelo ID, que é onde o gráfico será desenhado
    const ctx = document.getElementById("graficoUmidade");

    // Calculamos quanto falta para completar 100% do grafico de pizza
    const rest = 100 - valor;

    new Chart(ctx, {
        type: "pie", // Identificando o tipo de Gráfico

        // Dados que o gráfico vai exibir
        data: {
            // Nomes das fatias da pizza
            labels: ["Ar Seco (%)", "Umidade (%)"],

            // Valores das fatias
            datasets: [{
                data: [rest, valor],
                // Edição de cor
                backgroundColor: [
                    "rgba(180, 180, 180, 0.7)",   // cinza — ar seco
                    "rgba(54, 162, 235, 0.7)"  // azul — umidade
                ],
                borderColor: [
                    "rgba(180, 180, 180, 0.7)",
                    "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1 // Espessura da borda entre as fatias
            }]
        }
    });
}


// Converte o grau da API para o nome da direção (N, NE, SE, etc)
function directionName(deg) {
    const direcoes = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];

    const index = Math.round(deg / 22.5) % 16;
    return direcoes[index];
}



