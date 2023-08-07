import { UserProvider } from "./context/UserContext"
import { RoutesMain } from "./routes/routes"
import Global from "./styles/global"

function App() {
  
  return (
    <>
    <Global />
    <UserProvider>
      <RoutesMain />
    </UserProvider>
    </>
  )
}

export default App
