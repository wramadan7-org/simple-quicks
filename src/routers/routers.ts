import { createBrowserRouter } from "react-router";
import QuicksLayout from "../layouts/QuicksLayout";
import FundationPage from "../pages/FundationPage";
import BonusPage from "../pages/BonusPage";

const routes = createBrowserRouter([
  {
    Component: QuicksLayout,
    children: [
      {
        index: true,
        Component: FundationPage,
      },
      {
        path: "/bonus",
        Component: BonusPage,
      },
    ],
  },
]);

export default routes;
