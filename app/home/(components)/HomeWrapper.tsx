"use client"

import GameCard from "@/app/game/(components)/GameCard"
import { RawgGame } from "@/app/shared/models/game.model"
import { debounce } from "lodash"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"

export default function HomeWrapper({
  games,
  setPage,
}: {
  games: RawgGame[]
  setPage: Dispatch<SetStateAction<number>>
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const windowRef = window

  let loading = false

  const handleScroll = () => {
    const wrapperElement = wrapperRef.current

    if (wrapperElement && wrapperRef.current?.clientHeight && windowRef) {
      const isAtBottom =
        windowRef.innerHeight + windowRef.scrollY >=
        wrapperRef.current?.clientHeight

      if (isAtBottom && !loading) {
        loading = true
        return setPage((prev) => prev + 1)
      }
      if (!isAtBottom) {
        return (loading = false)
      }
    }
  }

  useEffect(() => {
    const wrapperElement = wrapperRef.current

    if (wrapperElement && windowRef) {
      windowRef.addEventListener(
        "scroll",
        debounce(() => handleScroll(), 50)
      )
    }
    return () => {
      if (wrapperElement && windowRef) {
        windowRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto"
    >
      {games.map((game) => {
        return <GameCard game={game} key={game.id} />
      })}
    </div>
  )
}
