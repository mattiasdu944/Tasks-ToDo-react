import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/supabase";
import { useVerification } from "../Hooks/useVerification";
import Error from "./Error";

const Login = () => {

  let navigate = useNavigate();

  useVerification();

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')


  const usuarioLogin = async (correo, contraseña) => {
    try {
      const {user, error}= await supabase.auth.signIn({
        email: correo,
        password: contraseña,
      })

      if(error){
        if(error.message === 'Invalid login credentials'){
          setError(true)
          setErrorMessage('Correo o contraseña incorrectos')
          return;
        }
      }

      console.log(user);
        
    } catch (error) {
      console.log(error)  
    }

  }

  const handleSubmit = e => {
    e.preventDefault();
    if(correo.trim() === '' || contraseña.trim() === '') {
      setError(true)
      setErrorMessage('Datos incorrectos')
      return;
    }

    if(contraseña.trim().length < 8){
      setError(true)
      setErrorMessage('Al menos 8 caracteres en la contraseña')
      return;    
    }

    
    usuarioLogin(correo, contraseña)
    setError(false);



  };

  return (
    <section className='login__container px-3 sm:p-0 border-black  bacground_svg w-full flex items-center justify-center rounded-xl border-4'>
      <div className="login__content w-[24rem]">

        <div className="mb-3">
          <h1 className="text-indigo-400 text-3xl font-semibold mb-2">Inicia Sesion!</h1>
          <p className="text-gray-400">ingresa tus datos y administra todas tus tareas diarias!</p>
        </div>
        {error && <Error>{errorMessage}</Error>}
        <form onSubmit={handleSubmit} className="shadow-lg bg-black py-10 px-6 rounded-md w-99">
          <div className="grid gap-2 w-full mb-4">

            <label htmlFor="correo" className="text-gray-300 text-sm md:text-base">Correo Electronico</label>
            <input
              type="email"
              name="correo"
              placeholder="Ingresa tu correo electronico"
              className="px-3 py-2 bg-gray-bg w-full text-gray-400 rounded-md text-sm md:text-base"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
          </div>

          <div className="grid gap-2 w-full mb-9">

            <label htmlFor="password" className="text-gray-300 text-sm md:text-base">Contraseña</label>
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
            <div className="text-gray-200 underline cursor-pointer text-sm md:text-base" onClick={() => navigate('/signin')}>No tienes una cuenta?</div>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 p-2 text-gray-200 rounded-md text-sm md:text-base">Iniciar Sesion</button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default Login