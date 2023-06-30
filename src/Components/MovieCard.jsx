

export default function MovieCard({ item }) {

    return (
        <div>
            <p><strong>{item.title}</strong></p>
            <img width='15%' src={item.poster}/>
        </div>
    )
}