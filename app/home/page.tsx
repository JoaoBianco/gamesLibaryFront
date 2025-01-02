import { RawgGamesList } from "@/app/shared/models/game.model"
import GameCard from "../game/(components)/GameCard"

export default async function Home() {
  const games: RawgGamesList = await fetch(
    "http://localhost:3000/api/rawgGames"
  ).then((res) => res.json())

  if (!games) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {games?.results?.map((game) => {
        return <GameCard game={game} key={game.id} />
      })}
    </div>
  )
}
