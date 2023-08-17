import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  gap: 130px;
  margin: 0px auto;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(66, 68, 90, 0.35);
  justify-content: center;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    margin-left: 10px;
    margin-right: 10px;
    gap: 10px;
  }
`;

export const NavItem = styled(NavLink)`
  display: block;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: black;

  &.active {
    color: orange;
    font-size: 21px;
  }
  :hover:not(.active),
  :focus:not(.active) {
    color: black;
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 18px;
  }
`;
