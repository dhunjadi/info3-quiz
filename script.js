const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const showResultsBtn = document.getElementById("show-results-btn")
const questionElement = document.getElementById("question")
const answerElements = document.getElementById("answers")
const questionBar = document.getElementById("question-bar")
const resultsContainer = document.getElementById("results-container")

const questions = [{
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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

    // Hiding the previous button if first question is displayed
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
    showQuestion(questions[questionIndex])
}

// Show question
const showQuestion = (question) => {

    // Removing answers when going back to questions with question bar
    while (answerElements.firstChild) {
        answerElements.removeChild(answerElements.firstChild)
    }

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
                    // Changing the background color in the question bar
                    questionBar.children[questionIndex].style.backgroundColor = "blue"
                    // Displaying the warning message
                } else {
                    let warningMessage = document.createElement('div');
                    warningMessage.innerHTML = `Odabrali ste više odgovora nego što je dopušteno`
                    questionElement.appendChild(warningMessage);
                    // Removing the warning message after 3 seconds
                    setTimeout(() => {
                        questionElement.removeChild(warningMessage);
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

const displayQuestionBar = () => {
    for(i = 0; i < questions.length; i++){
        const questionNumContainer = document.createElement("div")
        const questionNum = document.createElement("p")
        questionNum.innerText = questions[i].id
        questionNumContainer.appendChild(questionNum)
        questionNumContainer.addEventListener("click", () => {
            questionIndex = Number(questionNum.innerText) -1 
            setQuestion()
        })
        questionBar.appendChild(questionNumContainer)

    }
}

const handleShowResults = () =>{
    for(let i = 0; i < questions.length; i++){
        const questionAnswersContainer = document.createElement("div")
        questionAnswersContainer.classList.add("question-answers")
        for(let x = 0; x < questions[i].selectedAnswers.length; x++){
            const questionAnswer = document.createElement("p")
            questionAnswer.innerText = questions[i].selectedAnswers[x]
            console.log(questionAnswer)
            questionAnswersContainer.appendChild(questionAnswer)
        }

        resultsContainer.appendChild(questionAnswersContainer)
        
    }
}

window.onload = setQuestion()
window.onload = displayQuestionBar()
nextBtn.addEventListener("click", handleNext)
prevBtn.addEventListener("click", handlePrev)
showResultsBtn.addEventListener("click", handleShowResults)