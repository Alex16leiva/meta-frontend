import { DefaultLayout } from './DefaultLayout'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './NavBar'
import AdminDashboard from '../security/AdminDashboard'
import { UseExampleControls } from '../../components/Controls/UseExampleControls'
import { Chat } from '../Chats/Chat'

export const TemplateRouter = () => {

    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/*" element={<DefaultLayout />} />
                <Route path="Seguridad" element={<AdminDashboard />} />
                <Route path='Control' element={<UseExampleControls />} />
                <Route path='Chat' element={<Chat />} />
            </Routes>
        </>
    )
}
