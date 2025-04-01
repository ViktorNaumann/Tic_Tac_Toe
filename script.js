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

function init() {
    let contentDiv = document.getElementById('content');
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            tableHTML += `<td id="cell-${index}" onclick="handleClick(${index})"></td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        hasAnimated[index] = true;
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
        renderCell(index);
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

// Kreis mit Animation (nur für neue Einträge)
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

// Statischer Kreis (nach Animation)
function generateStaticCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none"
                    stroke-dasharray="188.5" stroke-dashoffset="0"/>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5"
                  stroke-dasharray="70" stroke-dashoffset="70">
                <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.2s" fill="freeze"/>
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5"
                  stroke-dasharray="70" stroke-dashoffset="70">
                <animate attributeName="stroke-dashoffset" from="70" to="0" dur="0.2s" fill="freeze"/>
            </line>
        </svg>
    `;
}







