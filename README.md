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

 5. Spinner component

 We need to do a conditional to set the spinner when the array of track is empty

 ```javascript
 <Consumer>
    {value => {
        const { track_list } = value
        if (track_list === undefined || track_list.length ===0) {
            return <Spinner/>
        } else {
            return <h1>Tracks loaded</h1>
        }
            
    }}
</Consumer>
```

6. Track Component

Loop through the track_list to set all the data in Track and importing it in Tracks

> ⚠️ When using Router it's best to use Link instead of the a tag
___

7. Lyrics component

We have to make to request to have the lyrics

As we don't need the lyrics in other component we don't fetch our data via context API

```javascript
${this.props.match.params.id}
```
To get the id from the URL.

* Time formatting

We need to install a package called **Moment** to format a date:

```bash
    npm i moment react-moment
```

```javascript
    <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
```


7. Search component

We need to connect Search to the context by using **Consumer**

When we type in the input we got nothing because we have to attach an onchange event on this

> :arrow_right: if we have several input in our state, instead of making an onChange function for all of them we just put **[e.target.name]** in the this.setState. 
That's why we put the same value to the state and the name in the input

* To change the top 10 tracks by our search we need to use a reducer

To have a reducer where we can call the dispatch from whenever : 
```javascript
    dispatch: action => this.setState(state => reducer(state,action))
```

* We want to run the dispatch when we submit the form, make the request, get a response and **dispatch** that back to the reducer