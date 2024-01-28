import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Fib from "./routes/Fib";
import OtherPage from "./routes/OtherPage";

import "./App.css";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Fib />
      </Layout>
    ),
  },
  {
    path: "/otherpage",
    element: (
      <Layout>
        <OtherPage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
