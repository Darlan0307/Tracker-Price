import { useEffect, useState } from "react";
import { Link, Globe, Database, Save } from "lucide-react";

const scrapingSteps = [
  { icon: Link, title: "Validando URL" },
  { icon: Globe, title: "Acessando site" },
  { icon: Database, title: "Extraindo dados" },
  { icon: Save, title: "Salvando dados" },
];

const loadingTexts = [
  "Isso pode levar alguns segundos...",
  "Buscando as melhores informações...",
  "Quase lá...",
  "Processando dados do produto...",
  "Aguarde...",
];

export default function LoadingScraping() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative">
        {/* Card principal */}
        <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md border border-gray-200/50 dark:border-gray-700/50">
          {/* Círculo central animado */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            {/* Círculos externos animados */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900/50"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin-slow"></div>

            {/* Círculo pulsante */}
            <div className="absolute inset-2 rounded-full bg-blue-500/10 animate-pulse-slow"></div>

            {/* Logo/ícone central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
                <Database className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Texto de loading */}
          <div className="text-center space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Processando produto
            </h3>
            <p
              key={textIndex}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 animate-fade-in min-h-[24px]"
            >
              {loadingTexts[textIndex]}
            </p>
          </div>

          {/* Pontos de loading */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Lista de etapas */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {scrapingSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse-slow"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <StepIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Efeito de brilho ao redor */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
