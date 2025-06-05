import { createBrowserRouter } from "react-router";
import QuicksLayout from "../layouts/QuicksLayout";
import FundationPage from "../pages/FundationPage";

const routes = createBrowserRouter([
  {
    Component: QuicksLayout,
    children: [
      {
        index: true,
        Component: FundationPage,
      },
    ],
  },
]);

export default routes;
