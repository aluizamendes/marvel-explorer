import { useState, useEffect } from 'react';
import { PUBLIC_KEY, PRIVATE_KEY } from "../../../keys"
import { MarvelAPIResponse, Character } from "../../types/api"
import { md5 } from 'js-md5';
import { useParams } from 'react-router-dom';
import styles from "./Personagem.module.scss"

export default function Personagem() {
    const [personagem, setPersonagem] = useState<Character[]>([])

    const tabItems = ["Comics", "Events", "Series", "Stories"]
    const params = useParams()

    const timeStamp = Math.floor(Date.now() / 1000).toString();
    let apiKey = PUBLIC_KEY
    let privateKey = PRIVATE_KEY
    let hash = md5(`${timeStamp}${privateKey}${apiKey}`)

    const fetchData = async () => {
        try {
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)

            if (response.ok) {
                const responseData: MarvelAPIResponse = await response.json()
                setPersonagem(responseData.data.results)
                console.log("Requisicao feita.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchData() }, [])

    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                {personagem.length > 0 && (
                    <div className={styles.contentContainer}>

                        <div className={styles.secaoTopo}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={`${personagem[0].thumbnail.path}.${personagem[0].thumbnail.extension}`}
                                    alt=""
                                />

                            </div>
                            <div className={styles.infoContainer}>
                                <h2>{personagem[0].name}</h2>
                                <p>{personagem[0].description}</p>
                            </div>
                        </div>

                        <div className={styles.secaoBaixo}>
                            <div className={styles.tabs}>
                                <ul className={styles.tabsContainer}>
                                    {tabItems.map((item) => {
                                        return (
                                            <li>
                                                {item}
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </div>

                            </div>
                        </div>
                )}
                </div>
            </section>
        </>
    )
}