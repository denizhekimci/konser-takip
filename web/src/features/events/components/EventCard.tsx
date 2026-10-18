import { Link } from "react-router";
import type { EventSummary } from "../../../shared/api/types";

type EventCardProps = {
    event: EventSummary;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Link to={`/events/${event.id}`}>
            <article className="rounded border border-gray-200 p-4">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.venue.name}, {event.venue.city}</p>
                <time className="text-sm text-gray-500" dateTime={event.startsAt}>{event.localDate} {event.localTime}</time>
            </article>
        </Link>
    );
}