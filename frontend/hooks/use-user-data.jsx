"use client"
const url = "http://fitlingo.duckdns.org:5000"
let user = "tomcat"

import { useState, useEffect } from "react"

// Global variable to store user data
let user_data = null

/**
 * Custom hook to fetch and manage user data from the API
 * Fetches data from http://fitlingo.duckdns.org:5000/getuser?username=username
 */
export function useUserData(username) {
  console.log("userUserData")
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Define fetchUserData function inside useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch user data from API'
        console.log(user)
        console.log(`${url}/getuser?username=${user}`)
        const response = await fetch(`${url}/getuser?username=${user}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        else{
        console.log(response)
        }

        const data = await response.json()

        // Store in global variable
        user_data = data
        setUserData(data)

        console.log("User data fetched successfully:", data)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }

    // Call the function immediately
    fetchUserData()
  }, [username])

  // Create a refetch function that can be called externally
  const refetch = async () => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://fitlingo.duckdns.org:5000/getuser?username=${username}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        user_data = data
        setUserData(data)

        console.log("User data refetched successfully:", data)
      } catch (err) {
        console.error("Error refetching user data:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    await fetchUserData()
  }

  return { userData, loading, error, refetch }
}

// Export function to get global user data
export const getUserData = () => user_data

// Export function to update global user data
export const setGlobalUserData = (data) => {
  user_data = data
}
