import React, { useEffect } from 'react'
import { useVerification } from '../Hooks/useVerification';


const Home = ({usuario}) => {

  return (
    <section className='py-6 px-4 bacground_svg w-full'>

        <h1 className='text-2xl sm:text-3xl md:text-4xl mb-3 font-semibold text-gray-200 '>
          Bienvenido a tu Dashboard <br /> 
          <span className='text-indigo-500'>
            {usuario.nombres}
          </span>
        
        </h1>
        <p className='text-gray-400 text-sm sm:text-md md:text-lg'>
          En esta seccion podras tener una vista por defecto de tus ultimas acciones que hiciste
        </p>
    </section>
  )
}

export default Home