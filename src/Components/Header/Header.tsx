
import { SearchBar } from '../SearchBar/SearchBar';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

type PropSearch = {

      value : string,
      onWordChange : (value : string)  => void
}

export const Header:React.FC<PropSearch> = ({value,onWordChange}) => {
  return (

    
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <SearchBar  value={value}  onChange ={ onWordChange}/>
            <ThemeToggle />
        </div>
  )
}
