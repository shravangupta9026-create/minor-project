import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Learning from "./pages/Learning";
import Module from "./pages/Module";
import Lesson from "./pages/Lesson";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning/module" element={<Module />} />
          <Route path="/learning/lesson" element={<Lesson />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
