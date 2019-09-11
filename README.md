# Tiny URL Creator

## Contents
    * Description
    * Features
    * Technologies
    * Packages
    * Functionality
    * Testing

## Description
A custom a URL shortener web application in the same vein as bitly, TinyURL, etc.

## Features
* When navigating to the root path of the app in a browser, a user should be presented with a form that allows them to paste in a (presumably long) URL.
* When a user submits the form they should be presented with a simplified URL of the form http://localhost:3000/{12 character hash param}.
* When a user navigates to a shortened URL that they have been provided by the app they should be redirected to the original URL that yielded that short URL.

## Technologies
* HTML/CSS/JavaScript
* React
* Express/Node.Js
* MySQL
* Cypress.js

## Packages
### Front End
* npx i create-react-app
* npm i axios
* npm i react-router-dom

### Back End
* npx i express
* npm i body-parser
* npm i mysql2
* npm i helmet
* npm i cors
* npm i randomstring

### Testing
* npm i cypress --save-dev

## Functionality

### URL Redirection

When a user directs to a previously saved URL, the Front End Router send the '/:hash' param to a 'Redirector' route, which sends a GET request to the server in ComponentDidMount checking to see if the hash param is in the database. If so, it pushes the original url to the browser...otherwise, it redirects the user to the 'URL Shortener' homepage, where it sends a message letting them know their shortened url was invalid.

```
state = {
        isRendered: false
    }

    getHash = () => {
        const apiHost = "http://localhost:2000";
        const hash = this.props.match.params.hash;
        axios.get(`${apiHost}/${hash}`).then(res => {
            window.location.replace(`http://${res.data}`);
        });
        setTimeout(() => {
            this.setState({
                isRendered: true
            });
        }, 2000);
    }

    componentDidMount () {
        this.getHash();
    }

    render () {
        if (this.state.isRendered) {
            return <Redirect to ={{
                pathname: "/",
                state: { message: `Whoops...not a valid redirect. ${"\n"} Create a shortened url below.` }
            }} />;
        } else {
            return (<div></div>);
        }
    };
};
```

### Checking for Previous hashes

When a user goes to create a shortened url, the server (./backend/routes/routing) first checks to see if a unique hash has already been created for that link. If so, it returns the already saved hash and original url for redirection; otherwise, it goes on to the next POST function to create and return a shortened url.

```
router.post("/newurl", (req, res, next) => {
    const originalUrl = req.query.originalurl;
    const urlSearch = `SELECT hash, url FROM urls WHERE url='${originalUrl}'`;
    db.execute(urlSearch).then(results => {
        if (!results[0][0]) {
            next();
        } else {
            res.json(results[0][0]);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});
```



## Testing
### Cypress.JS 
* Front-End testing confirms the Features listed above were satisfied. Test criteria includes:
    1) Upon page load, the initial input header "Trim URL Below" is present.
    2) If a user clicks submit without entering data, the input header returns an error statement instructing the user to input a valid URL.
    3) If a user inputs https://www.cnn.com and clicks submit:
        a) the response modal will become visible; 
        b) a trimmed URL pathname is appended to the local host; 
        C) the trimmed URL's href matches that of the submitted URL (in this case, https://www.cnn.com).

## Video Demo
![YouTube](/ReadMe/1.png)(https://www.youtube.com/watch?v=Vc_ZWM41dnM)
