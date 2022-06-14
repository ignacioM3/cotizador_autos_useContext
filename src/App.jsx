import { CotizadorProvider } from "./context/CotizadorProvider"
import AppSeguros from "./compontes/AppSeguros"

function App() {


  return (
    <CotizadorProvider>
      <AppSeguros />
    </CotizadorProvider>

  )
}

export default App
