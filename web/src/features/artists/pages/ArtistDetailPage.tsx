import { useParams } from "react-router"

export function ArtistDetailPage() {
    const { artistId } = useParams()

    if(!artistId) {
        throw new Error('ArtistDetailPage: route must define :artistId')
    }

    return <h1>id: {artistId}</h1>
}