import Home from "./pages/Home";
import Auction from "./pages/Auction";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuctionCreate from "./pages/PersonalDashboard/AuctionCreate";
import MyAuctions from "./pages/PersonalDashboard/MyAuctions";
import MyBids from "./pages/PersonalDashboard/MyBids";
import Category from "./pages/Category";





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
    },
    {
        path: '/my-auctions',
        element: <MyAuctions />
    },
    {
        path: '/my-bids',
        element: <MyBids />
    },
    {
        path: '/category',
        element: <Category/>
    }
];

export default AppRoutes;
