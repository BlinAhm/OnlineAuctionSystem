import Home from "./pages/Home";
import Auction from "./pages/Auction";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuctionList from "./pages/AuctionList";
import AuctionCreate from "./pages/PersonalDashboard/AuctionCreate";
import MyAuctions from "./pages/PersonalDashboard/MyAuctions";
import MyBids from "./pages/PersonalDashboard/MyBids";
import Category from "./pages/Category";
import Logout from "./pages/Logout";
import Admin from "./pages/Admin/Admin";

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
    },
    {
        path: '/admin',
        element: <Admin />
    },
    {
        path: '/log-out',
        element: <Logout />
    }
];

export default AppRoutes;
