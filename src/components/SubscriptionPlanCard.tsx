
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface PlanProps {
  id: string;
  name: string;
  description?: string;
  type: string;
  price: number;
  discountedPrice?: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isFree: boolean;
  isPopular?: boolean;
  isDiscounted?: boolean;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

const SubscriptionPlanCard = ({
  id,
  name,
  description,
  type,
  price,
  discountedPrice,
  period,
  features,
  isFree,
  isPopular,
  isDiscounted,
  onSelect,
  isSelected,
}: PlanProps) => {
  const displayPrice = discountedPrice !== undefined ? discountedPrice : price;
  const formattedPrice = displayPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const getTypeColor = () => {
    switch (type) {
      case 'supporter':
        return 'bg-green-100 text-green-800';
      case 'establishment':
        return 'bg-blue-100 text-blue-800';
      case 'group':
        return 'bg-purple-100 text-purple-800';
      case 'professional':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'supporter':
        return 'Praticante';
      case 'establishment':
        return 'Estabelecimento';
      case 'group':
        return 'Grupo Esportivo';
      case 'professional':
        return 'Profissional';
      default:
        return type;
    }
  };

  return (
    <Card className={`w-full transition-all ${isSelected ? 'border-primary ring-2 ring-primary' : ''} ${isPopular ? 'scale-105 shadow-lg' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className={`mb-2 ${getTypeColor()}`}>
              {getTypeLabel()}
            </Badge>
            <CardTitle className="text-xl">{name}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {isPopular && (
            <Badge className="bg-primary hover:bg-primary">Mais Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground mb-1">
              /{period === 'monthly' ? 'mês' : 'ano'}
            </span>
          </div>
          {isDiscounted && discountedPrice !== undefined && (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">
                {price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <Badge variant="destructive">-50%</Badge>
            </div>
          )}
        </div>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onSelect(id)}
          className={`w-full ${isFree ? 'bg-muted hover:bg-muted/80' : isSelected ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={isFree ? "outline" : "default"}
        >
          {isFree ? "Plano Atual" : isSelected ? "Selecionado" : "Escolher Plano"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;
