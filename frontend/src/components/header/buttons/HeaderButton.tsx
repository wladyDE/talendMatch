import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../../features/theme/themeSlice';
import { styles } from '../../../styles/styles';
import { ThemeMode } from '../../../features/theme/themeSlice';

interface IconButtonProps {
  onClick: () => void;
  iconLight: string;
  iconDark: string;
  title: string;
  style?: React.CSSProperties;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, iconLight, iconDark, title, style }) => {
  const [hovered, setHovered] = useState(false);
  const theme = useSelector(selectTheme) as ThemeMode;
  const currentStyles = styles(theme);

  const iconClass = theme === 'light' ? iconLight : iconDark;

  const buttonStyle = {
    ...currentStyles.navbarButton,
    backgroundColor: hovered ? currentStyles.iconColor.backgroundHover : currentStyles.navbarButton.backgroundColor,
    ...style,
  };

  return (
    <Button
      onClick={onClick}
      variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={buttonStyle}
      title={title}
    >
      <i className={`bi ${iconClass}`} style={{ color: currentStyles.iconColor.default }}></i>
    </Button>
  );
};

export default IconButton;