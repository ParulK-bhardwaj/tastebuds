import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Card = ({ name, url, about, cuisine, favoriteDish, onSwipe, onCardLeftScreen }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20], { clamp: false });

  const handleDrag = (event, info) => {
    // Determine the direction of the swipe
    const direction = info.offset.x > 0 ? 'right' : 'left';

    // Check if the drag distance exceeds the threshold
    if (Math.abs(info.offset.x) > 150) {
      onSwipe(direction, name);
      onCardLeftScreen(name);
    }
  };

  return (
    <motion.div
      className="card"
      style={{ x, opacity, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDrag}
    >
      <div
        className="card-content"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className='about'>
          <h2>{name}</h2>
          <p>{about}</p>
          <p className='cuisine'>Cuisine: {cuisine}</p>
          <p className='dish'>Favorite Dish: {favoriteDish}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
