import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Mainpage } from "./components/pages/Mainpage";
import { NavBar } from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";

import { useStoredFriendsList } from "./hooks/useStoredFriendsList";
import { useInitializeModules } from "./hooks/useInitializeModules";

function App() {
  useStoredFriendsList();
  useInitializeModules();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </>
  );
}

export default App;
