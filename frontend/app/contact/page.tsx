import React from 'react'
import { ContactHero } from './_component/hero'
import ContactContent from './_component/contactContent'
import { ContactMap } from './_component/map'

function Contact() {
  return (
    <div>
        <ContactHero/>
        <ContactContent/>
        <ContactMap/>
    </div>
  )
}

export default Contact