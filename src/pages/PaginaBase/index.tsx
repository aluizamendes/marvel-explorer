import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho";
import styles from "./PaginaBase.module.scss"

export default function PaginaBase() {
    return (
        <>
            <Cabecalho />
            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    )
}