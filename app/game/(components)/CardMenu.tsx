"use client"

import { Game } from "@/app/shared/models/game.model"
import {
  faBell as bellRegular,
  faBookmark as bookmarkRegular,
  faHeart as heartRegular,
  faMoneyBill1 as moneyRegular,
} from "@fortawesome/free-regular-svg-icons"
import {
  faBell as bellSolid,
  faBookmark as bookmarkSolid,
  faHeart as heartSolid,
  faMoneyBill1 as moneySolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function CardMenu({ game }: { game: Game }) {
  const [localGame, setLocalGame] = useState<Game>(game)
  const [blockActions, setBlockActions] = useState(false)

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
    }
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
      {localGame.libraryGame?.inLibrary && (
        <>
          <FontAwesomeIcon
            icon={localGame.libraryGame?.acquired ? moneySolid : moneyRegular}
            color="white"
            onClick={() => toggleItem("acquired")}
          />
          <FontAwesomeIcon
            icon={localGame.libraryGame?.favorite ? heartSolid : heartRegular}
            color="white"
            onClick={() => toggleItem("favorite")}
          />
        </>
      )}
      <FontAwesomeIcon
        icon={localGame.libraryGame?.wishlist ? bellSolid : bellRegular}
        color="white"
        onClick={() => toggleItem("wishlist")}
      />
      <FontAwesomeIcon
        icon={
          localGame.libraryGame?.inLibrary ? bookmarkSolid : bookmarkRegular
        }
        color="white"
        onClick={() => toggleItem("library")}
      />
    </div>
  )
}
