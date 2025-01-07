import React from "react"
import HomeNavBar from "./HomeNavBar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HomeNavBar />
      {children}
    </div>
  )
}
