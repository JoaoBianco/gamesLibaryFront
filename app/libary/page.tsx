import GameCard from "../game/(components)/GameCard"
import { Game } from "../shared/models/game.model"

export default async function page() {
  const games: Game[] = await fetch(
    "http://localhost:3000/api/games?onlyLibary=true"
  ).then((games) => games.json())

  if (!games || !games.length) {
    return <div>No games found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
