import Aside from "./component/aside";
import { Switch, Route } from 'react-router-dom'
import Film from "./pages/film";

function App() {
  return (
    <main>
      <div className="d-flex w-100 h-100 shadow-sm" style={{ borderRadius: '15px' }}>
        <Aside />
        <section className="content">
          <Switch> 
            <Route path={"/main/film"} component={Film} exact />
          </Switch>
        </section>
      </div>

    </main>
  );
}

export default App;
