let currentQuestion = 1;
const totalQuestions = 40; // Update this to the new total number of questions
let correctAnswers = 0;
let userAnswers = [];

// Countdown timer
const countdownElement = document.getElementById('countdown');
let countdownTime = 60 * 50; // 50 minutes in seconds

function startCountdown() {
    const countdownInterval = setInterval(() => {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        countdownElement.innerHTML = `${minutes}m ${seconds}s`;

        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Time's up!";
            showResult(); // Show results when time is up
        } else {
            countdownTime--;
        }
    }, 1000);
}

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (selectedOption) {
        userAnswers.push({
            question: currentQuestion,
            selected: selectedOption.value,
            correct: selectedOption.value === "correct"
        });

        if (selectedOption.value === "correct") {
            correctAnswers++;
        }
        currentQuestionElement.style.display = 'none';
        currentQuestion++;

        if (currentQuestion <= totalQuestions) {
            const nextQuestionElement = document.getElementById(`question${currentQuestion}`);
            nextQuestionElement.style.display = 'block';
        } else {
            document.getElementById('next-button').style.display = 'none';
            showResult();
        }
    } else {
        alert('Por favor, selecciona una opción antes de continuar.');
    }
}

function showResult() {
    const resultText = `Obtuviste ${correctAnswers} de ${totalQuestions} preguntas correctas.`;
    let detailedResults = '';

    userAnswers.forEach(answer => {
        const questionElement = document.getElementById(`question${answer.question}`);
        const questionText = questionElement.querySelector('p').innerText;
        const correctOption = questionElement.querySelector('input[value="correct"]').nextSibling.textContent.trim();
        const selectedOption = questionElement.querySelector(`input[value="${answer.selected}"]`).nextSibling.textContent.trim();
        const color = answer.correct ? 'green' : 'red';

        detailedResults += `
            <div style="border: 1px solid ${color}; padding: 10px; margin-bottom: 10px;">
                <p>${questionText}</p>
                <p style="color: ${color};">Tu respuesta: ${selectedOption}</p>
                <p>Respuesta correcta: ${correctOption}</p>
            </div>
        `;
    });

    if (correctAnswers >= 30) { // Update this to the required number of correct answers
        document.getElementById('result').innerHTML = resultText + ' ¡Felicidades, pasaste el examen!<br>' + detailedResults;
    } else {
        document.getElementById('result').innerHTML = resultText + ' Lo siento, no pasaste el examen.<br>' + detailedResults;
    }
}

// Start the countdown when the page loads
window.onload = startCountdown;
