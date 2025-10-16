import react from 'react';
import {useNavigate} from 'react-router-dom';
const AgeGroupCard = ({ title , image , id}) => {
  const navigate = useNavigate();
  return (
    <div className="border border-pink-500 rounded-lg p-4 max-w-xs text-center cursor-pointer" 
    onClick={() => navigate(`/books/${id}`)}>
      <img src={image} alt="" className="mx-auto mb-2 w-16 h-16" />
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default AgeGroupCard;
