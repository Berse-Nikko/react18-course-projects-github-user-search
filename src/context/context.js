import React, { useState, useEffect } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [githubRepos, setGithubRepos] = useState(mockRepos)
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: "" })

  const searchGithubUser = async (user) => {
    checkError()
    setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    )
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results
          const status = "fulfilled"
          if (repos.status === status) {
            setGithubRepos(repos.value.data)
          }
          if (followers.status === status) {
            setGithubFollowers(followers.value.data)
          }
        })
        .catch((error) => console.log(error))
      /* Repos */
      /*       axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setGithubRepos(response.data)
      )
      //Followers 
      axios(`${followers_url}?per_page=100`).then((response) =>
        setGithubFollowers(response.data)
      ) */
    } else {
      checkError(true, "Username not found")
    }
    checkRequests()
    setLoading(false)
  }

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          checkError(true, "you have exceeded your hourly rate limit")
        }
      })
      .catch((error) => console.log(error))
  }

  const checkError = (show = false, msg = "") => {
    setError({ show, msg })
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        requests,
        error,
        loading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
