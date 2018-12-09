import React, { Component } from 'react';
import Links from './Links';
import Suggestions from './Suggestions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: "",
      searchHistory: [],
      suggestions: [],
      active:-1
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.removeSuggestion = this.removeSuggestion.bind(this);
  }
  componentDidMount(){
    if(localStorage.searchHistory){
      this.setState({searchHistory: JSON.parse(localStorage.searchHistory)});
    }
  }
  removeSuggestion(index){
    let suggestions = this.state.suggestions;
    let item = suggestions[index];
    suggestions.splice(index, 1);
    let sh = this.state.searchHistory;
    let searchItem = this.state.searchHistory.indexOf(item);
    sh.splice(searchItem, 1);
    localStorage.searchHistory = JSON.stringify(sh);
    this.setState({
      suggestions,
      searchHistory:sh
    })
  }
  onKeyDown(e){
    if(e.which === 9){
      e.preventDefault();
      if(this.state.active >= 0){
        let a = this.state.active;
        let length = this.state.suggestions.length;
        if(a === length - 1) a = -1;
        a++;
        this.setState({active: a});
      }
    } else if(e.which === 13){
      let url = "";
      if(this.state.active >=0) {
        let suggestions = this.state.suggestions;
        url = "http://" + suggestions[this.state.active];
      } else {
        let search = this.state.inputVal;
        if(search === "") return;
        if(search.indexOf(".") !== -1){
          let sh = this.state.searchHistory;
          if(sh.indexOf(search) == -1){
            sh.push(search);
            this.setState({searchHistory: sh});
            localStorage.searchHistory = JSON.stringify(sh);
          }
          url = "http://" + search;
        }else{
          let params = search.split(" ").join("+");
          url = "https://www.google.com/search?q=" + params;
        }
      }
      window.location.href = url;
    }
  }
  onKeyUp(e){
    if(e.which === 9) return;
    let val = e.target.value;
    let sh = this.state.searchHistory;
    let suggestions = [];
    for(let item in sh){
      if(sh[item].startsWith(val)){
        suggestions.push(sh[item]);
      }
    }
    if(val === "") suggestions = [];
    let active = suggestions.length === 0 ? -1 : 0;
    this.setState({
      inputVal: val,
      suggestions,
      active
    });
  }
  render() {
    return (
      <div className="App">
        <div className="background-image-container">
        </div>
        <div className="searchbar-container">
            <input 
              id="searchbar" 
              type="text" 
              placeholder="Search Google..."
              onKeyUp={this.onKeyUp}
              onKeyDown={this.onKeyDown}
              autoFocus/>
        </div>
        <div className="suggestions-container">
          <Suggestions 
            items={this.state.suggestions}
            active={this.state.active}
            removeSuggestion={this.removeSuggestion}/>
          <Links />
        </div>
      </div>
    );
  }
}

export default App;
