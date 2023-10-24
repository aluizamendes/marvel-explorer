import { Link } from "react-router-dom"
import styles from "./Inicio.module.scss"

export default function Inicio() {
    const personagens = [
        {
            nome: "Daredevil",
            descricao: "Blinded as a boy, Matt Murdock used his sonar-strong hearing to aid him in his martial arts training, becoming a fight-for-the-underdog defense attorney by day and a masked vigilante called Daredevil by night."
        },
        {
            nome: "Captain Marvel",
            descricao: "Rediscovering her human identity and past, Carol Danvers learned to channel her powers for good, becoming the Super Hero Captain Marvel. Now an ally to Earth's mightiest heroes, the Avengers, she travels across the stars to give aid to those in need."
        },
        {
            nome: "Ms. Marvel",
            descricao: "Pakistani-American Super Hero Kamala Khan protects the streets of Jersey City with her one-of-a-kind embiggening power."
        }
    ]
    return (
        <>
            <header>
                <div className={styles.nav}>
                    <span>Marvel Explorer</span>
                    <nav>
                        <ul className={styles.containerLinksMenu}>
                            <li>Inicio</li>
                            <li>Comics</li>
                            <li> <Link to={"/favoritos"}>Favoritos</Link> </li>
                        </ul>
                    </nav>   
                </div>
            </header>

            <form className={styles.containerFormPesquisar}>
                <div className={styles.inputContainer}>
                    <input 
                        type="search" 
                        placeholder="Pesquise por algum personagem"
                    />
                </div>
                <button type="submit">Pesquisar</button>
            </form>

            <section>
            </section>
        </>
    )
}