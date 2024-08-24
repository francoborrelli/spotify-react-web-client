import { useState } from 'react';
import { Heart } from '../../../Icons';

export const HeartLike = () => {
  const [liked, setLiked] = useState(false);

  const onClick = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div
      onClick={onClick}
      style={{ marginLeft: 10 }}
      className={liked ? 'heart-liked' : 'heart-like'}
    >
      <Heart />
    </div>
  );
};
