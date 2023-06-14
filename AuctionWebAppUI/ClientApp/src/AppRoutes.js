import Home from "./pages/Home";
import Auction from "./pages/Auction";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuctionList from "./pages/AuctionList";



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
        path: '/category/:categoryName',
        element: <AuctionList />
    }
];

export default AppRoutes;
