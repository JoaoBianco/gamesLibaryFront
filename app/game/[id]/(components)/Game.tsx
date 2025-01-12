import { Game as GameType } from "@/app/(shared)/models/game.model"
import metacriticImg from "@/public/metacritic.png"
import {
  faCalendar,
  faStar,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import parse from "html-react-parser"
import Image, { StaticImageData } from "next/image"
import CardMenu from "../../(components)/CardMenu"
import { Plataform } from "../page"

export default function GamePage({
  game,
  platforms,
}: {
  game: GameType
  platforms: Plataform[]
}) {
  return (
    <>
      <div className="relative">
        <CardMenu game={game} showBackButton={true} />
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
            {platforms?.map((plataform) => {
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
        <div>{parse(game?.description || "")}</div>
      </div>
    </>
  )
}
