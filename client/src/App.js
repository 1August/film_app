import './App.css'
import {Nav} from "./UI/components/Nav";
import {useRoutes} from "./routes";
import {Footer} from "./UI/components/Footer";

const App = () => {
    const routes = useRoutes(false)

    return (
        <div className="App">
            <Nav/>
            <main>
                {routes}
            </main>
            <Footer/>
        </div>
    )
}

export default App