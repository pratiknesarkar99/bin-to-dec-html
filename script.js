const input = document.getElementById('binInput');
const resultVal = document.getElementById('resultVal');
const errorMsg = document.getElementById('errorMsg');
const breakdown = document.getElementById('breakdown');
const bitsRow = document.getElementById('bitsRow');

function convert(binStr) {
    if (!binStr) {
        resultVal.textContent = '0';
        errorMsg.textContent = '';
        breakdown.style.display = 'none';
        return;
    }

    if (/[^01]/.test(binStr)) {
        errorMsg.textContent = 'Only 0s and 1s are allowed.';
        resultVal.textContent = '';
        breakdown.style.display = 'none';
        return;
    }

    errorMsg.textContent = '';

    let decimal = 0;
    const len = binStr.length;

    for (let i = 0; i < len; i++) {
        const digit = parseInt(binStr[i]);
        const position = len - 1 - i;
        decimal += digit * Math.pow(2, position);
    }

    resultVal.textContent = decimal;
    renderBreakdown(binStr, len);
}

function renderBreakdown(binStr, len) {
    bitsRow.innerHTML = '';
    breakdown.style.display = 'block';

    for (let i = 0; i < len; i++) {
        const digit = parseInt(binStr[i]);
        const position = len - 1 - i;
        const contribution = digit * Math.pow(2, position);

        const cell = document.createElement('div');
        cell.className = 'bit-cell';

        const digitEl = document.createElement('div');
        digitEl.className = 'bit-digit' + (digit === 1 ? ' active' : '');
        digitEl.textContent = digit;

        const powerEl = document.createElement('div');
        powerEl.className = 'bit-power';
        powerEl.textContent = '2^' + position;

        const valEl = document.createElement('div');
        valEl.className = 'bit-val';
        valEl.textContent = digit === 1 ? '+' + contribution : '+0';

        cell.appendChild(digitEl);
        cell.appendChild(powerEl);
        cell.appendChild(valEl);
        bitsRow.appendChild(cell);
    }
}

function clearAll() {
    input.value = '';
    resultVal.textContent = '0';
    errorMsg.textContent = '';
    breakdown.style.display = 'none';
}

input.addEventListener('input', () => convert(input.value));