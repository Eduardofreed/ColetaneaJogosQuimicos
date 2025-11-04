// Sistema de Elementos Flutuantes Simplificado
// Baseado no exemplo: <div class="floating-element" style="transform: translate(Xpx, Ypx) rotate(Zdeg) scale(S);"><img src="imgs/elements/Na.png" alt="Sódio"></div>

const elementosDisponiveis = [
    { simbolo: 'H', nome: 'Hidrogênio', img: 'imagens/elementos-flutuantes/H-simbolo.png' },
    { simbolo: 'He', nome: 'Hélio', img: 'imagens/elementos-flutuantes/He-simbolo.png' },
    { simbolo: 'Li', nome: 'Lítio', img: 'imagens/elementos-flutuantes/Li-simbolo.png' },
    { simbolo: 'Be', nome: 'Berílio', img: 'imagens/elementos-flutuantes/Be-simbolo.png' },
    { simbolo: 'B', nome: 'Boro', img: 'imagens/elementos-flutuantes/B-simbolo.png' },
    { simbolo: 'C', nome: 'Carbono', img: 'imagens/elementos-flutuantes/C-simbolo.png' },
    { simbolo: 'N', nome: 'Nitrogênio', img: 'imagens/elementos-flutuantes/N-simbolo.png' },
    { simbolo: 'O', nome: 'Oxigênio', img: 'imagens/elementos-flutuantes/O-simbolo.png' },
    { simbolo: 'F', nome: 'Flúor', img: 'imagens/elementos-flutuantes/F-simbolo.png' },
    { simbolo: 'Ne', nome: 'Neônio', img: 'imagens/elementos-flutuantes/Ne-simbolo.png' },
    { simbolo: 'Na', nome: 'Sódio', img: 'imagens/elementos-flutuantes/Na-simbolo.png' },
    { simbolo: 'Mg', nome: 'Magnésio', img: 'imagens/elementos-flutuantes/Mg-simbolo.png' },
    { simbolo: 'Al', nome: 'Alumínio', img: 'imagens/elementos-flutuantes/Al-simbolo.png' },
    { simbolo: 'Si', nome: 'Silício', img: 'imagens/elementos-flutuantes/Si-simbolo.png' },
    { simbolo: 'P', nome: 'Fósforo', img: 'imagens/elementos-flutuantes/P-simbolo.png' },
    { simbolo: 'S', nome: 'Enxofre', img: 'imagens/elementos-flutuantes/S-simbolo.png' },
    { simbolo: 'Cl', nome: 'Cloro', img: 'imagens/elementos-flutuantes/Cl-simbolo.png' },
    { simbolo: 'Ar', nome: 'Argônio', img: 'imagens/elementos-flutuantes/Ar-simbolo.png' },
    { simbolo: 'K', nome: 'Potássio', img: 'imagens/elementos-flutuantes/K-simbolo.png' },
    { simbolo: 'Ca', nome: 'Cálcio', img: 'imagens/elementos-flutuantes/Ca-simbolo.png' }
];

function criarElementoFlutuante(elemento, x, y, rotacao, escala) {
    const div = document.createElement('div');
    div.className = 'floating-element';

    // Aplicar transformações diretamente no style
    div.style.transform = `translate(${x}px, ${y}px) rotate(${rotacao}deg) scale(${escala})`;

    const img = document.createElement('img');
    img.src = elemento.img;
    img.alt = elemento.nome;
    img.loading = 'lazy';

    div.appendChild(img);
    return div;
}

function inicializarElementosFlutuantes() {
    const container = document.getElementById('fundo-quimico');
    if (!container) return;

    // Limpar elementos existentes
    const elementosExistentes = container.querySelectorAll('.floating-element');
    elementosExistentes.forEach(el => el.remove());

    // Criar grade organizada (4x5 = 20 elementos)
    const numLinhas = 4;
    const numColunas = 5;
    const espacamentoX = window.innerWidth / (numColunas + 1);
    const espacamentoY = window.innerHeight / (numLinhas + 1);

    for (let linha = 0; linha < numLinhas; linha++) {
        for (let coluna = 0; coluna < numColunas; coluna++) {
            const x = (coluna + 1) * espacamentoX + (Math.random() - 0.5) * 100;
            const y = (linha + 1) * espacamentoY + (Math.random() - 0.5) * 100;
            const rotacao = (Math.random() - 0.5) * 360; // -180° a +180°
            const escala = 0.8 + Math.random() * 0.4; // 0.8 a 1.2

            // Escolher elemento aleatório da lista
            const elemento = elementosDisponiveis[Math.floor(Math.random() * elementosDisponiveis.length)];

            const elementoFlutuante = criarElementoFlutuante(elemento, x, y, rotacao, escala);
            container.appendChild(elementoFlutuante);
        }
    }

    // Adicionar alguns elementos extras nas bordas para mais movimento
    for (let i = 0; i < 8; i++) {
        let x, y;

        // Distribuir pelas bordas
        const lado = Math.floor(Math.random() * 4);
        switch (lado) {
            case 0: // Topo
                x = Math.random() * window.innerWidth;
                y = -100;
                break;
            case 1: // Direita
                x = window.innerWidth + 100;
                y = Math.random() * window.innerHeight;
                break;
            case 2: // Baixo
                x = Math.random() * window.innerWidth;
                y = window.innerHeight + 100;
                break;
            case 3: // Esquerda
                x = -100;
                y = Math.random() * window.innerHeight;
                break;
        }

        const rotacao = (Math.random() - 0.5) * 360;
        const escala = 0.6 + Math.random() * 0.8; // 0.6 a 1.4
        const elemento = elementosDisponiveis[Math.floor(Math.random() * elementosDisponiveis.length)];

        const elementoFlutuante = criarElementoFlutuante(elemento, x, y, rotacao, escala);
        container.appendChild(elementoFlutuante);
    }
}

function animarElementosFlutuantes() {
    const elementos = document.querySelectorAll('.floating-element');

    elementos.forEach((elemento, index) => {
        // Animação ainda mais lenta e suave
        const tempoAtual = Date.now() * 0.001; // Converter para segundos
        const offset = index * 0.2; // Offset baseado no índice para variação

        // Movimento muito lento baseado no tempo
        const movimentoX = Math.sin(tempoAtual * 0.08 + offset) * 12; // Ainda mais lento: 0.15 → 0.08, amplitude 15 → 12
        const movimentoY = Math.cos(tempoAtual * 0.05 + offset) * 10; // Ainda mais lento: 0.1 → 0.05, amplitude 12 → 10

        // Rotação lenta e constante
        const rotacaoBase = tempoAtual * 0.02 + offset; // Rotação muito lenta
        const rotacaoSuave = Math.sin(rotacaoBase) * 3; // Amplitude pequena para rotação suave

        // Aplicar transformação adicional
        elemento.style.transition = 'transform 0.3s ease-out'; // Transição ainda mais suave
        const transformAtual = elemento.style.transform;
        elemento.style.transform = transformAtual + ` translate(${movimentoX}px, ${movimentoY}px) rotate(${rotacaoSuave}deg)`;
    });

    requestAnimationFrame(animarElementosFlutuantes);
}

// Event listeners
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(inicializarElementosFlutuantes, 250);
});

window.addEventListener('DOMContentLoaded', () => {
    inicializarElementosFlutuantes();
    animarElementosFlutuantes();
});

// Exportar para uso global
window.FloatingElements = {
    inicializar: inicializarElementosFlutuantes,
    animar: animarElementosFlutuantes
};