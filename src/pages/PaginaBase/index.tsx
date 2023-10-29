import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho";

export default function PaginaBase() {
    return (
        <>
            <Cabecalho />
            <main>
                <Outlet />
            </main>
        </>
    )
}