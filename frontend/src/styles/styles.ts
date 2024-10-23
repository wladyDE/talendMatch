import { ThemeMode } from "../features/theme/themeSlice";

export const styles = (theme: ThemeMode) => {
  return {
    container: {
      backgroundColor: theme === 'dark' ? '#1D2125' : 'white',
      color: theme === 'dark' ? '#B6C2CF' : '#212529'
    },
    navbar: {
      backgroundColor: 'rgb(240, 240, 240)',
      borderBlockEnd: '2px solid #ebecf0',
    },
    navLink: {
      color: 'gray',
    },
    navLinkActive: {
      color: 'black',
    },
    navbarButton: {
      color: '#000',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    iconColor: {
      default: '#172b4d',
      backgroundHover: '#D2D2D2',
    },
    card: {
      color: theme === 'dark' ? '#B6C2CF' : '#212529',
      border: theme === 'dark' ? '1px solid #384148' : '1px solid #dfe1e6',
      backgroundColor: theme === 'dark' ? '#22272B' : 'transparent'
    },
    h: {
      color: theme === 'dark' ? '#B6C2CF' : '#333'
    },
    level: {
      startColor: '#ECF9A1',
      endColor: '#B2CC1D'
    }
  }
};

export const centeredFlexBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

export const borderStyle = {
  border: '1px solid #dfe1e6',
  borderRadius: '7px',
  padding: '5px'
}

