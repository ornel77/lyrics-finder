#  LYRICS SEARCH APP 
#### Using React and Context Api

1. Creating the app 🔉

```bash
    npx create-react-app .
```
NPX allows us to use create-react-app without having to install it globally

* We are using bootstrap :
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```
* And Font awesome
* Cleaning the files
* Creating component file

2. Installing Router

```bash
    npm i react-router-dom
```

> Importing router on App.js :
```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

```
___

* Tracks Component Created
3. State

> Since we want a global state we need to use **Context API**

* Create a provider to put all our state
```javascript
import React, { Component } from 'react'

const Context = React.createContext()

export class Provider extends Component {
    state = {
        track_list: [
            {track: {track_name: 'abc'}},
            {track: {track_name: '123'}}
        ],
        heading: "Top 10 Tracks"
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer

```
> ⚠️ We have to wrap the provider in App.js otherwise it's not working

For the component that want the state we neeed to wrap them in a **consumer** tag

4. Fetch our content via the music API

 * To load the API content we put the fetch in *componentDidMount* 
 * Install axios to fetch:
 ```bash
 npm i axios
 ```

 * The API KEY need to be save in a file .env
 > ⚠️ the name variable need to start with **REACT_APP**

 > ❗️Might need to reset the server when creating the .env

 When we have this message : 
 > Access to XMLHttpRequest at 'https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=2b37a4928b9259d3d13eab139f4d2f3b' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

 Go to the this address:
 [Cors Anywhere](https://cors-anywhere.herokuapp.com)

 * Set our state to the data from the API

 ```javascript
    axios.get(`...`)
        .then(res => {
            this.setState({ track_list: res.data.message.body.track_list })
        })
        .catch(err => console.log(err))
 ```

 ___