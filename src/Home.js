import React, { Component } from "react";
import appStyle from "./Home.module.css";
import ResultModal from "./components/modal";
import axios from "axios";
import baseUrl from "./FirebaseUrl";

var randomstring = require("randomstring");

class Home extends Component {
  state = {
      currentUrls: {},
      value: "",
      openModal: false,
      tinyURL: null
  };

  componentDidMount = async () => {
      await this.getURLs();
  }

  getURLs = async () => {
      const res = await axios.get(`${baseUrl}.json`);
      const { data } = res;
      Object.keys(data).map(each => {
          this.setState(prevState => {
              currentURL: prevState.currentUrls[data[each].hash] = data[each].originalUrl;
          });
      });
  }

  addToDatabase = (trim, full) => {
      const myPost = {
          hash: trim,
          originalUrl: full
      };
      axios.post(`${baseUrl}.json`, myPost).then(async res => {
          await this.getURLs();
          this.setState({
              openModal: true,
              tinyURL: `localhost:3000/${trim}`
          });
      }).catch(err => {
          console.log(err);
      });
  }

  valueHandler = e => {
      this.setState({
          value: e.target.value
      });
  }

  createHash = () => {
      const newHash = randomstring.generate({
          length: 12,
          charset: "alphabetic"
      });
      if (Object.keys(this.state.currentUrls).includes(newHash)) {
          this.createHash();
      } else {
          return newHash;
      }
  }

  submitHandler = e => {
      e.preventDefault();
      const currentUrls = this.state.currentUrls;
      const newUrl = this.state.value;
      if (newUrl === "") {
          window.confirm("Meoooowww");
      } else {
          if (Object.values(currentUrls).includes(newUrl)) {
              const link = Object.keys(currentUrls).find(url => currentUrls[url] === newUrl);
              this.setState({
                  openModal: true,
                  tinyURL: `localhost:3000/${link}`
              });
          } else {
              const hash = this.createHash();
              this.addToDatabase(hash, newUrl);
          }
      }
  }

  closeModal = () => {
      this.setState({
          openModal: false
      });
  }

  render () {
      return (
          <div className={appStyle.App}>
              <ResultModal
                  show={this.state.openModal}
                  closed={this.closeModal}
                  newURL={this.state.tinyURL}
                  yourHref={this.state.value}
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
