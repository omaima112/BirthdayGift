import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slideshow from './Slideshow';
import { useTheme } from '../contexts/ThemeContext';
import { ConfettiAnimation } from './ConfettiAnimation';
import { Sparkles, Download } from 'lucide-react';

interface PhotocardModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebName: string;
  photocardImage?: string; // fallback single image
  celebImages?: string[]; // optional array of images for the celeb
  initialIndex?: number; // when provided, open modal at this slide index
  message: string;
}

export function PhotocardModal({ isOpen, onClose, celebName, photocardImage, celebImages, initialIndex, message }: PhotocardModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { currentTheme } = useTheme();

  const [selectedCelebImage, setSelectedCelebImage] = React.useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleOpen = () => {
    setShowConfetti(true);
    // If an initialIndex was provided (from the hero slideshow), use it.
    if (typeof initialIndex === 'number' && Array.isArray(celebImages) && celebImages.length > 0) {
      const idx = Math.min(Math.max(0, initialIndex), celebImages.length - 1);
      setSelectedIndex(idx);
      setSelectedCelebImage(celebImages[idx]);
    } else if (Array.isArray(celebImages) && celebImages.length > 0) {
      // fallback to random selection
      const randIndex = Math.floor(Math.random() * celebImages.length);
      setSelectedIndex(randIndex);
      setSelectedCelebImage(celebImages[randIndex]);
    } else if (photocardImage) {
      setSelectedIndex(0);
      setSelectedCelebImage(photocardImage);
    } else {
      setSelectedIndex(0);
      setSelectedCelebImage('/images/magnetic.svg');
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <>
      <ConfettiAnimation trigger={showConfetti} />
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (open) handleOpen();
        else onClose();
      }}>
        <DialogContent 
          className="max-w-md p-0 overflow-hidden bg-white/95 backdrop-blur-lg border-4"
          style={{ borderColor: currentTheme.accentColor }}
        >
          <div 
            className="p-6 animate-gradient"
            style={{ background: currentTheme.gradient }}
          >
            <DialogHeader>
              <DialogTitle 
                className="text-3xl text-center flex items-center justify-center gap-2"
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  color: currentTheme.type === 'pink' ? '#493267' : '#ffffff',
                }}
              >
                <Sparkles className="animate-pulse" />
                Digital Photocard
                <Sparkles className="animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-center" style={{ color: currentTheme.type === 'pink' ? '#493267' : '#ffffff', opacity: 0.9 }}>
                Your special gift from {celebName}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-4">
              <div className="relative group">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <Slideshow
                    images={(celebImages && celebImages.length > 0) ? celebImages : [photocardImage ?? '/images/magnetic.svg']}
                    initialIndex={selectedIndex}
                    onIndexChange={(i) => {
                      setSelectedIndex(i);
                      setSelectedCelebImage(((celebImages && celebImages[i]) || photocardImage || '/images/magnetic.svg') as string);
                    }}
                    autoPlay={false}
                    className="w-full h-80"
                    imgClassName="w-full h-80 object-cover rounded-lg shadow-xl"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm">{celebName}</p>
                </div>
              </div>

            <div 
              className="p-4 rounded-lg text-center"
              style={{ 
                backgroundColor: `${currentTheme.accentColor}20`,
                color: currentTheme.textColor,
              }}
            >
              <p className="italic">"{message}"</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={onClose}
                className="flex-1 rounded-full transition-all hover:scale-105"
                style={{
                  background: currentTheme.gradient,
                  color: currentTheme.type === 'pink' ? '#493267' : '#ffffff',
                }}
              >
                Close
              </Button>
              <Button
                variant="outline"
                className="rounded-full transition-all hover:scale-105"
                style={{
                  borderColor: currentTheme.accentColor,
                  color: currentTheme.textColor,
                }}
                onClick={async () => {
                  const url = selectedCelebImage ?? photocardImage ?? '/images/magnetic.svg';
                  try {
                    // If same-origin (starts with /) we can download by anchor
                    if (url.startsWith('/')) {
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = url.split('/').pop() || 'photocard.png';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      return;
                    }

                    // Otherwise fetch the file and download as blob
                    const resp = await fetch(url, { mode: 'cors' });
                    const blob = await resp.blob();
                    const objUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = objUrl;
                    a.download = (url.split('/').pop() || 'photocard.jpg').split('?')[0];
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(objUrl);
                  } catch (err) {
                    console.error('Download failed', err);
                  }
                }}
              >
                <Download size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}