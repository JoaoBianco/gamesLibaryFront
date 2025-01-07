"use client"

import { RawgGame } from "@/app/shared/models/game.model"
import Image from "next/image"
import Link from "next/link"

type Props = { game: RawgGame }

export default function GameCard({ game }: Props) {
  return (
    <Link
      className="relative rounded-md h-[350px] overflow-hidden shadow-sm shadow-gray-600 cursor-pointer"
      href={`/game/${game.id}`}
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
    </Link>
  )
}
