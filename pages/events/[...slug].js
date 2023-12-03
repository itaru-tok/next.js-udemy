import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function FilteredEventsPage(props) {
  const router = useRouter()
  // const filteredData = router.query.slug

  /*  If it is, it means that the data is still being loaded or has
not been fetched yet. In this case, the code returns a loading message to indicate that the data is
being fetched. */
  // if (!filteredData) {
  //   return <p className="center">Loading...</p>
  // }

  // const filteredYear = filteredData[0]
  // const filteredMonth = filteredData[1]

  // const numYear = +filteredYear
  // const numMonth = +filteredMonth

  const filteredEvents = props.events

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Go back to Events</Button>
        </div>
      </Fragment>
    )
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Go back to Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(props.date.year, props.date.month - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const filteredData = params.slug

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    }
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
