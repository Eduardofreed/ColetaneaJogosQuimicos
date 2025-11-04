"use strict";

// Referências do DOM
const tabuleiro = document.getElementById('tabuleiro-jogo');
const labelJ1 = document.getElementById('label-j1');
const labelJ2 = document.getElementById('label-j2');
const pontosJ1 = document.getElementById('pontos-j1');
const pontosJ2 = document.getElementById('pontos-j2');
const statusTexto = document.getElementById('status-texto');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const curiosidadeContainer = document.getElementById('curiosidade-container');
const curiosidadeTitulo = document.getElementById('curiosidade-titulo');
const curiosidadeTexto = document.getElementById('curiosidade-texto');
const toggleCPU = document.getElementById('toggle-cpu');
const dificuldadeContainer = document.getElementById('dificuldade-container');
const selectDificuldade = document.getElementById('select-dificuldade');
const selectTipoLigacao = document.getElementById('select-tipo-ligacao');

// Event listener de reinício
botaoReiniciar.addEventListener('click', () => {
    tocarClick();
    iniciarJogo();
});

// Função para atualizar indicador visual do jogador ativo
function atualizarIndicadorJogadorAtivo() {
    const placarJ1 = document.querySelector('#label-j1').parentElement.parentElement;
    const placarJ2 = document.querySelector('#label-j2').parentElement.parentElement;

    // Remove classe ativo de ambos
    placarJ1.classList.remove('ativo');
    placarJ2.classList.remove('ativo');

    // Adiciona classe ativo ao jogador atual
    if (jogadorAtual === 1) {
        placarJ1.classList.add('ativo');
    } else {
        placarJ2.classList.add('ativo');
    }
}

// Função para forçar verificação de fim de jogo (útil para debug)
function forcarVerificacaoFimDeJogo() {
    console.log('🔍 FORÇANDO verificação de fim de jogo...');
    verificarFimDeJogo();
}

// Adicionar atalho de teclado para debug (Ctrl+D)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        forcarVerificacaoFimDeJogo();
    }
});

// Event listeners para o modo CPU
toggleCPU.addEventListener('change', function () {
    modoCPU = this.checked;
    dificuldadeContainer.style.display = modoCPU ? 'flex' : 'none';
    if (modoCPU) {
        labelJ2.textContent = "CPU";
        const nomeEquipeCustom = localStorage.getItem('nomeEquipe');
        labelJ1.textContent = nomeEquipeCustom ? nomeEquipeCustom : "Equipe";
    } else {
        labelJ2.textContent = nomeJogador2;
        labelJ1.textContent = nomeJogador1;
    }
});

selectDificuldade.addEventListener('change', function () {
    dificuldadeCPU = this.value;
});

// Event listener para mudança de tipo de ligação
selectTipoLigacao.addEventListener('change', function () {
    tipoLigacao = this.value;
    iniciarJogo(); // Reinicia o jogo com o novo tipo
});

// Dados do jogo - Elementos com suas propriedades
const dadosBaseCartas = [
    // Metais (formam ligações iônicas)
    { nome: 'Sódio', simbolo: 'Na', quantidade: 3, carga: 1, imagem: 'imagens/Na_memoriaIonica.png', tipo: 'metal' },
    { nome: 'Magnésio', simbolo: 'Mg', quantidade: 2, carga: 2, imagem: 'imagens/Mg_memoriaIonica.png', tipo: 'metal' },
    { nome: 'Alumínio', simbolo: 'Al', quantidade: 2, carga: 3, imagem: 'imagens/Al_memoriaIonica.png', tipo: 'metal' },
    { nome: 'Potássio', simbolo: 'K', quantidade: 5, carga: 1, imagem: 'imagens/K_memoriaIonica.png', tipo: 'metal' },

    // Não-metais (formam ligações covalentes e iônicas)
    { nome: 'Cloro', simbolo: 'Cl', quantidade: 6, carga: -1, imagem: 'imagens/Cl_memoriaIonica.png', tipo: 'nao-metal' },
    { nome: 'Oxigênio', simbolo: 'O', quantidade: 6, carga: -2, imagem: 'imagens/O_memoriaIonica.png', tipo: 'nao-metal' },
    { nome: 'Bromo', simbolo: 'Br', quantidade: 5, carga: -1, imagem: 'imagens/Br_memoriaIonica.png', tipo: 'nao-metal' },
    { nome: 'Hidrogênio', simbolo: 'H', quantidade: 6, carga: 1, imagem: 'imagens/H_memoriaIonica.png', tipo: 'nao-metal' },
    { nome: 'Carbono', simbolo: 'C', quantidade: 6, carga: 0, imagem: 'imagens/C_memoriaIonica.png', tipo: 'nao-metal' },
    { nome: 'Nitrogênio', simbolo: 'N', quantidade: 6, carga: 0, imagem: 'imagens/N_memoriaIonica.png', tipo: 'nao-metal' }
];

// Compostos válidos por tipo de ligação
const compostosIonicos = [
    'NaCl', 'KBr', 'KCl', 'NaBr',
    'MgO', 'MgCl2', 'MgBr2',
    'K2O', 'KOH',
    'Na2O', 'NaOH',
    'AlCl3', 'AlBr3',
    'Al2O3',
    'HCl'
];

const compostosCovalentes = [
    'H2O', 'HNO3',
    'CO2', 'CH4', 'CO', 'O2', 'N2', 'H2', 'Cl2', 'Br2'
];

const compostosMistos = [
    ...compostosIonicos,
    ...compostosCovalentes
];

// Função para obter compostos válidos baseado no tipo de ligação
function obterCompostosValidos(tipoLigacao) {
    switch (tipoLigacao) {
        case 'ionica':
            return compostosIonicos;
        case 'covalente':
            return compostosCovalentes;
        case 'mista':
        default:
            return compostosMistos;
    }
}

// Função para verificar se uma combinação é válida para o tipo de ligação
function verificarValidadeCombinacao(combinacao, tipoLigacao) {
    const simbolos = combinacao.map(carta => carta.dataset.simbolo);
    const tipos = simbolos.map(simbolo =>
        dadosBaseCartas.find(c => c.simbolo === simbolo).tipo
    );

    // Primeiro verifica se a fórmula formada é válida independente do tipo
    const formula = formatarComposto(combinacao);
    const compostosValidos = obterCompostosValidos(tipoLigacao);

    if (!compostosValidos.includes(formula)) {
        return false;
    }

    switch (tipoLigacao) {
        case 'ionica':
            // Deve ter pelo menos um metal e um não-metal
            return tipos.includes('metal') && tipos.includes('nao-metal');
        case 'covalente':
            // Deve ter apenas não-metais
            return tipos.every(tipo => tipo === 'nao-metal');
        case 'mista':
        default:
            // Para modo misto, aceitamos qualquer combinação válida
            return true;
    }
}

const compostosConhecidos = {
    // Compostos iônicos
    'NaCl': 'NaCl (Cloreto de Sódio), o famoso sal de cozinha!',
    'MgO': 'MgO (Óxido de Magnésio), usado como antiácido.',
    'Al2O3': 'Al₂O₃ (Óxido de Alumínio), conhecido como alumina, uma excelente isolante elétrica, muito utilizada em componentes eletrônicos.',
    'KCl': 'KCl (Cloreto de Potássio), usado em fertilizantes.',
    'KBr': 'KBr (Brometo de Potássio), um sal com propriedades sedativas.',
    'NaBr': 'NaBr (Brometo de Sódio), um sal usado para tratar epilepsia.',
    'KOH': 'KOH (Hidróxido de Potássio), também conhecido como potassa cáustica, é uma base forte usada em diversas aplicações industriais.',
    'K2O': 'K₂O (Óxido de Potássio), um óxido básico que reage vigorosamente com água para formar hidróxido de potássio (KOH).',
    'MgBr2': 'MgBr₂ (Brometo de Magnésio), é empregado como retardante de chamas.',
    'MgCl2': 'MgCl₂ (Cloreto de Magnésio), um sal inorgânico encontrado na água do mar.',
    'Na2O': 'Na₂O (Óxido de Sódio), um óxido básico forte.',
    'AlCl3': 'AlCl₃ (Cloreto de Alumínio), usado como catalisador em reações químicas.',
    'HCl': 'HCl (Ácido Clorídrico), um ácido forte usado em diversas aplicações industriais como na fabricação de produtos químicos e na remoção de impurezas.',

    // Compostos covalentes
    'H2O': 'H₂O (Água), a substância mais abundante na Terra.',
    'HNO3': 'HNO₃ (Ácido Nítrico), um ácido forte usado na produção de fertilizantes, corantes e até mesmo explosivos como o TNT.',
    'CO2': 'CO₂ (Dióxido de Carbono), um gás essencial para a fotossíntese das plantas e usado para gaseificar bebidas e em extintores de incêndio.',
    'CH4': 'CH₄ (Metano), um gás conhecido como gás natural, usado principalmente como combustível para aquecimento e geração de eletricidade.',
    'CO': 'CO (Monóxido de Carbono), um gás tóxico e incolor, formado pela combustão incompleta de materiais orgânicos.',
    'O2': 'O₂ (Oxigênio molecular), essencial para a respiração dos seres vivos.',
    'N2': 'N₂ (Nitrogênio molecular), constitui cerca de 78% da atmosfera terrestre.',
    'H2': 'H₂ (Hidrogênio molecular), o elemento mais abundante do universo.',
    'Cl2': 'Cl₂ (Cloro molecular), um gás amarelo-esverdeado usado para purificação de água.',
    'Br2': 'Br₂ (Bromo molecular), um líquido vermelho-escuro usado em fotografia.'
};


// Variáveis de estado do Jogo
let cartasViradas = [];
let travarCliques = false;
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let jogadorAtual = 1;
let nomeJogador1 = localStorage.getItem('nomeJogador1') || "Jogador 1";
let nomeJogador2 = localStorage.getItem('nomeJogador2') || "Jogador 2";
let nomeEquipeCustom = localStorage.getItem('nomeEquipe') || null;
let modoJogo = localStorage.getItem('modoJogo') || 'multiplayer'; // 'singleplayer' ou 'multiplayer'
let modoCPU = false;
let dificuldadeCPU = 'medio'; // 'facil', 'medio', 'dificil'
let tipoLigacao = 'mista'; // 'ionica', 'covalente', 'mista'

// Controle de tempo e vitória
let tempoRestante = 300; // 5 minutos em segundos
let timerInterval = null;
let jogoIniciado = false;

// Cache para pontuação máxima (evita recálculos desnecessários)
let cachePontuacaoMaxima = null;
let cacheCartasRestantesCount = null;

// Funções do jogo
function jogadaCPU() {
    // Verificações de segurança
    if (!modoCPU || jogadorAtual !== 2 || travarCliques) {
        return;
    }

    travarCliques = true;
    statusTexto.textContent = "CPU está pensando...";

    setTimeout(() => {
        // Verificação adicional antes de jogar
        if (jogadorAtual !== 2 || !modoCPU) {
            travarCliques = false;
            return;
        }

        const cartasDisponiveis = Array.from(document.querySelectorAll('.carta:not(.virada):not(.combinada)'));

        if (cartasDisponiveis.length < 2) {
            verificarFimDeJogo();
            return;
        }

        let cartasSelecionadas = [];
        let maxCartas = 5;

        // Define o número máximo de cartas com base na dificuldade
        switch (dificuldadeCPU) {
            case 'facil':
                maxCartas = Math.floor(Math.random() * 2) + 2; // 2-3 cartas
                break;
            case 'medio':
                maxCartas = Math.floor(Math.random() * 2) + 3; // 3-4 cartas
                break;
            case 'dificil':
                maxCartas = Math.floor(Math.random() * 2) + 4; // 4-5 cartas
                break;
        }

        // Limita ao número de cartas disponíveis
        maxCartas = Math.min(maxCartas, cartasDisponiveis.length);

        // Seleciona cartas aleatoriamente
        for (let i = 0; i < maxCartas && cartasDisponiveis.length > 0; i++) {
            const indice = Math.floor(Math.random() * cartasDisponiveis.length);
            const carta = cartasDisponiveis.splice(indice, 1)[0];
            cartasSelecionadas.push(carta);
            carta.classList.add('virada');
            tocarVirarCarta();
        }

        cartasViradas = cartasSelecionadas;
        statusTexto.textContent = "CPU está verificando combinações...";

        setTimeout(() => {
            // Verificação final antes de processar
            if (jogadorAtual === 2 && modoCPU) {
                const combosEncontrados = encontrarTodosOsCombos(cartasViradas);
                if (combosEncontrados.length > 0) {
                    tratarSucesso(combosEncontrados);
                } else {
                    tratarFalha();
                }
            } else {
                // Se o estado mudou, apenas libera os cliques
                travarCliques = false;
            }
        }, 1500);

    }, 1500); // 1.5 segundos de delay para parecer que está pensando
}

function criarBaralho() {
    const baralho = [];
    dadosBaseCartas.forEach(tipoCarta => {
        for (let i = 0; i < tipoCarta.quantidade; i++) {
            baralho.push({ ...tipoCarta });
        }
    });

    // Otimizar número de cartas baseado no tamanho da tela
    const larguraTela = window.innerWidth;
    let maxCartas;

    if (larguraTela >= 1200) {
        maxCartas = 40; // Desktop grande
    } else if (larguraTela >= 768) {
        maxCartas = 32; // Tablet
    } else if (larguraTela >= 480) {
        maxCartas = 24; // Mobile médio
    } else {
        maxCartas = 16;  // Mobile pequeno
    }

    // Se temos mais cartas que o máximo, reduzir proporcionalmente
    if (baralho.length > maxCartas) {
        const proporcao = maxCartas / baralho.length;
        const novoBaralho = [];

        dadosBaseCartas.forEach(tipoCarta => {
            const cartasTipo = Math.max(2, Math.floor(tipoCarta.quantidade * proporcao));
            for (let i = 0; i < cartasTipo; i++) {
                novoBaralho.push({ ...tipoCarta });
            }
        });

        return novoBaralho;
    }

    return baralho;
}

function embaralhar(baralho) {
    for (let i = baralho.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }
}

function distribuirCartas(baralho) {
    tabuleiro.innerHTML = '';
    baralho.forEach(infoCarta => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.simbolo = infoCarta.simbolo;
        cartaElemento.dataset.carga = infoCarta.carga;
        const verso = document.createElement('div');
        verso.classList.add('face', 'verso');
        const frente = document.createElement('div');
        frente.classList.add('face', 'frente');
        frente.style.backgroundImage = `url('${infoCarta.imagem}')`;
        cartaElemento.appendChild(verso);
        cartaElemento.appendChild(frente);
        cartaElemento.addEventListener('click', virarCarta);
        tabuleiro.appendChild(cartaElemento);
    });
}

function virarCarta(evento) {
    // Impede jogadas durante o turno da CPU
    if (travarCliques || (modoCPU && jogadorAtual === 2)) return;

    const cartaClicada = evento.currentTarget;
    if (cartaClicada.classList.contains('virada')) return;

    if (cartasViradas.length < 5) {
        cartaClicada.classList.add('virada');
        cartasViradas.push(cartaClicada);
        tocarVirarCarta();
    }

    if (cartasViradas.length === 5) {
        travarCliques = true;
        statusTexto.textContent = "Verificando combinações...";
        setTimeout(() => {
            const combosEncontrados = encontrarTodosOsCombos(cartasViradas);
            if (combosEncontrados.length > 0) {
                tratarSucesso(combosEncontrados);
            } else {
                tratarFalha();
            }
        }, 1500);
    }
}

function encontrarTodosOsCombos(cartas) {
    let poolDeCartas = [...cartas];
    const combosRealizados = [];
    const compostosValidos = obterCompostosValidos(tipoLigacao);

    let encontrouComboNestaRodada = true;
    while (encontrouComboNestaRodada) {
        encontrouComboNestaRodada = false;
        // Itera por todos os subconjuntos possíveis do pool de cartas atual
        for (let i = (1 << poolDeCartas.length) - 1; i > 0; i--) {
            const subconjunto = [];
            let cargaTotal = 0;
            for (let j = 0; j < poolDeCartas.length; j++) {
                if ((i >> j) & 1) {
                    subconjunto.push(poolDeCartas[j]);
                    cargaTotal += parseInt(poolDeCartas[j].dataset.carga);
                }
            }

            if (subconjunto.length >= 2) {
                const formula = formatarComposto(subconjunto);

                // Verifica se a fórmula está na lista de compostos válidos
                if (compostosValidos.includes(formula)) {
                    // Para compostos covalentes, aceitamos independente da soma das cargas
                    // Para compostos iônicos, verificamos se é válido pelo tipo de ligação
                    if (verificarValidadeCombinacao(subconjunto, tipoLigacao)) {
                        combosRealizados.push(subconjunto);
                        poolDeCartas = poolDeCartas.filter(carta => !subconjunto.includes(carta));
                        encontrouComboNestaRodada = true;
                        break;
                    }
                }
            }
        }
    }
    return combosRealizados; // Retorna uma lista de combos (lista de listas de cartas)
}


function formatarComposto(combinacao) {
    const contagem = {};
    combinacao.forEach(carta => {
        const simbolo = carta.dataset.simbolo;
        contagem[simbolo] = (contagem[simbolo] || 0) + 1;
    });

    const simbolosUnicos = Object.keys(contagem);

    // Verifica se é um hidróxido (tem metal + O + H)
    const temMetal = simbolosUnicos.some(s => dadosBaseCartas.find(c => c.simbolo === s)?.tipo === 'metal');
    const temO = contagem['O'] > 0;
    const temH = contagem['H'] > 0;
    const isHidroxido = temMetal && temO && temH;

    if (isHidroxido) {
        // Para hidróxidos, a ordem é: Metal + O + H
        simbolosUnicos.sort((a, b) => {
            const tipoA = dadosBaseCartas.find(c => c.simbolo === a)?.tipo;
            const tipoB = dadosBaseCartas.find(c => c.simbolo === b)?.tipo;

            // Metal primeiro
            if (tipoA === 'metal' && tipoB !== 'metal') return -1;
            if (tipoA !== 'metal' && tipoB === 'metal') return 1;

            // Depois O, depois H
            if (a === 'O' && b === 'H') return -1;
            if (a === 'H' && b === 'O') return 1;

            // Depois ordena alfabeticamente
            return a.localeCompare(b);
        });
    } else {
        // Para outros compostos, ordena por carga e depois alfabeticamente
        simbolosUnicos.sort((a, b) => {
            const cargaA = parseInt(dadosBaseCartas.find(c => c.simbolo === a).carga);
            const cargaB = parseInt(dadosBaseCartas.find(c => c.simbolo === b).carga);
            if (cargaA > 0 && cargaB < 0) return -1;
            if (cargaA < 0 && cargaB > 0) return 1;
            return a.localeCompare(b);
        });
    }

    let formula = '';
    simbolosUnicos.forEach(simbolo => {
        formula += simbolo;
        const quantidade = contagem[simbolo];
        if (quantidade > 1) {
            formula += quantidade;
        }
    });
    return formula;
}

// Função de Sucesso para Combos
function tratarSucesso(combos) {
    let pontosGanhos = 0;
    let todasCartasDoCombo = [];
    let textoCuriosidade = "";

    // Calcula pontos e prepara mensagens para cada combo encontrado
    combos.forEach(combo => {
        pontosGanhos += 1; // Cada composto formado dá 1 ponto
        todasCartasDoCombo.push(...combo);
        const compostoFormado = formatarComposto(combo);
        textoCuriosidade += (compostosConhecidos[compostoFormado] || `Você formou o composto válido ${compostoFormado}!`) + "<br><br>";
    });

    // Adiciona um ponto de bônus se mais de um combo foi feito
    const nomeJogador = jogadorAtual === 1 ? nomeJogador1 : nomeJogador2;
    if (combos.length > 1) {
        pontosGanhos++;
        curiosidadeTitulo.textContent = "COMBO!";
    } else {
        curiosidadeTitulo.textContent = "Composto Formado!";
    }

    statusTexto.textContent = `Ponto para ${nomeJogador}! +${pontosGanhos}`;
    // Adiciona informação do jogador no início do texto do popup
    const textoComJogador = `<strong style="color: var(--primary-color); font-size: 1.2em;">${nomeJogador} marcou +${pontosGanhos} ponto${pontosGanhos > 1 ? 's' : ''}!</strong><br><br>${textoCuriosidade}`;
    curiosidadeTexto.innerHTML = textoComJogador;
    curiosidadeContainer.className = 'curiosidade-container-visivel';

    if (jogadorAtual === 1) {
        pontosJogador1 += pontosGanhos;
        pontosJ1.textContent = pontosJogador1;
    } else {
        pontosJogador2 += pontosGanhos;
        pontosJ2.textContent = pontosJogador2;
    }

    tocarCombinacao();
    todasCartasDoCombo.forEach(carta => carta.classList.add('combinada'));

    setTimeout(() => {
        curiosidadeContainer.className = 'curiosidade-container-oculto';
        todasCartasDoCombo.forEach(carta => carta.remove());
        const cartasNaoUsadas = cartasViradas.filter(c => !todasCartasDoCombo.includes(c));
        cartasNaoUsadas.forEach(c => c.classList.remove('virada'));

        proximoTurno();
    }, 1200 + (combos.length * 1000)); // Adiciona tempo extra para ler múltiplos combos
}

function tratarFalha() {
    statusTexto.textContent = "Nenhuma combinação válida encontrada.";
    setTimeout(() => {
        cartasViradas.forEach(c => c.classList.remove('virada'));
        proximoTurno();
    }, 1500);
}

function proximoTurno() {
    cartasViradas = [];
    travarCliques = false;
    jogadorAtual = (jogadorAtual === 1) ? 2 : 1;

    // Atualizar indicador visual do jogador ativo
    atualizarIndicadorJogadorAtivo();

    // Verificar fim de jogo antes de continuar
    verificarFimDeJogo();

    // Só continua se o jogo não acabou
    if (travarCliques) {
        return;
    }

    if (modoCPU && jogadorAtual === 2) {
        statusTexto.textContent = "Vez da CPU";
        setTimeout(() => {
            if (jogadorAtual === 2 && modoCPU && !travarCliques) { // Verificação adicional de segurança
                jogadaCPU();
            }
        }, 1000);
    } else {
        const nomeJogadorAtual = (jogadorAtual === 1)
            ? (modoCPU ? (nomeEquipeCustom ? nomeEquipeCustom : "Equipe") : nomeJogador1)
            : nomeJogador2;
        statusTexto.textContent = `Vez de ${nomeJogadorAtual}`;
    }
}

// Função para calcular pontuação máxima possível com as cartas restantes
function calcularPontuacaoMaximaPossivel(cartasRestantes) {
    if (cartasRestantes.length < 2) return 0;

    // Converte NodeList para Array e extrai dados das cartas
    const cartas = Array.from(cartasRestantes).map(carta => ({
        elemento: carta,
        simbolo: carta.dataset.simbolo,
        carga: parseInt(carta.dataset.carga)
    }));

    // Simula todas as rodadas possíveis do jogo
    return simularRodadasOtimizadas(cartas);
}

// Função que simula as rodadas do jogo de forma otimizada (versão simplificada)
function simularRodadasOtimizadas(cartasDisponiveis) {
    let cartasAtuais = [...cartasDisponiveis];

    // Versão simplificada: estima baseada em tipos de cartas (estimativa conservadora)
    const tiposPositivos = {};
    const tiposNegativos = {};

    cartasAtuais.forEach(carta => {
        if (carta.carga > 0) {
            tiposPositivos[carta.simbolo] = (tiposPositivos[carta.simbolo] || 0) + 1;
        } else if (carta.carga < 0) {
            tiposNegativos[carta.simbolo] = (tiposNegativos[carta.simbolo] || 0) + 1;
        }
    });

    // Estima conservadora: assume que cada tipo pode formar no máximo 2 pontos
    // Limita pelo número de tipos disponíveis e pelo total de cartas
    const estimativaConservadora = Math.min(
        Object.keys(tiposPositivos).length * 2,
        Object.keys(tiposNegativos).length * 2,
        Math.floor(cartasAtuais.length / 2) * 2
    );

    return estimativaConservadora;
}



// Função para calcular pontos de uma combinação
function calcularPontosCombo(combo) {
    if (combo.length < 2) return 0;

    // Cada composto formado dá 1 ponto
    return 1;
}

function verificarFimDeJogo() {
    const cartasRestantes = document.querySelectorAll('.carta');

    // Verifica se acabou as cartas (vitória normal)
    if (cartasRestantes.length < 2) {
        anunciarVencedor();
        return;
    }

    // Atualiza cache de pontuação máxima se necessário
    if (cacheCartasRestantesCount !== cartasRestantes.length) {
        cachePontuacaoMaxima = calcularPontuacaoMaximaPossivel(cartasRestantes);
        cacheCartasRestantesCount = cartasRestantes.length;
    }

    const pontuacaoMaximaPossivel = cachePontuacaoMaxima;
    const pontuacaoMaximaJ1 = pontosJogador1 + pontuacaoMaximaPossivel;
    const pontuacaoMaximaJ2 = pontosJogador2 + pontuacaoMaximaPossivel;

    // Debug: mostrar informações no console (apenas quando relevante)
    if (cartasRestantes.length <= 20 || pontuacaoMaximaPossivel === 0 || pontosJogador1 > pontuacaoMaximaJ2 || pontosJogador2 > pontuacaoMaximaJ1) {
        console.log('=== Verificação de Fim de Jogo ===');
        console.log(`Jogador 1: ${pontosJogador1} pontos (máx possível: ${pontuacaoMaximaJ1})`);
        console.log(`Jogador 2: ${pontosJogador2} pontos (máx possível: ${pontuacaoMaximaJ2})`);
        console.log(`Pontuação máxima possível restante: ${pontuacaoMaximaPossivel}`);
        console.log(`Cartas restantes: ${cartasRestantes.length}`);
        console.log('---');
    }

    // VITÓRIA ANTECIPADA: Reabilitada com estimativa conservadora
    if (pontosJogador1 > pontuacaoMaximaJ2) {
        travarCliques = true;
        pararTimer();
        statusTexto.textContent = `${nomeJogador1} já garantiu a vitória! (${pontosJogador1} > ${pontuacaoMaximaJ2})`;
        tocarVitoriaFinal();
        console.log(`🏆 VITÓRIA ANTECIPADA: ${nomeJogador1} já ganhou!`);
        return;
    }

    if (pontosJogador2 > pontuacaoMaximaJ1) {
        travarCliques = true;
        pararTimer();
        statusTexto.textContent = `${nomeJogador2} já garantiu a vitória! (${pontosJogador2} > ${pontuacaoMaximaJ1})`;
        tocarVitoriaFinal();
        console.log(`🏆 VITÓRIA ANTECIPADA: ${nomeJogador2} já ganhou!`);
        return;
    }

    // FIM DE JOGO: Se não há mais combinações possíveis
    if (pontuacaoMaximaPossivel === 0) {
        travarCliques = true;
        pararTimer();

        let mensagemFinal = "Não há mais combinações possíveis! ";
        if (pontosJogador1 > pontosJogador2) {
            mensagemFinal += `${nomeJogador1} venceu por pontos!`;
        } else if (pontosJogador2 > pontosJogador1) {
            mensagemFinal += `${nomeJogador2} venceu por pontos!`;
        } else {
            mensagemFinal += "Empate por pontos!";
        }

        statusTexto.textContent = mensagemFinal;
        tocarSomEmpate();
        console.log(`🏁 FIM DE JOGO: Não há mais combinações possíveis`);
        return;
    }

    // Continua o jogo se ainda há tempo e possibilidades
    if (tempoRestante > 0) {
        return;
    }

    // Tempo esgotado - fim de jogo por pontos
    finalizarJogoPorTempo();
}

// Funções de controle de tempo
function iniciarTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    tempoRestante = 300; // 5 minutos
    atualizarDisplayTimer();

    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTimer();

        if (tempoRestante <= 0) {
            finalizarJogoPorTempo();
        } else if (tempoRestante <= 60) {
            // Modo urgente nos últimos 60 segundos
            const timerText = document.getElementById('timer-text');
            if (timerText) {
                timerText.classList.add('urgente');
            }
        }
    }, 1000);
}

function atualizarDisplayTimer() {
    const timerText = document.getElementById('timer-text');
    if (!timerText) return;

    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    timerText.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function finalizarJogoPorTempo() {
    clearInterval(timerInterval);
    travarCliques = true;

    // Verificar se ainda havia combinações possíveis
    const cartasRestantes = document.querySelectorAll('.carta');
    const pontuacaoMaximaRestante = cachePontuacaoMaxima !== null ? cachePontuacaoMaxima : calcularPontuacaoMaximaPossivel(cartasRestantes);

    // Verificar vencedor por pontos
    let mensagemFinal = "Tempo esgotado! ";
    if (pontosJogador1 > pontosJogador2) {
        mensagemFinal += `${nomeJogador1} venceu por pontos!`;
    } else if (pontosJogador2 > pontosJogador1) {
        mensagemFinal += `${nomeJogador2} venceu por pontos!`;
    } else {
        mensagemFinal += "Empate por pontos!";
    }

    if (pontuacaoMaximaRestante > 0) {
        mensagemFinal += ` (havia ainda ${pontuacaoMaximaRestante} pontos possíveis)`;
    }

    statusTexto.textContent = mensagemFinal;
    tocarSomEmpate();
    console.log(`⏰ TEMPO ESGOTADO: ${mensagemFinal}`);
}

function pararTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    jogoIniciado = false;
}

function anunciarVencedor() {
    travarCliques = true;
    pararTimer(); // Para o timer quando o jogo acabar

    let mensagemFinal = "Fim de Jogo! ";
    let vencedor;
    if (pontosJogador1 > pontosJogador2) {
        mensagemFinal += `${nomeJogador1} venceu!`;
        vencedor = nomeJogador1;
    } else if (pontosJogador2 > pontosJogador1) {
        mensagemFinal += `${nomeJogador2} venceu!`;
        vencedor = nomeJogador2;
    } else {
        mensagemFinal += "Empate!";
        vencedor = 'empate';
    }
    statusTexto.textContent = mensagemFinal;
    if (vencedor !== 'empate') {
        tocarVitoriaFinal();
    }

    // Salvar partida no ranking com dados aprimorados
    const jogo = tipoLigacao === 'mista' ? 'Memória Mista' :
        tipoLigacao === 'ionica' ? 'Memória Iônica' : 'Memória Covalente';
    salvarPartida(nomeJogador1, nomeJogador2, pontosJogador1, pontosJogador2, jogo, tipoLigacao, tempoRestante);
}

function iniciarJogo() {
    pontosJogador1 = 0;
    pontosJogador2 = 0;

    // Ajusta o label do jogador 1 com base no modo
    if (modoCPU) {
        labelJ1.textContent = nomeEquipeCustom ? nomeEquipeCustom : "Equipe";
    } else {
        labelJ1.textContent = nomeJogador1;
    }

    // Ajusta o label do jogador 2 com base no modo
    if (modoCPU) {
        labelJ2.textContent = "CPU";
    } else {
        labelJ2.textContent = nomeJogador2;
    }

    pontosJ1.textContent = pontosJogador1;
    pontosJ2.textContent = pontosJogador2;
    jogadorAtual = 1;

    // Atualiza indicador visual do jogador ativo
    atualizarIndicadorJogadorAtivo();

    // Atualiza o título da página baseado no tipo de ligação
    const titulo = document.querySelector('.logo-texto p');
    switch (tipoLigacao) {
        case 'ionica':
            titulo.textContent = 'Memória Iônica';
            break;
        case 'covalente':
            titulo.textContent = 'Memória Covalente';
            break;
        case 'mista':
        default:
            titulo.textContent = 'Memória Mista';
            break;
    }

    // Inicia o controle de tempo
    iniciarTimer();

    const nomeAtual = (jogadorAtual === 1)
        ? (modoCPU ? (nomeEquipeCustom ? nomeEquipeCustom : "Equipe") : nomeJogador1)
        : (modoCPU ? "CPU" : nomeJogador2);
    statusTexto.textContent = `Vez de ${nomeAtual}`;
    travarCliques = false;
    cartasViradas = [];
    curiosidadeContainer.className = 'curiosidade-container-oculto';
    jogoIniciado = true;

    // Reseta o cache de pontuação máxima
    cachePontuacaoMaxima = null;
    cacheCartasRestantesCount = null;

    const baralho = criarBaralho();
    embaralhar(baralho);
    distribuirCartas(baralho);
}

iniciarJogo();

// Função para otimizar layout baseado no tamanho da tela
function otimizarLayout() {
    const tabuleiro = document.getElementById('tabuleiro-jogo');
    if (tabuleiro) {
        // Forçar recálculo do grid
        tabuleiro.style.display = 'none';
        setTimeout(() => {
            tabuleiro.style.display = 'grid';
            // Recalcular o número de colunas baseado no tamanho do container
            const containerWidth = tabuleiro.parentElement.offsetWidth;
            const cartaWidth = 80; // largura base da carta em px
            const gap = 12; // gap entre cartas em px
            const numColunas = Math.floor((containerWidth + gap) / (cartaWidth + gap));
            if (numColunas > 0) {
                tabuleiro.style.gridTemplateColumns = `repeat(${numColunas}, minmax(60px, 1fr))`;
            }
        }, 10);
    }
}

// Otimizar layout quando a janela for redimensionada
window.addEventListener('resize', () => {
    // Debounce para evitar muitas chamadas
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(otimizarLayout, 250);
});