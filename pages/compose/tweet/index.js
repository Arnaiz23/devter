import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"
import homeStyles from "styles/Home.module.css"
import styles from "./style.module.css"

export default function ComposeTweet() {
  // const user = useUser()
  useUser()
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /* addDevit({

    }) */
  }

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
              <Button disabled={message.length === 0}>Devitear</Button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
