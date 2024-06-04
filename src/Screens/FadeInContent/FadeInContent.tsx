import React, { ReactNode, useState, useEffect } from 'react';

interface FadeInContentProps {
  children: ReactNode;
}

const FadeInContent: React.FC<FadeInContentProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
      {children}
    </div>
  );
};

export default FadeInContent;
