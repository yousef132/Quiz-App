let questions = [
    {
        number: 1,
        question: "What does HTML stand for ?",
        options: [
            { text: "Hypertensive Money Loan", correct: false },
            { text: "Hypertext Manual Log", correct: false },
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hypertech Math Link", correct: false }
        ]
    },
    {
        number: 2,
        question: "What does XML stand for ?",
        options: [
            { text: "eXtended Markup Language", correct: false },
            { text: "eXtensible Markup Language", correct: true },
            { text: "eXtension Math Link", correct: false },
            { text: "eXpensive Money Loan", correct: false },
        ]
    },
    {
        number: 3,
        question: "What does URL stand for ?",
        options: [
            { text: "Universal Resource Language", correct: true },
            { text: "Uniform Resource Locator", correct: false },
            { text: "Universal Resource Locator", correct: false },
            { text: "University Resource Link ", correct: false },
        ]

    },
    {
        number: 4,
        question: "What does HTTP stand for ?",
        options: [
            { text: "Hypertext Transmitter Protocol", correct: false },
            { text: "Hypertest Transfer Protocol", correct: false },
            { text: "Hypertech Transit Protocol", correct: true },
            { text: "Hypertext Transfer Protocol", correct: false },
        ]
    },
    {
        number: 5,
        question: "What does SEO stand for ?",
        options: [
            { text: "Search Engine Orientation", correct: false },
            { text: "Script Engine Optimization", correct: true },
            { text: "Script Entension Order", correct: false },
            { text: "Search Engine Optimization", correct: false },
        ]
    },
    {
        number: 6,
        question: "What does API stand for ?",
        options: [
            { text: "Application Programming Interface", correct: false },
            { text: "Appliances Programming Interface", correct: false },
            { text: "Application Programming Instruction", correct: true },
            { text: "Appliances Programming Instruction", correct: false },
        ]
    },
    {
        number: 7,
        question: "What does CSS stand for ?",
        options: [
            { text: "Colorful Style Sheet", correct: true },
            { text: "Cascading Sheet Style", correct: false },
            { text: "Cascading Style Sheet", correct: false },
            { text: "Creative Style Sheet", correct: false },




        ]
    },
    {
        number: 8,
        question: "What does DOM stand for ?",
        options: [
            { text: "Document Object Model", correct: false },
            { text: "Docstring Object Model", correct: false },
            { text: "Doctype Object Model", correct: false },
            { text: "Document Object Module", correct: true },
        ]
    },
    {
        number: 9,
        question: "What does CMS stand for ?",
        options: [
            { text: "Content Managent System", correct: false },
            { text: "Content Manager System", correct: false },
            { text: "Content Managing System", correct: true },
            { text: "Content Management System", correct: false },
        ]
    }
];
let timer = document.getElementById("time");
let text = document.getElementsByClassName("text")[0];
let container = document.getElementsByClassName('container')[0];
let line = document.getElementsByClassName("line")[0];
let btns = document.getElementsByClassName("btn");//array
let next = document.getElementsByClassName("next")[0];
let question = document.querySelector("h3");
let all = document.getElementsByClassName("all")[0];
let choices = document.getElementsByClassName("choices")[0];
let cur = document.getElementsByClassName("cur")[0];
let curqsindx = 0, score = 0;


function replayAnimation(element , animationname) {
    element.classList.remove(animationname); 
    void element.offsetWidth;
    element.classList.add(animationname);
}
line.addEventListener('animationend', function () {
    replayAnimation(container,'animationmove');
    line.style.backgroundColor = '#ff9393';
    Array.from(choices.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.classList.remove("cl");
    });
    next.style.display = 'inline';
});
function startquiz() {
    curqsindx = score = 0;
    next.innerHTML = "Next";
    resetquestions();
    showquestion();
}
function resetquestions() {
    next.style.display = "none";
    while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }
}
function selectanswer(ch) {
    line.classList.remove("animationincrease");
    let selectedbtn = ch.target;
    let iscorrect = selectedbtn.dataset.correct === "true";

    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
        line.style.backgroundColor = '#9aeabc';


    }
    else {
        selectedbtn.classList.add("wrong");
        line.style.backgroundColor = '#ff9393';
    }
    Array.from(choices.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.classList.remove("cl");
    });
    next.style.display = 'inline'
}
function showcur() {
    cur.innerHTML = `${curqsindx + 1} of ${questions.length} Questions`
}
function showquestion() {
    let lchild = all.lastChild;
    if (lchild.tagName === 'P') {
        all.removeChild(lchild);
    }
    cur.style.display = 'inline';
    showcur();
    replayAnimation(line,"animationincrease");
    line.style.backgroundColor = 'rgb(11, 79, 128)';
    resetquestions();
    let curqs = questions[curqsindx];
    question.innerHTML = `${curqs.number}. ${curqs.question}`;
    curqs.options.forEach(element => {
        let button = document.createElement("button");
        button.innerHTML = element.text;
        button.classList.add("btn");
        button.classList.add("cl");
        choices.appendChild(button);
        if (element.correct) {
            button.dataset.correct = element.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}
next.addEventListener("click", gonext);
function gonext() {
    if (curqsindx < questions.length) {
        curqsindx++;
        if (curqsindx < questions.length) {
            showquestion();
        }
        else {
            showscore();
        }
    }
    else {
        startquiz();
    }
}
function showscore() {
    line.style.backgroundColor = 'rgb(11, 79, 128)';
    resetquestions();
    question.innerText = "";
    let p = document.createElement("p");
    p.innerText = `You Scored ${score} out of ${questions.length} !`;
    p.style.color = 'rgb(11, 79, 128)';
    p.style.fontSize = '25px';
    p.style.marginTop = '20px';
    p.setAttribute('id', 'pscore');
    all.appendChild(p);

    next.innerHTML = "Restart Quiz";
    next.style.display = 'inline';
    cur.style.display = 'none';

}
startquiz();