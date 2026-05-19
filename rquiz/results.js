const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');
const loginContainer = document.getElementById('login-container');
const resultsContainer = document.getElementById('results-container');
const resultsTableBody = document.querySelector('#results-table tbody');
const archivedTableBody = document.querySelector('#archived-table tbody');
const archivedSection = document.getElementById('archived-section');

let currentPassword = '';

const quizTitles = [
    "R Quiz - Part 1", "R Quiz - Part 2", "R Quiz - Part 3", "R Quiz - Part 4", "R Quiz - Part 5",
    "CS50x Quiz - Part 1", "CS50x Quiz - Part 2", "CS50x Quiz - Part 3",
    "CS50 Python Quiz - Part 1", "CS50 Python Quiz - Part 2",
    "CS50 AI Quiz 1", "CS50 AI Quiz 2"
];

loginButton.addEventListener('click', function() {
    const password = passwordInput.value;
    if (!password) {
        alert('Please enter the password.');
        return;
    }
    currentPassword = password;
    displayResults(password);
});

function addQuizScoreCells(row, studentResults) {
    quizTitles.forEach(quizTitle => {
        const quizResult = studentResults[quizTitle];
        const scoreCell = row.insertCell();
        if (quizResult) {
            scoreCell.textContent = `${quizResult.score} / ${quizResult.total}`;
            scoreCell.title = `Submitted at: ${quizResult.submissionTime}`;
        } else {
            scoreCell.textContent = '-';
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

async function deleteStudent(firstName, row) {
    if (!confirm(`Delete all results for "${firstName}"? This cannot be undone.`)) return;
    try {
        const response = await fetch(
            `api/delete?password=${encodeURIComponent(currentPassword)}&firstName=${encodeURIComponent(firstName)}`,
            { method: 'DELETE' }
        );
        if (response.ok) {
            row.remove();
            if (archivedTableBody.rows.length === 0) {
                archivedSection.style.display = 'none';
            }
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
            row.remove();
            addActiveRow(firstName, studentResults);
            if (archivedTableBody.rows.length === 0) {
                archivedSection.style.display = 'none';
            }
        } else {
            alert('Error unarchiving student. Status: ' + response.status);
        }
    } catch {
        alert('Error unarchiving student.');
    }
}

function getLatestTimestamp(studentData) {
    const timestamps = Object.values(studentData)
        .filter(v => v && typeof v === 'object' && v.submissionTime)
        .map(res => new Date(res.submissionTime).getTime())
        .filter(t => !isNaN(t));
    return timestamps.length > 0 ? Math.max(...timestamps) : 0;
}

async function displayResults(password) {
    let results = {};
    try {
        const response = await fetch(`api/results?password=${encodeURIComponent(password)}`);
        if (response.status === 401) {
            alert('Incorrect password.');
            return;
        }
        if (response.ok) {
            results = await response.json();
        } else {
            alert('Error fetching results. Status: ' + response.status);
            return;
        }
    } catch {
        alert('Error fetching results.');
        return;
    }

    loginContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsTableBody.innerHTML = '';
    archivedTableBody.innerHTML = '';

    const sortedStudents = Object.entries(results).sort((a, b) =>
        getLatestTimestamp(b[1]) - getLatestTimestamp(a[1])
    );

    const activeStudents = sortedStudents.filter(([, data]) => !data._archivedAt);
    const archivedStudents = sortedStudents.filter(([, data]) => data._archivedAt);

    activeStudents.forEach(([firstName, studentResults]) => addActiveRow(firstName, studentResults));
    archivedStudents.forEach(([firstName, studentResults]) =>
        addArchivedRow(firstName, studentResults, studentResults._archivedAt)
    );

    archivedSection.style.display = archivedStudents.length > 0 ? 'block' : 'none';
}
