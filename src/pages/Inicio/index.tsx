import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import styles from "./Inicio.module.scss"
import Card from "../../components/Card"
import { MarvelAPIResponse, Character } from "../../types/api"
import { PUBLIC_KEY, PRIVATE_KEY } from "../../../keys"
import { md5 } from 'js-md5';

export default function Inicio() {
    const [personagens, setPersonagens] = useState<Character[]>([])

    const timeStamp = Math.floor(Date.now() / 1000).toString();
    let apiKey = PUBLIC_KEY
    let privateKey = PRIVATE_KEY
    let hash = md5(`${timeStamp}${privateKey}${apiKey}`)
    // md5(ts+privateKey+publicKey)

    const fetchData = async () => {
        try {
            const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=16&orderBy=name`)
            
            if (response.ok) {
                const responseData: MarvelAPIResponse = await response.json()
                setPersonagens(responseData.data.results)
                console.log("Requisicao feita.")
            }
            
        } catch (error) {
            console.log(error)
        }           
    }

    useEffect(() => { fetchData() }, [])

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
            
            <div className={styles.containerPesquisar}>
                <form className={styles.formPesquisar}>
                    <div className={styles.inputContainer}>
                        <input 
                            type="search" 
                            placeholder="Pesquise por algum personagem"
                        />
                    </div>
                    <button type="submit">Pesquisar</button>
                </form>
            </div>   

            <section className={styles.sectionPersonagens}>
                <div className={styles.containerPersonagens}>
                    {personagens.map((personagem) => {
                        return (
                            <Card 
                                key={personagem.name}
                                URLPhoto={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}
                                nome={personagem.name}
                                id={personagem.id}
                            />
                        )
                    })}
                </div>
            </section>
        </>
    )
}