import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer';

const Card = ({ name, url, about, cuisine, favoriteDish, onSwipe, onCardLeftScreen }) => {
    const motionValue = useMotionValue(0);
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
    const opacityValue = useTransform(motionValue, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const animControls = useAnimation();

    // const handleDragEnd = (event, info) => {
    //     if (Math.abs(info.point.x) <= 150) {
    //         animControls.start({ x: 0 });
    //     } else {
    //         const direction = info.point.x < 0 ? 'left' : 'right';
    //         animControls.start({ x: info.point.x < 0 ? -150 : 150 });
    //         onSwipe(direction, name);
    //     }
    // };

    const handleDragEnd = (event, info) => {
      if (Math.abs(info.point.x) <= 150) {
          animControls.start({ x: 0 });
      } else {
          const direction = info.point.x < 0 ? 'left' : 'right';
          const newDragConstraints = direction === 'left' ? { left: -10000, right: 1000 } : { left: -1000, right: 10000 };
          animControls.start({ x: direction === 'left' ? -150 : 150, dragConstraints: newDragConstraints });
          onSwipe(direction, name);
      }
  };
  
    return (
        <motion.div
          className="card"
          center="true"
          drag="x"
          x={motionValue}
          rotate={rotateValue}
          opacity={opacityValue}
          dragConstraints={{ left: -1000, right: 1000 }}
          onDragEnd={handleDragEnd}
          onAnimationComplete={() => onCardLeftScreen(name)}
          >

          <div 
            className= "card-content" 
            style={{backgroundImage: `url(${url})`}}>
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
