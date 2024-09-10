export const loadStylesheet = (theme: string, id : string, darkStyles : string, lightStyles : string ) => {
    let themeStyleSheet = document.getElementById(id) as HTMLLinkElement;
  
    if (!themeStyleSheet) {
      themeStyleSheet = document.createElement('link');
      themeStyleSheet.id = id;
      themeStyleSheet.rel = 'stylesheet';
      themeStyleSheet.type = 'text/css';
      document.head.appendChild(themeStyleSheet);
    }
  
    themeStyleSheet.href = theme === 'dark' ? darkStyles : lightStyles;
  
    return () => {
      if (themeStyleSheet) {
        themeStyleSheet.href = '';
      }
    };
  };