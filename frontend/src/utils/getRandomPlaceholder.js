export const getRandomPlaceholder = () => {
    const placeholders = [
      'https://picsum.photos/600/400?random',
      'https://dummyimage.com/600x400/000/fff&text=No+Image',
    ];
  
    // Randomly select a placeholder URL
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  };
  