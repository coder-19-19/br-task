import {useEffect} from 'react'
import {Container} from 'reactstrap'

const MainLayout = ({children, title}) => {
    useEffect(() => {
        document.title = title
        window.scrollTo(0, 0)
    }, [title])
    return (
        <Container className="my-5">
            {children}
        </Container>
    )
}

export default MainLayout
