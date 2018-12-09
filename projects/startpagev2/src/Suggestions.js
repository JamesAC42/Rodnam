import React, { Component } from 'react';

class Suggestions extends Component {
  handleClick(index, e){
    this.props.removeSuggestion(index);
  }
  render(){
    return(
      <div className="suggestions-outer">
        {this.props.items.map((item, index) => {
          let classes = ["suggestion"];
          if(this.props.active === index) classes.push("suggestion-active");
          return(
            <div key={index} className={classes.join(" ")}>
              <a href={"http://" + item}>{item}</a>
              <div className="remove-suggestion" onClick={this.handleClick.bind(this, index)}>X</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Suggestions;