import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
const SvgComponent = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.34 67.22" {...props}>
    <G fill='#2e2d2c'>
      <Path
        d="M31.37,20.6a6.72,6.72,0,0,1-6.7-6.7,6.61,6.61,0,0,1,1.06-3.6,6.69,6.69,0,1,1,5.64,10.3M44.78,10.3A13.88,13.88,0,0,0,18,10.3H0v7.2H18a13.88,13.88,0,0,0,26.82,0H99.34V10.3Z"
      />
      <Path
        d="M68,60a6.7,6.7,0,1,1,5.64-10.3,6.64,6.64,0,0,1,0,7.2A6.69,6.69,0,0,1,68,60m0-20.6a13.9,13.9,0,0,0-13.41,10.3H0v7.2H54.56a13.89,13.89,0,0,0,26.83,0h18v-7.2h-18A13.9,13.9,0,0,0,68,39.42"
      />
    </G>
  </Svg>
);
export default SvgComponent;
