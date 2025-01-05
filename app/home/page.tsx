"use client"

import { RawgGamesList } from "@/app/shared/models/game.model"
import { useEffect, useState } from "react"
import Spinner from "../(components)/spinner/Spinner"
import HomeWrapper from "./(components)/HomeWrapper"

export default function Home() {
  const [games, setGames] = useState<RawgGamesList>()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchGames(page)
  }, [page])

  async function fetchGames(page: number) {
    if (loading) return
    setLoading(true)
    try {
      await fetch(`http://localhost:3000/api/rawgGames?page=${page}`).then(
        (res) => {
          res.json().then((games: RawgGamesList) => {
            setGames((prev) =>
              prev
                ? {
                    ...prev,
                    results: [...prev.results, ...games.results],
                  }
                : games
            )
          })
        }
      )
    } catch (err) {
      console.log(err)
      setError(true)
    }
    setLoading(false)
  }

  if (error) {
    return <div>Error on loading games!</div>
  }

  return (
    <>
      {games?.results && (
        <HomeWrapper games={games.results} setPage={setPage} />
      )}
      {loading && <Spinner />}
    </>
  )
}
