import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"
import homeStyles from "styles/Home.module.css"
import styles from "./style.module.css"

import { addDevit } from "components/../firebase/client.js"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

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
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <div className={homeStyles.containerCenter}>
        <main className={`${homeStyles.main}`}>
          <form onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              cols="30"
              id=""
              onChange={handleChange}
              name=""
              placeholder="¿Qué esta pasando?"
              rows="10"
              value={message}
            ></textarea>
            <div className={styles.div}>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
