import React from 'react';

import Slider  from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
const style = {float: 'left', width: 200, height: 400, marginBottom: 160, marginLeft: 50};
const parentStyle = {overflow: 'hidden'};
class PhotonSlider extends React.Component {
  render () {
  return <div style={style}>
    <Slider vertical dots step={20} defaultValue={100}/>
    
  </div>;
  }
}
  
export default PhotonSlider