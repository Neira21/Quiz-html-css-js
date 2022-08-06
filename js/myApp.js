//En variables capturamos los siguientes campos, número de pregunta, texto 
//de la pregunta y las opciones

//Elementos de la vista de preguntas
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

//Vistas
const homeBox = document.querySelector(".home-box")
const questionBox = document.querySelector(".question-box")
const resultBox = document.querySelector(".result-box")


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for (let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question "+(questionCounter + 1) +" of " + quiz.length;
    const questionRandom = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    console.log(questionRandom)
    currentQuestion = questionRandom;
    questionText.innerHTML = questionRandom.q;

    const index1 = availableQuestions.indexOf(questionRandom)
    availableQuestions.splice(index1,1);

    if(currentQuestion.hasOwnProperty("img")){
        //console.log(currentQuestion.img)
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img)
    }
    

    //Para las opciones de la pregunta
    const optionlen = currentQuestion.options.length
    for(let i = 0; i<optionlen; i++){
        // console.log(i)
        availableOptions.push(i)
    }

    optionContainer.innerHTML='';

    let animationDelay = 0.2;

    for(let i = 0; i<optionlen; i++){
        const optionRandom = availableOptions[Math.floor(Math.random()*availableOptions.length)]
        const index2 = availableOptions.indexOf(optionRandom)
        
        availableOptions.splice(index2,1)

        //console.log(optionRandom)
        // console.log(availableOptions)
        const option = document.createElement("div")
        option.innerHTML = questionRandom.options[optionRandom]
        option.id=optionRandom
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15; 
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)")
    }
    questionCounter++;
}


//Obtener la repuesta correcta por consola
function getResult(element){
    const id = parseInt(element.id);
    
    if(id===currentQuestion.answer){
        correctAnswers++;
        console.log("Respuesta correcta")

    }else{
        console.log("Respuesta incorrecta")
    }
    attempt++; 
    next()
    
}


//Luego de elegir una opción hacer que las demás opciones ya no se activen

function unclickableOptions(){
    const optionlen = optionContainer.children.length

    for(let i = 0; i<optionlen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}


function next(){
    if(questionCounter === quiz.length){
        quizOver()
    }else{
        getNewQuestion();
    }
}

function quizOver(){
    questionBox.classList.add("hide")
    resultBox.classList.remove("hide")
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attemps").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
    console.log(attempt)
    console.log(correctAnswers)
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide")
    questionBox.classList.remove("hide")
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide")
    homeBox.classList.remove("hide")
    resetQuiz();
}


function startQuiz(){

    homeBox.classList.add("hide")
    questionBox.classList.remove("hide")
    setAvailableQuestions();
    getNewQuestion()
}

window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}