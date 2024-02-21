import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer';

const Card = ({ name, url, about, cuisine, favoriteDish, onSwipe, onCardLeftScreen }) => {
    const motionValue = useMotionValue(0);
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
    const opacityValue = useTransform(motionValue, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const animControls = useAnimation();

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.point.x) <= 150) {
            animControls.start({ x: 0 });
        } else {
            animControls.start({ x: info.point.x < 0 ? -200 : 200 });
            onSwipe(info.point.x < 0 ? 'left' : 'right', name);
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
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundColor: '#55ccff',
            boxShadow: '5px 10px 18px #888888',
            borderRadius: 10,
            height: 300,
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
            onDragEnd={handleDragEnd}
            onAnimationComplete={() => onCardLeftScreen(name)}
        >
          <div className='about'>
            <h2>{name}</h2>
            <p>{about}</p>
            <p>Cuisine: {cuisine}</p>
            <p>Favorite Dish: {favoriteDish}</p>
          </div>
        </motion.div>
    );
};

export default Card;
