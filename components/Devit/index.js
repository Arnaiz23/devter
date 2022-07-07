import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"

import styles from "./styles.module.css"

export default function Devit({ devit }) {
  const timeago = useTimeAgo(devit.createdAt)
  const titleTime = useDateTimeFormat(devit.createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${devit.id}`)
  }

  return (
    <>
      <article className={styles.article} onClick={handleArticleClick}>
        <Avatar src={devit.avatar} alt={devit.username} />
        <div>
          <header>
            <strong>{devit.userName}</strong>
            <span> · </span>
            <Link href={`/status/${devit.id}`}>
              <a>
                <time className={styles.date} title={titleTime}>
                  {timeago}
                </time>
              </a>
            </Link>
          </header>
          <p className={styles.p}>{devit.content}</p>
          {devit.img && (
            <img src={devit.img} alt={`image of the user ${devit.userName}`} />
          )}
        </div>
      </article>
      <style jsx>{`
        img {
          width: 100%;
          border-radius: 10px;
          margin: 10px 0;
        }
        article {
          transition: background-color 0.2s;
        }
        article:hover {
          background-color: #ddd;
        }
      `}</style>
    </>
  )
}
