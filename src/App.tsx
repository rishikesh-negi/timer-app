import AddTimer from "./components/AddTimer";
import Header from "./components/Header";
import Timers from "./components/Timers";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </>
  );
}
