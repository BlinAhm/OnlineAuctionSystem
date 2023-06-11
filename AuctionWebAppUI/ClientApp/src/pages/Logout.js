const Logout = () => {
    localStorage.clear();
    document.location.href = "http://localhost:3000/home";
};

export default Logout;