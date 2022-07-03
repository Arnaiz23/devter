import styles from "./style.module.css"
import homeStyles from "styles/Home.module.css"

import { useEffect, useState } from "react"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "components/../firebase/client"
import Devit from "components/Devit"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <div className={homeStyles.containerCenter}>
        <main className={`${homeStyles.main} ${styles.main}`}>
          <header className={styles.header}>
            {/* <Avatar /> */}
            <h2>Inicio</h2>
          </header>
          <div>
            {timeline.map((devit) => (
              <Devit key={devit.id} devit={devit} />
            ))}
          </div>
          <nav className={styles.nav}></nav>
        </main>
      </div>
    </>
  )
}
