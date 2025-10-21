import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/")}
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
        <span className="text-base md:text-lg font-bold text-primary-foreground">TP</span>
      </div>
    </button>
  );
};

export default Logo;
