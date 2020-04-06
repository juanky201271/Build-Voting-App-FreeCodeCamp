import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { NavBar } from '../components'
import { PollsList, PollsInsert, PollsUpdate, MyPollsList, PollsDetails } from '../pages'
import api from '../api'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      twitterId: '',
      ip: '',
      user: '',
      isLoading: false,
    }
  }
  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    })
    await fetch("https://bva-jccc-fcc.herokuapp.com/api/auth/login/success", { // express
      method: "GET",
      credentials: "include",
      headers: {
        Accept:
        "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json()
        throw new Error("failed to authenticate user")
      })
      .then(responseJson => {

        if (responseJson.success === true) {
          this.setState({
            authenticated: true,
            twitterId: responseJson.user.twitterId,
            user: responseJson.user,
          })
        } else {
          this.setState({
            authenticated: false,
            twitterId: '',
            user: '',
          })
        }
      })
      .catch(error => {
        console.log(error)
      })

      this.addUserIp()

      this.setState({
        isLoading: false,
      })
  }
  addUserIp = async () => {
    var ip = ''
    await fetch("ip4only.me/api")
    .then(response => {
      if (response.status === 200) return response.text()
      throw new Error("failed to find client ip")
    })
    .then(responseText => {
      ip = responseText.spli(',')[1] || ''
    })
    .catch(error => {
      console.log(error)
    })
    console.log('ip', ip)
    if (ip) {
      this.setState({
        ip: ip,
      })
      const currentUser = await api.getUserByIp(ip).catch(err => console.log(err))
      if (!currentUser) {
        //console.log('New User')
        const payload = {
          ip: ip,
          votes: [],
        }
        const newUser = await api.insertUser(payload).catch(err => console.log(err))
        if (newUser) {
          //console.log('New User created')
        } else {
          //console.log("New User don't created")
        }
      } else {
        //console.log('User exists')
      }
    } else {
      //console.log('IP empty')
    }
  }
  render() {
    console.log('app', this.state)
    const { authenticated, twitterId, ip, user, isLoading, } = this.state
    return (
      <Router>

      {!isLoading ?
         authenticated ?
         (
           <>
            <NavBar
              authenticated={authenticated}
              twitterId={twitterId}
              ip={ip}
              user={user}
            />
            <Switch>
              <Route path="/polls" exact component={PollsList} />
              <Route path="/poll/insert" exact component={PollsInsert} />
              <Route path="/poll/update/:_id" exact component={PollsUpdate} />
              <Route path="/poll/details/:_id" exact component={PollsDetails} />
              <Route path="/mypolls" exact component={MyPollsList} />
              <Route exact path="/" render={() => (<Redirect to="/polls" />)} />
              <Route path="*" component={PollsList} />
            </Switch>
          </>
         )
         :
         (
           <>
            <NavBar
              authenticated={authenticated}
              twitterId={twitterId}
              ip={ip}
              user={user}
            />
            <Switch>
              <Route path="/polls" exact component={PollsList} />
              <Route path="/poll/details/:_id" exact component={PollsDetails} />
              <Route exact path="/" render={() => (<Redirect to="/polls" />)} />
              <Route path="*" component={PollsList} />
            </Switch>
          </>
         )
         :
         (
           <div></div>
         )
      }

      </Router>
    )
  }
}

export default App
