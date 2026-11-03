import {PaginaDashboard} from './pages/PaginaDashboard';
import './App.css'
import { PaginaPaciente } from './pages/PaginaPacientes';
import { useEffect, useState } from 'react';
import { type Paciente } from './types/paciente';
import { NotFound } from './pages/NotFound';
import { Layout } from './componentes/layout/Layout';
import { PaginaDetallePacientes } from './pages/PaginaDetallesPaciente';
import { Route, Routes } from 'react-router';
import { api } from './lib/axios';
import { getAll } from './services/pacientes';
import { getAllCita } from './services/citas';
import { PaginaNuevaCita } from './pages/PaginaNuevaCita';
import type { Cita } from './types/cita';
import type { Medicos } from './types/medico';

function App() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [medicos, setMedicos] = useState<Medicos[]>([])
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const citasPendientes = pacientes.filter((paciente) => paciente.estado === 'EN_ESPERA')

  const cargarPacientes = () => {
    getAll()
      .then((res) => {console.log('Peticion Exitosa: ',res.data); setPacientes(res.data.data)})
      .catch((error) => {console.error('Fallo la Peticion: ',error); setError(true)})
      .finally(() => {console.log('Peticion Exitosa'); setCargando(false)})
  }
  const cargarCitas = () => {
    getAllCita()
      .then((res) => setCitas(res.data.data))
      .catch((error) => {console.error('Fallo la Peticion: ',error); setError(true)})
      .finally(() => setCargando(false))
  }
  const cargarMedicos = () => {
    api.get('/medico')
      .then((res) => setMedicos(res.data.data))
      .catch((error) => {console.error('Fallo la Peticion: ',error); setError(true)})
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarPacientes();
    cargarCitas();
    cargarMedicos();
  },[])

  //if(cargando) return <p> Cargando Datos</p>

  //if(error) return <NotFound />

  return (
    <Routes>
      <Route Component={Layout}>
        <Route index element={<PaginaDashboard totalPacientes={pacientes.length} totalCitas={citas.length} citasPendientes ={citasPendientes.length} medicos={medicos.length}/>} />
        <Route path='/pacientes' element={<PaginaPaciente pacientes={pacientes} setPacientes={setPacientes}/>} />
        <Route path='/citas' element={<PaginaNuevaCita citas={citas} pacientes={pacientes} medicos={medicos} setCitas={setCitas} />} />
        <Route path='/pacientes/:id' element={<PaginaDetallePacientes pacientes={pacientes} />}/>
        <Route path='/notfound' Component={NotFound}/>
      </Route>
    </Routes>
  )
}

export default App
