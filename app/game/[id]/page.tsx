import { RawgGame } from "@/app/shared/models/game.model"

type Props = {game: RawgGame}

export default async function Game({game}: Props) {

  return (
    <div key={game.id}>
      {game.name}
    </div>
  )

}