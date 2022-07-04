import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {routeArr} from './routes'
import MainLayout from './components/layouts/mainLayout'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routeArr.map(item => (
                        <Route index exact path={item.path} key={item.path} element={
                            <MainLayout title={item.title}>
                                {item.component}
                            </MainLayout>
                        }/>
                    ))}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
