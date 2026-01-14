import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { SparkleAnimation } from './SparkleAnimation';
import { Quiz, QuizQuestion } from './Quiz';
import { PhotocardModal } from './PhotocardModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slideshow from './Slideshow';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';

interface CelebPageProps {
  celebName: string;
  celebImage: string;
  celebImages?: string[];
  photocardImage: string;
  photocardMessage: string;
  quizQuestions: QuizQuestion[];
  onBack: () => void;
}

export function CelebPage({
  celebName,
  celebImage,
  celebImages,
  photocardImage,
  photocardMessage,
  quizQuestions,
  onBack,
}: CelebPageProps) {
  const { currentTheme } = useTheme();
  const [isPhotocardOpen, setIsPhotocardOpen] = useState(false);
  const [hasHoveredImage, setHasHoveredImage] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [photocardOpenIndex, setPhotocardOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SparkleAnimation />
      
      <div
        className="absolute inset-0 animate-gradient -z-10"
        style={{ background: currentTheme.gradient }}
      />

      {/* Back Button */}
      <Button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 rounded-full transition-all hover:scale-105"
        style={{
          background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)',
          color: currentTheme.textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = currentTheme.gradient;
          e.currentTarget.style.color = currentTheme.type === 'pink' ? '#493267' : '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)';
          e.currentTarget.style.color = currentTheme.textColor;
        }}
      >
        <ArrowLeft size={20} className="mr-2" />
        Home
      </Button>

      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div 
              className="relative group h-96"
              onMouseEnter={() => setHasHoveredImage(true)}
            >
                <Slideshow
                  images={celebImages && celebImages.length > 0 ? celebImages : [celebImage]}
                  autoPlay={true}
                  interval={2000}
                  className="w-full h-full rounded-3xl shadow-2xl"
                  imgClassName="w-full h-full object-cover rounded-3xl"
                  initialIndex={0}
                  onIndexChange={(i) => setSlideshowIndex(i)}
                />
              {hasHoveredImage && (
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="text-yellow-300 animate-pulse" size={32} fill="currentColor" />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="space-y-6 text-center md:text-left">
              <h1
                className="text-5xl md:text-6xl"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
                }}
              >
                {celebName}
              </h1>
              <p
                className="text-xl"
                style={{
                  color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
                  opacity: 0.9,
                }}
              >
                One of Samal's favorite people! ✨
              </p>

              {/* Photocard Button */}
              <Button
                onClick={() => {
                  setPhotocardOpenIndex(slideshowIndex);
                  setIsPhotocardOpen(true);
                }}
                className="rounded-full px-8 py-6 text-xl transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  background: currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)',
                  color: currentTheme.textColor,
                  border: `3px solid ${currentTheme.accentColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = currentTheme.gradient;
                  e.currentTarget.style.color = currentTheme.type === 'pink' ? '#493267' : '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = currentTheme.type === 'purple' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.color = currentTheme.textColor;
                }}
              >
                <Gift className="mr-2" />
                Open Digital Photocard
              </Button>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2
                className="text-4xl"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
                }}
              >
                Test Your Knowledge! 🎯
              </h2>
              <p
                style={{
                  color: currentTheme.type === 'purple' ? '#ffffff' : currentTheme.textColor,
                  opacity: 0.8,
                }}
              >
                How well do you know {celebName}?
              </p>
            </div>
            <Quiz questions={quizQuestions} />
          </div>
        </div>
      </div>

      {/* Photocard Modal */}
      <PhotocardModal
        isOpen={isPhotocardOpen}
        onClose={() => setIsPhotocardOpen(false)}
        celebName={celebName}
        photocardImage={photocardImage}
        celebImages={celebImages && celebImages.length > 0 ? celebImages : [photocardImage]}
        initialIndex={photocardOpenIndex ?? slideshowIndex}
        message={photocardMessage}
      />
    </div>
  );
}
