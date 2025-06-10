// Dados do gráfico de peso
let pesoData = {
    labels: [],
    datasets: [{
        label: 'Peso (kg)',
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

// Configuração do gráfico
const config = {
    type: 'line',
    data: pesoData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Histórico de Peso'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Peso (kg)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Data'
                }
            }
        }
    }
};

// Inicializar o gráfico
const ctx = document.getElementById('graficoPeso').getContext('2d');
const graficoPeso = new Chart(ctx, config);

// Função para adicionar peso
function adicionarPeso() {
    const pesoInput = document.getElementById('peso');
    const peso = parseFloat(pesoInput.value);

    if (isNaN(peso) || peso < 30 || peso > 300) {
        alert('Por favor, insira um peso válido entre 30 e 300 kg.');
        return;
    }

    const data = new Date().toLocaleDateString('pt-BR');
    
    pesoData.labels.push(data);
    pesoData.datasets[0].data.push(peso);
    
    graficoPeso.update();
    pesoInput.value = '';

    // Salvar dados no localStorage
    salvarDados();
}

// Função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('pesoData', JSON.stringify(pesoData));
}

// Função para carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('pesoData');
    if (dadosSalvos) {
        pesoData = JSON.parse(dadosSalvos);
        graficoPeso.update();
    }
}

// Função para ativar notificações
function ativarNotificacoes() {
    if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações desktop");
        return;
    }

    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            const notification = new Notification("Notificações Ativadas!", {
                body: "Você receberá lembretes para manter sua rotina saudável.",
                icon: "https://example.com/icon.png"
            });
        }
    });
}

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarDados);

// Adicionar animações suaves ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adicionar efeito de hover nos cards
document.querySelectorAll('.card, .recipe-card, .exercise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 