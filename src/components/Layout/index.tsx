import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('has-layout');
    
    return () => {
      document.body.classList.remove('has-layout');
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        backgroundImage: 
          `var(--background-gradient),
          url('/background_cinema_cubos.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      <main style={{ 
        paddingTop: '72px',
        backgroundColor: 'transparent',
        minHeight: 'calc(100vh - 72px)',
        position: 'relative'
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
