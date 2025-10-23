import { useEffect, useState } from "react";
import { TrendingDown, DollarSign, Bell, BarChart3 } from "lucide-react";

const loadingMessages = [
  "Verificando os melhores preços...",
  "Analisando ofertas para você...",
  "Monitorando seus produtos...",
  "Buscando as melhores oportunidades...",
  "Preparando seus alertas...",
];

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8 px-4">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative bg-primary rounded-full p-6">
                <TrendingDown className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 animate-float-1">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>-30%</span>
            </div>
          </div>

          <div className="absolute inset-0 animate-float-2">
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
              <Bell className="w-3 h-3" />
            </div>
          </div>

          <div className="absolute inset-0 animate-float-3">
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
            </div>
          </div>

          <div className="absolute inset-0 animate-float-4">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
              R$ 99
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 min-h-[60px]">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Carregando
          </h2>
          <p
            key={messageIndex}
            className="text-muted-foreground animate-fade-in text-sm"
          >
            {loadingMessages[messageIndex]}
          </p>
        </div>

        <div className="flex items-end gap-2 h-12">
          <div className="w-8 bg-primary/30 rounded-t animate-bar-1"></div>
          <div className="w-8 bg-primary/50 rounded-t animate-bar-2"></div>
          <div className="w-8 bg-primary/70 rounded-t animate-bar-3"></div>
          <div className="w-8 bg-primary rounded-t animate-bar-4"></div>
          <div className="w-8 bg-primary/70 rounded-t animate-bar-5"></div>
        </div>
      </div>

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(10px) translateX(-5px); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(10px) scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bar-1 {
          0%, 100% { height: 30%; }
          50% { height: 60%; }
        }
        
        @keyframes bar-2 {
          0%, 100% { height: 50%; }
          50% { height: 80%; }
        }
        
        @keyframes bar-3 {
          0%, 100% { height: 70%; }
          50% { height: 90%; }
        }
        
        @keyframes bar-4 {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
        
        @keyframes bar-5 {
          0%, 100% { height: 60%; }
          50% { height: 75%; }
        }
        
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 2.5s ease-in-out infinite 0.2s; }
        .animate-float-3 { animation: float-3 2.8s ease-in-out infinite 0.4s; }
        .animate-float-4 { animation: float-4 2.2s ease-in-out infinite 0.6s; }
        
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        .animate-bar-1 { animation: bar-1 1.2s ease-in-out infinite; }
        .animate-bar-2 { animation: bar-2 1.2s ease-in-out infinite 0.1s; }
        .animate-bar-3 { animation: bar-3 1.2s ease-in-out infinite 0.2s; }
        .animate-bar-4 { animation: bar-4 1.2s ease-in-out infinite 0.3s; }
        .animate-bar-5 { animation: bar-5 1.2s ease-in-out infinite 0.4s; }
      `}</style>
    </div>
  );
}
