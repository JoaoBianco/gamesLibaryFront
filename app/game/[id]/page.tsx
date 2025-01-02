"use client"

import { RawgGame } from "@/app/shared/models/game.model"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Game() {
  const id = useParams().id
  const router = useRouter()

  const [game, setGame] = useState<RawgGame>()

  useEffect(() => {
    if (!id) {
      router.push("/")
      return
    }

    fetch(`http://localhost:3000/api/rawgGames/${id}`).then((game) => {
      game.json().then((game) => setGame(game))
    })
  }, [id])

  if (!game) {
    return <div>Loading...</div>
  }

  return <div key={game.id}>{game.name}</div>
}
