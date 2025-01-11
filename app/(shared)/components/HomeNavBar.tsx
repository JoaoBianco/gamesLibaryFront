import Link from "next/link"

export default function HomeNavBar() {
  return (
    <div className="flex justify-center items-center p-4 gap-4 bg-slate-800 text-white">
      <Link
        className="p-2 border-2 rounded-md hover:shadow-sm transition-shadow"
        href={"/home"}
      >
        All Games
      </Link>
      <Link
        className="p-2 border-2 rounded-md hover:shadow-sm transition-shadow"
        href={"/library"}
      >
        Library
      </Link>
    </div>
  )
}
