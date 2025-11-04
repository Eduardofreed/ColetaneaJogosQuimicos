// Transformações da Matéria - Estados Físicos

// Dados das substâncias do jogo
const substanciasJogo = [
    {
        nome: 'Água',
        formula: 'H₂O',
        pontoFusao: 0,      // °C
        pontoEbulicao: 100, // °C
        temperaturaInicial: -10,
        corParticulas: { solido: '#e5e7eb', liquido: '#3b82f6', gasoso: '#10b981' },
        dica: 'A água congela a 0°C e ferve a 100°C ao nível do mar.'
    },
    {
        nome: 'Mercúrio',
        formula: 'Hg',
        pontoFusao: -39,
        pontoEbulicao: 357,
        temperaturaInicial: -50,
        corParticulas: { solido: '#9ca3af', liquido: '#7c3aed', gasoso: '#ec4899' },
        dica: 'O mercúrio é o único metal líquido à temperatura ambiente.'
    },
    {
        nome: 'Dióxido de Carbono',
        formula: 'CO₂',
        pontoFusao: -78,
        pontoEbulicao: -57,
        temperaturaInicial: -90,
        corParticulas: { solido: '#f3f4f6', liquido: '#06b6d4', gasoso: '#84cc16' },
        dica: 'O CO₂ sublima diretamente do sólido para o gasoso, sem estado líquido.'
    },
    {
        nome: 'Oxigênio',
        formula: 'O₂',
        pontoFusao: -219,
        pontoEbulicao: -183,
        temperaturaInicial: -230,
        corParticulas: { solido: '#dbeafe', liquido: '#2563eb', gasoso: '#059669' },
        dica: 'O oxigênio é gasoso em condições normais, mas pode ser liquefeito.'
    },
    {
        nome: 'Ferro',
        formula: 'Fe',
        pontoFusao: 1538,
        pontoEbulicao: 2862,
        temperaturaInicial: 1400,
        corParticulas: { solido: '#6b7280', liquido: '#dc2626', gasoso: '#ea580c' },
        dica: 'O ferro funde a temperaturas muito altas, usado na fabricação do aço.'
    },
    {
        nome: 'Hélio',
        formula: 'He',
        pontoFusao: -272,
        pontoEbulicao: -269,
        temperaturaInicial: -275,
        corParticulas: { solido: '#f9fafb', liquido: '#a855f7', gasoso: '#22d3ee' },
        dica: 'O hélio tem os pontos de fusão e ebulição mais baixos de todos os elementos.'
    },
    {
        nome: 'Metano',
        formula: 'CH₄',
        pontoFusao: -182,
        pontoEbulicao: -162,
        temperaturaInicial: -190,
        corParticulas: { solido: '#e5e7eb', liquido: '#10b981', gasoso: '#f59e0b' },
        dica: 'O metano é o principal componente do gás natural.'
    },
    {
        nome: 'Benzeno',
        formula: 'C₆H₆',
        pontoFusao: 6,
        pontoEbulicao: 80,
        temperaturaInicial: 0,
        corParticulas: { solido: '#d1d5db', liquido: '#7c2d12', gasoso: '#92400e' },
        dica: 'O benzeno é um solvente orgânico importante na indústria química.'
    }
];

// Estado do jogo
let jogoMateria = {
    substanciaAtual: 0,
    pontuacao: 0,
    temperaturaAtual: 0,
    estadoAtual: 'solido',
    verificacaoRealizada: false,
    dicaMostrada: false,
    particulasCriadas: false
};

// Elementos DOM
let elementosMateria = {};

// Estados possíveis da matéria
const estadosMateria = {
    solido: { nome: 'Sólido', movimento: 'lento', forcas: 'fortes' },
    liquido: { nome: 'Líquido', movimento: 'médio', forcas: 'médias' },
    gasoso: { nome: 'Gasoso', movimento: 'rápido', forcas: 'fracas' }
};

// Inicialização do jogo
function inicializarJogoMateria() {
    elementosMateria = {
        cartaoSubstancia: document.getElementById('cartao-substancia'),
        nomeSubstancia: document.getElementById('nome-substancia'),
        formulaSubstancia: document.getElementById('formula-substancia'),
        estadoAtual: document.getElementById('estado-atual'),
        temperaturaAtual: document.getElementById('temperatura-atual'),
        botaoResfriar: document.getElementById('botao-resfriar'),
        botaoAquecer: document.getElementById('botao-aquecer'),
        nivelTemperatura: document.getElementById('nivel-temperatura'),
        valorTemperatura: document.getElementById('valor-temperatura'),
        recipiente: document.getElementById('recipiente'),
        conteudoSubstancia: document.getElementById('conteudo-substancia'),
        nivelSubstancia: document.getElementById('nivel-substancia'),
        fillParticulas: document.getElementById('fill-particulas'),
        valorParticulas: document.getElementById('valor-particulas'),
        fillForcas: document.getElementById('fill-forcas'),
        valorForcas: document.getElementById('valor-forcas'),
        cartoesEstados: document.querySelectorAll('.cartao-estado'),
        botaoVerificar: document.getElementById('botao-verificar'),
        botaoProxima: document.getElementById('botao-proxima'),
        botaoDica: document.getElementById('botao-dica'),
        feedback: document.getElementById('feedback'),
        mensagemFeedback: document.getElementById('mensagem-feedback'),
        pontuacao: document.getElementById('pontuacao'),
        barraProgresso: document.getElementById('barra-progresso'),
        progressoTexto: document.getElementById('progresso-texto')
    };

    configurarEventosMateria();
    carregarSubstanciaAtual();
    criarParticulas();
    atualizarInterfaceMateria();
}

// Configurar eventos
function configurarEventosMateria() {
    elementosMateria.botaoResfriar.addEventListener('click', () => alterarTemperatura(-5));
    elementosMateria.botaoAquecer.addEventListener('click', () => alterarTemperatura(5));

    elementosMateria.botaoVerificar.addEventListener('click', verificarEstado);
    elementosMateria.botaoProxima.addEventListener('click', proximaSubstancia);
    elementosMateria.botaoDica.addEventListener('click', mostrarDica);
}

// Carregar substância atual
function carregarSubstanciaAtual() {
    const substancia = substanciasJogo[jogoMateria.substanciaAtual];

    elementosMateria.nomeSubstancia.textContent = substancia.nome;
    elementosMateria.formulaSubstancia.textContent = substancia.formula;

    // Resetar temperatura para inicial
    jogoMateria.temperaturaAtual = substancia.temperaturaInicial;
    jogoMateria.verificacaoRealizada = false;
    jogoMateria.dicaMostrada = false;

    // Limpar seleções visuais
    elementosMateria.cartoesEstados.forEach(cartao => cartao.classList.remove('ativo', 'correto'));

    atualizarEstadoAtual();
    atualizarInterfaceMateria();
}

// Criar partículas visuais
function criarParticulas() {
    if (jogoMateria.particulasCriadas) return;

    const numParticulas = 24;
    elementosMateria.conteudoSubstancia.innerHTML = '';

    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula-materia';
        particula.style.left = Math.random() * 80 + '%';
        particula.style.bottom = Math.random() * 80 + '%';
        particula.style.animationDelay = Math.random() * 2 + 's';
        elementosMateria.conteudoSubstancia.appendChild(particula);
    }

    jogoMateria.particulasCriadas = true;
    atualizarEstadoAtual();
}

// Alterar temperatura
function alterarTemperatura(delta) {
    if (jogoMateria.verificacaoRealizada) {
        mostrarMensagem('Verificação já realizada! Clique em "Próxima Substância".', 'erro');
        return;
    }

    jogoMateria.temperaturaAtual += delta;

    // Limitar temperatura entre -300°C e 4000°C
    jogoMateria.temperaturaAtual = Math.max(-300, Math.min(4000, jogoMateria.temperaturaAtual));

    atualizarEstadoAtual();
    atualizarInterfaceMateria();

    // Efeitos visuais
    elementosMateria.recipiente.classList.add('transicao');
    setTimeout(() => {
        elementosMateria.recipiente.classList.remove('transicao');
    }, 800);

    tocarClick();
}

// Atualizar estado atual baseado na temperatura
function atualizarEstadoAtual() {
    const substancia = substanciasJogo[jogoMateria.substanciaAtual];
    const temp = jogoMateria.temperaturaAtual;

    let novoEstado;

    if (temp < substancia.pontoFusao) {
        novoEstado = 'solido';
    } else if (temp < substancia.pontoEbulicao) {
        novoEstado = 'liquido';
    } else {
        novoEstado = 'gasoso';
    }

    if (novoEstado !== jogoMateria.estadoAtual) {
        jogoMateria.estadoAtual = novoEstado;
        atualizarVisualParticulas();
        atualizarIndicadores();
    }

    // Atualizar display
    elementosMateria.estadoAtual.textContent = `Estado: ${estadosMateria[jogoMateria.estadoAtual].nome}`;
    elementosMateria.temperaturaAtual.textContent = `Temperatura: ${jogoMateria.temperaturaAtual}°C`;
}

// Atualizar visual das partículas
function atualizarVisualParticulas() {
    const particulas = elementosMateria.conteudoSubstancia.querySelectorAll('.particula-materia');
    const estado = jogoMateria.estadoAtual;
    const substancia = substanciasJogo[jogoMateria.substanciaAtual];

    particulas.forEach((particula, index) => {
        particula.className = `particula-materia ${estado}`;

        // Ajustar nível do líquido/gasoso
        if (estado === 'liquido') {
            particula.style.bottom = (index % 4) * 20 + 10 + '%';
        } else if (estado === 'gasoso') {
            particula.style.bottom = Math.random() * 60 + 20 + '%';
        } else {
            // Sólido - organizado em grid
            const row = Math.floor(index / 6);
            const col = index % 6;
            particula.style.left = col * 15 + 10 + '%';
            particula.style.bottom = row * 15 + 10 + '%';
        }
    });

    // Atualizar nível visual
    if (estado === 'liquido') {
        elementosMateria.nivelSubstancia.style.height = '60%';
    } else if (estado === 'gasoso') {
        elementosMateria.nivelSubstancia.style.height = '20%';
    } else {
        elementosMateria.nivelSubstancia.style.height = '0%';
    }
}

// Atualizar indicadores visuais
function atualizarIndicadores() {
    const estado = jogoMateria.estadoAtual;
    const estadoInfo = estadosMateria[estado];

    // Indicador de movimento das partículas
    let movimentoPercentual = 30; // Sólido
    if (estado === 'liquido') movimentoPercentual = 65;
    if (estado === 'gasoso') movimentoPercentual = 95;

    elementosMateria.fillParticulas.style.width = movimentoPercentual + '%';
    elementosMateria.valorParticulas.textContent = estadoInfo.movimento;

    // Indicador de forças intermoleculares
    let forcasPercentual = 85; // Sólido
    if (estado === 'liquido') forcasPercentual = 50;
    if (estado === 'gasoso') forcasPercentual = 20;

    elementosMateria.fillForcas.style.width = forcasPercentual + '%';
    elementosMateria.valorForcas.textContent = estadoInfo.forcas;
}

// Verificar estado
function verificarEstado() {
    if (jogoMateria.verificacaoRealizada) {
        mostrarMensagem('Verificação já realizada! Clique em "Próxima Substância".', 'erro');
        return;
    }

    jogoMateria.verificacaoRealizada = true;

    // Destacar estado correto
    const estadoCorreto = jogoMateria.estadoAtual;
    const cartaoCorreto = document.querySelector(`[data-estado="${estadoCorreto}"]`);
    cartaoCorreto.classList.add('correto');

    // Calcular pontuação baseada na proximidade dos pontos de mudança
    const substancia = substanciasJogo[jogoMateria.substanciaAtual];
    const temp = jogoMateria.temperaturaAtual;
    let pontos = 50; // Base

    // Bônus por estar próximo dos pontos de mudança
    const distanciaFusao = Math.abs(temp - substancia.pontoFusao);
    const distanciaEbulicao = Math.abs(temp - substancia.pontoEbulicao);

    if (distanciaFusao <= 5) pontos += 25; // Muito próximo do ponto de fusão
    if (distanciaEbulicao <= 5) pontos += 25; // Muito próximo do ponto de ebulição

    if (!jogoMateria.dicaMostrada) {
        pontos += 25; // Bônus por não usar dica
    }

    jogoMateria.pontuacao += pontos;

    const bonusTexto = jogoMateria.dicaMostrada ? pontos : pontos;
    mostrarMensagem(`Estado identificado corretamente! +${bonusTexto} pontos. ${substancia.nome} está no estado ${estadosMateria[estadoCorreto].nome} a ${temp}°C.`, 'sucesso');

    atualizarInterfaceMateria();
}

// Próxima substância
function proximaSubstancia() {
    if (!jogoMateria.verificacaoRealizada) {
        mostrarMensagem('Verifique o estado primeiro!', 'erro');
        return;
    }

    jogoMateria.substanciaAtual++;

    if (jogoMateria.substanciaAtual >= substanciasJogo.length) {
        // Jogo completo
        finalizarJogoMateria();
    } else {
        // Carregar próxima substância
        carregarSubstanciaAtual();
    }
}

// Mostrar dica
function mostrarDica() {
    const substancia = substanciasJogo[jogoMateria.substanciaAtual];

    elementosMateria.mensagemFeedback.textContent = `Dica: ${substancia.dica}`;
    elementosMateria.mensagemFeedback.className = 'mensagem-feedback dica';
    elementosMateria.feedback.classList.add('mostrar');

    jogoMateria.dicaMostrada = true;
    jogoMateria.pontuacao = Math.max(0, jogoMateria.pontuacao - 15);

    setTimeout(() => {
        elementosMateria.feedback.classList.remove('mostrar');
    }, 6000);

    atualizarInterfaceMateria();
}

// Finalizar jogo
function finalizarJogoMateria() {
    const pontuacaoFinal = jogoMateria.pontuacao;
    const totalSubstancias = substanciasJogo.length;

    let classificacao = '';
    if (pontuacaoFinal >= 800) {
        classificacao = 'Excelente! Você é um mestre das transformações da matéria!';
    } else if (pontuacaoFinal >= 600) {
        classificacao = 'Muito bom! Você entende bem os estados físicos.';
    } else if (pontuacaoFinal >= 400) {
        classificacao = 'Bom trabalho! Continue praticando.';
    } else {
        classificacao = 'Que tal revisar os conceitos de mudança de estado?';
    }

    mostrarMensagem(`Jogo completo! Pontuação: ${pontuacaoFinal} pontos. ${classificacao}`, 'sucesso');

    // Salvar pontuação
    salvarPontuacao('Transformações da Matéria', pontuacaoFinal);
}

// Atualizar interface
function atualizarInterfaceMateria() {
    elementosMateria.pontuacao.textContent = jogoMateria.pontuacao;

    // Atualizar barra de temperatura
    const tempPercentual = Math.max(0, Math.min(100, (jogoMateria.temperaturaAtual + 300) / 43)); // -300°C to 4000°C mapeado para 0-100%
    elementosMateria.nivelTemperatura.style.width = tempPercentual + '%';
    elementosMateria.valorTemperatura.textContent = jogoMateria.temperaturaAtual + '°C';

    const progresso = ((jogoMateria.substanciaAtual + 1) / substanciasJogo.length) * 100;
    elementosMateria.barraProgresso.style.width = progresso + '%';
    elementosMateria.progressoTexto.textContent = `Substância ${jogoMateria.substanciaAtual + 1} de ${substanciasJogo.length}`;
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    elementosMateria.mensagemFeedback.textContent = texto;
    elementosMateria.mensagemFeedback.className = `mensagem-feedback ${tipo}`;
    elementosMateria.feedback.classList.add('mostrar');

    setTimeout(() => {
        elementosMateria.feedback.classList.remove('mostrar');
    }, 5000);
}

// Salvar pontuação (placeholder)
function salvarPontuacao(jogo, pontos) {
    console.log(`Pontuação salva: ${jogo} - ${pontos} pontos`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', inicializarJogoMateria);