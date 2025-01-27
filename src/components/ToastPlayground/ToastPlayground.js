import React from 'react'

import Button from '../Button'
import ToastShelf from '../ToastShelf'

// @ts-ignore
import styles from './ToastPlayground.module.css'
import { ToastContext } from '../ToastProvider'

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error']

function ToastPlayground() {
  const [message, setMessage] = React.useState('')
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0])

  // @ts-ignore
  const { createToast } = React.useContext(ToastContext)

  const [toasts, setToasts] = React.useState(
    [
      {
        message: 'This is a notice toast',
        variant: 'notice',
      },
      {
        message: 'This is a warning toast',
        variant: 'warning',
      },
      {
        message: 'This is a success toast',
        variant: 'success',
      },
      {
        message: 'This is an error toast',
        variant: 'error',
      },
    ].map(item => ({ ...item, id: crypto.randomUUID() }))
  )

  function handleCreateToast(event) {
    event.preventDefault()
    createToast(message, variant)
    setMessage('')
    setVariant(VARIANT_OPTIONS[0])
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf></ToastShelf>

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label} style={{ alignSelf: 'baseline' }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={e => {
                setMessage(e.target.value)
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map(option => {
              const id = `variant-${option}`
              return (
                <label key={id} htmlFor={id}>
                  <input id="variant-notice" type="radio" name="variant" value={option} checked={option === variant} onChange={e => setVariant(e.target.value)} />
                  {option}
                </label>
              )
            })}

            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={handleCreateToast}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToastPlayground
