import { Text } from '../Text/Text';

export const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Text variant={'h3'}>Menu</Text>
      </div>
      <nav className='sidebar-nav'>
        <ul className='sidebar-menu'>
          <li className='sidebar-item'>
            <Text variant={'span'}>Home</Text>
          </li>
          <li className='sidebar-item'>
            <Text variant={'span'}>Forecast</Text>
          </li>
          <li className='sidebar-item'>
            <Text variant={'span'}>Saved Locations</Text>
          </li>
          <li className='sidebar-item'>
            <Text variant={'span'}>Settings</Text>
          </li>
        </ul>
      </nav>
    </div>
  );
};
