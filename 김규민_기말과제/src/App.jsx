import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import Home from "./components/Home";
import Timer from "./components/Timer";
import Profile from "./components/Profile";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "timer", element: <Timer /> },
    { path: "profile", element: <Profile /> },
  ];

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, element }) => {
          return <Route key={path} path={path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
