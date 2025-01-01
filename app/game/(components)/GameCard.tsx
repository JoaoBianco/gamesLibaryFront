import { RawgGame } from "@/app/shared/models/game.model"

type Props = {game: RawgGame}

export default function GameCard({game}: Props) {
  return (
    <div>
      {game.name}
    </div>
  )
}