import react from 'react';

const AgeGroupCard = ({ ageGroup, bookCount }) => {
  return (
    <div>
      <h2>{ageGroup}</h2>
      <p>Number of Books: {bookCount}</p>
    </div>
  );
};

export default AgeGroupCard;
