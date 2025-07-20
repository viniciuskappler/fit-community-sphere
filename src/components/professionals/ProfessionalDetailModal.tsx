
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Award, CheckCircle, Phone, Mail, Instagram, Linkedin, Facebook, Star } from 'lucide-react';

interface Professional {
  id: string;
  nome: string;
  imagem_url: string;
  especialidade: string;
  modalidades: string[];
  cidade: string;
  estado: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  bio: string;
  telefone?: string;
  email?: string;
  instagram?: string;
  site?: string;
  verificado: boolean;
  data_nascimento?: string;
}

interface ProfessionalDetailModalProps {
  professional: Professional | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProfessionalDetailModal = ({ professional, isOpen, onClose }: ProfessionalDetailModalProps) => {
  if (!professional) return null;

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
  };

  const handleWhatsAppContact = () => {
    if (professional.telefone) {
      const phoneNumber = formatPhone(professional.telefone);
      window.open(`https://wa.me/55${phoneNumber}`, '_blank');
    }
  };

  const age = professional.data_nascimento ? calculateAge(professional.data_nascimento) : null;
  const fullAddress = [professional.rua, professional.numero, professional.bairro, professional.cidade, professional.estado]
    .filter(Boolean)
    .join(', ');

  // Mock rating data - in the future this could come from reviews
  const mockRating = 4.8;
  const mockReviewCount = 127;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Perfil do Profissional</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with photo and basic info */}
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={professional.imagem_url} alt={professional.nome} />
              <AvatarFallback className="text-lg">
                {professional.nome.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{professional.nome}</h2>
                {professional.verificado && (
                  <span title="Profissional verificado">
                    <CheckCircle size={20} className="text-green-500" />
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Award size={16} />
                  {professional.especialidade}
                </div>
                {age && (
                  <div>{age} anos</div>
                )}
              </div>

              {/* Mock Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(mockRating) ? "text-yellow-500 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {mockRating} ({mockReviewCount} avaliações)
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-1" />
                {professional.cidade}, {professional.estado}
              </div>
            </div>
          </div>

          {/* Bio/Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sobre o Profissional</h3>
            <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
          </div>

          {/* Services Description - Mock for now */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Serviços Oferecidos</h3>
            <p className="text-gray-700 leading-relaxed">
              Oferece acompanhamento personalizado com foco em resultados. Atendimento individual e em grupos pequenos. 
              Programa de treinos adaptado às necessidades e objetivos de cada cliente.
            </p>
          </div>

          {/* Address */}
          {fullAddress && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Local de Atendimento</h3>
              <p className="text-gray-700 flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                {fullAddress}
              </p>
            </div>
          )}

          {/* Modalidades */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Modalidades Atendidas</h3>
            <div className="flex flex-wrap gap-2">
              {professional.modalidades.map((modalidade) => (
                <Badge key={modalidade} variant="secondary">
                  {modalidade}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mock sports specialties */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Esportes Mais Atendidos</h3>
            <div className="flex flex-wrap gap-2">
              {['Futebol', 'Musculação', 'Corrida', 'Natação'].map((esporte) => (
                <Badge key={esporte} variant="outline">
                  {esporte}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contato</h3>
            <div className="space-y-3">
              {professional.telefone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-500" />
                  <span className="text-gray-700">{professional.telefone}</span>
                </div>
              )}
              {professional.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-gray-700">{professional.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Redes Sociais</h3>
            <div className="flex gap-4">
              {professional.instagram && (
                <a
                  href={professional.instagram.startsWith('http') ? professional.instagram : `https://instagram.com/${professional.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                >
                  <Instagram size={20} />
                  <span className="text-sm">Instagram</span>
                </a>
              )}
              {/* Mock LinkedIn and Facebook for demo */}
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Linkedin size={20} />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-800 hover:text-blue-900"
              >
                <Facebook size={20} />
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Contact Button */}
          {professional.telefone && (
            <div className="pt-4 border-t">
              <Button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Entrar em Contato (WhatsApp)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfessionalDetailModal;
