
import { SearchBar } from '../SearchBar/SearchBar';

type PropSearch = {

      value : string,
      onWordChange : (value : string)  => void
}

export const Header:React.FC<PropSearch> = ({value,onWordChange}) => {
  return (

    
        <div>
            <SearchBar  value={value}  onChange ={ onWordChange}/>
        </div>
  )
}
