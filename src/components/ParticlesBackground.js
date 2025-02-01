import React from 'react';
import Particles from '@tsparticles/react';

const ParticlesBackground = () => {
  return (
    <Particles
      options={{
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: 3
          },
          move: {
            enable: true,
            speed: 1
          }
        }
      }}
    />
  );
};

export default ParticlesBackground;
