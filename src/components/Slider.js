import React from 'react';

import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
 
class PhotonSlider extends React.Component {
  render () {
  return <div>
    <Slider />
    <Range />
  </div>;
  }
}
  
export default PhotonSlider