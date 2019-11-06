 const Store = { questions: [
     {
     question : 'What drum company is this logo for?' ,
     answers :[ 'Zildjian' , 'DW Drums', 'Sabian', 'Meinl'],
    correctAnswer : 'Meinl'
},
{
    question :'Which is not the name of a famous drummer' ,
    answers :['Keith Moon', 'Ringo Star', 'John Bonham', 'Neil Young'],
   correctAnswer : 'Neil Young'
},
{
    question : 'What brand was created by a Zildjian family feud?',
    answers :['Sabian', 'Meinl', 'Paiste', 'Wuhan'],
   correctAnswer : 'Sabian'
},
{
    question : 'Which one of the following drums is between the drummer\'s knees on a standard kit?',
    answers :['Tom-tom', 'Snare', 'Bass', 'Hi-Hat'],
   correctAnswer : 'Snare'
},
{
    question : 'How many drum rudiments are there?',
    answers :[20, 70, 40, 50],
   correctAnswer : 40
}
],
currentQuestion: 0,
score: 0
 }


function startQuiz(){
    $('.start-quiz').on('click', function (event){
        console.log('check');
        renderQuestion();
    }
    );
}
    startQuiz();

function renderQuestion(){
      let question = Store.questions[Store.currentQuestion];
        console.log(question)
        updateQuestion();
    const Html = $(`
        <Div class="question">
                <h2>${question.question}</h2>
                <div class="answers"></div>
                <form id="js-submit">
                <button class="submit">Submit</button>
                </form>
        </Div>`)
$("main").html(Html);
answers();
}

function answers()
{
  let question = Store.questions[Store.currentQuestion];
  console.log(question)
  for(let i=0; i<question.answers.length; i++)
  {
      console.log(i);
      $('.answers').append(`
      <div class="val">
      <input type="radio" class="answers" name="answers" value=${question.answers[i]}"><label>${question.answers[i]}</label>
      </div>
  `);
  }
}

function updateQuestion(){
        //after a question is answered. This function will push the number and score
  const html = $(`<ul>
      <li id="question-number">Question: ${Store.currentQuestion + 1}/${Store.questions.length}</li>
      <li id="score">Score: ${Store.score}/${Store.questions.length}</li>
    </ul>`);
  $(".number-score").html(html);
}
    



function answerCheck(){
    //this function will handel the even of a correct answer
  $('.quiz').on('submit','#js-submit',function (event) {
    event.preventDefault();
    console.log('checked');
    /*let selected = $('input: checked').val();
    console.log(selected);
    let correct = Store[currentQuestion].correctAnswer;
    if (answer === correct) {
     correctAnswer();
    } else {
     wrongAnswer();
    }*/
    });
}

answerCheck();

function correctAnswer(){
    //checks if an answer is correct and displays the results
    $('.quiz').html(
        `<h1>You got the answer correct!</h1>
          <h2>great job!</h2>
          <button class="next-question">Next Question</a></button>`
      );
      score++;
      updateQuestion();
}

function wrongAnswer(){
   // checks if an answer is wrong and displays that result.
   $('.quiz').html(
    `<h1>You got the answer wrong!</h1>
    <h2>The Answer is</h2>
    <h2>${Store.questions[Store.currentQuestion].correctAnswer}</h2>
    <button class="next-question">Next Question</a></button>`
  );
}

/*
function Results() {
//This function will display the results at the end of the quiz with the final score
}

function restartQuiz (){
    // when the user hits the restartquiz button. This function will take them back to
    //the start of the quiz.
}

function QuizApp() {
    startQuiz();
   // handleQuestions();
   // handleSelectOption();
    //restartQuiz();
  }
  
  //$(QuizApp);*/

  
