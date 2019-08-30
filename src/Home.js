import React, { Component } from "react";
import appStyle from "./Home.module.css";
import ResultModal from "./components/resultModal";
import EmptyModal from "./components/emptyModal";
import axios from "axios";

class Home extends Component {
  state = {
      value: "",
      urlRedirect: "",
      isOpenResult: false,
      isOpenEmpty: false,
      tinyURL: null,
      video: "http://giphygifs.s3.amazonaws.com/media/lnCggcJbfrY8E/giphy.mp4"
  };

  valueHandler = e => {
      this.setState({
          value: e.target.value
      });
  };

  closeResultModal = () => {
      this.setState({
          isOpenResult: false
      });
  };

  closeEmptyModal = () => {
      this.setState({
          isOpenEmpty: false
      });
  };

  submitHandler = e => {
      e.preventDefault();
      const newUrl = this.state.value;
      if (newUrl === "") {
          this.setState({
              isOpenEmpty: true
          });
      } else {
          const apiHost = "http://localhost:2000/newurl";
          const url = (this.state.value).split("//")[1];
          console.log(url);
          axios.post(`${apiHost}/?originalurl=${url}`).then(res => {
              this.setState({
                  urlRedirect: res.data.url,
                  tinyURL: res.data.hash,
                  isOpenResult: true
              });
          }).catch(err => {
              console.log(err);
          });
      }
  };

  render () {
      return (
          <div className= { appStyle.App }>
              <video className= { appStyle.background } play autoPlay autoPlay loop >
                  <source src={this.state.video} type="video/mp4"/>
              </video>
              <div >
                  <EmptyModal
                      isRendered={this.state.isOpenEmpty}
                      closed={this.closeEmptyModal}
                  />
                  <ResultModal
                      isRendered={this.state.isOpenResult}
                      closed={this.closeResultModal}
                      newURL={this.state.tinyURL}
                      yourHref={this.state.urlRedirect}
                  />
                  <h1 className = {appStyle.pageHeader }>URL Shredder</h1>
                  <div className= {appStyle.boxPosition}>
                      <form className={appStyle.box} onSubmit={e => this.submitHandler(e)}>
                          <p>{ this.props.location.state ? this.props.location.state.message : "Trim Url Below!" }</p>
                          <div>
                              <input
                                  className={appStyle.inputText}
                                  type="url"
                                  placeholder="Paste URL Here"
                                  value={this.state.value}
                                  onChange={this.valueHandler}
                                  data-cy="input"
                              />
                          </div>
                          <div>
                              <button type="submit" className={appStyle.inputSubmit}>Submit</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      );
  }
};

export default Home;
