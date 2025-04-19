import { DefaultLayout } from './DefaultLayout'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './NavBar'
import AdminDashboard from '../security/AdminDashboard'
import { UseExampleControls } from '../../components/Controls/UseExampleControls'

export const TemplateRouter = () => {

    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/*" element={<DefaultLayout />} />
                <Route path="Seguridad" element={<AdminDashboard />} />
                <Route path='Control' element={<UseExampleControls />} />
            </Routes>
        </>
    )
}
