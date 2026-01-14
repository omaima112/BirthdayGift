import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { ConfettiAnimation } from './ConfettiAnimation';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { currentTheme } = useTheme();
  

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
        setShowConfetti(true);
      }
    }, 1500);
  };

  // badges removed: no persistence or save logic

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowConfetti(false);
  };

  if (showResult) {
    return (
      <>
        <ConfettiAnimation trigger={showConfetti} />
        <Card
          className="p-8 text-center space-y-4 backdrop-blur-sm"
          style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.8)' }}
        >
          <h3 className="text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Quiz Complete! 🎉
          </h3>
          <p className="text-xl" style={{ color: currentTheme.textColor }}>
            You scored {score} out of {questions.length}!
          </p>

          <div className="mt-2 flex items-center justify-center">
            <div className="px-4 py-2 rounded-full" style={{ background: currentTheme.gradient, color: currentTheme.type === 'pink' ? '#493267' : '#fff' }}>
              <strong>Thanks for playing!</strong>
            </div>
          </div>
          <Button
            onClick={resetQuiz}
            className="mt-4 rounded-full px-6 py-3 transition-all hover:scale-105"
            style={{
              background: currentTheme.gradient,
              color: currentTheme.type === 'pink' ? '#493267' : '#ffffff',
            }}
          >
            Try Again
          </Button>
        </Card>
      </>
    );
  }

  return (
    <Card
      className="p-6 space-y-6 backdrop-blur-sm"
      style={{ background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.8)' }}
    >
      <div className="space-y-2">
        <p className="text-sm opacity-70">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: currentTheme.textColor }}>
          {questions[currentQuestion].question}
        </h3>
      </div>

      <div className="grid gap-3">
        {questions[currentQuestion].options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === questions[currentQuestion].correctAnswer;
          const showCorrect = answered && isCorrect;
          const showIncorrect = answered && isSelected && !isCorrect;

          return (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className="rounded-full px-6 py-3 transition-all hover:scale-105 text-left justify-start"
                style={{
                  background: showCorrect
                    ? '#4ade80'
                    : showIncorrect
                    ? '#f87171'
                    : isSelected
                    ? currentTheme.gradient
                    : currentTheme.type === 'purple'
                    ? 'rgba(0,0,0,0.45)'
                    : 'white',
                  color: showCorrect || showIncorrect ? 'white' : currentTheme.textColor,
                  border: `2px solid ${currentTheme.accentColor}20`,
                  boxShadow: isSelected && !answered ? `0 0 20px ${currentTheme.buttonHover}` : 'none',
                }}
            >
              {option}
            </Button>
          );
        })}
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            background: currentTheme.gradient,
          }}
        />
      </div>
    </Card>
  );
}
