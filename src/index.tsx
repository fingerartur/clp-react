import React, { useRef } from "react"
import ReactDOM from 'react-dom'

import './index.css'
import "@castlabs/prestoplay/clpp.styles.css"

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import "@castlabs/prestoplay/cl.htmlcue"
import "@castlabs/prestoplay/cl.ttml"

const config = {
  license: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmxzIjpbIjovL2ZpbmdlcmFydHVyLmdpdGh1Yi5pbyJdLCJ0eXBlIjoiV2ViIiwia2lkIjozNDc5LCJpbHYiOmZhbHNlfQ.qIbY824dz3iR0C17YsUaQzoaXwO-tXuCB7BZgcXksH5i99yyQCTw26q-xEtwvS9WCdaeX-nsrikgW69IEekoDObRFyZpAApt_EkKbZxkfygC5smElLrk7D_tXaF9rxEsGhFjHg6NMF9ZxUdJ_h1RcsVnCOsuhXd4kI-hy2KzDuzyfcoGUEfva_eGZP13cQP4Gy585uX3MJ9i25tuBVO3XU8oAsCzHPBhoChR_UP9g_3iFOrtpRAFzvJU1v1AXmM_JntyZgsbk-HtQdPKPF4ZpW6GMz1wJMQonFSo4tb52R4fFDRJzfBfCKRRJ9Fw2fMchT5qXmgNh8WJF50ipmbnbw',
}

export const App = () => {
  const playerRef = useRef<any|null>(null)

  const createPlayer = (video: any) => {
    playerRef.current = new clpp.Player(video, config)
    playerRef.current.use(clpp.dash.DashComponent)
    playerRef.current.use(clpp.htmlcue.HtmlCueComponent)
    playerRef.current.use(clpp.ttml.TtmlComponent)
  }

  const play = async () => {
    const cfg = {
      // DE-6429
      source: 'https://castlabs-dl.s3.eu-west-1.amazonaws.com/public/SUPPORT/DE-2161/IFE-HHD10.mpd',
      autoplay: true,
    }

    console.info('Playing with config: ', cfg)

    await playerRef.current.load(cfg)

    const trackManager = playerRef.current.getTrackManager()
    const textTracks = await trackManager.getTextTracks()
    console.log('AAA textTracks: ', textTracks)

    const germanTrack = textTracks.find((track: any) => track.language === 'de')
    trackManager.setTextTrack(germanTrack)
    console.log('AAA setting german track: ', germanTrack)
  }

  return (
    <>
      <video
        ref={createPlayer}
        autoPlay
        style={{
          width: 600,
          height: 400,
          border: '10px solid yellow'
        }}
      />
      <div className={"options"}>
        <label>
          <button onClick={play}>Play</button>
        </label>
      </div>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
)
