import { createContext, useState } from "react";
import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from "../helpers";
//creamos el context
const CotizadorContext = createContext()

//creamos el provider
const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: "",
        year: "",
        plan: ""
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [load, setLoad] = useState(false)

    const handleChangeDatos = e =>{
        setDatos({ ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () =>{
        //una base
        let resultado = 2000

        //obtener diferencia de año
        const diferencia = obtenerDiferenciaYear(datos.year)
        //hay que restar el 3% por cada año
        resultado -=((diferencia * 3 ) * resultado ) / 100

        // americano 15%
        // europeo 30%
        //asiatico
        
        resultado *= calcularMarca(datos.marca)
        //basico 20%
        //completo 50%
        resultado *= calcularPlan(datos.plan)

       /*  resultado = resultado.toFixed(2) */
        resultado = formatearDinero(resultado)

        setLoad(true)

        setTimeout(() => {
            setResultado(resultado)
            setLoad(false)
        }, 2000);
        
    }

    return(
        <CotizadorContext.Provider value={{
            datos,
            handleChangeDatos,
            error,
            setError,
            cotizarSeguro,
            resultado,
            load
        }}>
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext