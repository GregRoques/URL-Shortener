import React, { Component } from "react";
import appStyle from "./Home.module.css";
import ResultModal from "./components/modal";
import swal from "sweetalert";
import axios from "axios";

class Home extends Component {
  state = {
      value: "",
      urlRedirect: "",
      openModal: false,
      tinyURL: null
  };

  valueHandler = e => {
      this.setState({
          value: e.target.value
      });
  };

  closeModal = () => {
      this.setState({
          openModal: false
      });
  };

  submitHandler = e => {
      e.preventDefault();
      const newUrl = this.state.value;
      if (newUrl === "") {
          swal({
              text: "You didn't input a url for me to claw in half.",
              icon: "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crying-cat-face.png",
              button: "I'm on it!"
          });
      } else {
          const apiHost = "http://localhost:2000/newurl";
          const url = (this.state.value).split("http://" || "https://")[1];
          axios.post(`${apiHost}/?originalurl=${url}`).then(res => {
              this.setState({
                  urlRedirect: res.data.url,
                  tinyURL: res.data.hash,
                  openModal: true
              });
          }).catch(err => {
              console.log(err);
          });
      }
  };

  render () {
      return (
          <div className={appStyle.App}>
              <ResultModal
                  show={this.state.openModal}
                  closed={this.closeModal}
                  newURL={this.state.tinyURL}
                  yourHref={this.state.urlRedirect}
              />
              <h1>Greg's URL Shortener</h1>
              <div className={appStyle.positioning}>
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
      );
  }
};

export default Home;
