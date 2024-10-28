import { Container } from "react-bootstrap"
import { useSelector } from 'react-redux';

import Header from "../header/Header"
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import './layout.css'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)

    return (
        <div style={styles.container} className="app-container">
            <Header />
            <Container style={{ paddingBottom: '30px' }}>
                {children}
            </Container>
        </div>
    )
}

export default Layout