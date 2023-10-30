import { Link } from "react-router-dom"
import styles from "./Cabecalho.module.scss"

export default function Cabecalho() {
    return (
        <header>
            <div className={styles.nav}>
                <span>Marvel Explorer</span>
                <nav>
                    <ul className={styles.containerLinksMenu}>
                        <li> <Link to={"/"}>Inicio</Link> </li>
                        <li> <Link to={"/comics"}>Comics</Link> </li>
                        <li> <Link to={"/favoritos"}>Favoritos</Link> </li>
                    </ul>
                </nav>   
            </div>
         </header>
    )
}