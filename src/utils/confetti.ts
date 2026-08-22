import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Pink, Gold, Rose Gold, White palette
  const colors = ['#f43f5e', '#fb7185', '#ffe4e6', '#f7d698', '#e5b25d', '#ff85a1'];

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: colors,
  });
  fire(0.2, {
    spread: 60,
    colors: colors,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: colors,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: colors,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: colors,
  });
};

export const triggerHeartConfetti = () => {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: '❤️', scalar });
  const sparkle = confetti.shapeFromText({ text: '✨', scalar });
  const crown = confetti.shapeFromText({ text: '👑', scalar });

  confetti({
    shapes: [heart, sparkle, crown],
    scalar,
    particleCount: 40,
    spread: 80,
    origin: { y: 0.6 },
    startVelocity: 35
  });
};
