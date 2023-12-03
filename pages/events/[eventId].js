import { Fragment } from 'react'
import Head from 'next/head'

import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

function EventDetailPage(props) {
  const event = props.event

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
    revalidate: 30,
  }
}
// getStaticProps(context)を使う場合は、getStaticPaths()を使う
// useRouter()を使う場合は、getServerSideProps()を使う
export async function getStaticPaths() {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    /* The `fallback: 'blocking'` option in the `getStaticPaths` function is used to specify the fallback
  behavior for pages that are not statically generated at build time. */
    fallback: 'blocking',
    /* The `fallback: false` specify that if a
    requested page doesn't have a corresponding pre-generated static page, Next.js should return a
    404 page instead of trying to generate the page on the fly. */
  }
}

export default EventDetailPage
