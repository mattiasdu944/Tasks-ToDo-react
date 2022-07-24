import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./Pages/Home"
import Tareas from "./Pages/Tareas"
import Categorias from "./Pages/Categorias"
import Login from "./components/Login";
import Layout from "./Layout/Layout"
import SignIn from './components/SignIn';
import { useState, useEffect } from 'react';
import { supabase } from './backend/supabase';
import { useVerification } from './Hooks/useVerification';

function App() {

  const [usuario, setUsuario] = useState({})

  const cargarUsuario = async () => {
    const user = supabase.auth.user();
    const {data} = await supabase.from('Usuarios').select().eq('id', user.id);
    setUsuario(data[0])
  }
  

  let navigate = useNavigate();

  useEffect(() => { 
    supabase.auth.onAuthStateChange((event , session ) =>{
      if(!session){
        navigate('/')
      }else{
        navigate('/dashboard/inicio')
      }
    })
    
    
  }, [])
  
  useEffect(() => {
    cargarUsuario();
  },[supabase.auth.user()])


  return (
      <Routes>
        <Route path="/" element={<Login/>}>
        </Route>
        <Route path="/signin" element={<SignIn/>}>
        </Route>


        <Route path="/dashboard" element={
            <Layout 
              usuario={usuario}
              setUsuario={setUsuario}
            />
          }>
          {useVerification()}
          <Route index  element={<Home usuario={usuario}/>}/>
          <Route path="inicio" element={<Home usuario={usuario}/>}/>
          <Route path='tareas' element={<Tareas/>}/>
          <Route path='categorias' element={<Categorias/>}/>
        </Route>

        <Route path='*' element={<Login/>}/>
        
        
      </Routes>
  )
}

export default App
