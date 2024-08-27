import { Container } from "react-bootstrap"
import Header from "../header/Header"

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div style={{ backgroundColor: '#3D4145', color: 'white', height: '100%'}}>
            <Header/>
            <Container style={{paddingBottom : '30px'}}>
                {children}
            </Container>
        </div>
    )
}

export default Layout