import React from 'react'
import { BsPersonCircle, BsHouseDoorFill, BsBookFill, BsFillPenFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { supabase } from '../backend/supabase';

const Sidebar = ({usuario,setUsuario}) => {

    const cerrarSesion = () =>{
        supabase.auth.signOut()
    }

    const paginas = [
        {
            nombre: 'Inicio',
            enlace: 'inicio',
            icono: <BsHouseDoorFill />,
        },
        {
            nombre: 'Tareas',
            enlace: 'tareas',
            icono: <BsFillPenFill />,
        },
        {
            nombre: 'Categorias',
            enlace: 'categorias',
            icono: <BsBookFill />,
        },

    ]
    let activeStyle = {
        background: "#1a1a1a",
    };
    return (
        <nav className="sidebar" >
            <div className="sidebar__container flex flex-col justify-between h-full">
                <h1 className='flex items-center gap-3 text-lg font-semibold text-white'>
                    <span className='text-3xl'>
                        <BsPersonCircle />
                    </span>
                    <span className='text-gray-400'>
                    {usuario.nombres}
                    </span>
                </h1>

                <ul className='sidebar__menu mt-15'>

                    {paginas.map(pagina =>
                        <li key={pagina.enlace}>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                className="text-gray-200 px-4 py-3 my-4 btn__sidebar  flex items-center gap-3 text-md hover:bg-gray-bg rounded-md"
                                to={pagina.enlace}
                            >
                                {pagina.icono}
                                {pagina.nombre}
                            </NavLink>

                        </li>

                    )}

                </ul>

                <div 
                    onClick={() =>cerrarSesion() }
                    className="text-gray-200 px-4 py-3 my-4 btn__sidebar cursor-pointer flex items-center gap-3 text-md bg-red-500 sm:bg-transparent hover:bg-red-600 rounded-md">
                    <BiLogOut/>
                    <span className="hidden sm:block">
                        Cerrar Sesion
                    </span>
                </div>                
                <span className='text-indigo-400 hidden sm:flex'>
                   beta.v.0.0.1 :D
                </span>

            </div>
        </nav>
    )
}

export default Sidebar