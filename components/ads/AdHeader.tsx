export default function AdHeader() {
  return (
    <div className="flex justify-center items-center my-2">
      <div className="hidden md:flex w-[728px] h-[90px] bg-gray-200 items-center justify-center text-gray-400 text-sm rounded">728×90 Advertisement</div>
      <div className="flex md:hidden w-[320px] h-[50px] bg-gray-200 items-center justify-center text-gray-400 text-sm rounded">320×50 Advertisement</div>
    </div>
  )
}
