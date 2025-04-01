let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];


let fieldss = Array(9).fill(null);
let hasAnimated = Array(9).fill(false);
let currentPlayer = 'cross';
let gameOver = false;

function init() {
    let contentDiv = document.getElementById('content');
    let tableHTML = '<div id="game-container"><svg id="winning-line" width="210" height="210"></svg><table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            tableHTML += `<td id="cell-${index}" onclick="handleClick(${index})"></td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table></div>';
    contentDiv.innerHTML = tableHTML;
}

function restartGame() {
    // Setze die globalen Variablen zurück
    fields = Array(9).fill(null);  // Setzt das Spielfeld zurück
    hasAnimated = Array(9).fill(false);  // Setzt die Animations-Flags zurück
    currentPlayer = 'cross';  // Setzt den Startspieler zurück
    gameOver = false;  // Setzt den Spielstatus auf nicht beendet
    init();  // Rendere das Spielfeld neu
}


function handleClick(index) {
    if (!fields[index] && !gameOver) {
        fields[index] = currentPlayer;
        hasAnimated[index] = true;
        renderCell(index);
        
        let winner = checkWinner();
        if (winner) {
            gameOver = true;
            drawWinningLine(winner);
            return;
        }

        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    }
}

function renderCell(index) {
    let cell = document.getElementById(`cell-${index}`);
    if (!cell) return;

    if (fields[index] === 'circle') {
        cell.innerHTML = hasAnimated[index] ? generateCircleSVG() : generateStaticCircleSVG();
    } else if (fields[index] === 'cross') {
        cell.innerHTML = generateCrossSVG();
    }
}

// 🔎 Überprüft, ob jemand gewonnen hat
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonalen
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Gibt die Sieg-Kombination zurück
        }
    }
    return null;
}

// 🏆 Zeichnet eine Linie durch die Gewinner-Felder
function drawWinningLine(indices) {
    // Berechne die Mittelpunkte der Zellen
    const positions = [
        { x: 50, y: 50 }, { x: 150, y: 50 }, { x: 250, y: 50 },
        { x: 50, y: 150 }, { x: 150, y: 150 }, { x: 250, y: 150 },
        { x: 50, y: 250 }, { x: 150, y: 250 }, { x: 250, y: 250 }
    ];

    // Berechne die Positionen der Linien, um durch die Mitte der Symbole zu gehen
    let [start, middle, end] = indices.map(index => positions[index]);

    // Holen Sie sich das SVG-Element für die Gewinnlinie
    let line = document.getElementById("winning-line");

    // Zeichne die Linie im SVG
    line.innerHTML = `
        <line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" 
              stroke="white" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x2" from="${start.x}" to="${end.x}" dur="0.5s" fill="freeze"/>
            <animate attributeName="y2" from="${start.y}" to="${end.y}" dur="0.5s" fill="freeze"/>
        </line>
    `;
}



// 🟢 Animierter Kreis
function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none"
                    stroke-dasharray="188.5" stroke-dashoffset="188.5">
                <animate attributeName="stroke-dashoffset" from="188.5" to="0" dur="0.2s" fill="freeze"/>
            </circle>
        </svg>
    `;
}

// 🔵 Statischer Kreis
function generateStaticCircleSVG() {
    return `
        <svg width="66" height="66" viewBox="0 0 66 66">
            <circle cx="33" cy="33" r="30" stroke="#00B0EF" stroke-width="5" fill="none"
                    stroke-dasharray="188.5" stroke-dashoffset="0"/>
        </svg>
    `;
}

// ✖️ Animiertes Kreuz
function generateCrossSVG() {
    return `
        <svg width="66" height="66" viewBox="0 0 66 66">
            <line x1="10" y1="10" x2="56" y2="56" stroke="#FFC000" stroke-width="5"
                  stroke-dasharray="70" stroke-dashoffset="70">
                <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.2s" fill="freeze"/>
            </line>
            <line x1="56" y1="10" x2="10" y2="56" stroke="#FFC000" stroke-width="5"
                  stroke-dasharray="70" stroke-dashoffset="70">
                <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.2s" fill="freeze"/>
            </line>
        </svg>
    `;
}
