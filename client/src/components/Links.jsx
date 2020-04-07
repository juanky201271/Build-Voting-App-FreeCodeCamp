import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({ className: "collapse navbar-collapse" })``
const List = styled.div.attrs({ className: "navbar-nav mr-auto" })``
const Item = styled.div.attrs({ className: "collapse navbar-collapse" })``
const Log = styled.div.attrs({ className: "navbar-brand" })`
  cursor: pointer;
`

class Links extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated || '',
      twitterId: this.props.twitterId || '',
      ip: this.props.ip || '',
      user: this.props.user || '',
      //isLoading: false,
    }
  }
  _handleLogoutClick = () => {
    //window.open("https://bva-jccc-fcc.herokuapp.com/api/auth/logout", "_self") // express
    await fetch("/api/auth/logout", {
      method: "GET",
    })
      .catch(error => {
        console.log(error)
      })
    this.props.handleNotAuthenticated()
    this.setState({ authenticated: false, twitterId: '', user: '', })
  }
  _handleLoginClick = async () => {
    //window.open("https://bva-jccc-fcc.herokuapp.com/api/auth/twitter", "_self")
    await fetch("/api/auth/twitter", {
      method: "GET",
    })
      .catch(error => {
        console.log(error)
      })

  }
  render() {
    console.log('links', this.state)
    const { authenticated, twitterId, ip, user, } = this.state
    return (
      <React.Fragment>
        <Link to={{ pathname: "/polls",
                    state: {
                      authenticated: authenticated,
                      twitterId: twitterId,
                      ip: ip,
                      user: user,
                    }
                  }}
          className="navbar-brand"
        >
          Build a voting App
        </Link>
        <Collapse>
          <List>

            <Item>
              <Link to={{ pathname: "/polls",
                          state: {
                            authenticated: authenticated,
                            twitterId: twitterId,
                            ip: ip,
                            user: user,
                          }
                        }}
                className="nav-link"
              >
                Polls
              </Link>
            </Item>

            <Item>
              {
                authenticated ? (
                  <Link to={{ pathname: "/mypolls",
                              state: {
                                authenticated: authenticated,
                                twitterId: twitterId,
                                ip: ip,
                                user: user,
                              }
                            }}
                    className="nav-link"
                  >
                    My Polls
                  </Link>
                ) : (
                  <div></div>
                )
              }
            </Item>

            <Item>
            {
              authenticated ? (
                <Link to={{ pathname: "/poll/insert",
                            state: {
                              authenticated: authenticated,
                              twitterId: twitterId,
                              ip: ip,
                              user: user,
                            }
                          }}
                  className="nav-link"
                >
                  Create Poll
                </Link>
              ) : (
                <div></div>
              )
            }
            </Item>

          </List>
          {
            authenticated ? (
              <Log onClick={this._handleLogoutClick}>
                Logout Twitter
              </Log>
            ) : (
              <Log onClick={this._handleLoginClick}>
                Login Twitter
              </Log>
            )
          }
        </Collapse>
      </React.Fragment>
    )
  }
}

export default Links
