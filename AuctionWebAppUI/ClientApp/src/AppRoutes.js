import Home from "./pages/Home";
import Auction from "./pages/Auction";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuctionCreate from "./pages/AuctionCreate";


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
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/auction',
        element: <Auction />
    },
    {
        path: '/create-auction',
        element: <AuctionCreate />
    }
];

export default AppRoutes;
