import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './components/HomePage';
import { CelebPage } from './components/CelebPage';
import { ThemeToggle } from './components/ThemeToggle';
import { QuizQuestion } from './components/Quiz';
import InteractiveCursor from './components/InteractiveCursor';
import CelebMatchGame from './components/CelebMatchGame';
// Playlist page removed — audio stays as sticky player
import SurprisePage from './components/SurprisePage';
import AudioPlayer from './components/ui/audio-player';
import './styles/globals.css';

// Quiz data for each celeb
const billieQuiz: QuizQuestion[] = [
  {
    question: "What year was Billie Eilish born?",
    options: ["2000", "2001", "2002", "2003"],
    correctAnswer: 1,
  },
  {
    question: "Which song made Billie Eilish famous?",
    options: ["bad guy", "ocean eyes", "bury a friend", "everything i wanted"],
    correctAnswer: 1,
  },
  {
    question: "What is Billie's signature style?",
    options: ["Bright colors", "Oversized clothing", "Formal wear", "Athletic wear"],
    correctAnswer: 1,
  },
  {
    question: "Who does Billie frequently collaborate with?",
    options: ["Her brother FINNEAS", "Her sister", "Her mom", "Her dad"],
    correctAnswer: 0,
  },
  {
    question: "What color is Billie most associated with?",
    options: ["Pink", "Green and black", "Red", "Blue"],
    correctAnswer: 1,
  },
];

const jakeQuiz: QuizQuestion[] = [
  {
    question: "Which K-pop group is Jake from?",
    options: ["BTS", "ENHYPEN", "TXT", "SEVENTEEN"],
    correctAnswer: 1,
  },
  {
    question: "What is Jake's nationality?",
    options: ["Korean", "Australian", "American", "British"],
    correctAnswer: 1,
  },
  {
    question: "What is Jake known for in ENHYPEN?",
    options: ["Rapping", "Dancing", "Singing and visuals", "Producing"],
    correctAnswer: 2,
  },
  {
    question: "What year did ENHYPEN debut?",
    options: ["2019", "2020", "2021", "2022"],
    correctAnswer: 1,
  },
  {
    question: "What is Jake's representative emoji?",
    options: ["🐶", "🐱", "🐰", "🐻"],
    correctAnswer: 0,
  },
];

const jennieQuiz: QuizQuestion[] = [
  {
    question: "Which group is Jennie from?",
    options: ["TWICE", "RED VELVET", "BLACKPINK", "ITZY"],
    correctAnswer: 2,
  },
  {
    question: "What is Jennie's position in BLACKPINK?",
    options: ["Main vocalist", "Main rapper", "Main dancer", "Leader"],
    correctAnswer: 1,
  },
  {
    question: "Where was Jennie born?",
    options: ["Seoul, Korea", "Anyang, Korea", "Busan, Korea", "Incheon, Korea"],
    correctAnswer: 1,
  },
  {
    question: "What is Jennie's solo debut song?",
    options: ["SOLO", "ON THE GROUND", "Gone", "Money"],
    correctAnswer: 0,
  },
  {
    question: "What nickname is Jennie known by?",
    options: ["Human Gucci", "Human Chanel", "Human Dior", "Human Prada"],
    correctAnswer: 1,
  },
];

const beomgyuQuiz: QuizQuestion[] = [
  {
    question: "Which group is Beomgyu from?",
    options: ["BTS", "TXT", "ENHYPEN", "ATEEZ"],
    correctAnswer: 1,
  },
  {
    question: "What is Beomgyu's role in TXT?",
    options: ["Leader", "Main dancer", "Vocalist and visual", "Main rapper"],
    correctAnswer: 2,
  },
  {
    question: "What year did TXT debut?",
    options: ["2018", "2019", "2020", "2021"],
    correctAnswer: 1,
  },
  {
    question: "What is Beomgyu known for?",
    options: ["Being the oldest", "His humor and charm", "Producing", "Choreography"],
    correctAnswer: 1,
  },
  {
    question: "What instrument can Beomgyu play?",
    options: ["Piano", "Drums", "Guitar", "Violin"],
    correctAnswer: 2,
  },
];

// Photocard messages
const photocardMessages = {
  billie: "Billie's voice is as unique as you are, Samal! Keep being authentically you 💚",
  jake: "Jake's smile is as bright as yours! May your day be filled with sunshine ☀️",
  jennie: "Jennie's confidence and style remind us of you! Stay fierce and fabulous 👑",
  beomgyu: "Beomgyu's charm and humor light up every room, just like you do! ✨",
};

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [audioUrl, setAudioUrl] = useState<string | null>('/audio/birthday.mp3');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // no seeded badges — badges must be earned by completing celeb quizzes

  const handleNavigate = (page: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsTransitioning(false);
    }, 240);
  };

  const setPersistentAudio = (url: string) => {
    setAudioUrl(url);
  };

  // Konami code to unlock surprise page
  React.useEffect(() => {
    const code = [38,38,40,40,37,39,37,39,66,65];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e as any).keyCode === code[idx]) {
        idx++;
        if (idx === code.length) {
          handleNavigate('surprise');
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'billie':
        return (
          <CelebPage
            celebName="Billie Eilish"
            celebImage="/images/billie1.png"
            celebImages={["/images/billie1.png", "/images/billie2.png","/images/billie3.png","/images/billie4.png"]}
            photocardImage="/images/billie2.png"
            photocardMessage={photocardMessages.billie}
            quizQuestions={billieQuiz}
            onBack={() => handleNavigate('home')}
          />
        );
      case 'jake':
        return (
          <CelebPage
            celebName="Sim Jake"
            celebImage="/images/jake1.png"
            celebImages={["/images/jake1.png","/images/jake2.png","/images/jake3.png","/images/jake4.png","/images/jake5.png","/images/jake6.png","/images/jake7.png"]}
            photocardImage="/images/jake3.png"
            photocardMessage={photocardMessages.jake}
            quizQuestions={jakeQuiz}
            onBack={() => handleNavigate('home')}
          />
        );
      case 'jennie':
        return (
          <CelebPage
            celebName="Kim Jennie"
            celebImage="/images/jennie1.png"
            celebImages={["/images/jennie1.png","/images/jennie2.png","/images/jennie3.png","/images/jennie4.png"]}
            photocardImage="/images/jennie2.png"
            photocardMessage={photocardMessages.jennie}
            quizQuestions={jennieQuiz}
            onBack={() => handleNavigate('home')}
          />
        );
      case 'beomgyu':
        return (
          <CelebPage
            celebName="Beomgyu"
            celebImage="/images/BeomgyuTXT.png"
            celebImages={["/images/beomgyu1.png","/images/beomgyu2.png","/images/beomgyu4.png","/images/BeomgyuTXT.png"]}
            photocardImage="/images/beomgyu2.png"
            photocardMessage={photocardMessages.beomgyu}
            quizQuestions={beomgyuQuiz}
            onBack={() => handleNavigate('home')}
          />
        );
      case 'match':
        return (
          <div className="min-h-screen px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <CelebMatchGame onMatch={(p) => handleNavigate(p)} onBack={() => handleNavigate('home')} />
            </div>
          </div>
        );
      // Playlist page removed — users control playback using the sticky player
      case 'surprise':
        return <SurprisePage onBack={() => handleNavigate('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className={`relative transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100'} ${audioUrl ? 'with-audio' : ''}`}>
        <InteractiveCursor />
        <ThemeToggle />
        {renderPage()}

        {/* Persistent audio player (sticky) */}
        {audioUrl && (
          <div className="audio-sticky" aria-hidden={false}>
            <AudioPlayer defaultUrl={audioUrl} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
