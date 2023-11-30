import { getFeaturedEvents } from '../../dummy-data'

function AllEventsPage() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <h1>All Events</h1>
    </div>
  )
}

export default AllEventsPage
