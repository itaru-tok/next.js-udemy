import { useRouter } from 'next/router'
import getFilteredEvents from '../../dummy-data'

function FilteredEventsPage() {
  const router = useRouter()
  const filteredData = router.query.slug

  /*  If it is, it means that the data is still being loaded or has
not been fetched yet. In this case, the code returns a loading message to indicate that the data is
being fetched. */
  if (!filteredData) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>
  }

  console.log(filteredData)
  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  )
}

export default FilteredEventsPage
