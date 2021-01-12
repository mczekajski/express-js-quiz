function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let fiftyFiftyUsed = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język programowania na świecie wg mnie?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      correctAnswer: 2,
    },
    {
      question: "Czy ten kurs jest fajny?",
      answers: ["Nie wiem", "Oczywiście, że tak!", "Nie", "Jest najlepszy!"],
      correctAnswer: 3,
    },
    {
      question: "Czy chcesz zjeść pizzę?",
      answers: [
        "Nawet dwie!",
        "Jestem na diecie",
        "Nie, dziękuję",
        "Wolę brokuły",
      ],
      correctAnswer: 0,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        loser: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;
      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {

    if (isGameOver) {
        res.json({
          loser: true,
        });
    }

    const { index } = req.params;

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers
    });
  });
}

module.exports = gameRoutes;
