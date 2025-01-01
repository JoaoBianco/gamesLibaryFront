type Props = any

export default function GameCard({game}: Props) {
  return (
    <div>
      {game.name}
    </div>
  )
}