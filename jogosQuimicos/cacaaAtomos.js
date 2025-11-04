// Caça aos Átomos - Jogo de Estrutura Atômica

// Dados dos átomos do jogo
const atomosJogo = [
    {
        simbolo: 'H',
        nome: 'Hidrogênio',
        numeroAtomico: 1,
        massaAtomica: 1,
        protons: 1,
        neutrons: 0,
        electrons: { k: 1, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'He',
        nome: 'Hélio',
        numeroAtomico: 2,
        massaAtomica: 4,
        protons: 2,
        neutrons: 2,
        electrons: { k: 2, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'Li',
        nome: 'Lítio',
        numeroAtomico: 3,
        massaAtomica: 7,
        protons: 3,
        neutrons: 4,
        electrons: { k: 2, l: 1, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'Be',
        nome: 'Berílio',
        numeroAtomico: 4,
        massaAtomica: 9,
        protons: 4,
        neutrons: 5,
        electrons: { k: 2, l: 2, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'B',
        nome: 'Boro',
        numeroAtomico: 5,
        massaAtomica: 11,
        protons: 5,
        neutrons: 6,
        electrons: { k: 2, l: 3, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'C',
        nome: 'Carbono',
        numeroAtomico: 6,
        massaAtomica: 12,
        protons: 6,
        neutrons: 6,
        electrons: { k: 2, l: 4, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'N',
        nome: 'Nitrogênio',
        numeroAtomico: 7,
        massaAtomica: 14,
        protons: 7,
        neutrons: 7,
        electrons: { k: 2, l: 5, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'O',
        nome: 'Oxigênio',
        numeroAtomico: 8,
        massaAtomica: 16,
        protons: 8,
        neutrons: 8,
        electrons: { k: 2, l: 6, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'F',
        nome: 'Flúor',
        numeroAtomico: 9,
        massaAtomica: 19,
        protons: 9,
        neutrons: 10,
        electrons: { k: 2, l: 7, m: 0, n: 0, o: 0, p: 0, q: 0 }
    },
    {
        simbolo: 'Ne',
        nome: 'Neônio',
        numeroAtomico: 10,
        massaAtomica: 20,
        protons: 10,
        neutrons: 10,
        electrons: { k: 2, l: 8, m: 0, n: 0, o: 0, p: 0, q: 0 }
    }
];

// Estado do jogo
let jogoAtual = {
    atomoAtual: 0,
    pontuacao: 0,
    protonsColocados: 0,
    neutronsColocados: 0,
    electronsColocados: { k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0 },
    particulaArrastando: null,
    dicaMostrada: false
};

// Elementos DOM
let elementosDOM = {};

// Inicialização do jogo
function inicializarJogo() {
    elementosDOM = {
        simboloAlvo: document.getElementById('simbolo-alvo'),
        nomeAlvo: document.getElementById('nome-alvo'),
        numeroAtomicoAlvo: document.getElementById('numero-atomico-alvo'),
        massaAtomicaAlvo: document.getElementById('massa-atomica-alvo'),
        nucleo: document.getElementById('nucleo'),
        protonsContainer: document.getElementById('protons-container'),
        neutronsContainer: document.getElementById('neutrons-container'),
        orbitaK: document.getElementById('orbita-k'),
        orbitaL: document.getElementById('orbita-l'),
        protonFonte: document.getElementById('proton-fonte'),
        neutronFonte: document.getElementById('neutron-fonte'),
        electronFonte: document.getElementById('electron-fonte'),
        contadorProton: document.getElementById('contador-proton'),
        contadorNeutron: document.getElementById('contador-neutron'),
        contadorElectron: document.getElementById('contador-electron'),
        botaoVerificar: document.getElementById('botao-verificar'),
        botaoLimpar: document.getElementById('botao-limpar'),
        botaoDica: document.getElementById('botao-dica'),
        feedback: document.getElementById('feedback'),
        mensagemFeedback: document.getElementById('mensagem-feedback'),
        pontuacao: document.getElementById('pontuacao'),
        barraProgresso: document.getElementById('barra-progresso'),
        progressoTexto: document.getElementById('progresso-texto')
    };

    configurarEventos();
    carregarAtomoAtual();
    atualizarInterface();
}

// Configurar eventos de drag-and-drop
function configurarEventos() {
    // Eventos para as partículas fonte (drag start)
    [elementosDOM.protonFonte, elementosDOM.neutronFonte, elementosDOM.electronFonte].forEach(fonte => {
        fonte.addEventListener('dragstart', handleDragStart);
        fonte.addEventListener('dragend', handleDragEnd);
    });

    // Eventos para as áreas de drop (núcleo e órbitas)
    elementosDOM.nucleo.addEventListener('dragover', handleDragOver);
    elementosDOM.nucleo.addEventListener('drop', handleDrop);
    elementosDOM.orbitaK.addEventListener('dragover', handleDragOver);
    elementosDOM.orbitaK.addEventListener('drop', handleDrop);
    elementosDOM.orbitaL.addEventListener('dragover', handleDragOver);
    elementosDOM.orbitaL.addEventListener('drop', handleDrop);

    // Eventos dos botões
    elementosDOM.botaoVerificar.addEventListener('click', verificarAtomo);
    elementosDOM.botaoLimpar.addEventListener('click', limparAtomo);
    elementosDOM.botaoDica.addEventListener('click', mostrarDica);
}

// Carregar o átomo atual
function carregarAtomoAtual() {
    const atomo = atomosJogo[jogoAtual.atomoAtual];

    elementosDOM.simboloAlvo.textContent = atomo.simbolo;
    elementosDOM.nomeAlvo.textContent = atomo.nome;
    elementosDOM.numeroAtomicoAlvo.textContent = atomo.numeroAtomico;
    elementosDOM.massaAtomicaAlvo.textContent = atomo.massaAtomica;

    // Mostrar/ocultar órbitas conforme necessário
    if (atomo.electrons.l > 0) {
        elementosDOM.orbitaL.style.display = 'flex';
    } else {
        elementosDOM.orbitaL.style.display = 'none';
    }

    jogoAtual.dicaMostrada = false;
}

// Atualizar interface
function atualizarInterface() {
    elementosDOM.contadorProton.textContent = jogoAtual.protonsColocados;
    elementosDOM.contadorNeutron.textContent = jogoAtual.neutronsColocados;
    elementosDOM.contadorElectron.textContent = Object.values(jogoAtual.electronsColocados).reduce((a, b) => a + b, 0);

    elementosDOM.pontuacao.textContent = jogoAtual.pontuacao;

    const progresso = ((jogoAtual.atomoAtual + 1) / atomosJogo.length) * 100;
    elementosDOM.barraProgresso.style.width = progresso + '%';
    elementosDOM.progressoTexto.textContent = `Átomo ${jogoAtual.atomoAtual + 1} de ${atomosJogo.length}`;
}

// Eventos de drag-and-drop
function handleDragStart(e) {
    jogoAtual.particulaArrastando = e.target.id;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    jogoAtual.particulaArrastando = null;

    // Remover classes de drag-over
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    if (!e.target.classList.contains('drag-over')) {
        e.target.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const tipoParticula = e.dataTransfer.getData('text/plain');
    const areaDrop = e.target.closest('.nucleo-atomo, .orbita-k, .orbita-l');

    if (!areaDrop) return;

    adicionarParticula(tipoParticula, areaDrop.id);
}

// Adicionar partícula ao átomo
function adicionarParticula(tipoParticula, areaDestino) {
    const container = areaDestino === 'nucleo' ? elementosDOM.nucleo :
                     areaDestino === 'orbita-k' ? elementosDOM.orbitaK :
                     elementosDOM.orbitaL;

    // Criar nova partícula
    const particula = document.createElement('div');
    particula.className = `particula ${tipoParticula.replace('-fonte', '-particula')}`;
    particula.classList.add('adicionada');

    // Adicionar ao container apropriado
    if (areaDestino === 'nucleo') {
        if (tipoParticula === 'proton-fonte') {
            elementosDOM.protonsContainer.appendChild(particula);
            jogoAtual.protonsColocados++;
        } else if (tipoParticula === 'neutron-fonte') {
            elementosDOM.neutronsContainer.appendChild(particula);
            jogoAtual.neutronsColocados++;
        }
    } else {
        // Elétrons nas órbitas
        container.appendChild(particula);
        const camada = areaDestino === 'orbita-k' ? 'k' : 'l';
        jogoAtual.electronsColocados[camada]++;
    }

    atualizarInterface();
    tocarClick(); // Som de feedback
}

// Verificar se o átomo está correto
function verificarAtomo() {
    const atomoCorreto = atomosJogo[jogoAtual.atomoAtual];

    let correto = true;
    let mensagem = '';

    // Verificar prótons
    if (jogoAtual.protonsColocados !== atomoCorreto.protons) {
        correto = false;
        mensagem += `Prótons incorretos. Esperado: ${atomoCorreto.protons}, Você colocou: ${jogoAtual.protonsColocados}. `;
    }

    // Verificar nêutrons
    if (jogoAtual.neutronsColocados !== atomoCorreto.neutrons) {
        correto = false;
        mensagem += `Nêutrons incorretos. Esperado: ${atomoCorreto.neutrons}, Você colocou: ${jogoAtual.neutronsColocados}. `;
    }

    // Verificar elétrons
    if (jogoAtual.electronsColocados.k !== atomoCorreto.electrons.k) {
        correto = false;
        mensagem += `Elétrons na camada K incorretos. Esperado: ${atomoCorreto.electrons.k}, Você colocou: ${jogoAtual.electronsColocados.k}. `;
    }

    if (jogoAtual.electronsColocados.l !== atomoCorreto.electrons.l) {
        correto = false;
        mensagem += `Elétrons na camada L incorretos. Esperado: ${atomoCorreto.electrons.l}, Você colocou: ${jogoAtual.electronsColocados.l}. `;
    }

    if (correto) {
        // Átomo correto
        jogoAtual.pontuacao += 100;
        if (!jogoAtual.dicaMostrada) {
            jogoAtual.pontuacao += 50; // Bônus por não usar dica
        }

        mostrarMensagem('Parabéns! Átomo correto! +' + (jogoAtual.dicaMostrada ? '100' : '150') + ' pontos', 'sucesso');
        elementosDOM.nucleo.closest('.area-construcao').classList.add('sucesso');

        setTimeout(() => {
            elementosDOM.nucleo.closest('.area-construcao').classList.remove('sucesso');
            avancarParaProximoAtomo();
        }, 2000);

    } else {
        // Átomo incorreto
        jogoAtual.pontuacao = Math.max(0, jogoAtual.pontuacao - 20);
        mostrarMensagem('Átomo incorreto: ' + mensagem, 'erro');
    }

    atualizarInterface();
}

// Limpar átomo
function limparAtomo() {
    // Limpar prótons
    elementosDOM.protonsContainer.innerHTML = '';
    jogoAtual.protonsColocados = 0;

    // Limpar nêutrons
    elementosDOM.neutronsContainer.innerHTML = '';
    jogoAtual.neutronsColocados = 0;

    // Limpar elétrons
    elementosDOM.orbitaK.innerHTML = '';
    elementosDOM.orbitaL.innerHTML = '';
    jogoAtual.electronsColocados = { k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0 };

    atualizarInterface();
    mostrarMensagem('Átomo limpo!', 'dica');
}

// Mostrar dica
function mostrarDica() {
    const atomo = atomosJogo[jogoAtual.atomoAtual];
    let dica = `Dica: ${atomo.nome} tem `;

    dica += `${atomo.protons} próton${atomo.protons !== 1 ? 's' : ''}, `;
    dica += `${atomo.neutrons} nêutron${atomo.neutrons !== 1 ? 's' : ''}`;

    if (atomo.electrons.k > 0) {
        dica += ` e ${atomo.electrons.k} elétron${atomo.electrons.k !== 1 ? 's' : ''} na camada K`;
    }
    if (atomo.electrons.l > 0) {
        dica += ` e ${atomo.electrons.l} elétron${atomo.electrons.l !== 1 ? 's' : ''} na camada L`;
    }

    dica += '.';

    mostrarMensagem(dica, 'dica');
    jogoAtual.dicaMostrada = true;
    jogoAtual.pontuacao = Math.max(0, jogoAtual.pontuacao - 10); // Penalidade por usar dica
    atualizarInterface();
}

// Avançar para o próximo átomo
function avancarParaProximoAtomo() {
    jogoAtual.atomoAtual++;

    if (jogoAtual.atomoAtual >= atomosJogo.length) {
        // Jogo completo
        finalizarJogo();
    } else {
        // Limpar e carregar próximo átomo
        limparAtomo();
        carregarAtomoAtual();
        jogoAtual.dicaMostrada = false;
    }
}

// Finalizar jogo
function finalizarJogo() {
    const pontuacaoFinal = jogoAtual.pontuacao;
    const mensagemFinal = `Jogo completo! Pontuação final: ${pontuacaoFinal} pontos. `;

    let classificacao = '';
    if (pontuacaoFinal >= 1200) {
        classificacao = 'Excelente! Você é um mestre da estrutura atômica!';
    } else if (pontuacaoFinal >= 900) {
        classificacao = 'Muito bom! Você entende bem como os átomos são formados.';
    } else if (pontuacaoFinal >= 600) {
        classificacao = 'Bom trabalho! Continue praticando.';
    } else {
        classificacao = 'Que tal tentar novamente? A prática leva à perfeição!';
    }

    mostrarMensagem(mensagemFinal + classificacao, 'sucesso');

    // Salvar pontuação (se implementar ranking)
    salvarPontuacao('Caça aos Átomos', pontuacaoFinal);
}

// Mostrar mensagem de feedback
function mostrarMensagem(texto, tipo) {
    elementosDOM.mensagemFeedback.textContent = texto;
    elementosDOM.mensagemFeedback.className = `mensagem-feedback ${tipo}`;
    elementosDOM.feedback.classList.add('mostrar');

    setTimeout(() => {
        elementosDOM.feedback.classList.remove('mostrar');
    }, 4000);
}

// Salvar pontuação (placeholder para futura implementação)
function salvarPontuacao(jogo, pontos) {
    // Implementar salvamento no localStorage ou enviar para servidor
    console.log(`Pontuação salva: ${jogo} - ${pontos} pontos`);
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarJogo);
