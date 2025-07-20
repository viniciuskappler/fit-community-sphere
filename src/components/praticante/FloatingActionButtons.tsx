
import React from 'react';
import { Button } from '@/components/ui/button';
import { PenTool, Calendar } from 'lucide-react';

interface FloatingActionButtonsProps {
  onCreatePost: () => void;
  onCreateEvent: () => void;
}

const FloatingActionButtons = ({ onCreatePost, onCreateEvent }: FloatingActionButtonsProps) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Button
        onClick={onCreatePost}
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
      >
        <PenTool className="h-6 w-6" />
        <span className="sr-only">Publicar</span>
      </Button>
      
      <Button
        onClick={onCreateEvent}
        className="h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/80"
        size="icon"
      >
        <Calendar className="h-6 w-6" />
        <span className="sr-only">Novo Evento</span>
      </Button>
    </div>
  );
};

export default FloatingActionButtons;
