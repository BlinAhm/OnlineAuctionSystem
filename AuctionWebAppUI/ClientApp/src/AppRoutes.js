import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./pages/Home";
import Auction from "./pages/Auction";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/auction',
    element: <Auction />
  }
];

export default AppRoutes;
