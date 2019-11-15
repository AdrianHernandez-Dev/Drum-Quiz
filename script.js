const STORE = {
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
    renderQuestion();
  }
  );
}

function renderQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestion();
  const Html = $(`    
        <section class="question">
            <h2>${question.question}</h2>
                <form id="js-submit">
                    <div class="answers"></div>
                    <br>
                    <button class="submit">Submit</button>
                </form>
        </section>
        `)
  $("main").html(Html);
  answers();
  answerCheck();
}

function answers() {
  let question = STORE.questions[STORE.currentQuestion];
  for (let i = 0; i < question.answers.length; i++) {
    $('.answers').append(`
      <section class="val">
      <label><input type="radio" class="answers" name="answers" value="${question.answers[i]}" />${question.answers[i]}</label>
      </section>
  `);
  }
}

function updateQuestion() {
  const html = $(`<ul>
      <li id="question-number">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".number-score").html(html);
}


function answerCheck() {
  $('#js-submit').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE.questions[STORE.currentQuestion].correctAnswer;
    if (answer.toString() === correct.toString()) {
      STORE.score++;
      updateQuestion()
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}


function correctAnswer() {
  $('.question').html(
    `<h1>You got the answer correct!</h1>
    <img src="https://github.com/AdrianHernandez-Dev/Quiz-App/blob/master/Images/happy-drummer.jpg?raw=true" alt="happy">
    <h2>Great Job!</h2>
    <button class="next-question">Next Question</button>`
  );
  STORE.currentQuestion++;
  nextQuestion();
}

function wrongAnswer() {
  $('.question').html(
    `<h1>You got the answer wrong!</h1>
    <img src="https://github.com/AdrianHernandez-Dev/Quiz-App/blob/master/Images/sad-drummer.jpg?raw=true" alt="Sad" height="179" width="320">
    <h2>The Answer is</h2>
    <h2>${STORE.questions[STORE.currentQuestion].correctAnswer}</h2>
    <button class="next-question">Next Question</a></button>`
  );
  STORE.currentQuestion++;
  nextQuestion();
}

function nextQuestion() {
  $('.question').on('click', function (event) {
    if (STORE.currentQuestion === STORE.questions.length) {
      results();
    }
    else {
      renderQuestion();
    }
  })
}

function results() {
  let results = $(`
<section class="results">
    <h2 class="end">Results</h2>
    <div>
            <ul class="number-score">
              <li id="score">Score:
                <span>${STORE.score} out of 5!</span>
              </li>
            </ul>
          </div>
          <button type="submit" class="restartQuiz button">Restart</button>
</section>`)
  $('.main').html(results);

}


function restartQuiz() {
  $('.main').on('click', '.restartQuiz', function (event) {
    event.preventDefault();
    STORE.score = 0;
    STORE.currentQuestion = 0;
    renderQuestion();
  })
}

function quizApp() {
  startQuiz();
  answerCheck();
  restartQuiz();
}

$(quizApp);