import {Nav} from "./UI/components/Nav"
import {useRoutes} from "./routes"
import {Footer} from "./UI/components/Footer"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {Loader} from "./UI/components/Loader"
import { useLocation } from 'react-router-dom'

import './UI/styles/variables.css'
import './App.css'

const App = () => {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    const location = useLocation()

    if (!ready) {
        return (
            <Loader/>
        )
    }

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
            <div className="App">
                {/*<span className="material-icons">&#xE87C;</span>*/}
                {/*<span className="here material-icons">&#xe8b8;</span>*/}
                <Nav/>
                <main>
                    {routes}
                </main>
                {
                    location.pathname !== '/auth' ? <div id="wave"></div> : ''
                }
                <Footer/>
            </div>
        </AuthContext.Provider>
    )
}

export default App