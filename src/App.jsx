import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Layout from './pages/Layout'
import PrivateRoutes from './routes/PrivateRoutes'
import HomePage from './pages/movie/HomePage'
import MovieDetailPage from './pages/movie/MovieDetailPage'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import DashboardAdmin from './pages/user/DashboardAdmin'
import PageNodeFound from './components/PageNodeFound/PageNodeFound'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PrivateRoutes element={<HomePage />} />} />
          <Route path='/movies/:id' element={<PrivateRoutes element={<MovieDetailPage />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<PrivateRoutes element={<DashboardAdmin />} />} />
        </Route>
        <Route path="*" element={<PageNodeFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
