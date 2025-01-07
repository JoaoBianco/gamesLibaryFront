"use client"

import Spinner from "@/app/(components)/spinner/Spinner"
import { RawgGame } from "@/app/shared/models/game.model"
import metacriticImg from "@/public/metacritic.png"
import switchImg from "@/public/switch.png"
import {
  faPlaystation,
  faWindows,
  faXbox,
} from "@fortawesome/free-brands-svg-icons"
import {
  faCircleArrowLeft,
  faGamepad,
  faStar,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import parse from "html-react-parser"
import Image, { StaticImageData } from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Plataform = {
  name: string
  icon: { icon: IconDefinition | StaticImageData; isImage: boolean }
}

export default function Game() {
  let id = useParams().id
  const router = useRouter()

  const [game, setGame] = useState<RawgGame>()
  const [plataforms, setPlataforms] = useState<Plataform[]>([])

  useEffect(() => {
    if (!id) {
      router.push("/")
      return
    }

    if (typeof id === "string") {
      fetch(`http://localhost:3000/api/game/${id}`).then((game) => {
        game.json().then((game) => fetchGameInfos(game.rawgId))
      })
      return
    }

    fetchGameInfos(Number(id))
  }, [id])

  useEffect(() => {
    buildPlataforms()
  }, [game])

  function fetchGameInfos(id: number) {
    fetch(`http://localhost:3000/api/rawgGames/${id}`).then((game) => {
      game.json().then((game) => setGame(game))
    })
  }

  function buildPlataforms() {
    if (!game) {
      return
    }

    const plataforms: Plataform[] = game.parent_platforms.map((platform) => {
      return {
        name: platform.platform.name,
        icon: getIconPlataform(platform.platform.name),
      }
    })
    setPlataforms(plataforms)
  }

  function getIconPlataform(plataform: string): {
    icon: IconDefinition | StaticImageData
    isImage: boolean
  } {
    const literals = [
      {
        plataform: "PlayStation",
        icon: faPlaystation,
      },
      {
        plataform: "Xbox",
        icon: faXbox,
      },
      {
        plataform: "PC",
        icon: faWindows,
      },
      {
        plataform: "Nintendo",
        icon: switchImg,
        isImage: true,
      },
    ]
    const platform = literals.find((literal) => literal.plataform === plataform)
    return {
      icon: platform?.icon || faGamepad,
      isImage: platform?.isImage || false,
    }
  }

  if (!game) {
    return <Spinner />
  }

  return (
    <>
      <div className="relative">
        <div
          className="absolute z-[2] top-0 left-0 cursor-pointer p-4 bg-black/30 rounded-br-lg hover:shadow-md transition-shadow"
          onClick={() => router.push("/")}
        >
          <FontAwesomeIcon
            className="text-white rounded-full"
            size="2x"
            icon={faCircleArrowLeft}
          />
        </div>
        <Image
          src={game.background_image}
          alt={game.name}
          width={1200}
          height={800}
          className="w-full object-cover object-top h-[400px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
      </div>
      <div className="grid gap-2 p-4">
        <h3 className="text-center text-[2rem]">{game.name}</h3>
        <div className="grid gap-2">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex gap-2 items-center shadow-sm border-2 border-gray-300 p-2 rounded-md">
              <FontAwesomeIcon icon={faCalendar} /> <span>{game.released}</span>
            </div>
            <div className="flex gap-2 items-center shadow-sm border-2 border-gray-300 p-2 rounded-md">
              <Image
                src={metacriticImg}
                alt="Metacritic"
                width={16}
                height={16}
                className="rounded-lg"
              />
              <span>{game.metacritic}</span>
            </div>
            <div className="flex gap-2 items-center shadow-sm border-2 border-gray-300 p-2 rounded-md">
              <FontAwesomeIcon icon={faStar} /> <span>{game.rating}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {plataforms?.map((plataform) => {
              return (
                <div
                  key={plataform.name}
                  className="flex gap-2 items-center shadow-sm border-2 border-gray-300 p-2 rounded-md"
                >
                  {!plataform.icon.isImage ? (
                    <FontAwesomeIcon
                      icon={plataform.icon.icon as IconDefinition}
                    />
                  ) : (
                    <Image
                      src={plataform.icon.icon as StaticImageData}
                      alt={plataform.name}
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                  )}
                  <span>{plataform.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        <p>{parse(game.description)}</p>
      </div>
    </>
  )
}
