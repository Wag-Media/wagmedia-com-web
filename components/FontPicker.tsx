"use client"

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fonts = [
  "Roboto", "Open Sans", "Lato", "Montserrat", "Raleway", "Poppins", "Oswald", "Merriweather", "Playfair Display", "Nunito",
  "Quicksand", "Rubik", "Work Sans", "PT Sans", "Fira Sans", "Noto Sans", "Titillium Web", "Mukta", "Karla", "Josefin Sans",
  "Cabin", "Arimo", "Noto Serif", "Libre Franklin", "Source Sans Pro", "Nunito Sans", "Barlow", "IBM Plex Sans", "Mulish", "Inter"
]

export function FontPicker() {
  const [selectedFont, setSelectedFont] = useState("Roboto")

  useEffect(() => {
    document.documentElement.style.setProperty('--header-font', selectedFont)
  }, [selectedFont])

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-8">
      <h2 className="text-2xl mb-4 font-bold">Font Picker (Demo)</h2>
      <Select onValueChange={setSelectedFont} defaultValue={selectedFont}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4">
        <h1 className="text-4xl mb-2">This is a sample h1 heading</h1>
        <h2 className="text-3xl mb-2">This is a sample h2 heading</h2>
        <h3 className="text-2xl mb-2">This is a sample h3 heading</h3>
      </div>
    </div>
  )
}

