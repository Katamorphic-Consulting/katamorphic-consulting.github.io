const loginButton = document.getElementById('login-button');
const passwordInput = document.getElementById('password');
const loginContainer = document.getElementById('login-container');
const resultsContainer = document.getElementById('results-container');
const resultsTableBody = document.querySelector('#results-table tbody');

loginButton.addEventListener('click', function() {
    const password = passwordInput.value;
    if (!password) {
        alert('Please enter the password.');
        return;
    }
    displayResults(password);
});


async function displayResults(password) {
    let results = {};
    try {
        const response = await fetch(`/rquiz/api/results?password=${encodeURIComponent(password)}`);
        
        if (response.status === 401) {
            alert('Incorrect password.');
            return;
        }

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

    loginContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Clear previous results
    resultsTableBody.innerHTML = '';

    for (let firstName in results) {
        const studentResults = results[firstName];
        const row = resultsTableBody.insertRow();
        row.insertCell().textContent = firstName;

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