import React, {useState} from "react"
import ReactDOM from 'react-dom'

import './index.css'
import '@castlabs/prestoplay-react-components/dist/themes/pp-ui-base-theme-embedded.css'

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import "@castlabs/prestoplay/cl.hls"
import "@castlabs/prestoplay/cl.htmlcue"
import "@castlabs/prestoplay/cl.ttml"
import "@castlabs/prestoplay/cl.vtt"

import {
  DefaultTrackLabelerOptions,
  Player,
  PlayerSurface,
  BaseThemeOverlay,
} from '@castlabs/prestoplay-react-components'

const baseConfig = {
  license: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmxzIjpbIjovL2ZpbmdlcmFydHVyLmdpdGh1Yi5pbyJdLCJ0eXBlIjoiV2ViIiwia2lkIjozNDc5LCJpbHYiOmZhbHNlfQ.qIbY824dz3iR0C17YsUaQzoaXwO-tXuCB7BZgcXksH5i99yyQCTw26q-xEtwvS9WCdaeX-nsrikgW69IEekoDObRFyZpAApt_EkKbZxkfygC5smElLrk7D_tXaF9rxEsGhFjHg6NMF9ZxUdJ_h1RcsVnCOsuhXd4kI-hy2KzDuzyfcoGUEfva_eGZP13cQP4Gy585uX3MJ9i25tuBVO3XU8oAsCzHPBhoChR_UP9g_3iFOrtpRAFzvJU1v1AXmM_JntyZgsbk-HtQdPKPF4ZpW6GMz1wJMQonFSo4tb52R4fFDRJzfBfCKRRJ9Fw2fMchT5qXmgNh8WJF50ipmbnbw',
}

export const App = () => {
  // Create the player as state of this component
  const [player] = useState(new Player((pp:any) => {
    pp.use(clpp.dash.DashComponent)
    pp.use(clpp.hls.HlsComponent)
    pp.use(clpp.htmlcue.HtmlCueComponent)
    pp.use(clpp.ttml.TtmlComponent)
    pp.use(clpp.vtt.VttComponent)
  }))

  // set options for the default track labeler
  player.trackLabelerOptions = {
    usePlayingRenditionInAbrLabel: true,
    useNativeLanguageNames: false,
    abrLabel: "Auto",
    disabledTrackLabel: "Off",
    unknownTrackLabel: "Unknown"
  } as DefaultTrackLabelerOptions

  const [config, setConfig] = useState<any>(null)

  const play = () => {
    const cfg = {
      // Taken from https://demo.castlabs.com/#/player/demo?cfg=eyJzb3VyY2UiOnsidXJsIjoiaHR0cHM6Ly9kZW1vLmNmLmNhc3RsYWJzLmNvbS9tZWRpYS9UT1MvYWJyL01hbmlmZXN0X2NsZWFuX3NpemVzLm1wZCIsInR5cGUiOiJhcHBsaWNhdGlvbi9kYXNoK3htbCJ9LCJhdXRvcGxheSI6dHJ1ZSwibWFuaWZlc3QiOnt9LCJhYnIiOnsicmVzdHJpY3Rpb25zIjp7fX0sImRybSI6e30sInJlc3RyaWN0aW9ucyI6e30sIm1ldGFkYXRhIjp7InRpdGxlIjoiUUEgLSBUT1MgQ2xlYXIiLCJieWxpbmUiOiIiLCJkZXNjcmlwdGlvbiI6IkNsZWFyIFRPUyIsInBvc3RlclVybCI6IiIsInRodW1iVXJsIjoiIiwidmlkZW9Db2RlY3MiOlsiaDI2NCJdLCJhdWRpb0NvZGVjcyI6WyJBQUMiLCJEVFMiLCJEb2xieSIsIkhFLUFBQyJdLCJob3N0ZXIiOiJDYXN0TGFicyIsImN1c3RvbUhvc3RlciI6IiIsInN1YnRpdGxlcyI6dHJ1ZSwibXVsdGlBdWRpbyI6dHJ1ZSwicWEiOnRydWUsImJyb3dzZXJzIjpbXSwidGVzdENhc2VzIjpbImlvc19zdWJ0aXRsZV8wMSIsImlvc19pbWFfYWRzIiwiaW9zX3N1YnRpdGxlVFRNTEZpbGVDb25maWciLCJpb3Nfc3VidGl0bGVTeXN0ZW1TZXR0aW5ncyIsImFuZHJvaWRfZG93bmxvYWRlciIsImlvc19zdGF0ZV90cmFuc3Rpb24iXSwiYXVkaW8iOiJza2lwIiwiYXVkaW9fMiI6InNraXAiLCJ2aWRlbyI6InNraXAiLCJzdWJ0aXRsZSI6InNraXAiLCJzdWJ0aXRsZV8yIjoic2tpcCIsInNlZWtfYmVnaW5pbmciOiJza2lwIiwic2Vla19wb3N0aW9uX2Fzc2VydCI6InNraXAifSwidGV4dHN0eWxlIjp7ImZvbnRGYW1pbHkiOiInUm9ib3RvJywgc2Fucy1zZXJpZiIsImZvbnRDb2xvciI6IndoaXRlIiwiYmFja2dyb3VuZENvbG9yIjoicmdiYSgwLCAwLCAwLCAwLjc1KSJ9LCJwbHVnaW5zIjp7fSwiaWQiOjN9&assetId=3
      source: 'https://demo.cf.castlabs.com/media/TOS/abr/Manifest_clean_sizes.mpd',
      autoplay: true,
    }

    console.info('Playing with config: ', cfg)
    setConfig(cfg)
  }

  return (
    <>
      <PlayerSurface
        player={player}
        config={config}
        baseConfig={baseConfig}
        autoload
      >
        <BaseThemeOverlay
          player={player}
          seekForward={10}
          seekBackward={-10}
          menuSelectionOptions={[
            {type: "audio", label: "Language", hideCurrentlyActive:false, hideWhenUnavailable: true},
            {type: "text", label: "Subtitles", hideCurrentlyActive:false, hideWhenUnavailable: true},
            {type: "video", label: "Video", hideCurrentlyActive:false, hideWhenUnavailable: true}
          ]}
        />
      </PlayerSurface>

      <div className={"options"}>
        <label>
          <button onClick={play}>Play</button>
        </label>
        {/* <label>
          <input type={"checkbox"} checked={showStartButton} onChange={() => {setShowStartButton(!showStartButton)}}/>
          Show Start Button
        </label>
        <label>
          <input type={"checkbox"} checked={showPoster} onChange={() => {setShowPoster(!showPoster)}}/>
          Show Poster
        </label> */}
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
