"use client"

import { RawgGame } from "@/app/shared/models/game.model"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Props = { game: RawgGame }

export default function GameCard({ game }: Props) {
  const router = useRouter()

  function goToGame(id: number) {
    router.push(`/game/${id}`)
  }

  return (
    <div
      className="relative rounded-md h-[350px] overflow-hidden shadow-sm shadow-gray-600 cursor-pointer"
      onClick={() => goToGame(game.id)}
    >
      <Image
        src={game.background_image}
        alt={game.name}
        width={800}
        height={350}
        className="rounded-md h-full w-full object-cover"
      />
      <div className="absolute inset-0">
        <p className="absolute z-10 bottom-2 left-2">{game.name}</p>
        <div className="bg-black/30 absolute inset-0"></div>
      </div>
    </div>
  )
}
