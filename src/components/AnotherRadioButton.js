import React from 'react';


class RadioButton extends React.Component {

  render() {
    const { 
      checked,
      content,
      ...others
    } = this.props;
    
    return (
      <div className="radio">
          
            <input type="radio" value="option1" checked={checked} />
            <label>Option1</label>
          
        </div>
    )
  }
}
export default RadioButton