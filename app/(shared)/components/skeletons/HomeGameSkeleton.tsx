export default function HomeGameSkeleton() {
  return (
    <div className="animate-pulse bg-gray-400 relative rounded-md h-[350px] overflow-hidden flex flex-col justify-between">
      <div className="bg-gray-500 p-2 flex gap-2 justify-end">
        <span className="bg-gray-400 p-2 rounded-full"></span>
        <span className="bg-gray-400 p-2 rounded-full"></span>
        <span className="bg-gray-400 p-2 rounded-full"></span>
      </div>
      <div className="p-2 mb-2 ml-2 rounded bg-gray-500 w-[200px]" />
    </div>
  )
}
