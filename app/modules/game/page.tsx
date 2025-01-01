type Props = any

export default async function Game(game: Props) {

  return (
    <div key={game.id}>
      {game.name}
    </div>
  )

}