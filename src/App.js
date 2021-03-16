import SmoothScroll from "./components/SmoothScroll";
import Section_1 from "./sections/Section_1";
import Section_2 from "./sections/Section_2";
import "./App.css";

function App() {
  return (
    <>
      <SmoothScroll>
        <section>
          <Section_1 />
        </section>
        <section>
          <Section_2 />
        </section>
      </SmoothScroll>
    </>
  );
}

export default App;
