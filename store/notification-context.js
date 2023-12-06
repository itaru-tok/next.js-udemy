import { createContext, useState } from 'react'

/* This context object will be used to
share data and functions between components in a React application. */
const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function () {},
  hideNotification: function () {},
})

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState()

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData)
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
