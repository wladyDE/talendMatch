import { Container } from "react-bootstrap"
import Header from "../header/Header"
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)

    return (
        <div style={styles.container}>
            <Header />
            <Container style={{ paddingBottom: '30px' }}>
                {children}
            </Container>
        </div>
    )
}

export default Layout