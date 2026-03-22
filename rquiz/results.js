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
        // Correcting the path from /api/results to api/results (relative path)
        const response = await fetch(`api/results?password=${encodeURIComponent(password)}`);
        
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

    const quizTitles = [
        "R Quiz - Part 1", "R Quiz - Part 2", "R Quiz - Part 3", "R Quiz - Part 4", "R Quiz - Part 5",
        "CS50x Quiz - Part 1", "CS50x Quiz - Part 2", "CS50x Quiz - Part 3",
        "CS50 Python Quiz - Part 1", "CS50 Python Quiz - Part 2",
        "CS50 AI Quiz 1", "CS50 AI Quiz 2"
    ];

    for (let firstName in results) {
        const studentResults = results[firstName];
        const row = resultsTableBody.insertRow();
        row.insertCell().textContent = firstName;

        quizTitles.forEach(quizTitle => {
            const quizResult = studentResults[quizTitle];
            const scoreCell = row.insertCell();

            if (quizResult) {
                scoreCell.textContent = `${quizResult.score} / ${quizResult.total}`;
                // Optional: Tooltip for submission time
                scoreCell.title = `Submitted at: ${quizResult.submissionTime}`;
            } else {
                scoreCell.textContent = "-";
            }
        });
    }
}
