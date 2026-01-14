import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HamburgerMenuProps {
  portfolioMode: boolean;
  setPortfolioMode: (on: boolean) => void;
}

export function HamburgerMenu({ portfolioMode, setPortfolioMode }: HamburgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 hamburger-menu"
          style={{ width: 48, height: 48, fontSize: 24 }}
        >
          <Menu size={24} />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SheetHeader className="p-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4 flex flex-col gap-6">
          <div>
            <span className="font-semibold text-sm mb-2 block">Theme</span>
            <ThemeToggle />
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={portfolioMode}
                onChange={e => setPortfolioMode(e.target.checked)}
                className="accent-primary"
              />
              Portfolio Mode
            </label>
            <span className="text-xs text-muted-foreground">Hides personal/inside content</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
