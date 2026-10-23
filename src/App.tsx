import {PaginaDashboard} from './componentes/PaginaDashboard';
import './App.css'
import { PaginaPaciente } from './pages/PaginaPacientes';
import PaginaNuevaCita from './pages/PaginaNuevaCita';
import { useState } from 'react';
import { type Paciente, pacientesIniciales } from './types/paciente';
import { type CitaFormData } from './schemas/citaSchema';
import { citasAgregadas } from './types/medico';

function App() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciales);
  const [citas, setCitas] = useState<CitaFormData[]>(citasAgregadas)
  const citasPendientes = pacientes.filter((paciente) => paciente.estado === 'en_espera')
  return (
    <>
      <PaginaDashboard totalPacientes={pacientes.length} totalCitas={citas.length} citasPendientes ={citasPendientes.length}/>
      <PaginaPaciente pacientes={pacientes} setPacientes={setPacientes}/>
      <PaginaNuevaCita setCitas={setCitas}/>
    </>
  )
}

export default App