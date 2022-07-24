import { useState } from "react";
import { supabase } from "../backend/supabase";
import { useNavigate } from "react-router-dom";
import Alerts from "./Alerts";
import Error from "./Error";

const SignIn = () => {


    const [nombres, setNombres] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const [error, setError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')


    let navigate = useNavigate()

    const newUser = async (nombres, correo , contraseña) =>{
        try {
            //CREA EL USUARIO EN LA AUTENTICACION
            const {user} = await supabase.auth.signUp({
                email : correo,
                password : contraseña
            })
            
            //CREA EL USUARIO EN LA TABLA USUARIOS
            const res = await supabase
            .from('Usuarios')
            .insert([
                { 
                    id: user.id, 
                    nombres,
                    correo: user.email 
                }
            ])

        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit =   e => {
        e.preventDefault();
        if(nombres.trim() === '' || correo.trim() === '' || contraseña.trim() === '') {
            setErrorMessage('Datos invalidos');
            setError(true)
            return;
        }

        if(contraseña.trim().length < 8 ){
            setErrorMessage('La contraseña debe tener al menos 8 caracteres');
            setError(true)
            return;
        }

        setError(false)

        try {
            newUser(nombres, correo,contraseña)
            setAlert(true);

            
        } catch (error) {
            setError(true);
            setErrorMessage(error.message)
        }

        setNombres('');
        setContraseña('');
        setCorreo('');

    };

    return (
        <section className='login__container px-3 sm:p-0 bacground_svg w-full flex items-center justify-center rounded-xl border-4'>
            <div className="login__content w-[24rem] shadow-xl">
                <div className="mb-3">
                    <h1 className="text-indigo-400 text-3xl font-semibold mb-2">Registrate!</h1>

                    <p className="text-gray-400">Registrate para comenzar a registrar tus tareas!</p>
                </div>
                {alert && <Alerts>Registrado con exito, revisa tu correo electronico</Alerts>}
                {error && <Error>{errorMessage}</Error>}
                
                <form onSubmit={handleSubmit} className="shadow-lg bg-black py-10 px-6 rounded-md w-99">
                    <div className="grid gap-2 w-full mb-4">

                        <label htmlFor="nombres" className="text-gray-300">Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            placeholder="Ingresa tus Nombres"
                            className="px-3 py-2 bg-gray-bg w-full text-gray-400 rounded-md text-sm md:text-base"
                            value={nombres}
                            onChange={e => setNombres(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2 w-full mb-4">

                        <label htmlFor="correo" className="text-gray-300">Correo Electronico</label>
                        <input
                            type="email"
                            name="correo"
                            placeholder="Ingresa tu correo electronico"
                            className="px-3 py-2 bg-gray-bg w-full text-gray-400 rounded-md text-sm md:text-base"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2 w-full mb-6">

                        <label htmlFor="password" className="text-gray-300">Contraseña</label>
                        <input
                            autoComplete="on"
                            type="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            className="px-3 py-2 bg-gray-bg w-full text-gray-400 text-sm md:text-base"
                            value={contraseña}
                            onChange={e => setContraseña(e.target.value)}
                        />
                    </div>


                    <div className="flex justify-between items-center">
                        <div className="text-gray-200 text-end underline cursor-pointer text-sm md:text-base" onClick={() => navigate('/')}>Ya tienes cuenta?</div>
                        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 p-2 text-gray-200 text-sm md:text-base rounded-md">Registrarse</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default SignIn