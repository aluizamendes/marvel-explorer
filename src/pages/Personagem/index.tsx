import { useState, useEffect } from 'react';
import { PUBLIC_KEY, PRIVATE_KEY } from "../../../keys"
import { MarvelAPIResponse, Character } from "../../types/api"
import { md5 } from 'js-md5';
import { useParams } from 'react-router-dom';
import styles from "./Personagem.module.scss"

export default function Personagem() {
    const [personagem, setPersonagem] = useState<Character[]>([])
    const [tabContent, setTabContent] = useState("Comics")
    const [tabContentData, setTabContentData] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const tabItems = ["Comics", "Events", "Series", "Stories"]

    const timeStamp = Math.floor(Date.now() / 1000).toString();
    let apiKey = PUBLIC_KEY
    let privateKey = PRIVATE_KEY
    let hash = md5(`${timeStamp}${privateKey}${apiKey}`)

    const fetchTabData = async (tab: string) => {
        setTabContent(tab)
        setLoading(true)

        try {
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${params.id}/${tab.toLowerCase()}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)

            if (response.ok) {
                const responseData = await response.json()
                setTabContentData(responseData.data.results)

                console.log("Requisicao feita.")
                console.log(`Conteudo da tab ${tab}: `, tabContentData)
            }
        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)

            if (response.ok) {
                const responseData: MarvelAPIResponse = await response.json()
                setPersonagem(responseData.data.results)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchData() }, [])
    useEffect(() => { fetchTabData(tabContent) }, [tabContent])

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
                                    <p>{personagem[0].description == "" ? "Description is not avaiable" : personagem[0].description}</p>
                                </div>
                            </div>

                            <div className={styles.secaoBaixo}>
                                <div className={styles.tabs}>
                                    <ul className={styles.tabsContainer}>
                                        {tabItems.map((item) => {
                                            return (
                                                <li>
                                                    <button
                                                        style={{ borderBottom: `${item === tabContent ? "3px solid #e03d3d " : ""}` }}
                                                        onClick={() => fetchTabData(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>

                                </div>
                                {loading && <p className={styles.pFeedback}>Loading...</p>}

                                {!loading && (
                                    <>
                                        {tabContentData.length > 0 ? (
                                            <ul className={styles.lista}>
                                                { tabContentData.map((item, index) => (
                                                    <li key={item.id}>
                                                        <div className={styles.itemID}>{index + 1}</div>
                                                        <span className={styles.itemTitle}>{item.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className={styles.pFeedback}>{`No ${tabContent} found.`}</p>
                                        )}
                                    </>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}