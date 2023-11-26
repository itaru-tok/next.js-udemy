/**
 * The above function is a React component that fetches and displays a list of meetups from a remote
 * API.
 * @returns The code is returning a React component called AllMeetupsPage.
 */
import { useEffect } from 'react'
import { useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadedMeetups, setLoadedMeetups] = useState([])

  /* The `useEffect` hook in the code is used to perform side effects in a React component. In this case,
it is fetching data from a remote API and updating the component's state with the fetched data. */
  useEffect(
    () => {
      setIsLoading(true)
      fetch(
        'https://react-getting-started-cc103-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json'
      )
        .then((response) => {
          return response.json()
        })
        /* This code block is processing the fetched data from the remote API. */
        .then((data) => {
          const meetups = []
          for (const key in data) {
            const meetup = {
              id: key,
              ...data[key],
            }
            meetups.push(meetup)
          }
          setIsLoading(false)
          setLoadedMeetups(meetups)
        })
    } /* The `[]` in the `useEffect` hook is the dependency array. It specifies the dependencies that the
  effect depends on. In this case, since the dependency array is empty, the effect will only run
  once, after the initial render of the component. */,
    []
  )

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  )
}

export default AllMeetupsPage
