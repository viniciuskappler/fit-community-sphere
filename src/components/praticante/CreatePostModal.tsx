
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X, Upload } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [caption, setCaption] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && images.length < 5) {
      // Mock: just add placeholder URLs
      const newImages = Array.from(files).slice(0, 5 - images.length).map(() => 
        '/placeholder.svg'
      );
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Mock submission - in real implementation would save to Supabase
    console.log('Creating post:', { caption, selectedSport, images });
    onClose();
    setCaption('');
    setSelectedSport('');
    setImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>✍️ Nova Publicação</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="caption">Legenda</Label>
            <Textarea
              id="caption"
              placeholder="Compartilhe sua experiência esportiva..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sport">Esporte</Label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o esporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futebol">Futebol</SelectItem>
                <SelectItem value="volei">Vôlei</SelectItem>
                <SelectItem value="beach-tennis">Beach Tennis</SelectItem>
                <SelectItem value="basquete">Basquete</SelectItem>
                <SelectItem value="natacao">Natação</SelectItem>
                <SelectItem value="corrida">Corrida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Imagens (até 5)</Label>
            <div className="mt-2">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={images.length >= 5}
                className="mb-2"
              />
              
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!caption.trim() || !selectedSport}
            >
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
