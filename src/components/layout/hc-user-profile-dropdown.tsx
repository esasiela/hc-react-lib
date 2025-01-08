import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/hc-auth-context';
import { getConfig } from '../../utils/hc-config';

interface UserProfileDropdownProperties {
  className?: string;
}

const HcUserProfileDropdown = ({
  className,
}: UserProfileDropdownProperties) => {
  const { isAuthenticated, authUser } = useAuth();
  const config = getConfig();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isAuthenticated() ? (
        <Menu>
          <MenuButton
            className={className}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {authUser && authUser.username}
            <Bars3Icon className={'hc-menu-hamburger'} />
          </MenuButton>

          <MenuItems anchor={'bottom'} className={'hc-menu-items'}>
            <MenuItem>
              <Link to={'/user-profile'}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/logout'}>Logout</Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : (
        <Link
          to={config.LOGIN.LOGIN_PATH}
          className={className}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Login
          <Bars3Icon className={'hc-menu-hamburger'} />
        </Link>
      )}
    </div>
  );
};

export default HcUserProfileDropdown;
