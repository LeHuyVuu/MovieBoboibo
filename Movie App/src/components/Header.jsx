import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const Header = () => {
  return (
    <div>
        <header className="h-14 lg: h-20 bg-black flex justify-between text-white items-center px-8">
        <div className="flex items-center gap-4">
          <img src="./netflix.png" className="w-10 sm:w-10" />
          <a href="#">Phim</a>
          <a href="#">Truyền Hình</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
        </div>
      </header>
    </div>
  )
}
export default Header