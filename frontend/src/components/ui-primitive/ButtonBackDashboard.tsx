import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function ButtonBackDashboard() {
  const navigate = useNavigate();
  const handleClickButtonBack = () => {
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handleClickButtonBack}
      className="shadow-glow w-full text-sm font-semibold bg-blue-500 hover:bg-blue-600 transition-all"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Voltar
    </Button>
  );
}
