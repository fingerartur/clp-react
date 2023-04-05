// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.youbora"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
// @ts-ignore
import * as youbora from 'youboralib'
// @ts-ignore
window.youbora = youbora



export const App = () => {
  useEffect(() => {
    const player = new clpp.Player('video', {
      // license: '...',
      youbora: {
        accountCode: '<YOUR ACCOUNT CODE>'
        // ... other NPAW options
      }
    })

    player.use(clpp.dash.DashComponent)

    const sessionsPlugin = new youbora.Plugin({
      accountCode: '<YOUR ACCOUNT CODE>'
      // ... other NPAW options
    })
    
    player.getPlugin(clpp.npaw.YouboraPlugin.Id)
      .setYouboraPlugin(sessionsPlugin)
    
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
