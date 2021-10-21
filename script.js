const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const questionElement = document.getElementById("question")
const answerElements = document.getElementById("answers")

const questions = [
    {
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
    showQuestion(questions[questionIndex])
}

// Show question
const showQuestion = (question) => {
    console.log(question.question)
    questionElement.innerText = question.question 
    randomNumber = Math.trunc(Math.random() * (8 - 2 + 1) + 2 ) - 1
    for(let i = 0; i < randomNumber; i++){
        const button = document.createElement("button")
        button.innerText = questions[questionIndex].answers[i].ans
        button.addEventListener("click", (e)=> {
            if(question.selectedAnswers.length === 0 || !question.selectedAnswers.includes(e.target.innerText)){
                question.selectedAnswers.push(e.target.innerText)
                console.log(question.selectedAnswers)
            }
        })
        answerElements.appendChild(button) 
    }    
}



// Next question
const handleNext = () =>{
    if(questionIndex <= questions.length){
        questionIndex++
        setQuestion()
    }
    
}

// Previous question
const handlePrev = () => {

}

// Answer select
const handleAnserSelect = () => {

}

window.onload = setQuestion()
nextBtn.addEventListener("click", handleNext)
