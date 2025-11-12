const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');
const loginContainer = document.getElementById('login-container');
const resultsContainer = document.getElementById('results-container');
const resultsTableBody = document.querySelector('#results-table tbody');
const password = '######';


loginButton.addEventListener('click', function() {
    if (passwordInput.value === password) {
        loginContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        displayResults();
    } else {
        alert('Incorrect password.');
    }
});


async function displayResults() {
    let results = {};
    try {
        const response = await fetch('./api/results');
        if (response.ok) {
            results = await response.json();
        } else {
            alert("Error fetching results. Status: " + response.status);
            return;
        }
    } catch (error) {
        console.error("Error fetching results:", error);
        alert("Error fetching results.");
        return;
    }


    for (let studentNumber in results) {
        const studentResults = results[studentNumber];
        const row = resultsTableBody.insertRow();
        row.insertCell().textContent = studentNumber;
        row.insertCell().textContent = studentResults.name;

        for (let i = 1; i <= 5; i++) {
            const quizTitle = `R Quiz - Part ${i}`;
            const quizResult = studentResults[quizTitle];
            const scoreCell = row.insertCell();
            const timeCell = row.insertCell();

            if (quizResult) {
                scoreCell.textContent = `${quizResult.score} / ${quizResult.total}`;
                timeCell.textContent = quizResult.submissionTime;
            } else {
                scoreCell.textContent = "Not taken";
                timeCell.textContent = "";
            }
        }
    }
}
