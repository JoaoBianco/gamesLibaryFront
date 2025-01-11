"use client"

import { RawgGamesList } from "@/app/(shared)/models/game.model"
import { uniqBy } from "lodash"
import { useEffect, useState } from "react"
import HomeLayout from "../(shared)/components/HomeLayout"
import HomeGameSkeleton from "../(shared)/components/skeletons/HomeGameSkeleton"
import Spinner from "../(shared)/components/spinner/Spinner"
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
      setError(true)
    }
    setLoading(false)
  }

  if (error) {
    return <div>Error on loading games!</div>
  }

  return (
    <HomeLayout>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
          {Array.from({ length: 30 }).map((_, index) => (
            <HomeGameSkeleton key={index} />
          ))}
        </div>
      )}
      {allGames?.results && (
        <HomeWrapper games={allGames.results} setPage={setPage} />
      )}
      {loading && <Spinner />}
    </HomeLayout>
  )
}
