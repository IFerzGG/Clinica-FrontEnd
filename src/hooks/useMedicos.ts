import { useEffect, useState } from "react";
import { medicosClinica, type Medic } from "../types/medico"

interface UseMedicosResultado {
    medicos:Medic[];
    cargando:boolean;
}

export function useMedicos():UseMedicosResultado {
    const [medicos, setMedicos] = useState<Medic[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMedicos(medicosClinica);
            setCargando(false);
        }, 800);

        return () => clearTimeout(timer);
    },[]);

    return {medicos, cargando};
}