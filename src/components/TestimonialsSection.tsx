
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Lucas Pereira",
    role: "Praticante Premium",
    content: "O Núcleo do Esporte conectou meu grupo de corrida com mais 30 pessoas da minha cidade! Nossa comunidade cresceu e agora temos treinos muito mais animados.",
    avatar: "LP"
  },
  {
    name: "Academia FitNow",
    role: "Estabelecimento Premium",
    content: "Conseguimos 15 novos alunos só no primeiro mês como assinante premium. O ROI foi imediato, recomendo para qualquer academia.",
    avatar: "FN"
  },
  {
    name: "Amanda Costa",
    role: "Profissional Premium",
    content: "Como personal trainer, aumentei minha carteira de clientes em 40% graças à visibilidade que o plano premium me proporcionou.",
    avatar: "AC"
  },
  {
    name: "Clube Esportivo RS",
    role: "Grupo Premium",
    content: "Organizamos eventos com muito mais facilidade e visibilidade. O sistema de gerenciamento de membros economiza horas do nosso trabalho administrativo.",
    avatar: "RS"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">O Que Dizem Nossos Usuários Premium</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="border border-border">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/avatars/${i + 1}.png`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
