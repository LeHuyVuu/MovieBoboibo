import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import { MovieDetail } from '../pages/MovieDetail/MovieDetail'
import { TVShowDetail } from '../pages/TVShowDetail/TVShowDetail'
import RootLayout from '../layouts/RootLayout'

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootLayout/>}>
                    <Route index element={<HomePage />} />
                    <Route path='/movie/:id' element={<MovieDetail />} />
                    <Route path='/tv/:id' element={<TVShowDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
