"use client"

import { Game } from "@/app/(shared)/models/game.model"
import {
  faBell as bellRegular,
  faBookmark as bookmarkRegular,
  faHeart as heartRegular,
  faMoneyBill1 as moneyRegular,
} from "@fortawesome/free-regular-svg-icons"
import {
  faBell as bellSolid,
  faBookmark as bookmarkSolid,
  faCircleArrowLeft,
  faHeart as heartSolid,
  faMoneyBill1 as moneySolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tooltip } from "react-tooltip"

export default function CardMenu({
  game,
  showBackButton = false,
}: {
  game: Game
  showBackButton?: boolean
}) {
  const [localGame, setLocalGame] = useState<Game>(game)
  const [blockActions, setBlockActions] = useState(false)
  const [tooltipInfos, setTooltipInfos] = useState({ contet: "" })

  const router = useRouter()

  async function toggleItem(
    option: "wishlist" | "library" | "favorite" | "acquired"
  ) {
    if (blockActions) {
      return
    }
    setBlockActions(true)
    const mappedOption = {
      wishlist: "wishlist",
      library: "inLibrary",
      favorite: "favorite",
      acquired: "acquired",
    } as const
    const gameOption = mappedOption[option]
    await fetch(`http://localhost:3000/api/game/toggleto${option}/${game.id}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          return
        }
        if (!game.libraryGame) {
          game.libraryGame = {} as Game["libraryGame"]
        }
        game.libraryGame = {
          ...game.libraryGame,
          //@ts-ignore
          [gameOption]: !game.libraryGame?.[gameOption],
        } as Game["libraryGame"]
        setLocalGame({ ...game })
      })
      .finally(() => setBlockActions(false))
  }

  return (
    <div className="flex gap-4 items-center justify-end p-2 bg-black/30 absolute top-0 left-0 right-0 z-10">
      {showBackButton && (
        <FontAwesomeIcon
          className="text-white rounded-full mr-auto cursor-pointer focus-within:outline-none focus-within:shadow-md hover:shadow-md"
          icon={faCircleArrowLeft}
          size="sm"
          onClick={() => router.back()}
        />
      )}
      {localGame.libraryGame?.inLibrary && (
        <>
          <FontAwesomeIcon
            data-tooltip-id="card-menu-tooltip"
            onMouseEnter={() => setTooltipInfos({ contet: "Toggle acquired" })}
            icon={localGame.libraryGame?.acquired ? moneySolid : moneyRegular}
            color="white"
            onClick={() => toggleItem("acquired")}
            size="sm"
            className="cursor-pointer focus-within:outline-none focus-within:shadow-md hover:shadow-md"
          />
          <FontAwesomeIcon
            data-tooltip-id="card-menu-tooltip"
            onMouseEnter={() => setTooltipInfos({ contet: "Toggle favorite" })}
            icon={localGame.libraryGame?.favorite ? heartSolid : heartRegular}
            color="white"
            onClick={() => toggleItem("favorite")}
            size="sm"
            className="cursor-pointer focus-within:outline-none focus-within:shadow-md hover:shadow-md"
          />
        </>
      )}
      <FontAwesomeIcon
        data-tooltip-id="card-menu-tooltip"
        onMouseEnter={() => setTooltipInfos({ contet: "Toggle wishlist" })}
        icon={localGame.libraryGame?.wishlist ? bellSolid : bellRegular}
        color="white"
        onClick={() => toggleItem("wishlist")}
        size="sm"
        className="cursor-pointer focus-within:outline-none focus-within:shadow-md hover:shadow-md"
      />
      <FontAwesomeIcon
        data-tooltip-id="card-menu-tooltip"
        onMouseEnter={() => setTooltipInfos({ contet: "Toggle library" })}
        icon={
          localGame.libraryGame?.inLibrary ? bookmarkSolid : bookmarkRegular
        }
        color="white"
        onClick={() => toggleItem("library")}
        size="sm"
        className="cursor-pointer focus-within:outline-none focus-within:shadow-md hover:shadow-md"
      />
      <Tooltip id="card-menu-tooltip" content={tooltipInfos.contet} />
    </div>
  )
}
