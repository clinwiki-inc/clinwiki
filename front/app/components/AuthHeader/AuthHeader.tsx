import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthButton from 'components/AuthButton';
import withTheme from 'containers/ThemeProvider';

interface AuthHeaderProps {
  user: {
    email: string;
    roles: string[];
  } | null;
  history: History;
}

const StyledWrapper = styled.div`
  nav.navbar {
    background: ${props => props.theme.authHeader.headerBackground};
    margin-bottom: 0px;
    border: 0px;
    border-radius: 0px;
  }

  nav.navbar a.logo, nav.navbar a {
    color: ${props => props.theme.authHeader.font};
  }
  a:hover {
    color: ${props => props.theme.authHeader.hoverFont} !important;
  }

  nav.navbar .dropdown-menu a {
    color: #333;
  }

  a#logo {
    background: url(/clinwiki-501.png) center left no-repeat;
    background-size: 100px 30px;
    margin-left: 30px;
    padding-left: 30px;
    color: ${props => props.theme.authHeader.logoFont};
    min-width: 110px;
  }
  span#small {
    font-size: 14px;
    opacity: 0.75;
  }
`;

const ThemedStyledWrapper = withTheme(StyledWrapper);

export class AuthHeader extends React.PureComponent<AuthHeaderProps> {
  render() {
    return (
      <ThemedStyledWrapper>
        <Navbar
          collapseOnSelect
          fluid
          className="navbar-fixed-top"
          style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link id="logo" to="/search?sv=default">
                <span></span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                target="_blank"
                eventKey={2}
                href="https://home.clinwiki.org/make-a-donation/">
                Donate
              </NavItem>
              <NavItem eventKey={1} href="https://home.clinwiki.org/">
                About ClinWiki
              </NavItem>
              <AuthButton user={this.props.user} history={this.props.history} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </ThemedStyledWrapper>
    );
  }
}

export default AuthHeader;
