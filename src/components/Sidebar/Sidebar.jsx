import React, { useState, useMemo } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const lightTheme = {
    sidebarBg: 'var(--color-sidebar-background-light-default)',
    sidebarBgHover: 'var(--color-sidebar-background-light-hover)',
    sidebarBgActive: 'var(--color-sidebar-background-light-active)',
    text: 'var(--color-text-light-default)',
    textHover: 'var(--color-text-light-hover)',
    textActive: 'var(--color-text-light-active)',
    logo: 'var(--color-text-logo-light-default)',
    buttonBg: 'var(--color-button-background-light-default)',
    buttonBgActive: 'var(--color-button-background-light-active)',
};

const darkTheme = {
    sidebarBg: 'var(--color-sidebar-background-dark-default)',
    sidebarBgHover: 'var(--color-sidebar-background-dark-hover)',
    sidebarBgActive: 'var(--color-sidebar-background-dark-active)',
    text: 'var(--color-text-dark-default)',
    textHover: 'var(--color-text-dark-hover)',
    textActive: 'var(--color-text-dark-active)',
    logo: 'var(--color-text-logo-dark-default)',
    buttonBg: 'var(--color-button-background-dark-default)',
    buttonBgActive: 'var(--color-button-background-dark-active)',
};

const themes = {
    light: lightTheme,
    dark: darkTheme,
};

const SidebarContainer = styled.div`
  width: ${props => (props.opened ? '240px' : '72px')};
  background: ${props => props.theme.sidebarBg};
  color: ${props => props.theme.text};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  position: relative;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px 16px 20px;
  min-height: 64px;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  color: ${props => props.theme.logo};
  font-size: 1.3rem;
  font-weight: 700;
  opacity: ${props => (props.opened ? 1 : 0)};
  transition: opacity 0.2s;
  white-space: nowrap;
`;

const ToggleButton = styled.button`
  background: ${props => props.theme.buttonBg};
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 8px;
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

const ThemeButton = styled.button`
  background: ${props => props.theme.buttonBg};
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 8px;
  margin-top: 8px;
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

const NavSection = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  cursor: pointer;
  color: ${props => props.active ? props.theme.textActive : props.theme.text};
  background: ${props => props.active ? props.theme.sidebarBgActive : 'transparent'};
  transition: background 0.2s, color 0.2s, opacity 0.2s, max-height 0.3s cubic-bezier(0.4,0,0.2,1);
  opacity: 1;
  max-height: 48px;
  border-radius: 8px;
  &:hover {
    background: ${props => props.theme.sidebarBgHover};
    color: ${props => props.theme.textHover};
  }
  ${props => !props.opened && css`
    justify-content: center;
    span { display: none; }
  `}
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 16px 0;
`;

const Sidebar = ({ color }) => {
    const [isOpened, setIsOpened] = useState(true);
    const [theme, setTheme] = useState(color === 'dark' ? 'dark' : 'light');
    const [activePath, setActivePath] = useState('/');

    const themeObj = useMemo(() => themes[theme], [theme]);

    const goToRoute = (path) => {
        setActivePath(path);
        // navigation logic here
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    const toggleTheme = () => {
        setTheme(t => t === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={themeObj}>
            <SidebarContainer opened={isOpened}>
                <LogoSection>
                    <LogoImg src={logo} alt="Logo" />
                    <LogoText opened={isOpened}>TensorFlow</LogoText>
                    <ToggleButton onClick={toggleSidebar} title="Toggle sidebar">
                        <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
                    </ToggleButton>
                </LogoSection>
                <ThemeButton onClick={toggleTheme} title="Toggle theme">
                    <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} color={theme === 'light' ? '#000' : '#fff'} />
                </ThemeButton>
                <NavSection>
                    {routes.map(route => (
                        <NavItem
                            key={route.title}
                            active={activePath === route.path}
                            onClick={() => goToRoute(route.path)}
                            opened={isOpened}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </NavSection>
                <BottomSection>
                    {bottomRoutes.map(route => (
                        <NavItem
                            key={route.title}
                            active={activePath === route.path}
                            onClick={() => goToRoute(route.path)}
                            opened={isOpened}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </BottomSection>
            </SidebarContainer>
        </ThemeProvider>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
