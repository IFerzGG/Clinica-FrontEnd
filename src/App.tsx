import {PaginaDashboard} from './componentes/PaginaDashboard';
import './App.css'
import { PaginaPaciente } from './pages/PaginaPacientes';
import PaginaNuevaCita from './pages/PaginaNuevaCita';

function App() {
  return (
    <>
      <PaginaDashboard />
      <PaginaPaciente />
      <PaginaNuevaCita />
    </>
  )
}

export default App