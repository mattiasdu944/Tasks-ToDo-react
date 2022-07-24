import {useState} from 'react'
const Tareas = () => {
    
    const tasks = [
        {
            nombre : 'Limpiar la casa'
        }
    ]

    const [tareas, setTareas] = useState([])
  return (
    <section className='py-6 px-4 bacground_svg w-full'>
        <h2 className="text-3xl text-gray-300">En construccion...</h2>
        {/* <h1 className='text-4xl font-semibold text-gray-200 '>Control de Tareas!</h1>
        <div className=' mt-3 px-3 py-2 items-center  bg-indigo-500 text-white hover:bg-indigo-600 max-w-max cursor-pointer rounded-md '>
          + Agregar Tarea
        </div> */}
    </section>
  )
}

export default Tareas