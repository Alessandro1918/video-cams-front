interface SelectionProps {
  setUserType: (userType: string) => void
}

export default function Selection(props: SelectionProps) {
  return (
    <main>
      <button 
        type="button" 
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => props.setUserType("camera")}
      >
        Camera
      </button>

      <button
        type="button" 
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
        onClick={() => props.setUserType("player")}
      >
        Player
      </button>
    </main>
  )
}