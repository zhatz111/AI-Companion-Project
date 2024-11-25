import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<h1>{<HomePage/>}</h1>} />
      <Route path="/jobs" element={<JobsPage/>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App