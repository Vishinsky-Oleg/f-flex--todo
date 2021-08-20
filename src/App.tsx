import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Todos from "./pages/Todos/Todos";
import Users from "./pages/Users/Users";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Users} />
                    <Route path="/:id" exact component={Todos} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
