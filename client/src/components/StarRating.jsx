import React from 'react'

const StarRating = ({rating}) => {
  const stars = [];
  for(let i=1;i<=5;i++){
    if(i<=rating){
        stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    // Renders half star if rating is between x.1 and x.9
    else if(i===Math.ceil(rating) && rating % 1 !== 0){
        stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
    }
    else{
        stars.push(<i key={i} className="far fa-star text-warning"></i>);
    }
  }
  return (
    <div>
      {stars}
    </div>
  )
}

export default StarRating
