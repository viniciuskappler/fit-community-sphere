
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal = ({ isOpen, onClose }: CreateEventModalProps) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    image: '',
    date: '',
    time: '',
    location: '',
    city: '',
    price: '',
    organizer: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Mock submission - in real implementation would save to Supabase
    console.log('Creating event:', eventData);
    onClose();
    setEventData({
      name: '',
      description: '',
      image: '',
      date: '',
      time: '',
      location: '',
      city: '',
      price: '',
      organizer: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>📅 Novo Evento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventName">Nome do Evento</Label>
            <Input
              id="eventName"
              placeholder="Ex: Torneio de Beach Tennis"
              value={eventData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="eventDesc">Descrição</Label>
            <Textarea
              id="eventDesc"
              placeholder="Descreva seu evento..."
              value={eventData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="eventImage">URL da Imagem</Label>
            <Input
              id="eventImage"
              placeholder="https://exemplo.com/imagem.jpg"
              value={eventData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate">Data</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="eventTime">Horário</Label>
              <Input
                id="eventTime"
                type="time"
                value={eventData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eventLocation">Local</Label>
            <Input
              id="eventLocation"
              placeholder="Ex: Arena Sports Center"
              value={eventData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="eventCity">Cidade</Label>
            <Input
              id="eventCity"
              placeholder="Ex: Porto Alegre, RS"
              value={eventData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="eventPrice">Valor (opcional)</Label>
            <Input
              id="eventPrice"
              placeholder="Ex: R$ 50,00"
              value={eventData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="organizer">Grupo Organizador</Label>
            <Select value={eventData.organizer} onValueChange={(value) => handleInputChange('organizer', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volei-litoral">Vôlei Litoral RS</SelectItem>
                <SelectItem value="beach-poa">Beach Tennis POA</SelectItem>
                <SelectItem value="futebol-amador">Futebol Amador RS</SelectItem>
                <SelectItem value="corrida-porto">Corrida Porto Alegre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={!eventData.name || !eventData.date || !eventData.time}
            >
              Criar Evento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
