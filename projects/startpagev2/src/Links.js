import React, { Component } from 'react';

class Links extends Component {
  render(){
    return(
      <div className="links-container">
        <a className="link-outer" href="https://youtube.com">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="icons/youtube.png" alt=""/>
                </div>
            </div>
            <div className="link-label">Youtube</div>
        </a>
        <a className="link-outer" href="https://4chan.org">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/4chan.png" alt=""/>
                </div>
            </div>
            <div className="link-label">4chan</div>
        </a>
        <a className="link-outer" href="https://webassign.net/login">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/molecule.png" alt=""/>
                </div>
            </div>
            <div className="link-label">WebAssign</div>
        </a>
        <a className="link-outer" href="https://github.com">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/octocat.png" alt=""/>
                </div>
            </div>
            <div className="link-label">Github</div>
        </a>
        <a className="link-outer" href="https://play.google.com/music/listen#/home">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/music.png" alt=""/>
                </div>
            </div>
            <div className="link-label">Music</div>
        </a>
        <a className="link-outer" href="https://lschs.org/students">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/book.png" alt=""/>
                </div>
            </div>
            <div className="link-label">School</div>
        </a>
        <a className="link-outer" href="https://jisho.org">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/hiragana.png" alt=""/>
                </div>
            </div>
            <div className="link-label">Jisho</div>
        </a>
        <a className="link-outer" href="https://hatsumei.tech">
            <div className="link-icon">
                <div className="link-icon-inner">
                    <img src="./icons/crosshair.png" alt=""/>
                </div>
            </div>
            <div className="link-label">Hatsumei</div>
        </a> 
      </div>
    )
  }
}

export default Links;