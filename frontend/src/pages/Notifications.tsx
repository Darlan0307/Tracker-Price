import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Bell } from "lucide-react";
import { toast } from "sonner";
import AuthHeader from "@/components/AuthHeader";

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [priceDropThreshold, setPriceDropThreshold] = useState("10");
  const [email, setEmail] = useState("usuario@exemplo.com");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSave = () => {
    toast.success("Configurações de notificação salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AuthHeader currentPlan="Gratuito" />

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-3xl">
        <Card className="p-4 md:p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                Preferências de Alertas
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Escolha como deseja ser notificado sobre quedas de preço
              </p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Email Notifications */}
            <div className="p-3 md:p-4 rounded-lg border bg-gradient-card">
              <div className="flex items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base">
                      Notificações por Email
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      Receba alertas via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                  className="flex-shrink-0"
                />
              </div>

              {emailEnabled && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="email">Endereço de Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled
                  />
                </div>
              )}
            </div>

            {/* WhatsApp Notifications */}
            <div className="p-3 md:p-4 rounded-lg border bg-gradient-card relative">
              <Badge
                variant="outline"
                className="absolute top-1 right-2 text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold shadow-sm max-[400px]:top-12"
              >
                Em desenvolvimento
              </Badge>

              <div className="flex items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base">
                      Alertas por WhatsApp
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      Receba mensagens instantâneas no WhatsApp
                    </p>
                  </div>
                </div>
                <Switch
                  checked={whatsappEnabled}
                  onCheckedChange={setWhatsappEnabled}
                  className="flex-shrink-0"
                  disabled
                />
              </div>

              {whatsappEnabled && (
                <div className="space-y-2 animate-fade-in opacity-50">
                  <Label htmlFor="whatsapp">Número do WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+55 11 99999-9999"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Funcionalidade disponível em breve
                  </p>
                </div>
              )}
            </div>

            {/* Price Drop Threshold */}
            {/* <div className="p-3 md:p-4 rounded-lg border bg-gradient-card">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">Limite de Queda de Preço</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Me notifique quando o preço cair pelo menos
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input 
                      type="number"
                      min="1"
                      max="100"
                      value={priceDropThreshold}
                      onChange={(e) => setPriceDropThreshold(e.target.value)}
                      className="text-lg font-semibold"
                    />
                  </div>
                  <span className="text-2xl font-bold text-primary">%</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-300"
                      style={{ width: `${priceDropThreshold}%` }}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex gap-3 mt-6 md:mt-8">
            <Button onClick={handleSave} className="flex-1 shadow-md text-sm">
              Salvar Configurações
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-4 md:p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2 text-primary text-sm md:text-base">
            💡 Dica
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Ative as notificações por email e WhatsApp para nunca perder uma
            ótima oferta.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
