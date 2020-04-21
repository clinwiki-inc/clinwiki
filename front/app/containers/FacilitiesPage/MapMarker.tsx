import * as React from 'react';
import styled from 'styled-components';
import FacilityInfoCard from './FacilityInfoCard';
import withTheme from 'containers/ThemeProvider';

const K_CIRCLE_SIZE = 30;
const K_STICK_SIZE = 10;
const K_STICK_WIDTH = 3;

const MarkerContainer = styled.div`
  position: absolute;
  width: ${K_CIRCLE_SIZE}px;
  height: calc(${K_CIRCLE_SIZE}px + ${K_STICK_SIZE}px);
  left: calc((${K_CIRCLE_SIZE}px / 2) * -1);
  top: calc((${K_CIRCLE_SIZE}px + ${K_STICK_SIZE}px) * -1);
`;

const MarkerCircle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${K_CIRCLE_SIZE}px;
  height: ${K_CIRCLE_SIZE}px;
  border: 3px solid ${props => props.theme.mapSection.markerBorderColor};
  border-radius: ${K_CIRCLE_SIZE}px;
  background-color: white;
  text-align: center;
  color: ${props => props.theme.mapSection.markerFontColor};
  font-size: 21px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0 0 1px white;
`;

const ThemedMarkerCircle = withTheme(MarkerCircle);

const WarningCircle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${K_CIRCLE_SIZE}px;
  height: ${K_CIRCLE_SIZE}px;
  border: 3px solid #ffcc00;
  border-radius: ${K_CIRCLE_SIZE}px;
  background-color: white;
  text-align: center;
  color: #f6a202;
  font-size: 21px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0 0 1px white;
`;

const HoverCircle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${K_CIRCLE_SIZE}px;
  height: ${K_CIRCLE_SIZE}px;
  border: 3px solid ${props => props.theme.mapSection.markerFontColor};
  border-radius: ${K_CIRCLE_SIZE}px;
  background-color: white;
  text-align: center;
  color: ${props => props.theme.mapSection.markerBorderColor};
  font-size: 21px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0 0 1px white;
`;

const ThemedHoverCircle = withTheme(HoverCircle);

const WarningHoverCircle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${K_CIRCLE_SIZE}px;
  height: ${K_CIRCLE_SIZE}px;
  border: 3px solid #f6a202;
  border-radius: ${K_CIRCLE_SIZE}px;
  background-color: white;
  text-align: center;
  color: #ffcc00;
  font-size: 21px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0 0 1px white;
`;

const MarkerStick = styled.div`
  position: absolute;
  left: calc(${K_CIRCLE_SIZE}px / 2 - ${K_STICK_WIDTH}px / 2);
  top: ${K_CIRCLE_SIZE}px;
  width: ${K_STICK_WIDTH}px;
  height: ${K_STICK_SIZE}px;
  background-color: ${props => props.theme.mapSection.markerBorderColor};
`;

const ThemedMarkerStick = withTheme(MarkerStick);

const HoverStick = styled.div`
  position: absolute;
  left: calc(${K_CIRCLE_SIZE}px / 2 - ${K_STICK_WIDTH}px / 2);
  top: ${K_CIRCLE_SIZE}px;
  width: ${K_STICK_WIDTH}px;
  height: ${K_STICK_SIZE}px;
  background-color: ${props => props.theme.mapSection.markerFontColor};
`;

const ThemedHoverStick = withTheme(HoverStick);

const WarningStick = styled.div`
  position: absolute;
  left: calc(${K_CIRCLE_SIZE}px / 2 - ${K_STICK_WIDTH}px / 2);
  top: ${K_CIRCLE_SIZE}px;
  width: ${K_STICK_WIDTH}px;
  height: ${K_STICK_SIZE}px;
  background-color: #ffcc00;
`;

const WarningHoverStick = styled.div`
  position: absolute;
  left: calc(${K_CIRCLE_SIZE}px / 2 - ${K_STICK_WIDTH}px / 2);
  top: ${K_CIRCLE_SIZE}px;
  width: ${K_STICK_WIDTH}px;
  height: ${K_STICK_SIZE}px;
  background-color: #f6a202;
`;

class MapMarker extends React.PureComponent<any> {
  state = {
    clicked: false,
  };

  markerClicked = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    if (this.props.geoStatus === 'good') {
      return (
        <MarkerContainer onClick={() => this.markerClicked()}>
          {this.props.$hover || this.state.clicked ? (
            <div>
              <ThemedHoverCircle onClick={this.props.onClick}>
                {this.props.text}
              </ThemedHoverCircle>
              <ThemedHoverStick />
            </div>
          ) : (
            <div>
              <ThemedMarkerCircle onClick={this.props.onClick}>
                {this.props.text}
              </ThemedMarkerCircle>
              <ThemedMarkerStick />
            </div>
          )}
          {this.state.clicked ? (
            <FacilityInfoCard
              hover={true}
              address={this.props.address}
              name={this.props.name}
              contacts={this.props.contacts}
              clicked={this.state.clicked}
            />
          ) : (
            <FacilityInfoCard
              hover={this.props.$hover}
              address={this.props.address}
              name={this.props.name}
              contacts={this.props.contacts}
              clicked={this.state.clicked}
            />
          )}
        </MarkerContainer>
      );
    }
    if (this.props.geoStatus === 'zip') {
      return (
        <MarkerContainer onClick={() => this.markerClicked()}>
          {this.props.$hover || this.state.clicked ? (
            <div>
              <WarningHoverCircle onClick={this.props.onClick}>
                {this.props.text}
              </WarningHoverCircle>
              <WarningHoverStick />
            </div>
          ) : (
            <div>
              <WarningCircle onClick={this.props.onClick}>
                {this.props.text}
              </WarningCircle>
              <WarningStick />
            </div>
          )}
          {this.state.clicked ? (
            <FacilityInfoCard
              hover={true}
              address={this.props.address}
              name={this.props.name}
              contacts={this.props.contacts}
              clicked={this.state.clicked}
            />
          ) : (
            <FacilityInfoCard
              hover={this.props.$hover}
              address={this.props.address}
              name={this.props.name}
              contacts={this.props.contacts}
              clicked={this.state.clicked}
            />
          )}
        </MarkerContainer>
      );
    }
  }
}

export default MapMarker;
