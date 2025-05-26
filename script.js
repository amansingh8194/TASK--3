document.addEventListener('DOMContentLoaded', () => {
    // ----------- Quiz Logic -----------
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language"],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which CSS property controls the text size?",
            options: ["font-size", "text-style", "text-size"],
            answer: "font-size"
        },
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["&lt;js&gt;", "&lt;script&gt;", "&lt;javascript&gt;"],
            answer: "&lt;script&gt;"
        }
    ];
    

    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit');
    const resultDisplay = document.getElementById('quiz-result');

    quizData.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>`;
    q.options.forEach(option => {
        div.innerHTML += `
        <label>
            <input type="radio" name="q${index}" value="${option}"> ${option}
</label><br>`;
    });
    quizContainer.appendChild(div);
    });

    submitBtn.addEventListener('click', () => {
    let score = 0;
quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) {
    score++;
        }
    });
    resultDisplay.textContent = `You got ${score} out of ${quizData.length} correct!`;
    });

  // ----------- Carousel Logic -----------
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    function showImage(index) {
    images.forEach(img => img.style.display = 'none');
    images[index].style.display = 'block';
    }

    document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    });

    document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    });

    showImage(currentIndex);

    // ----------- Joke API Logic -----------
    document.getElementById('get-joke').addEventListener('click', () => {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
        document.getElementById('joke-container').innerHTML =
            `<p>${data.setup}</p><p><strong>${data.punchline}</strong></p>`;
        })
        .catch(error => {
        console.error("Error fetching joke:", error);
        document.getElementById('joke-container').textContent = "Oops! Couldn't load a joke.";
        });
    });
});