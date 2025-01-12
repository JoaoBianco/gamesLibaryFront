import switchImg from "@/public/switch.png"
import {
  faPlaystation,
  faWindows,
  faXbox,
} from "@fortawesome/free-brands-svg-icons"
import { faGamepad, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { StaticImageData } from "next/image"
import { redirect } from "next/navigation"
import GamePage from "./(components)/Game"

export type Plataform = {
  name: string
  icon: { icon: IconDefinition | StaticImageData; isImage: boolean }
}

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  if (!id) {
    redirect("/")
  }

  const game = await fetch(`http://localhost:3000/api/game/${id}`).then(
    (game) => game.json()
  )

  const platforms = buildPlataforms()

  function buildPlataforms() {
    if (!game) {
      return
    }

    return game.parent_platforms.map((platform: { platform: Plataform }) => {
      return {
        name: platform.platform.name,
        icon: getIconPlataform(platform.platform.name),
      }
    })
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

  return <GamePage game={game} platforms={platforms} />
}
