let attempts = 3;
const calculusProblems = [
    { problem: "∫ x^2 dx", solution: "x^3/3 + C" },
    { problem: "∫ e^x dx", solution: "e^x + C" },
    { problem: "∫ sin(x) dx", solution: "-cos(x) + C" }
];

function checkAge() {
    const age = document.getElementById('age-input').value;
    if (age >= 21) {
        document.getElementById('age-verification').style.display = 'none';
        document.getElementById('drink-recipes').style.display = 'block';
        loadDrinks();
    } else {
        document.getElementById('age-verification').style.display = 'none';
        document.getElementById('calculus-problem').style.display = 'block';
        loadProblem();
    }
}

function loadProblem() {
    const randomProblem = calculusProblems[Math.floor(Math.random() * calculusProblems.length)];
    document.getElementById('problem').innerText = randomProblem.problem;
    document.getElementById('problem').dataset.solution = randomProblem.solution;
    document.getElementById('attempts').innerText = `Attempts left: ${attempts}`;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value;
    const correctAnswer = document.getElementById('problem').dataset.solution;
    if (userAnswer === correctAnswer) {
        document.getElementById('calculus-problem').style.display = 'none';
        document.getElementById('drink-recipes').style.display = 'block';
        loadDrinks();
    } else {
        attempts--;
        if (attempts > 0) {
            document.getElementById('attempts').innerText = `Attempts left: ${attempts}`;
        } else {
            window.location.href = "https://www.youtube.com/watch?v=9Zy8NcsNPLk";
        }
    }
}

function loadDrinks() {
    fetch('assets/drinks.json')
        .then(response => response.json())
        .then(data => {
            const drinksList = document.getElementById('drinks-list');
            data.drinks.forEach(drink => {
                const drinkItem = document.createElement('div');
                drinkItem.className = 'drink-item';
                drinkItem.innerText = drink.name;
                drinkItem.onclick = () => showRecipe(drink);
                drinksList.appendChild(drinkItem);
            });
        });
}

function showRecipe(drink) {
    const recipeDetails = document.getElementById('recipe-details');
    recipeDetails.innerHTML = `<h2>${drink.name}</h2><p><strong>Ingredients:</strong> ${drink.ingredients}</p><p><strong>Procedure:</strong> ${drink.procedure}</p>`;
}