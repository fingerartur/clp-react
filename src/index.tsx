// @ts-ignore
import clpp from "@castlabs/prestoplay/cl.core"
// import "@castlabs/prestoplay/cl.broadpeak"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import * as broadpeak from "@broadpeak/smartlib-v3-nopolyfill"

// @ts-ignore
window.SmartLib = broadpeak.SmartLib
// @ts-ignore
window.GenericPlayerApi = broadpeak.GenericPlayerApi

console.log('broadpeak', broadpeak)
// @ts-ignore
console.log('SmartLib', window.SmartLib)
// @ts-ignore
console.log('GenericPlayerApi', window.GenericPlayerApi)


// @ts-ignore
window.clpp = clpp

export const App = () => {
  useEffect(() => {
    const player = new clpp.Player('video', {
      broadpeak: {
        // The manifest IS redirected. The content IS served by Broadpeak servers.
        // broadpeakDomainNames: '*'
  
        // The manifest ISN'T redirected. The content ISN'T served by Broadpeak servers.
        broadpeakDomainNames: '*'
      }
    })

    player.use(clpp.dash.DashComponent)

    
    // Now you can start playback
    player.load('http://example.com/Manifest.mpd')
  },[])

  return (
    <div>
      <video id="video" />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
)
