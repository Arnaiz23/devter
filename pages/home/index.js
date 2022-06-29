import Avatar from "components/Avatar"

import styles from "./style.module.css"
import homeStyles from "styles/Home.module.css"

import { useEffect, useState } from "react"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

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
              <article key={devit.id} className={styles.article}>
                <Avatar src={devit.avatar} alt={devit.username} />
                <div>
                  <strong>{devit.username}</strong>
                  <p className={styles.p}>{devit.message}</p>
                </div>
              </article>
            ))}
          </div>
          <nav className={styles.nav}></nav>
        </main>
      </div>
    </>
  )
}
