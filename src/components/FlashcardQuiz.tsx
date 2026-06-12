import React, { useState } from 'react';
import { BookOpen, HelpCircle, Check, X, Award, RotateCcw, HelpCircle as HelpIcon } from 'lucide-react';
import { ThemeConfig } from '../types';

interface Flashcard {
  q: string;
  a: string;
  topic: string;
}

const SHUFFLED_FLASHCARDS: Flashcard[] = [
  { q: "What is Tom Mitchell's formal Definition of Learning?", a: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.", topic: "Unit I: ML Basics" },
  { q: "Explain Bias vs Variance in Model Fitting.", a: "Bias is error from wrong assumptions, leading to Underfitting. Variance is sensitiveness to small training set alterations, leading to Overfitting.", topic: "Unit I: Tradeoffs" },
  { q: "When is a Z-test used instead of a T-test in Hypothesis Testing?", a: "Z-test is chosen when both the Population Standard Deviation (sigma) is strictly known AND the sample size is large (typically n >= 30). Otherwise, use Student-T.", topic: "Unit III: Inference" },
  { q: "State the Null and Alternative Hypothesis formats for ANOVA.", a: "H0: mu_1 = mu_2 = ... = mu_k (identical population means). H1: At least one population mean is significantly different.", topic: "Unit IV: ANOVA" },
  { q: "What is the primary function of the Kaplan-Meier Estimator?", a: "It is a non-parametric statistic used to estimate the survival probability function S(t) over continuous time intervals from right-censored life trials.", topic: "Unit V: Survival Analysis" },
  { q: "Explain the main difference between l1 and l2 regularization.", a: "L1 (Lasso) adds absolute coefficients penalization, driving redundant parameters to 0 (feature selection). L2 (Ridge) adds squared weights penalty, shrinking weights uniformly.", topic: "Unit V: Regularization" },
  { q: "Define the Familywise Error Rate (Type I Inflation).", a: "Conducting multiple pairwise t-tests instead of a single ANOVA increases the probability of committing at least one Type I error: familywise alpha = 1 - (1 - alpha)^k.", topic: "Unit IV: ANOVA Basics" },
  { q: "What are the 3 components of a Time Series smoothed by a Moving Average?", a: "Trend (long-term direction), Seasonality (predictable cyclical variations), and Noise (random daily fluctuations).", topic: "Unit V: Time Series" }
];

interface QuizQuestion {
  q: string;
  opts: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "If a student studies for 33 hours and holds an estimated z = 2, what is her pass probability mapped by a logistic sigmoid function P(Pass) = 1 / (1 + e^-z)?",
    opts: ["50%", "73%", "88%", "95%"],
    correct: 2,
    explanation: "P(Pass) = 1 / (1 + e^-2) = 1 / (1 + 0.1353) = 1/1.1353 = 0.88 or 88%. This corresponds precisely to the Unit V logit threshold!"
  },
  {
    q: "Why represents dividing sample sum of squares (SS) by (n - 1) instead of n when evaluating sample variance?",
    opts: [
      "To artificially increase standard deviation values.",
      "To provide an unbiased estimator of population variance (Bessel's correction).",
      "Because one observation is always corrupted by laboratory noise.",
      "We lose one degree of freedom because summation of values equals 100."
    ],
    correct: 1,
    explanation: "Dividing by (n - 1) accounts for the fact that sample means are slightly closer to sample points than true population means, providing an unbiased estimator."
  },
  {
    q: "What is the critical Familywise Error Rate if we perform 3 independent pairwise T-tests each at alpha = 0.05?",
    opts: ["5%", "10%", "14.3%", "15%"],
    correct: 2,
    explanation: "Familywise error is derived from probability multiplication rules: 1 - (1 - 0.05)^3 = 1 - 0.857 = 14.3%. That's why we MUST use ANOVA parent tests!"
  },
  {
    q: "In right-censoring within clinical trials, how is a patient who leaves the research before the final event handled?",
    opts: [
      "Their data is immediately erased from all records.",
      "They are listed as a synthetic death at the next timestamp.",
      "We count them as right-censored, preserving their survival proof up to that point.",
      "The global study halts instantly to locate their files."
    ],
    correct: 2,
    explanation: "Right-censoring preserves their positive survival information up to the drop-out month, allowing Kaplan-Meier estimators to produce accurate curves."
  }
];

interface ComponentProps {
  theme: ThemeConfig;
}

export const FlashcardQuiz: React.FC<ComponentProps> = ({ theme }) => {
  const [mode, setMode] = useState<'flashcards' | 'quiz'>('flashcards');

  // Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev + 1) % SHUFFLED_FLASHCARDS.length);
    }, 155);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev - 1 + SHUFFLED_FLASHCARDS.length) % SHUFFLED_FLASHCARDS.length);
    }, 155);
  };

  const handleQuizAnswer = (optIdx: number) => {
    if (submitted) return;
    setSelectedOpt(optIdx);
  };

  const submitQuizAnswer = () => {
    if (selectedOpt === null || submitted) return;
    setSubmitted(true);
    if (selectedOpt === QUIZ_QUESTIONS[quizIdx].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < QUIZ_QUESTIONS.length) {
      setQuizIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelectedOpt(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div id="flashcards-quiz-container" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl" style={{ backgroundColor: theme.bgLight }}>
            <BookOpen className="h-6 w-6" style={{ color: theme.primary }} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">Cram Session Playground</h2>
            <p className="text-xs text-slate-500">Interactive quick checks and practice exam simulations</p>
          </div>
        </div>

        {/* Toggle Mode button */}
        <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-center">
          <button
            onClick={() => setMode('flashcards')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mode === 'flashcards' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mode === 'quiz' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Practice Quiz
          </button>
        </div>
      </div>

      {mode === 'flashcards' ? (
        <div className="space-y-6">
          <div className="text-center font-mono text-[10px] tracking-wider text-slate-400 font-semibold mb-2">
            CARD {currentCardIdx + 1} OF {SHUFFLED_FLASHCARDS.length} &middot; {SHUFFLED_FLASHCARDS[currentCardIdx].topic}
          </div>

          {/* Flashcard container with 3D perspective flip effect */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-56 relative rounded-2xl cursor-pointer select-none transition-all duration-300 transform preserve-3d"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
            }}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between items-center text-center backface-hidden border-2"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.bgLight
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-xs">
                <HelpIcon className="h-4 w-4" style={{ color: theme.primary }} />
              </div>
              <p className="text-base font-bold text-slate-800 max-w-md my-auto leading-relaxed">
                {SHUFFLED_FLASHCARDS[currentCardIdx].q}
              </p>
              <div className="text-[10px] text-slate-400 font-medium">Click to reveal formula/answer</div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between items-center text-center backface-hidden border-2 rotate-y-180"
              style={{
                borderColor: theme.primary,
                backgroundColor: '#ffffff'
              }}
            >
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.bgLight, color: theme.primary }}>
                {SHUFFLED_FLASHCARDS[currentCardIdx].topic}
              </span>
              <p className="text-sm font-medium text-slate-600 max-w-lg my-auto leading-relaxed">
                {SHUFFLED_FLASHCARDS[currentCardIdx].a}
              </p>
              <div className="text-[10px] text-pink-500 font-semibold" style={{ color: theme.primary }}>&hearts; Knowledge is Love &hearts;</div>
            </div>
          </div>

          {/* Card navigation controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrevCard}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Previous Card
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-1.5 text-xs font-semibold text-white rounded-lg hover:shadow-sm"
              style={{ backgroundColor: theme.primary }}
            >
              Next Concept
            </button>
          </div>
        </div>
      ) : (
        /* QUIZ MODE */
        <div className="space-y-6">
          {!quizFinished ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>QUESTION {quizIdx + 1} OF {QUIZ_QUESTIONS.length}</span>
                <span className="font-mono text-slate-500">Current Score: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    backgroundColor: theme.primary,
                    width: `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>

              <div className="text-center font-bold text-slate-800 text-base max-w-xl mx-auto leading-relaxed pt-2">
                {QUIZ_QUESTIONS[quizIdx].q}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {QUIZ_QUESTIONS[quizIdx].opts.map((opt, oIdx) => {
                  let optStyle = "border-slate-200 hover:bg-slate-50/50 text-slate-700";
                  let leftBorderColor = "transparent";

                  if (selectedOpt === oIdx) {
                    optStyle = "font-bold text-pink-800 border-pink-300";
                    leftBorderColor = theme.primary;
                  }

                  if (submitted) {
                    if (oIdx === QUIZ_QUESTIONS[quizIdx].correct) {
                      optStyle = "bg-green-50 border-green-300 text-green-800 font-bold";
                    } else if (selectedOpt === oIdx) {
                      optStyle = "bg-red-50 border-red-300 text-red-800";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => handleQuizAnswer(oIdx)}
                      className="w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between"
                      style={{
                        borderColor: selectedOpt === oIdx && !submitted ? theme.primary : undefined,
                        borderLeftWidth: selectedOpt === oIdx ? '5px' : '1px',
                        borderLeftColor: selectedOpt === oIdx ? leftBorderColor : undefined,
                        backgroundColor: selectedOpt === oIdx && !submitted ? theme.bgLight : undefined
                      }}
                    >
                      <span>{opt}</span>
                      {submitted && oIdx === QUIZ_QUESTIONS[quizIdx].correct && (
                        <Check className="h-4 w-4 text-green-600 shrink-0 ml-2" />
                      )}
                      {submitted && selectedOpt === oIdx && oIdx !== QUIZ_QUESTIONS[quizIdx].correct && (
                        <X className="h-4 w-4 text-red-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {submitted && (
                    <p className="text-xs text-slate-500 max-w-sm italic">
                      <b>Explanation:</b> {QUIZ_QUESTIONS[quizIdx].explanation}
                    </p>
                  )}
                </div>

                {!submitted ? (
                  <button
                    disabled={selectedOpt === null}
                    onClick={submitQuizAnswer}
                    className="px-5 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 disabled:opacity-40"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Lock Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {quizIdx + 1 === QUIZ_QUESTIONS.length ? "Finish Test" : "Next Match"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* QUIZ FINISHED */
            <div className="text-center py-6 space-y-4 animation-scale-up">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-yellow-50 border border-yellow-200">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">You completed the simulation!</h3>
                <p className="text-xs text-slate-500">Practice questions result</p>
              </div>

              <div className="text-4xl font-extrabold" style={{ color: theme.primary }}>
                {score} / {QUIZ_QUESTIONS.length}
              </div>

              <p className="text-sm font-medium text-slate-600 max-w-sm mx-auto leading-relaxed italic">
                {score === QUIZ_QUESTIONS.length 
                  ? "Flawless score! Steniha, you are officially a statistical goddess. Ready to conquer double-mark sections! &hearts;"
                  : "Brilliant performance! Revise through the flashcards once more and you will effortlessly secure 100/100! &hearts;"}
              </p>

              <button
                onClick={resetQuiz}
                className="mx-auto px-4 py-2 font-semibold text-xs border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
