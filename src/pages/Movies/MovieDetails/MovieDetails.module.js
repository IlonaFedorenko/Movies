import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavItem = styled(NavLink)`
  display: block;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
  color: black;

  &.active {
    color: orange;
    font-size: 24px;
  }
  :hover:not(.active),
  :focus:not(.active) {
    color: black;
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 18px;
  }
`;
