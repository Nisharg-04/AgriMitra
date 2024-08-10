import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Layout from "./layout/layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import WeatherForcast from "./pages/Weather/WeatherForcast";
import EventDetails from "./forms/ManageEventForm/EventDetails";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import SingleEvent from "./pages/SingleEvent";
import Product from "./pages/Product";
import { AppContextProvider } from "./context/AppContext";
import NavBar1 from "./components/News/NavBar1";
import News from "./components/News/News";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
           <Route
            path="/weather"
            element={
              <Layout>
                <WeatherForcast />
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
          <Route
            path="/add-products"
            element={
              <Layout>
                <AddProduct />
              </Layout>
            }
          />
          <Route
            path="/marketplace"
            element={
              <Layout>
                <Marketplace />
              </Layout>
            }
          />
          <Route
            path="/marketplace"
            element={
              <Layout>
                <Marketplace />
              </Layout>
            }
          />
          <Route
            path="/marketplace/details/:productId"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/events"
            element={
              <Layout>
                <Events />
              </Layout>
            }
          />
          <Route
            path="/events/add-events"
            element={
              <Layout>
                <EventDetails />
              </Layout>
            }
          />
          <Route
            path="/events/details/:eventId"
            element={
              <Layout>
                <SingleEvent />
              </Layout>
            }
          />
			 <Route
            path="/news"
            element={
              <Layout>
                <NavBar1></NavBar1>
				<News key="general" category="farming" />
              </Layout>
            }
          />


          <Route
            path="/farming"
            element={
              <Layout>
                <NavBar1></NavBar1>
                <News key="farming" category="farming" />
              </Layout>
            }
          />
          <Route
            path="/crops"
            element={
              <Layout>
                <NavBar1></NavBar1>
                <News key="crops" category="crops" />
              </Layout>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <Layout>
                <NavBar1></NavBar1>
                <News key="fertilizer" category="fertilizer" />
              </Layout>
            }
          />
          <Route
            path="/pesticides"
            element={
				<Layout>
                <NavBar1></NavBar1>
                <News key="pesticide" category="pesticide" />
              </Layout>
            }
          />
          <Route
            path="/agriculture"
            element={
              <Layout>
                <NavBar1></NavBar1>
                <News key="agriculture" category="agriculture" />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
