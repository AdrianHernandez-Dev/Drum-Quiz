const Store = {
  questions: [
    {
      question: 'What drum company was created in 1909?',
      answers: ['Tama', 'DW Drums', 'Sabian', 'Ludwig'],
      correctAnswer: 'Ludwig'
    },
    {
      question: 'Which is not the name of a famous drummer',
      answers: ['Keith Moon', 'Ringo Star', 'John Bonham', 'Neil Young'],
      correctAnswer: 'Neil Young'
    },
    {
      question: 'What brand was created by a Zildjian family feud?',
      answers: ['Sabian', 'Meinl', 'Paiste', 'Wuhan'],
      correctAnswer: 'Sabian'
    },
    {
      question: 'Which one of the following drums is between the drummer\'s knees on a standard kit?',
      answers: ['Tom-tom', 'Snare', 'Bass', 'Hi-Hat'],
      correctAnswer: 'Snare'
    },
    {
      question: 'How many drum rudiments are there?',
      answers: [20, 70, 40, 50],
      correctAnswer: 40
    }
  ],
  currentQuestion: 0,
  score: 0
}


function startQuiz() {
  $('.start-quiz').on('click', function (event) {
    console.log('check');
    renderQuestion();
  }
  );
}

function renderQuestion() {
  let question = Store.questions[Store.currentQuestion];
  console.log(question)
  updateQuestion();
  const Html = $(`
        <div class="question">
            <h2>${question.question}</h2>
                <form id="js-submit">
                    <div class="answers"></div>
                    <br>
                    <button class="submit">Submit</button>
                </form>
        </div>
        `)
  $("main").html(Html);
  answers();
  answerCheck();
}

function answers() {
  let question = Store.questions[Store.currentQuestion];
  console.log(question)
  for (let i = 0; i < question.answers.length; i++) {
    console.log(i);
    $('.answers').append(`
      <div class="val">
      <input type="radio" class="answers" name="answers" value="${question.answers[i]}" /><label>${question.answers[i]}</label>
      </div>
  `);
  }
}

function updateQuestion() {
  //after a question is answered. This function will push the number and score
  const html = $(`<ul>
      <li id="question-number">Question: ${Store.currentQuestion + 1}/${Store.questions.length}</li>
      <li id="score">Score: ${Store.score}/${Store.questions.length}</li>
    </ul>`);
  $(".number-score").html(html);
}

function answerCheck() {
  //this function will handel the even of a correct answer
  $('#js-submit').on('submit', function (event) {
    event.preventDefault();
    console.log('checked');
    let selected = $('input:checked');
    let answer = selected.val();
    console.log(typeof answer);
    let correct = Store.questions[Store.currentQuestion].correctAnswer;
    console.log(typeof correct);
    if (answer.toString() === correct.toString()) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}


function correctAnswer() {
  //checks if an answer is correct and displays the results
  $('.question').html(
    `<h1>You got the answer correct!</h1>
    <img src="https://github.com/AdrianHernandez-Dev/Quiz-App/blob/master/Images/happy-drummer.jpg?raw=true" alt="happy">
    <h2>Great Job!</h2>
    <button class="next-question">Next Question</button>`
  );
  Store.score++;
  Store.currentQuestion++;
  nextQuestion();
}

function wrongAnswer() {
  // checks if an answer is wrong and displays that result.
  $('.question').html(
    `<h1>You got the answer wrong!</h1>
    <img src="https://github.com/AdrianHernandez-Dev/Quiz-App/blob/master/Images/sad-drummer.jpg?raw=true" alt="Sad" height="179" width="320">
    <h2>The Answer is</h2>
    <h2>${Store.questions[Store.currentQuestion].correctAnswer}</h2>
    <button class="next-question">Next Question</a></button>`
  );
  Store.currentQuestion++;
  nextQuestion();
}

function nextQuestion() {
  $('.question').on('click', function (event) {
    console.log('checkNext')
    console.log([Store.currentQuestion])
    //[Store.currentQuestion]+=1;
    if (Store.currentQuestion === Store.questions.length) {
      results();
    }
    else {
      renderQuestion();
    }
    //renderQuestion();
  })
}



function results() {
  //This function will display the results at the end of the quiz with the final score
  let results = $(`
<Div class="quiz">
    <h2>Results</h2>
    <section>
            <ul class="number-score">
              <li id="score">Score:
                <span>${Store.score} out of 5!</span>
              </li>
            </ul>
          </section>
    <button class="start-quiz"><a href="index.html">Restart Quiz</a></button>
</Div>`)
  $('.number-score').hide();
  $('.main').html(results);

}



function restartQuiz() {
  $('.start-quiz').on('click', function (event) {
    console.log('check');
    renderQuestion();
  })
}

function quizApp() {
  startQuiz();
  answerCheck();
  restartQuiz();
}

$(quizApp);