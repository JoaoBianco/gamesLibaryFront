import GameCard from "../game/(components)/GameCard"

export default async function Home() {
  const games = await fetch("http://localhost:3000/api/rawgGames").then((res) => res.json())

  if (!games) {
    return <div>Loading...</div>
  }

  return (
    games?.results?.map((game: any) => {
      return (
        <GameCard game={game} key={game.id}/>
      )
    })
  )
}
