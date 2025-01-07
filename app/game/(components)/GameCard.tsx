"use client"

import { Game } from "@/app/shared/models/game.model"
import Image from "next/image"
import Link from "next/link"
import CardMenu from "./CardMenu"

type Props = { game: Game }

export default function GameCard({ game }: Props) {
  return (
    <div className="relative rounded-md h-[350px] overflow-hidden shadow-sm shadow-gray-600 cursor-pointer">
      <CardMenu game={game} />
      <Link className="relative" href={`/game/${game.id}`}>
        <Image
          src={game.libraryGame?.background_image || game.background_image}
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
    </div>
  )
}
