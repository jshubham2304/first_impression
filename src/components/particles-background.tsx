'use client';

import React, { useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, ISourceOptions } from '@tsparticles/engine';
import { loadFull } from 'tsparticles'; 
import { useTheme } from 'next-themes';

export function ParticlesBackground() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setIsInitialized(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles container loaded', container);
  };

  const particleOptions = useMemo((): ISourceOptions => {
    const particleColor = theme === 'dark' ? '#FFFFFF' : '#000000';
    return {
        autoPlay: true,
        background: {
            color: {
            value: 'transparent',
            },
        },
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        fpsLimit: 120,
        interactivity: {
            events: {
            onClick: {
                enable: false,
            },
            onHover: {
                enable: false,
            },
            },
            modes: {},
        },
        particles: {
            color: {
            value: particleColor,
            },
            links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
            },
            move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'out',
            },
            random: true,
            speed: 0.5,
            straight: false,
            },
            number: {
            density: {
                enable: true,
            },
            value: 80,
            },
            opacity: {
            value: 0.2,
            },
            shape: {
            type: 'circle',
            },
            size: {
            value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
        };
  }, [theme]);


  if (!isInitialized) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={particleOptions}
    />
  );
}
