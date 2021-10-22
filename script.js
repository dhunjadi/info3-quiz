const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const showResultsBtn = document.getElementById("show-results-btn")
const questionElement = document.getElementById("question")
const answerElements = document.getElementById("answers")
const questionBar = document.getElementById("question-bar")
const resultsContainer = document.getElementById("results-container")

const questions = [{
        id: "1",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac molestie justo?",
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
        id: "2",
        question: "Vestibulum tempus, quam eget condimentum pretium, tellus ligula imperdiet?",
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
        id: "3",
        question: "Donec leo tellus, consequat eget ornare sit amet, ultricies at felis?",
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
        id: "4",
        question: "Pellentesque sed erat sagittis, aliquam magna eget, consequat est?",
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

    // Hiding the previous button if first question is displayed
    if (questionIndex !== 0) {
        prevBtn.classList.remove("hidden")
    } else {
        prevBtn.classList.add("hidden")
    }

    // Hiding the Next button and showing the Show Results button
    if (questionIndex === (questions.length - 1)) {
        nextBtn.classList.add("hidden")
        showResultsBtn.classList.remove("hidden")
    } else {
        nextBtn.classList.remove("hidden")
        showResultsBtn.classList.add("hidden")
    }
    showQuestion(questions[questionIndex])
}

// Show question
const showQuestion = (question) => {

    // Removing answers when going back to questions with question bar
    while (answerElements.firstChild) {
        answerElements.removeChild(answerElements.firstChild)
    }

    questionElement.innerText = question.question
    randomNumber = Math.trunc(Math.random() * (8 - 2 + 1) + 2) // Random number between 2 and 8
    // Creating random number buttons
    for (let i = 0; i < randomNumber; i++) {
        const button = document.createElement("button")
        answerElements.appendChild(button)
        button.innerText = questions[questionIndex].answers[i].ans
        // Adding slected answers to the selectedAnswers array for each question
        button.addEventListener("click", (e) => {
            if (question.selectedAnswers.length === 0 || !question.selectedAnswers.includes(e.target.innerText)) {
                // Adding the "chosen" class to chosen answers
                e.target.classList.add("chosen")
                if (question.selectedAnswers.length <= (2 + questionIndex)) {
                    question.selectedAnswers.push(e.target.innerText)
                    // Changing the background color in the question bar
                    questionBar.children[questionIndex].classList.add("selected")
                    // Displaying the warning message
                } else {
                    let warningMessage = document.createElement('div');
                    warningMessage.innerHTML = `You have chosen more answers than it is allowed!`
                    warningMessage.style.color='red'
                    questionElement.appendChild(warningMessage);
                    // Removing the warning message after 3 seconds
                    setTimeout(() => {
                        questionElement.removeChild(warningMessage);
                    }, 3000);
                }
                // Enabling the Show Results button
                if (questions.every(question => question.selectedAnswers.length > 0)) {
                    showResultsBtn.classList.remove("disabled")
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

// Displaying the question bar
const displayQuestionBar = () => {
    for (i = 0; i < questions.length; i++) {
        const questionNumContainer = document.createElement("div")
        const questionNum = document.createElement("p")
        questionNum.innerText = questions[i].id
        questionNumContainer.appendChild(questionNum)
        questionNumContainer.addEventListener("click", () => {
            questionIndex = Number(questionNum.innerText) - 1
            setQuestion()
        })
        questionBar.appendChild(questionNumContainer)

    }
}

// Showing results
const handleShowResults = () => {
    // Creating Question (i): 
    for(i = 0; i < resultsContainer.children.length; i++){
        const number = document.createElement("p")
        number.innerText = `Question ${i + 1}:\u00A0`
        resultsContainer.children[i].appendChild(number)
        // Adding selected answers to Question (i):
        for(x = 0; x < questions[i].selectedAnswers.length; x++ ){
            const questionAnswer = document.createElement("p")
            questionAnswer.innerText = `${questions[i].selectedAnswers[x]}\u00A0`
            resultsContainer.children[i].appendChild(questionAnswer) 
       }
    }
}




window.onload = setQuestion()
window.onload = displayQuestionBar()
nextBtn.addEventListener("click", handleNext)
prevBtn.addEventListener("click", handlePrev)
showResultsBtn.addEventListener("click", handleShowResults)