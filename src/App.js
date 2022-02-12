import Landingpage from "./components/Landingpage/landingpage";
import Repopage from "./components/Repopage/repopage";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/repopage" element={<Repopage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
