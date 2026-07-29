
import { Text } from '../Text/Text';
import { FaLocationDot } from 'react-icons/fa6';
import searchLoogo from '../../assets/searchbar.png'

export type SearchProp = {

  value: string,
  onChange: (value: string) => void

}

export const SearchBar: React.FC<SearchProp> = ({ value, onChange }) => {
  return (

    <div>

      <nav className='nav'>

        <div className='Heading-items'>
          <Text variant={'span'} style={{ color: '#fdfdfd', padding: '0px 120px', paddingLeft: '10px', fontWeight: 'bold', fontSize: '20px' }}>Weather forecast</Text>

          <Text variant={'span'} style={{ color: '#fdfdfd', padding: '0px 120px' }}> <FaLocationDot className='' /> Welkom , ZA </Text>
    
            <img src={searchLoogo} alt='search logo ' className='search-logo' />
            <input type="text" className='search-bar' placeholder='Search City' value={value} onChange={(e) => onChange(e.target.value)} />

        </div>
      </nav>
    </div>
  )
}

