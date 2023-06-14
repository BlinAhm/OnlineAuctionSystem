const Admin = () => {
    if (localStorage.getItem("user") === null) {
        document.location.href = "http://localhost:3000/home";
    }
    if (!(localStorage.getItem("roles").split(",").includes("Admin"))) {
        document.location.href = "http://localhost:3000/home";
    }

    return (
        <div>
            Admin
        </div>
    );
}

export default Admin;