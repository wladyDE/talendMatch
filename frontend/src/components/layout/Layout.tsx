import { Container } from "react-bootstrap"
import Header from "../header/Header"

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header/>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout