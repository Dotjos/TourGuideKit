
export const Hero = () => {
  return (
      <div className="min-h-screen flex justify-center flex-col items-center">
          <p className="font-bold md:text-7xl sm:text-6xl text-3xl text-center ">Jagora</p>
          <p className="capitalize md:text-4xl text-center pb-5">Simplify your first-time experience. instantly.</p>
          <div className="flex items-center justify-center gap-2.5">
        <input className="border border-gray-300 px-2 py-2 rounded" placeholder="Your Email" type="text" name="" id="" />
        <button className='text-white bg-indigo-600 tracking-tight px-4 py-2 rounded'>See Demo</button>
          </div>
    </div>
  )
}
