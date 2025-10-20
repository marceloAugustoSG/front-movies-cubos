// Utilitários para detectar e lidar com problemas específicos do mobile

export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

export const isPrivateBrowsing = (): boolean => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return false;
  } catch (e) {
    return true;
  }
};

export const checkNetworkConnectivity = async (): Promise<boolean> => {
  try {
    // Tenta fazer uma requisição simples para verificar conectividade
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getMobileDebugInfo = () => {
  return {
    userAgent: navigator.userAgent,
    isMobile: isMobile(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isPrivateBrowsing: isPrivateBrowsing(),
    localStorageAvailable: !isPrivateBrowsing(),
    screenSize: {
      width: window.screen.width,
      height: window.screen.height
    },
    viewportSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    connectionType: (navigator as any).connection?.effectiveType || 'unknown',
    onlineStatus: navigator.onLine
  };
};

export const logMobileDebugInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Mobile Debug Info:', getMobileDebugInfo());
  }
};
