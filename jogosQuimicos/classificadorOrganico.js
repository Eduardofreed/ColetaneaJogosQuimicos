// Classificador Orgânico - Funções Orgânicas

// Dados das funções orgânicas
const funcoesOrganicas = [
    {
        id: 'alcool',
        nome: 'Álcool',
        icone: '🥃',
        grupoFuncional: '-OH',
        descricao: 'Composto orgânico que contém o grupo hidroxila (-OH) ligado a um carbono alifático',
        prioridade: 3,
        exemplos: ['CH₃OH (Metanol)', 'C₂H₅OH (Etanol)']
    },
    {
        id: 'aldeido',
        nome: 'Aldeído',
        icone: '🧪',
        grupoFuncional: '-CHO',
        descricao: 'Composto que contém o grupo carbonila (C=O) na extremidade da cadeia carbônica',
        prioridade: 1,
        exemplos: ['HCHO (Formaldeído)', 'CH₃CHO (Acetaldeído)']
    },
    {
        id: 'cetona',
        nome: 'Cetona',
        icone: '🔬',
        grupoFuncional: '>C=O',
        descricao: 'Composto que contém o grupo carbonila (C=O) ligado a dois carbonos alifáticos',
        prioridade: 2,
        exemplos: ['CH₃COCH₃ (Acetona)', '(CH₃)₂CO']
    },
    {
        id: 'acido',
        nome: 'Ácido Carboxílico',
        icone: '⚗️',
        grupoFuncional: '-COOH',
        descricao: 'Composto que contém o grupo carboxila (-COOH) ligado a um carbono alifático',
        prioridade: 1,
        exemplos: ['HCOOH (Ácido fórmico)', 'CH₃COOH (Ácido acético)']
    },
    {
        id: 'amina',
        nome: 'Amina',
        icone: '🧫',
        grupoFuncional: '-NH₂',
        descricao: 'Composto derivado da amônia onde um ou mais hidrogênios são substituídos por grupos orgânicos',
        prioridade: 4,
        exemplos: ['CH₃NH₂ (Metilamina)', '(CH₃)₂NH (Dimetilamina)']
    },
    {
        id: 'haleto',
        nome: 'Haleto de Alquila',
        icone: '🧴',
        grupoFuncional: '-X (X = F, Cl, Br, I)',
        descricao: 'Composto orgânico que contém um halogênio ligado a um carbono alifático',
        prioridade: 5,
        exemplos: ['CH₃Cl (Clorometano)', 'C₂H₅Br (Bromoetano)']
    },
    {
        id: 'alceno',
        nome: 'Alceno',
        icone: '⚡',
        grupoFuncional: 'C=C',
        descricao: 'Hidrocarboneto insaturado que contém uma ligação dupla carbono-carbono',
        prioridade: 6,
        exemplos: ['C₂H₄ (Eteno)', 'C₃H₆ (Propeno)']
    },
    {
        id: 'alcino',
        nome: 'Alcino',
        icone: '🔥',
        grupoFuncional: 'C≡C',
        descricao: 'Hidrocarboneto insaturado que contém uma ligação tripla carbono-carbono',
        prioridade: 6,
        exemplos: ['C₂H₂ (Etileno)', 'C₃H₄ (Propino)']
    },
    {
        id: 'hidrocarboneto',
        nome: 'Hidrocarboneto',
        icone: '🛢️',
        grupoFuncional: 'C-C, C-H',
        descricao: 'Composto formado apenas por carbono e hidrogênio',
        prioridade: 7,
        exemplos: ['CH₄ (Metano)', 'C₆H₁₄ (Hexano)']
    }
];

// Dados das moléculas do jogo
const moleculasJogo = [
    {
        nome: 'Metano',
        formula: 'CH₄',
        descricao: 'Gás incolor e inodoro, principal componente do gás natural',
        funcaoPrincipal: 'hidrocarboneto',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 125, y: 100 },
                { tipo: 'H', x: 95, y: 70 },
                { tipo: 'H', x: 155, y: 70 },
                { tipo: 'H', x: 95, y: 130 },
                { tipo: 'H', x: 155, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'simples' },
                { de: 0, para: 2, tipo: 'simples' },
                { de: 0, para: 3, tipo: 'simples' },
                { de: 0, para: 4, tipo: 'simples' }
            ]
        }
    },
    {
        nome: 'Etanol',
        formula: 'C₂H₅OH',
        descricao: 'Álcool encontrado em bebidas alcoólicas, usado como combustível',
        funcaoPrincipal: 'alcool',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 100, y: 100 },
                { tipo: 'C', x: 150, y: 100 },
                { tipo: 'O', x: 200, y: 100 },
                { tipo: 'H', x: 70, y: 70 },
                { tipo: 'H', x: 70, y: 130 },
                { tipo: 'H', x: 130, y: 130 },
                { tipo: 'H', x: 170, y: 70 },
                { tipo: 'H', x: 170, y: 130 },
                { tipo: 'H', x: 230, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'simples' },
                { de: 1, para: 2, tipo: 'simples' },
                { de: 2, para: 8, tipo: 'simples' },
                { de: 0, para: 3, tipo: 'simples' },
                { de: 0, para: 4, tipo: 'simples' },
                { de: 1, para: 5, tipo: 'simples' },
                { de: 1, para: 6, tipo: 'simples' },
                { de: 1, para: 7, tipo: 'simples' }
            ]
        },
        destaque: [2, 8] // Oxigênio e hidrogênio do grupo OH
    },
    {
        nome: 'Ácido Acético',
        formula: 'CH₃COOH',
        descricao: 'Principal componente do vinagre, usado em conservação de alimentos',
        funcaoPrincipal: 'acido',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 80, y: 100 },
                { tipo: 'C', x: 130, y: 100 },
                { tipo: 'O', x: 180, y: 100 },
                { tipo: 'O', x: 130, y: 140 },
                { tipo: 'H', x: 50, y: 70 },
                { tipo: 'H', x: 50, y: 130 },
                { tipo: 'H', x: 110, y: 130 },
                { tipo: 'H', x: 210, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'simples' },
                { de: 1, para: 2, tipo: 'dupla' },
                { de: 1, para: 3, tipo: 'simples' },
                { de: 3, para: 7, tipo: 'simples' },
                { de: 0, para: 4, tipo: 'simples' },
                { de: 0, para: 5, tipo: 'simples' },
                { de: 0, para: 6, tipo: 'simples' }
            ]
        },
        destaque: [1, 2, 3, 7] // Grupo carboxila
    },
    {
        nome: 'Acetona',
        formula: 'CH₃COCH₃',
        descricao: 'Solvente orgânico comum, usado em removedores de esmalte',
        funcaoPrincipal: 'cetona',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 70, y: 100 },
                { tipo: 'C', x: 120, y: 100 },
                { tipo: 'C', x: 170, y: 100 },
                { tipo: 'O', x: 120, y: 60 },
                { tipo: 'H', x: 40, y: 70 },
                { tipo: 'H', x: 40, y: 130 },
                { tipo: 'H', x: 100, y: 130 },
                { tipo: 'H', x: 140, y: 130 },
                { tipo: 'H', x: 200, y: 70 },
                { tipo: 'H', x: 200, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'simples' },
                { de: 1, para: 2, tipo: 'simples' },
                { de: 1, para: 3, tipo: 'dupla' },
                { de: 0, para: 4, tipo: 'simples' },
                { de: 0, para: 5, tipo: 'simples' },
                { de: 0, para: 6, tipo: 'simples' },
                { de: 2, para: 7, tipo: 'simples' },
                { de: 2, para: 8, tipo: 'simples' },
                { de: 2, para: 9, tipo: 'simples' }
            ]
        },
        destaque: [1, 3] // Grupo carbonila
    },
    {
        nome: 'Eteno',
        formula: 'C₂H₄',
        descricao: 'Gás usado na produção de plásticos e frutas artificiais',
        funcaoPrincipal: 'alceno',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 100, y: 100 },
                { tipo: 'C', x: 150, y: 100 },
                { tipo: 'H', x: 70, y: 70 },
                { tipo: 'H', x: 70, y: 130 },
                { tipo: 'H', x: 180, y: 70 },
                { tipo: 'H', x: 180, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'dupla' },
                { de: 0, para: 2, tipo: 'simples' },
                { de: 0, para: 3, tipo: 'simples' },
                { de: 1, para: 4, tipo: 'simples' },
                { de: 1, para: 5, tipo: 'simples' }
            ]
        },
        destaque: [0, 1] // Ligação dupla
    },
    {
        nome: 'Metilamina',
        formula: 'CH₃NH₂',
        descricao: 'Composto nitrogenado usado na produção de detergentes',
        funcaoPrincipal: 'amina',
        estrutura: {
            atomos: [
                { tipo: 'C', x: 100, y: 100 },
                { tipo: 'N', x: 150, y: 100 },
                { tipo: 'H', x: 70, y: 70 },
                { tipo: 'H', x: 70, y: 130 },
                { tipo: 'H', x: 130, y: 130 },
                { tipo: 'H', x: 180, y: 70 },
                { tipo: 'H', x: 180, y: 130 }
            ],
            ligacoes: [
                { de: 0, para: 1, tipo: 'simples' },
                { de: 0, para: 2, tipo: 'simples' },
                { de: 0, para: 3, tipo: 'simples' },
                { de: 0, para: 4, tipo: 'simples' },
                { de: 1, para: 5, tipo: 'simples' },
                { de: 1, para: 6, tipo: 'simples' }
            ]
        },
        destaque: [1, 5, 6] // Grupo amino
    }
];

// Estado do jogo
let jogoOrganico = {
    moleculaAtual: 0,
    pontuacao: 0,
    respostaSelecionada: null,
    verificacaoRealizada: false,
    dicaMostrada: false
};

// Elementos DOM
let elementosOrganicos = {};

// Inicialização do jogo
function inicializarJogoOrganico() {
    elementosOrganicos = {
        cartaoMolecula: document.getElementById('cartao-molecula'),
        nomeMolecula: document.getElementById('nome-molecula'),
        formulaMolecula: document.getElementById('formula-molecula'),
        descricaoMolecula: document.getElementById('descricao-molecula'),
        estruturaMolecula: document.getElementById('estrutura-molecula'),
        grupoFuncional: document.getElementById('grupo-funcional'),
        destacadoFuncional: document.getElementById('destacado-funcional'),
        gridFuncoes: document.getElementById('grid-funcoes'),
        listaFuncoes: document.getElementById('lista-funcoes'),
        botaoVerificar: document.getElementById('botao-verificar'),
        botaoProxima: document.getElementById('botao-proxima'),
        botaoDica: document.getElementById('botao-dica'),
        feedback: document.getElementById('feedback'),
        mensagemFeedback: document.getElementById('mensagem-feedback'),
        pontuacao: document.getElementById('pontuacao'),
        barraProgresso: document.getElementById('barra-progresso'),
        progressoTexto: document.getElementById('progresso-texto')
    };

    configurarEventosOrganicos();
    criarBotoesFuncoes();
    carregarMoleculaAtual();
    atualizarInterfaceOrganica();
}

// Configurar eventos
function configurarEventosOrganicos() {
    elementosOrganicos.botaoVerificar.addEventListener('click', verificarFuncao);
    elementosOrganicos.botaoProxima.addEventListener('click', proximaMolecula);
    elementosOrganicos.botaoDica.addEventListener('click', mostrarDica);
}

// Criar botões das funções orgânicas
function criarBotoesFuncoes() {
    elementosOrganicos.gridFuncoes.innerHTML = '';

    funcoesOrganicas.forEach(funcao => {
        const botao = document.createElement('button');
        botao.className = 'botao-funcao';
        botao.dataset.funcao = funcao.id;

        botao.innerHTML = `
            <div class="icone-funcao">${funcao.icone}</div>
            <div class="info-funcao">
                <div class="nome-funcao">${funcao.nome}</div>
                <div class="exemplo-funcao">${funcao.grupoFuncional}</div>
            </div>
        `;

        botao.addEventListener('click', () => selecionarFuncao(funcao.id));
        elementosOrganicos.gridFuncoes.appendChild(botao);
    });

    // Mostrar informações das funções
    mostrarInfoFuncoes();
}

// Mostrar informações das funções
function mostrarInfoFuncoes() {
    elementosOrganicos.listaFuncoes.innerHTML = '';

    funcoesOrganicas.slice(0, 6).forEach(funcao => { // Mostrar apenas as primeiras 6
        const div = document.createElement('div');
        div.className = 'info-funcao-detalhe';
        div.innerHTML = `
            <div class="nome-funcao-detalhe">${funcao.icone} ${funcao.nome}</div>
            <div class="descricao-funcao-detalhe">${funcao.descricao}</div>
        `;
        elementosOrganicos.listaFuncoes.appendChild(div);
    });
}

// Carregar molécula atual
function carregarMoleculaAtual() {
    const molecula = moleculasJogo[jogoOrganico.moleculaAtual];

    elementosOrganicos.nomeMolecula.textContent = molecula.nome;
    elementosOrganicos.formulaMolecula.textContent = molecula.formula;
    elementosOrganicos.descricaoMolecula.textContent = molecula.descricao;

    // Desenhar estrutura da molécula
    desenharMolecula(molecula);

    // Limpar seleções
    document.querySelectorAll('.botao-funcao.ativo').forEach(btn => btn.classList.remove('ativo'));
    jogoOrganico.respostaSelecionada = null;
    jogoOrganico.verificacaoRealizada = false;
    jogoOrganico.dicaMostrada = false;

    // Limpar destaques
    elementosOrganicos.destacadoFuncional.innerHTML = '';
    elementosOrganicos.destacadoFuncional.classList.remove('grupo-destacado');
}

// Desenhar molécula
function desenharMolecula(molecula) {
    elementosOrganicos.estruturaMolecula.innerHTML = '';

    // Desenhar ligações primeiro (para ficarem atrás)
    molecula.estrutura.ligacoes.forEach(ligacao => {
        const atomo1 = molecula.estrutura.atomos[ligacao.de];
        const atomo2 = molecula.estrutura.atomos[ligacao.para];

        desenharLigacao(atomo1, atomo2, ligacao.tipo);
    });

    // Desenhar átomos
    molecula.estrutura.atomos.forEach((atomo, index) => {
        const elementoAtomo = document.createElement('div');
        elementoAtomo.className = `atomo-organico atomo-${atomo.tipo.toLowerCase()}`;

        // Verificar se é parte do grupo funcional destacado
        if (molecula.destaque && molecula.destaque.includes(index)) {
            elementoAtomo.classList.add('destaque-funcional');
        }

        elementoAtomo.textContent = atomo.tipo;
        elementoAtomo.style.left = atomo.x - 20 + 'px';
        elementoAtomo.style.top = atomo.y - 20 + 'px';

        elementosOrganicos.estruturaMolecula.appendChild(elementoAtomo);
    });
}

// Desenhar ligação entre átomos
function desenharLigacao(atomo1, atomo2, tipo) {
    const dx = atomo2.x - atomo1.x;
    const dy = atomo2.y - atomo1.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    const angulo = Math.atan2(dy, dx) * 180 / Math.PI;

    const ligacao = document.createElement('div');
    ligacao.className = `ligacao ligacao-${tipo}`;
    ligacao.style.width = distancia + 'px';
    ligacao.style.left = atomo1.x + 'px';
    ligacao.style.top = atomo1.y + 'px';
    ligacao.style.transformOrigin = '0 50%';
    ligacao.style.transform = `rotate(${angulo}deg)`;

    elementosOrganicos.estruturaMolecula.appendChild(ligacao);
}

// Selecionar função
function selecionarFuncao(funcaoId) {
    // Remover seleção anterior
    document.querySelectorAll('.botao-funcao.ativo').forEach(btn => btn.classList.remove('ativo'));

    // Adicionar seleção atual
    const botaoSelecionado = document.querySelector(`[data-funcao="${funcaoId}"]`);
    botaoSelecionado.classList.add('ativo');

    jogoOrganico.respostaSelecionada = funcaoId;
}

// Verificar função
function verificarFuncao() {
    if (!jogoOrganico.respostaSelecionada) {
        mostrarMensagem('Selecione uma função orgânica primeiro!', 'erro');
        return;
    }

    if (jogoOrganico.verificacaoRealizada) {
        mostrarMensagem('Verificação já realizada! Clique em "Próxima Molécula".', 'erro');
        return;
    }

    jogoOrganico.verificacaoRealizada = true;

    const molecula = moleculasJogo[jogoOrganico.moleculaAtual];
    const funcaoCorreta = molecula.funcaoPrincipal;
    const respostaCorreta = jogoOrganico.respostaSelecionada === funcaoCorreta;

    // Destacar função correta
    const botaoCorreto = document.querySelector(`[data-funcao="${funcaoCorreta}"]`);
    botaoCorreto.classList.add('correto');

    if (respostaCorreta) {
        jogoOrganico.pontuacao += 100;
        if (!jogoOrganico.dicaMostrada) {
            jogoOrganico.pontuacao += 50; // Bônus por não usar dica
        }

        const bonusTexto = jogoOrganico.dicaMostrada ? '100' : '150';
        mostrarMensagem(`Correto! +${bonusTexto} pontos. ${molecula.nome} pertence à função ${funcoesOrganicas.find(f => f.id === funcaoCorreta).nome}.`, 'sucesso');

        // Mostrar destaque do grupo funcional
        mostrarDestaqueFuncional(molecula);
    } else {
        jogoOrganico.pontuacao = Math.max(0, jogoOrganico.pontuacao - 30);
        const funcaoCorretaNome = funcoesOrganicas.find(f => f.id === funcaoCorreta).nome;
        mostrarMensagem(`Incorreto! ${molecula.nome} pertence à função ${funcaoCorretaNome}. -30 pontos.`, 'erro');
    }

    atualizarInterfaceOrganica();
}

// Mostrar destaque do grupo funcional
function mostrarDestaqueFuncional(molecula) {
    if (!molecula.destaque) return;

    // Copiar átomos destacados para a área de destaque
    elementosOrganicos.destacadoFuncional.innerHTML = '';

    molecula.destaque.forEach(index => {
        const atomoOriginal = molecula.estrutura.atomos[index];
        const atomoDestacado = document.createElement('div');
        atomoDestacado.className = `atomo-organico atomo-${atomoOriginal.tipo.toLowerCase()}`;

        // Posicionar relativamente na área de destaque
        const posX = (index - molecula.destaque[0]) * 60 + 50;
        atomoDestacado.style.left = posX + 'px';
        atomoDestacado.style.top = '50px';
        atomoDestacado.textContent = atomoOriginal.tipo;

        elementosOrganicos.destacadoFuncional.appendChild(atomoDestacado);
    });

    // Adicionar efeito de destaque
    elementosOrganicos.destacadoFuncional.classList.add('grupo-destacado');
}

// Próxima molécula
function proximaMolecula() {
    if (!jogoOrganico.verificacaoRealizada) {
        mostrarMensagem('Verifique a função primeiro!', 'erro');
        return;
    }

    jogoOrganico.moleculaAtual++;

    if (jogoOrganico.moleculaAtual >= moleculasJogo.length) {
        // Jogo completo
        finalizarJogoOrganico();
    } else {
        // Carregar próxima molécula
        carregarMoleculaAtual();
    }
}

// Mostrar dica
function mostrarDica() {
    const molecula = moleculasJogo[jogoOrganico.moleculaAtual];
    const funcao = funcoesOrganicas.find(f => f.id === molecula.funcaoPrincipal);

    elementosOrganicos.mensagemFeedback.textContent = `Dica: Observe os átomos especiais. ${funcao.descricao}`;
    elementosOrganicos.mensagemFeedback.className = 'mensagem-feedback dica';
    elementosOrganicos.feedback.classList.add('mostrar');

    jogoOrganico.dicaMostrada = true;
    jogoOrganico.pontuacao = Math.max(0, jogoOrganico.pontuacao - 15);

    setTimeout(() => {
        elementosOrganicos.feedback.classList.remove('mostrar');
    }, 8000);

    atualizarInterfaceOrganica();
}

// Finalizar jogo
function finalizarJogoOrganico() {
    const pontuacaoFinal = jogoOrganico.pontuacao;
    const totalMoleculas = moleculasJogo.length;

    let classificacao = '';
    if (pontuacaoFinal >= 700) {
        classificacao = 'Excelente! Você é um mestre das funções orgânicas!';
    } else if (pontuacaoFinal >= 500) {
        classificacao = 'Muito bom! Você entende bem a química orgânica.';
    } else if (pontuacaoFinal >= 300) {
        classificacao = 'Bom trabalho! Continue praticando as funções orgânicas.';
    } else {
        classificacao = 'Que tal revisar as funções orgânicas? Cada grupo funcional tem suas características!';
    }

    mostrarMensagem(`Jogo completo! Pontuação: ${pontuacaoFinal} pontos. ${classificacao}`, 'sucesso');

    // Salvar pontuação
    salvarPontuacao('Classificador Orgânico', pontuacaoFinal);
}

// Atualizar interface
function atualizarInterfaceOrganica() {
    elementosOrganicos.pontuacao.textContent = jogoOrganico.pontuacao;

    const progresso = ((jogoOrganico.moleculaAtual + 1) / moleculasJogo.length) * 100;
    elementosOrganicos.barraProgresso.style.width = progresso + '%';
    elementosOrganicos.progressoTexto.textContent = `Molécula ${jogoOrganico.moleculaAtual + 1} de ${moleculasJogo.length}`;
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    elementosOrganicos.mensagemFeedback.textContent = texto;
    elementosOrganicos.mensagemFeedback.className = `mensagem-feedback ${tipo}`;
    elementosOrganicos.feedback.classList.add('mostrar');

    setTimeout(() => {
        elementosOrganicos.feedback.classList.remove('mostrar');
    }, 5000);
}

// Salvar pontuação (placeholder)
function salvarPontuacao(jogo, pontos) {
    console.log(`Pontuação salva: ${jogo} - ${pontos} pontos`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', inicializarJogoOrganico);