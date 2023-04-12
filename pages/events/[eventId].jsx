import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getAllEvents } from "../../helpers/api-util";
import Comments from "../../components/input/comments";
import Head from "next/head";
import React, { Fragment } from "react";
function EventDetailPage(props) {
  const event = props?.eventWithId;
  return (
    <>
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
        <Comments eventId={event.id} />
      </Fragment>
    </>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const eventsId = params?.eventId;
  const data = await getAllEvents();
  const eventIdData = data?.find((p) => p.id === eventsId);
  return {
    props: {
      eventWithId: eventIdData,
      eventId: eventsId,
    },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const idData = await getAllEvents();
  const ids = idData?.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { eventId: id } }));
  return {
    paths: pathWithParams,
    fallback: false,
  };
}
export default EventDetailPage;
