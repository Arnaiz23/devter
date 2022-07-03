import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

import styles from "./styles.module.css"

export default function Devit({ devit }) {
  const timeago = useTimeAgo(devit.createdAt)

  return (
    <>
      <article className={styles.article}>
        <Avatar src={devit.avatar} alt={devit.username} />
        <div>
          <header>
            <strong>{devit.userName}</strong>
            <span> · </span>
            <time className={styles.date}>{timeago}</time>
          </header>
          <p className={styles.p}>{devit.content}</p>
          {devit.img && <img src={devit.img} />}
        </div>
      </article>
      <style jsx>{`
        img {
          width: 100%;
          border-radius: 10px;
          margin: 10px 0;
        }
      `}</style>
    </>
  )
}
