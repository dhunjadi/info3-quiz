const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const showResultsBtn = document.getElementById("show-results-btn")
const questionElement = document.getElementById("question")
const answerElements = document.getElementById("answers")

const questions = [{
        question: "pitanje 1",
        answers: [
            { ans: '1' },
            { ans: '2' },
            { ans: '3' },
            { ans: '4' },
            { ans: '5' },
            { ans: '6' },
            { ans: '7' },
            { ans: '8' },
        ],
        selectedAnswers: []
    },
    {
        question: "pitanje 2",
        answers: [
            { ans: '1' },
            { ans: '2' },
            { ans: '3' },
            { ans: '4' },
            { ans: '5' },
            { ans: '6' },
            { ans: '7' },
            { ans: '8' },
        ],
        selectedAnswers: []
    },
    {
        question: "pitanje 3",
        answers: [
            { ans: '1' },
            { ans: '2' },
            { ans: '3' },
            { ans: '4' },
            { ans: '5' },
            { ans: '6' },
            { ans: '7' },
            { ans: '8' },
        ],
        selectedAnswers: []
    },
    {
        question: "pitanje 4",
        answers: [
            { ans: '1' },
            { ans: '2' },
            { ans: '3' },
            { ans: '4' },
            { ans: '5' },
            { ans: '6' },
            { ans: '7' },
            { ans: '8' },
        ],
        selectedAnswers: []
    }
]

let questionIndex = 0
const setQuestion = () => {
    if(questionIndex !== 0){
        prevBtn.classList.remove("hidden")
    } else {
        prevBtn.classList.add("hidden")
    }
    
    // Hiding the Next button and showing the Show Results button
    if(questionIndex === (questions.length - 1)){
        nextBtn.classList.add("hidden")
        showResultsBtn.classList.remove("hidden") 
    } else {
        nextBtn.classList.remove("hidden")
        showResultsBtn.classList.add("hidden")
    }

    questions.forEach(question => {
        console.log(question.selectedAnswers)
    })    

    showQuestion(questions[questionIndex])
}

// Show question
const showQuestion = (question) => {
    questionElement.innerText = question.question
    randomNumber = Math.trunc(Math.random() * (8 - 2 + 1) + 2)  // Random number between 2 and 8
    // Creating random number buttons
    for (let i = 0; i < randomNumber; i++) {
        const button = document.createElement("button")
        answerElements.appendChild(button)
        button.innerText = questions[questionIndex].answers[i].ans
        // Adding slected answers to the selectedAnswers array for each question
        button.addEventListener("click", (e) => {
            if (question.selectedAnswers.length === 0 || !question.selectedAnswers.includes(e.target.innerText)) {
                if(question.selectedAnswers.length <= (2 + questionIndex)){
                    question.selectedAnswers.push(e.target.innerText)
                    // Displaying the error message
                } else {
                    let errorMessage = document.createElement('div');
                    errorMessage.innerHTML = `Odabrali ste više odgovora nego što je dopušteno`
                    questionElement.appendChild(errorMessage);
                    // Removing the error message after 3 seconds
                    setTimeout(() => {
                        questionElement.removeChild(errorMessage);
                    }, 3000);
                }
                // Enabling the Show Results button
                if(questions.every(question => question.selectedAnswers.length > 0)){
                    showResultsBtn.disabled = false
                } else {
                    showResultsBtn.disabled = true
                }
            }
        })
    }
}

// Next question
const handleNext = () => {
    if (questionIndex <= questions.length) {
        questionIndex++
        while (answerElements.firstChild) {
            answerElements.removeChild(answerElements.firstChild)
        }
        setQuestion()
    }
}

// Previous question
const handlePrev = () => {
    if (questionIndex >= 0) {
        questionIndex--
        while (answerElements.firstChild) {
            answerElements.removeChild(answerElements.firstChild)
        }
        setQuestion()
    }
}
const handleShowResults = () =>{
    console.log('fdsfsdfdgd5465467547')
}

window.onload = setQuestion()
nextBtn.addEventListener("click", handleNext)
prevBtn.addEventListener("click", handlePrev)
showResultsBtn.addEventListener("click", handleShowResults)