import Navbar from "./Navbar.jsx";


function Layout({children}){


    return(

        <div className="min-h-screen bg-slate-100">

            <Navbar/>

            <main>

                {children}

            </main>

        </div>

    );

}


export default Layout;