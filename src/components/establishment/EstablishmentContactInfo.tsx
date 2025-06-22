
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin } from 'lucide-react';

interface EstablishmentContactInfoProps {
  establishment: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    cep: string;
    corporate_name: string;
    created_at: string;
  };
}

const EstablishmentContactInfo: React.FC<EstablishmentContactInfoProps> = ({
  establishment
}) => {
  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 text-gray-500" />
              <a href={`tel:${establishment.phone}`} className="text-orange-600 hover:underline">
                {establishment.phone}
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 text-gray-500" />
              <a href={`mailto:${establishment.email}`} className="text-orange-600 hover:underline">
                {establishment.email}
              </a>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm">{establishment.address}</p>
                <p className="text-sm text-gray-600">
                  {establishment.city} - {establishment.state}
                </p>
                <p className="text-sm text-gray-600">CEP: {establishment.cep}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.open(`https://wa.me/55${establishment.phone.replace(/\D/g, '')}`, '_blank')}
            >
              WhatsApp
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => window.open(`tel:${establishment.phone}`, '_self')}
            >
              Ligar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informações</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Razão Social:</span>
              <p className="text-gray-600">{establishment.corporate_name}</p>
            </div>
            <div>
              <span className="font-medium">Cadastrado desde:</span>
              <p className="text-gray-600">
                {new Date(establishment.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstablishmentContactInfo;
