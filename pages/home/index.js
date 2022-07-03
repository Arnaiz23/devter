import styles from "./style.module.css"

import { useEffect, useState } from "react"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "components/../firebase/client"
import Devit from "components/Devit"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      {/* <div className={homeStyles.containerCenter}> */}
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      {/* <main className={`${homeStyles.main} ${styles.main}`}> */}
      <header className={styles.header}>
        {/* <Avatar /> */}
        <h2>Inicio</h2>
      </header>
      <div className={styles.div}>
        {timeline.map((devit) => (
          <Devit key={devit.id} devit={devit} />
        ))}
      </div>
      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      {/* </main> */}
      {/* // </div> */}
    </>
  )
}
