import Avatar from "components/Avatar"

import styles from "./styles.module.css"

export default function Devit({ devit }) {
  return (
    <article className={styles.article}>
      <Avatar src={devit.avatar} alt={devit.username} />
      <div>
        <header>
          <strong>{devit.userName}</strong>
          <span> · </span>
          <date className={styles.date}>{devit.createdAt}</date>
        </header>
        <p className={styles.p}>{devit.content}</p>
      </div>
    </article>
  )
}
