import Aside from "./component/aside";
import { Switch, Route } from 'react-router-dom'
import Film from "./pages/film.page";

function App() {
  return (
    <main>
      <Aside />
      <section className="content">
      <Switch>
        <Route path={"/film"} component={Film}  exact/>
      </Switch>
      </section>
    </main>
  );
}

export default App;
