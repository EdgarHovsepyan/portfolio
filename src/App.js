import SmoothScroll from "./components/SmoothScroll";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {routes.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            render={(props) => <item.component {...props} />}
            title={item.title}
            exact
          />
        ))}
      </BrowserRouter>
    </>
  );
}

export default App;
