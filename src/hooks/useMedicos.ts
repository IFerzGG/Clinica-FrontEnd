import { useEffect, useState } from "react";
import { medicosClinica, type Medico } from "../types/medico"

interface UseMedicosResultado {
    medicos:Medico[];
    cargando:boolean;
}

export function useMedicos():UseMedicosResultado {
    const [medicos, setMedicos] = useState<Medico[]>([]);
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