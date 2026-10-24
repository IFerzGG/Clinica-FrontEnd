import {PaginaDashboard} from './pages/PaginaDashboard';
import './App.css'
import { PaginaPaciente } from './pages/PaginaPacientes';
import PaginaNuevaCita from './pages/PaginaNuevaCita';
import { useState } from 'react';
import { type Paciente, pacientesIniciales } from './types/paciente';
import { type CitaFormData } from './schemas/citaSchema';
import { citasAgregadas } from './types/medico';
import { NotFound } from './pages/NotFound';
import { Layout } from './componentes/layout/Layout';
import { PaginaDetallePacientes } from './pages/PaginaDetallesPaciente';
import { Route, Routes } from 'react-router';

function App() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciales);
  const [citas, setCitas] = useState<CitaFormData[]>(citasAgregadas)
  const citasPendientes = pacientes.filter((paciente) => paciente.estado === 'en_espera')
  return (
    <Routes>
      <Route Component={Layout}>
        <Route index element={<PaginaDashboard totalPacientes={pacientes.length} totalCitas={citas.length} citasPendientes ={citasPendientes.length}/>} />
        <Route path='/pacientes' element={<PaginaPaciente pacientes={pacientes} setPacientes={setPacientes}/>} />
        <Route path='/citas' element={<PaginaNuevaCita setCitas={setCitas}/>} />
        <Route path='/pacientes/:id' element={<PaginaDetallePacientes />}/>
        <Route path='/notfound' Component={NotFound}/>
      </Route>
    </Routes>
  )
}

export default App