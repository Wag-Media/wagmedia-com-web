"use client"

import React, { useEffect } from "react"

const SubstackWidget = ({ className }: { className?: string }) => {
  useEffect(() => {
    // Define the CustomSubstackWidget on the window object
    //@ts-ignore
    window.CustomSubstackWidget = {
      substackUrl: "wagmediaweekly.substack.com",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      theme: "custom",
      colors: {
        primary: "#E4FF07",
        input: "#fff",
        email: "#000",
        text: "#000",
      },
    }

    // Create a new script element
    const script = document.createElement("script")

    // Set the source of the script to the Substack widget script
    script.src = "https://substackapi.com/widget.js"
    script.async = true

    // Append the script to the body
    document.body.appendChild(script)

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div id="custom-substack-embed" className={className}></div>
}

export default SubstackWidget
