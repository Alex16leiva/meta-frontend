import React from "react";
import { useSelector } from "react-redux";
import { CardScreen } from "./CardScreen";
import { Screens } from './Screens';
import './style.css'

export const DefaultLayout = () => {
    const hours = new Date().getHours();
    let saludo;
    if (hours < 12) {
        saludo = "Buenos Dias";
    } else if (hours < 18) {
        saludo = "Buenas Tardes";
    } else {
        saludo = "Buenas Noches";
    }

    const { user } = useSelector(state => state.auth)
    const screensPermitidas = Screens.filter(item =>
        user.permisos?.some(permiso => permiso.pantallaId === item.securityName && permiso.ver)
    );

    console.log(Screens, screensPermitidas);

    return (
        <div className='body'>
            <div className="greeting">
                <div style={{ fontWeight: "700" }}>
                    {`${saludo}, ${user.nombre}`}
                </div>
                <div>Bienvenido</div>
            </div>

            <div className='card-screen'>
                {
                    screensPermitidas.map((item, index) => {
                        return (
                            <CardScreen key={index} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}
