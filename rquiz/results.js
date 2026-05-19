const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');
const loginContainer = document.getElementById('login-container');
const resultsContainer = document.getElementById('results-container');
const resultsTableBody = document.querySelector('#results-table tbody');
const archivedTableBody = document.querySelector('#archived-table tbody');
const archivedSection = document.getElementById('archived-section');

let currentPassword = '';
let currentResults = {};

const quizTitles = [
    "R Quiz - Part 1", "R Quiz - Part 2", "R Quiz - Part 3", "R Quiz - Part 4", "R Quiz - Part 5",
    "CS50x Quiz - Part 1", "CS50x Quiz - Part 2", "CS50x Quiz - Part 3",
    "CS50 Python Quiz - Part 1", "CS50 Python Quiz - Part 2",
    "CS50 AI Quiz 1", "CS50 AI Quiz 2"
];

// ── Event listeners ───────────────────────────────────────────────────────────

loginButton.addEventListener('click', function() {
    const password = passwordInput.value;
    if (!password) { alert('Please enter the password.'); return; }
    currentPassword = password;
    displayResults(password);
});

document.getElementById('export-btn').addEventListener('click', exportToCSV);

document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-input').click();
});

document.getElementById('import-input').addEventListener('change', handleImport);

// ── CSV utilities ─────────────────────────────────────────────────────────────

function escapeCSV(value) {
    if (value == null) return '';
    const str = String(value);
    return (str.includes(',') || str.includes('"') || str.includes('\n'))
        ? `"${str.replace(/"/g, '""')}"`
        : str;
}

function parseCSVRow(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (ch === ',' && !inQuotes) {
            result.push(current); current = '';
        } else {
            current += ch;
        }
    }
    result.push(current);
    return result;
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = parseCSVRow(lines[0]);
    return lines.slice(1).map(line => {
        const values = parseCSVRow(line);
        const obj = {};
        headers.forEach((h, i) => { obj[h] = values[i] ?? ''; });
        return obj;
    });
}

function csvToRecords(rows) {
    const records = {};
    rows.forEach(row => {
        const firstName = row['firstName'];
        if (!firstName) return;
        records[firstName] = {};
        quizTitles.forEach(title => {
            const score = row[`${title} Score`];
            const total = row[`${title} Total`];
            if (score !== '' && total !== '') {
                records[firstName][title] = { score: parseInt(score, 10), total: parseInt(total, 10) };
            }
        });
        if (row['Archived On']) {
            records[firstName]._archivedAt = row['Archived On'];
        }
    });
    return records;
}

// ── Export ────────────────────────────────────────────────────────────────────

function exportToCSV() {
    const headers = ['firstName'];
    quizTitles.forEach(title => headers.push(`${title} Score`, `${title} Total`));
    headers.push('Archived On');

    const rows = [headers.map(escapeCSV).join(',')];

    Object.entries(currentResults).forEach(([firstName, studentResults]) => {
        const row = [escapeCSV(firstName)];
        quizTitles.forEach(title => {
            const result = studentResults[title];
            row.push(result ? escapeCSV(result.score) : '', result ? escapeCSV(result.total) : '');
        });
        row.push(escapeCSV(studentResults._archivedAt || ''));
        rows.push(row.join(','));
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ── Import ────────────────────────────────────────────────────────────────────

async function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const text = await file.text();
    const importedRecords = csvToRecords(parseCSV(text));

    try {
        const response = await fetch('api/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: currentPassword, records: importedRecords })
        });
        if (response.ok) {
            currentResults = await response.json();
            renderResults(currentResults);
        } else {
            alert('Error importing results. Status: ' + response.status);
        }
    } catch {
        alert('Error importing results.');
    }

    event.target.value = '';
}

// ── Row builders ──────────────────────────────────────────────────────────────

function addQuizScoreCells(row, studentResults) {
    quizTitles.forEach(title => {
        const result = studentResults[title];
        const cell = row.insertCell();
        if (result) {
            cell.textContent = `${result.score} / ${result.total}`;
            cell.title = `Submitted at: ${result.submissionTime}`;
        } else {
            cell.textContent = '-';
        }
    });
}

function addActiveRow(firstName, studentResults) {
    const row = resultsTableBody.insertRow();
    row.insertCell().textContent = firstName;
    addQuizScoreCells(row, studentResults);

    const actionsCell = row.insertCell();

    const archiveBtn = document.createElement('button');
    archiveBtn.textContent = 'Archive';
    archiveBtn.className = 'btn-archive';
    archiveBtn.onclick = () => archiveStudent(firstName, studentResults, row);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = () => deleteStudent(firstName, row);

    actionsCell.appendChild(archiveBtn);
    actionsCell.appendChild(deleteBtn);
}

function addArchivedRow(firstName, studentResults, archivedAt) {
    const row = archivedTableBody.insertRow();
    row.classList.add('archived-row');
    row.insertCell().textContent = firstName;
    addQuizScoreCells(row, studentResults);
    row.insertCell().textContent = new Date(archivedAt).toLocaleString();

    const actionsCell = row.insertCell();

    const unarchiveBtn = document.createElement('button');
    unarchiveBtn.textContent = 'Unarchive';
    unarchiveBtn.className = 'btn-unarchive';
    unarchiveBtn.onclick = () => unarchiveStudent(firstName, studentResults, row);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = () => deleteStudent(firstName, row);

    actionsCell.appendChild(unarchiveBtn);
    actionsCell.appendChild(deleteBtn);
}

// ── Actions ───────────────────────────────────────────────────────────────────

async function deleteStudent(firstName, row) {
    if (!confirm(`Delete all results for "${firstName}"? This cannot be undone.`)) return;
    try {
        const response = await fetch(
            `api/delete?password=${encodeURIComponent(currentPassword)}&firstName=${encodeURIComponent(firstName)}`,
            { method: 'DELETE' }
        );
        if (response.ok) {
            delete currentResults[firstName];
            row.remove();
            if (archivedTableBody.rows.length === 0) archivedSection.style.display = 'none';
        } else {
            alert('Error deleting student. Status: ' + response.status);
        }
    } catch {
        alert('Error deleting student.');
    }
}

async function archiveStudent(firstName, studentResults, row) {
    try {
        const response = await fetch('api/archive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, password: currentPassword })
        });
        if (response.ok) {
            const { archivedAt } = await response.json();
            currentResults[firstName]._archivedAt = archivedAt;
            row.remove();
            addArchivedRow(firstName, studentResults, archivedAt);
            archivedSection.style.display = 'block';
        } else {
            alert('Error archiving student. Status: ' + response.status);
        }
    } catch {
        alert('Error archiving student.');
    }
}

async function unarchiveStudent(firstName, studentResults, row) {
    try {
        const response = await fetch('api/unarchive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, password: currentPassword })
        });
        if (response.ok) {
            delete currentResults[firstName]._archivedAt;
            row.remove();
            addActiveRow(firstName, studentResults);
            if (archivedTableBody.rows.length === 0) archivedSection.style.display = 'none';
        } else {
            alert('Error unarchiving student. Status: ' + response.status);
        }
    } catch {
        alert('Error unarchiving student.');
    }
}

// ── Render / display ──────────────────────────────────────────────────────────

function getLatestTimestamp(studentData) {
    const timestamps = Object.values(studentData)
        .filter(v => v && typeof v === 'object' && v.submissionTime)
        .map(res => new Date(res.submissionTime).getTime())
        .filter(t => !isNaN(t));
    return timestamps.length > 0 ? Math.max(...timestamps) : 0;
}

function renderResults(results) {
    resultsTableBody.innerHTML = '';
    archivedTableBody.innerHTML = '';

    const sorted = Object.entries(results).sort((a, b) =>
        getLatestTimestamp(b[1]) - getLatestTimestamp(a[1])
    );

    const active = sorted.filter(([, d]) => !d._archivedAt);
    const archived = sorted.filter(([, d]) => d._archivedAt);

    active.forEach(([firstName, data]) => addActiveRow(firstName, data));
    archived.forEach(([firstName, data]) => addArchivedRow(firstName, data, data._archivedAt));

    archivedSection.style.display = archived.length > 0 ? 'block' : 'none';
}

async function displayResults(password) {
    try {
        const response = await fetch(`api/results?password=${encodeURIComponent(password)}`);
        if (response.status === 401) { alert('Incorrect password.'); return; }
        if (!response.ok) { alert('Error fetching results. Status: ' + response.status); return; }
        currentResults = await response.json();
    } catch {
        alert('Error fetching results.');
        return;
    }

    loginContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    renderResults(currentResults);
}
