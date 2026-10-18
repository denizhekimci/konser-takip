import { useParams } from "react-router"

export function EventDetailPage() {
    const { eventId } = useParams()

    if (!eventId) {
        throw new Error('EventDetailPage: route must define :eventId')
    }
    return (
        <h1>id: {eventId}</h1>
    )
}