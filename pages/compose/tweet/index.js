import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import homeStyles from "styles/Home.module.css"
import styles from "./style.module.css"

import { addDevit, uploadImage } from "components/../firebase/client.js"
import { useRouter } from "next/router"
import Head from "next/head"

import { getDownloadURL } from "firebase/storage"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        getDownloadURL(task.snapshot.ref).then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <div className={homeStyles.containerCenter}>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <main className={`${homeStyles.main}`}>
          <div className={styles.container}>
            {user && (
              <figure className={styles.spanImg}>
                <Avatar src={user.avatar} />
              </figure>
            )}
            <form onSubmit={handleSubmit}>
              <textarea
                className={styles.textarea}
                cols="30"
                id=""
                onChange={handleChange}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                name=""
                placeholder="¿Qué esta pasando?"
                rows="5"
                value={message}
              ></textarea>
              {imgURL && (
                <section className={styles.section}>
                  <button onClick={() => setImgURL(null)}>x</button>
                  <img src={imgURL} className={styles.img} />
                </section>
              )}
              <div className={styles.div}>
                <Button disabled={isButtonDisabled}>Devitear</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <style jsx>{`
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 15px;
        }
        form {
          padding: 10px;
        }
      `}</style>
    </>
  )
}
