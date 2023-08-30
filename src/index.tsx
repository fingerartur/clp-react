import React, { useRef } from "react"
import ReactDOM from 'react-dom'

import './index.css'
import "@castlabs/prestoplay/clpp.styles.css"
// @ts-ignore
import * as muxjs from "mux.js"

// import "@castlabs/prestoplay/ima3-clpp"

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import "@castlabs/prestoplay/cl.hls"
import "@castlabs/prestoplay/cl.vtt"


// @ts-ignore
window.muxjs = muxjs


const Player = () => {
  const playerRef = useRef<any|null>(null)
  const canvasRef = useRef<any|null>(null)

  const createPlayer = (video: any) => {
    // Instantiate PRESTOplay player
    playerRef.current = new clpp.Player(video, {})
    playerRef.current.use(clpp.dash.DashComponent)
    playerRef.current.use(clpp.hls.HlsComponent)
    playerRef.current.use(clpp.vtt.VttComponent)
  }

  const pause = () => {
    playerRef.current.pause()
  }

  const play = async () => {
    const config = {
      source: {
        url: 'https://samples-2ndlook.penthera.com/secondlook/646e51800363430972b48b36?assetId=media-tailor-001&lookahead=12000&manifest=https://d3fch9e2fcarly.cloudfront.net/cunsco-media/Media/VOD-with-slates/roseparade_5min.m3u8',
        // url: 'https://demo.cf.castlabs.com/public/HLS/gerard-test/ioss291-clear720/master.m3u8',
        type: clpp.Type.HLS,
      },
    }

    if (canvasRef.current) {
      playerRef.current.vuMeter.configure({
        canvas: canvasRef.current,
      })
      playerRef.current.vuMeter.mount()
    }

    // Play the video
    console.info('Playing with config: ', config)
    await playerRef.current.load(config)
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
      <canvas id="vu-canvas" width="100" height="200" ref={canvasRef} />
      <div className={"options"}>
        <label>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
        </label>
      </div>
    </>
  )
}

const App = () => {
  return (
    <div>
      <Player/>
      <Player/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
)
