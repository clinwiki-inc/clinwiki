import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'reducers';
import {signIn} from 'services/user/actions';
import { Col } from 'react-bootstrap';
import StyledFormControl from './StyledFormControl';
import StyledContainer from './StyledContainer';
import { ThemedButton } from '../../components/StyledComponents';
import { Link } from 'react-router-dom';
import StyledError from './StyledError';
import StyledWrapper from './StyledWrapper';
import { GoogleLogin } from 'react-google-login';
import withTheme, { Theme } from 'containers/ThemeProvider/ThemeProvider';
import { ThemedLinkContainer } from '../../components/StyledComponents';

const SignInPage = (props) => {
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [oAuthToken,setOAuthToken] = useState(null);
  const signInErrors = useSelector( (state:RootState) => state.user.signInErrors);
  //console.log('SignInPage.errors',signInErrors)

  const responseGoogle = (response) => {
    //console.log("GOOGLE RES", response)
    setEmail(response.profileObj.email);
    setOAuthToken(response.tokenObj.id_token);
    dispatch(signIn(response.profileObj.email,password, response.tokenObj.id_token));
  };

  return (
    <StyledWrapper>
    <Col md={12}>
      <StyledContainer>
            <form onSubmit={e => {
                e.preventDefault();
                dispatch(signIn(email,password,oAuthToken));
              }}>
              <StyledFormControl
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <StyledFormControl
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />

              <div>
                <ThemedButton
                  type="submit"
                  onClick={() => {
                    dispatch(signIn(email,password,oAuthToken))
                  }}>
                  Sign In
                </ThemedButton>
                <div style={{ display: 'block', marginTop: 10 }}>
                  <GoogleLogin
                    clientId="933663888104-i89sklp2rsnb5g69r7jvvoetrlq52jnj.apps.googleusercontent.com"
                    buttonText="Sign in With Google"
                    //@ts-ignore
                    onSuccess={response =>
                      responseGoogle(response)
                    }
                    //@ts-ignore
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    //isSignedIn={true}
                  />
                </div>
              </div>
              <div style={{ marginTop: 20}}>
                {signInErrors.map( error => <StyledError key={error}>{error}</StyledError>)}
              </div>
              <ThemedLinkContainer>
                <Link to="/sign_up">Sign up</Link>
                <Link to="/reset_password">Reset password</Link>
              </ThemedLinkContainer>
            </form>
      </StyledContainer>
    </Col>
  </StyledWrapper>

  );
}

export default withTheme(SignInPage);