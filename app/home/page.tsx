"use client"

import { RawgGamesList } from "@/app/shared/models/game.model"
import { uniqBy } from "lodash"
import { useEffect, useState } from "react"
import Spinner from "../(components)/spinner/Spinner"
import HomeWrapper from "./(components)/HomeWrapper"

export default function Home() {
  const [allGames, setAllGames] = useState<RawgGamesList>()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchGames(page)
  }, [page])

  async function fetchGames(page: number) {
    if (allGames?.next?.includes(`page=${page + 1}`) || loading) {
      return
    }
    setLoading(true)
    try {
      await fetch(`http://localhost:3000/api/rawgGames?page=${page}`).then(
        (res) => {
          res.json().then((games: RawgGamesList) => {
            const cleanGames = uniqBy(
              [...(allGames?.results || []), ...games.results],
              "id"
            )
            setAllGames((prev) =>
              prev
                ? {
                    ...prev,
                    results: cleanGames,
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
      {allGames?.results && (
        <HomeWrapper games={allGames.results} setPage={setPage} />
      )}
      {loading && <Spinner />}
    </>
  )
}
