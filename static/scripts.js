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


function graficoTeia(data){
    const ctx = document.getElementById("graficoAtual"); // Pegamos o elemento <canvas> do HTML pelo ID, que é onde o gráfico será desenhado

    new Chart( ctx, {
        type: "radar", // tipo de grafico

        data: {
            // Rótulos que aparecem nas pontas da teia
            labels: [
                "Temperatura (°C)",
                "Sensação (°C)",
                "Umidade (%)",
                "Nebulosidade (%)",
                "Ventos (m/s)"
            ],

            // Dados reais que serão desenhados
            datasets: [{
                label: "Condições Atuais", // Nome do conjunto de dados mostrado na legenda

                data: [
                    data.temp,
                    data.feels_like,
                    data.humidity,
                    data.cloud,
                    data.wind_speed
                ],

                // Estilo da área preenchida da teia
                fill: true,

                borderWidth: 2, // Espessura da linha
                borderRadius: 4 // Tamanho das bolinhas
            }]
        },

        options: {
            responsive: true
        },

        plugins: {
            legend: {
                position: "bottom", // Legenda embaixo

                labels:{
                    font: {size: 14}, // Tamanho da fonte da legenda
                    color: "#333"     // Cor da fonte
                }
            },
        },

    })
}

function graficoFutureTemp(horario, temps){
    const ctx = document.getElementById("graficoTempFutura"); // Pegamos o elemento <canvas> do HTML pelo ID, que é onde o gráfico será desenhado

    new Chart(ctx,{
        type: "line",
        data: {
            labels: horario,
            datasets: [{
                label: "Temperatura (°C)",
                data: temps,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}



