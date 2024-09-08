import { ThemeMode } from "../features/theme/themeSlice";

export const styles = (theme: ThemeMode) => {
  return {
    navbar: {
      backgroundColor: 'rgb(240, 240, 240)',
    },
    navLink: {
      color: 'gray',
    },
    navLinkActive: {
      color: 'black',
    },
    navbarButton: {
      color: '#000',
      backgroundColor : 'transparent',
      borderColor: 'transparent',
    },
     iconColor: {
      default: '#172b4d',
      backgroundHover : '#D2D2D2',
    }
  }
};

