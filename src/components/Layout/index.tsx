import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

const FooterContainer = styled.footer<{ fixed?: boolean }>`
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--header-border);
  background-color: var(--background-footer);
  
  ${({ fixed }) => fixed && `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
  `}
`;

interface LayoutProps {
  children: React.ReactNode;
  fixedFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fixedFooter = false }) => {
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
        position: 'relative',
        paddingBottom: fixedFooter ? '68px' : '0'
      }}>
        {children}
      </main>
      <FooterContainer fixed={fixedFooter}>
        <Footer />
      </FooterContainer>
    </div>
  );
};

export default Layout;
