import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { useUserData } from "./context/UserContext";
import Loading from "./components/Loading";

const App = () => {
  const { isAuth, loading } = useUserData();
  return (
    <>
      {loading ? (<Loading />) :
        (<BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          </Routes>
        </BrowserRouter>)}
    </>
  )
}

export default App