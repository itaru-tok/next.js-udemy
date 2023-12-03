import { Fragment } from 'react'

import { getEventById } from '../../helpers/api-util'
import { getAllEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventDetailPage(props) {
  const event = props.event

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const eventId = params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      event,
    },
  }
}
// getStaticProps(context)を使う場合は、getStaticPaths()を使う
// どのIDかわからないため、全てのIDを取得する
// useRouter()を使う場合は、getServerSideProps()を使う
export async function getStaticPaths() {
  const events = await getAllEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: false,
    /* specify that if a
    requested page doesn't have a corresponding pre-generated static page, Next.js should return a
    404 page instead of trying to generate the page on the fly. */
  }
}

export default EventDetailPage
