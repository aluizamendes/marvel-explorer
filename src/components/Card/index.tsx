import { Link } from "react-router-dom"
import styles from "./Card.module.scss"

interface ICardProps {
    URLPhoto: string
    nome: string
    id: number
}

export default function Card({ URLPhoto, nome, id }: ICardProps) {
    return (
        <Link to={`/${id}`}>

            <div className={styles.card}>
                
                <div className={styles.cardContent}>
                    <div className={styles.imagemContainer}>
                        <img src={URLPhoto} alt={`Imagem do personagem ${nome}.`} />
                    </div>

                    <div className={styles.tituloContainer}>
                        <p>{nome}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
