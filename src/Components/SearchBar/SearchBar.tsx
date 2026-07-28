import { useState } from 'react';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add search functionality here
  };

  return (
    <form onSubmit={handleSearch} className='search-bar'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search location...'
        className='search-input'
      />
      <button type='submit' className='search-button'>Search</button>
    </form>
  );
};

