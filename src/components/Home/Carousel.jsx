import { useState, useEffect } from 'react';

export const Carousel = () => {
  const images = [
    'https://i.pinimg.com/564x/34/28/86/34288601de8af9fe8aaa9d11c4a56db1.jpg',
    'https://i.pinimg.com/564x/76/f2/75/76f275e985f46e10bf64b50b3064fb6c.jpg',
    'https://i.pinimg.com/564x/3f/c8/3f/3fc83fddf9d75a1cd9d8834c67df6084.jpg',
    'https://i.pinimg.com/564x/8b/77/bc/8b77bc75a30db439cb756bce3f9a4177.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='h-96 carousel carousel-vertical w-3/5 rounded-lg shadow-2xl'>
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${
            index === currentIndex ? 'block' : 'hidden'
          } h-full`}
        >
          <img src={image} className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
  );
};
