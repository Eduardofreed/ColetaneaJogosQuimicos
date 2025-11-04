// Detector de pH - Jogo de Acidez e Basicidade

// Dados das substâncias do jogo
const substanciasJogo = [
    {
        nome: 'Água',
        formula: 'H₂O',
        aplicacao: 'Líquido incolor e inodoro',
        ph: 7,
        classificacao: 'neutra',
        dica: 'A água pura é sempre neutra, com pH exatamente 7.'
    },
    {
        nome: 'Suco de Limão',
        formula: 'C₆H₈O₇',
        aplicacao: 'Bebida cítrica azeda',
        ph: 2,
        classificacao: 'acida',
        dica: 'Frutas cítricas como limão contêm ácido cítrico, tornando-as ácidas.'
    },
    {
        nome: 'Vinagre',
        formula: 'CH₃COOH',
        aplicacao: 'Condimento culinário',
        ph: 3,
        classificacao: 'acida',
        dica: 'O vinagre contém ácido acético, responsável pelo seu sabor azedo.'
    },
    {
        nome: 'Café',
        formula: 'Vários ácidos',
        aplicacao: 'Bebida estimulante',
        ph: 5,
        classificacao: 'acida',
        dica: 'O café contém vários ácidos orgânicos que lhe dão o sabor característico.'
    },
    {
        nome: 'Refrigerante de Cola',
        formula: 'H₃PO₄ + CO₂',
        aplicacao: 'Bebida gaseificada',
        ph: 3,
        classificacao: 'acida',
        dica: 'Refrigerantes contêm ácido fosfórico e dióxido de carbono dissolvido.'
    },
    {
        nome: 'Leite',
        formula: 'Caseína + lactose',
        aplicacao: 'Alimento lácteo',
        ph: 6.5,
        classificacao: 'acida',
        dica: 'O leite é levemente ácido devido à presença de caseína e outros compostos.'
    },
    {
        nome: 'Sabão em Barra',
        formula: 'NaOH + óleos',
        aplicacao: 'Produto de higiene',
        ph: 10,
        classificacao: 'basica',
        dica: 'Sabões são feitos com hidróxido de sódio, que é uma base forte.'
    },
    {
        nome: 'Leite de Magnésia',
        formula: 'Mg(OH)₂',
        aplicacao: 'Antiácido estomacal',
        ph: 10.5,
        classificacao: 'basica',
        dica: 'Usado para neutralizar acidez estomacal, é uma base forte.'
    },
    {
        nome: 'Amônia',
        formula: 'NH₃',
        aplicacao: 'Limpa-vidros e fertilizante',
        ph: 11,
        classificacao: 'basica',
        dica: 'A amônia é uma base comum usada em produtos de limpeza.'
    },
    {
        nome: 'Soda Cáustica',
        formula: 'NaOH',
        aplicacao: 'Desentupidor de pia',
        ph: 14,
        classificacao: 'basica',
        dica: 'É uma das bases mais fortes, extremamente corrosiva.'
    },
    {
        nome: 'Bicarbonato de Sódio',
        formula: 'NaHCO₃',
        aplicacao: 'Fermento químico',
        ph: 8.5,
        classificacao: 'basica',
        dica: 'Usado em culinária, é uma base fraca que neutraliza ácidos.'
    },
    {
        nome: 'Sal de Epsom',
        formula: 'MgSO₄',
        aplicacao: 'Banho relaxante',
        ph: 6,
        classificacao: 'acida',
        dica: 'Sulfato de magnésio forma soluções levemente ácidas.'
    }
];

// Estado do jogo
let jogoPH = {
    substanciaAtual: 0,
    pontuacao: 0,
    respostaSelecionada: null,
    analiseRealizada: false,
    dicaMostrada: false,
    substanciasRespondidas: []
};

// Elementos DOM
let elementosPH = {};

// Cores do papel tornassol para cada classificação
const coresTornassol = {
    acida: 'acido',
    neutra: 'neutro',
    basica: 'basico'
};

// Inicialização do jogo
function inicializarJogoPH() {
    elementosPH = {
        cartaoSubstancia: document.getElementById('cartao-substancia'),
        nomeSubstancia: document.getElementById('nome-substancia'),
        formulaSubstancia: document.getElementById('formula-substancia'),
        aplicacaoSubstancia: document.getElementById('aplicacao-substancia'),
        indicadorPh: document.getElementById('indicador-ph'),
        agulhaPh: document.getElementById('agulha-ph'),
        papelTornassol: document.getElementById('papel-tornassol'),
        corIndicador: document.getElementById('cor-indicador'),
        valorPh: document.getElementById('valor-ph'),
        classificacaoPh: document.getElementById('classificacao-ph'),
        botaoAcida: document.getElementById('botao-acida'),
        botaoNeutra: document.getElementById('botao-neutra'),
        botaoBasica: document.getElementById('botao-basica'),
        botaoAnalisar: document.getElementById('botao-analisar'),
        botaoProxima: document.getElementById('botao-proxima'),
        botaoDica: document.getElementById('botao-dica'),
        textoDica: document.getElementById('texto-dica'),
        feedback: document.getElementById('feedback'),
        mensagemFeedback: document.getElementById('mensagem-feedback'),
        pontuacao: document.getElementById('pontuacao'),
        barraProgresso: document.getElementById('barra-progresso'),
        progressoTexto: document.getElementById('progresso-texto')
    };

    configurarEventosPH();
    resetarDetector();
    carregarSubstanciaAtual();
    atualizarInterfacePH();
}

// Configurar eventos
function configurarEventosPH() {
    // Botões de classificação
    [elementosPH.botaoAcida, elementosPH.botaoNeutra, elementosPH.botaoBasica].forEach(botao => {
        botao.addEventListener('click', () => selecionarClassificacao(botao.dataset.tipo));
    });

    // Botões de controle
    elementosPH.botaoAnalisar.addEventListener('click', analisarSubstancia);
    elementosPH.botaoProxima.addEventListener('click', proximaSubstancia);
    elementosPH.botaoDica.addEventListener('click', mostrarDica);
}

// Carregar substância atual
function carregarSubstanciaAtual() {
    const substancia = substanciasJogo[jogoPH.substanciaAtual];

    elementosPH.nomeSubstancia.textContent = substancia.nome;
    elementosPH.formulaSubstancia.textContent = substancia.formula;
    elementosPH.aplicacaoSubstancia.textContent = substancia.aplicacao;

    resetarDetector();
    jogoPH.respostaSelecionada = null;
    jogoPH.analiseRealizada = false;
    jogoPH.dicaMostrada = false;

    // Limpar seleções visuais
    document.querySelectorAll('.botao-classificacao.ativo').forEach(btn => btn.classList.remove('ativo'));

    // Resetar dica
    elementosPH.textoDica.textContent = 'Clique em uma classificação para analisar a substância!';
}

// Selecionar classificação
function selecionarClassificacao(tipo) {
    // Remover seleção anterior
    document.querySelectorAll('.botao-classificacao.ativo').forEach(btn => btn.classList.remove('ativo'));

    // Adicionar seleção atual
    const botaoSelecionado = document.getElementById(`botao-${tipo}`);
    botaoSelecionado.classList.add('ativo');

    jogoPH.respostaSelecionada = tipo;

    if (!jogoPH.analiseRealizada) {
        elementosPH.textoDica.textContent = `Selecionou: ${tipo === 'acida' ? 'Ácida' : tipo === 'neutra' ? 'Neutra' : 'Básica'}. Clique em "Analisar Substância" para verificar!`;
    }
}

// Resetar detector
function resetarDetector() {
    elementosPH.agulhaPh.style.transform = 'translateX(-50%) translateY(-100%) rotate(90deg)';
    elementosPH.papelTornassol.className = 'papel-tornassol';
    elementosPH.valorPh.textContent = '?';
    elementosPH.classificacaoPh.textContent = 'Aguardando análise';
    elementosPH.classificacaoPh.classList.remove('revelada');
    elementosPH.indicadorPh.classList.remove('ativo');
}

// Analisar substância
function analisarSubstancia() {
    if (!jogoPH.respostaSelecionada) {
        mostrarMensagem('Selecione uma classificação primeiro!', 'erro');
        return;
    }

    if (jogoPH.analiseRealizada) {
        mostrarMensagem('Análise já realizada! Clique em "Próxima Substância".', 'dica');
        return;
    }

    const substancia = substanciasJogo[jogoPH.substanciaAtual];
    jogoPH.analiseRealizada = true;

    // Calcular ângulo da agulha baseado no pH (0-14 mapeado para 0-180 graus)
    const angulo = 90 + (substancia.ph / 14) * 180 - 90; // De -90° a +90°

    // Aplicar movimento da agulha
    elementosPH.agulhaPh.style.setProperty('--rotacao-final', `${angulo}deg`);
    elementosPH.agulhaPh.classList.add('movendo');
    elementosPH.indicadorPh.classList.add('ativo');

    // Atualizar papel tornassol
    elementosPH.papelTornassol.classList.add(coresTornassol[substancia.classificacao]);

    // Mostrar resultado
    setTimeout(() => {
        elementosPH.agulhaPh.classList.remove('movendo');
        elementosPH.valorPh.textContent = substancia.ph;
        elementosPH.classificacaoPh.textContent = substancia.classificacao === 'acida' ? 'Ácida' :
                                                  substancia.classificacao === 'neutra' ? 'Neutra' : 'Básica';
        elementosPH.classificacaoPh.classList.add('revelada');

        // Verificar resposta
        verificarResposta();
    }, 1500);

    tocarClick(); // Som de análise
}

// Verificar resposta
function verificarResposta() {
    const substancia = substanciasJogo[jogoPH.substanciaAtual];
    const respostaCorreta = substancia.classificacao === jogoPH.respostaSelecionada;

    if (respostaCorreta) {
        jogoPH.pontuacao += 100;
        if (!jogoPH.dicaMostrada) {
            jogoPH.pontuacao += 50; // Bônus por não usar dica
        }

        const bonusTexto = jogoPH.dicaMostrada ? '100' : '150';
        mostrarMensagem(`Correto! +${bonusTexto} pontos. ${substancia.nome} é ${substancia.classificacao === 'acida' ? 'ácida' : substancia.classificacao === 'neutra' ? 'neutra' : 'básica'} (pH ${substancia.ph}).`, 'sucesso');

        jogoPH.substanciasRespondidas.push(jogoPH.substanciaAtual);
    } else {
        jogoPH.pontuacao = Math.max(0, jogoPH.pontuacao - 30);
        mostrarMensagem(`Incorreto! ${substancia.nome} é ${substancia.classificacao === 'acida' ? 'ácida' : substancia.classificacao === 'neutra' ? 'neutra' : 'básica'} (pH ${substancia.ph}). -30 pontos.`, 'erro');
    }

    atualizarInterfacePH();
}

// Próxima substância
function proximaSubstancia() {
    if (!jogoPH.analiseRealizada) {
        mostrarMensagem('Analise a substância primeiro!', 'erro');
        return;
    }

    jogoPH.substanciaAtual++;

    if (jogoPH.substanciaAtual >= substanciasJogo.length) {
        // Jogo completo
        finalizarJogoPH();
    } else {
        // Carregar próxima substância
        carregarSubstanciaAtual();
    }
}

// Mostrar dica
function mostrarDica() {
    const substancia = substanciasJogo[jogoPH.substanciaAtual];

    if (jogoPH.analiseRealizada) {
        elementosPH.textoDica.textContent = `Dica: ${substancia.dica}`;
    } else {
        elementosPH.textoDica.textContent = `Dica sem análise: ${substancia.dica}`;
    }

    jogoPH.dicaMostrada = true;
    jogoPH.pontuacao = Math.max(0, jogoPH.pontuacao - 15); // Penalidade menor
    atualizarInterfacePH();
}

// Finalizar jogo
function finalizarJogoPH() {
    const pontuacaoFinal = jogoPH.pontuacao;
    const acertos = jogoPH.substanciasRespondidas.length;
    const total = substanciasJogo.length;

    let classificacao = '';
    if (acertos === total) {
        classificacao = 'Perfeito! Você é um especialista em pH!';
    } else if (acertos >= total * 0.8) {
        classificacao = 'Excelente! Você entende muito bem sobre acidez e basicidade.';
    } else if (acertos >= total * 0.6) {
        classificacao = 'Muito bom! Continue praticando.';
    } else if (acertos >= total * 0.4) {
        classificacao = 'Bom trabalho! Estude um pouco mais sobre pH.';
    } else {
        classificacao = 'Que tal revisar os conceitos de pH? A prática leva à perfeição!';
    }

    mostrarMensagem(`Jogo completo! ${acertos}/${total} acertos. Pontuação: ${pontuacaoFinal} pontos. ${classificacao}`, 'sucesso');

    // Salvar pontuação
    salvarPontuacao('Detector de pH', pontuacaoFinal);
}

// Atualizar interface
function atualizarInterfacePH() {
    elementosPH.pontuacao.textContent = jogoPH.pontuacao;

    const progresso = ((jogoPH.substanciaAtual + 1) / substanciasJogo.length) * 100;
    elementosPH.barraProgresso.style.width = progresso + '%';
    elementosPH.progressoTexto.textContent = `Substância ${jogoPH.substanciaAtual + 1} de ${substanciasJogo.length}`;
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    elementosPH.mensagemFeedback.textContent = texto;
    elementosPH.mensagemFeedback.className = `mensagem-feedback ${tipo}`;
    elementosPH.feedback.classList.add('mostrar');

    setTimeout(() => {
        elementosPH.feedback.classList.remove('mostrar');
    }, 5000);
}

// Salvar pontuação (placeholder)
function salvarPontuacao(jogo, pontos) {
    console.log(`Pontuação salva: ${jogo} - ${pontos} pontos`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', inicializarJogoPH);
