import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="bg-dark-one ">
            <section className=" max-w-6xl mx-auto h-screen">
                <Outlet />
            </section>
        </main>
    )
}

export default Layout
