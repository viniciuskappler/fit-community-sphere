
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Construction } from 'lucide-react';

interface DevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DevelopmentModal: React.FC<DevelopmentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-3 rounded-full">
              <Construction className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Em Desenvolvimento
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Essa parte do site ainda está em desenvolvimento e estará disponível em breve.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Entendi
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DevelopmentModal;
