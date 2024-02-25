import React from 'react'

export const ToastContext = React.createContext({})

function ToastProvider({ children }) {
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

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]
    setToasts(nextToasts)
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter(toast => toast.id !== id)
    setToasts(nextToasts)
  }
  // @ts-ignore
  return <ToastContext.Provider value={{ toasts, createToast, handleDismiss }}>{children}</ToastContext.Provider>
}

export default ToastProvider
