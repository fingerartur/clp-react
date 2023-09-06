import React, { useRef } from "react"
import ReactDOM from 'react-dom'

import './index.css'
import "@castlabs/prestoplay/clpp.styles.css"
// @ts-ignore
import * as muxjs from "mux.js"
// @ts-ignore
import * as ima from "@castlabs/prestoplay/ima3-clpp"

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import "@castlabs/prestoplay/cl.hls"
import "@castlabs/prestoplay/cl.vtt"
import "@castlabs/prestoplay/cl.ima"

/* eslint semi: "off" */

// @ts-ignore
window.ima = ima
// @ts-ignore
window.muxjs = muxjs

const Player = () => {
  const playerRef = useRef<any|null>(null)
  const canvasRef = useRef<any|null>(null)
  const adContainerRef = useRef<any|null>(null)

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
      }
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

    const videoEl = playerRef.current.getSurface().getMedia()
    const CSAI_TAG = "https://n8ljfs0h09.execute-api.us-west-2.amazonaws.com/v1/ads?duration=30"
    initCSAI(videoEl, adContainerRef.current, CSAI_TAG, [5, 10], playerRef.current)
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <video
          ref={createPlayer}
          autoPlay
          style={{
            width: 600,
            height: 400,
            border: '10px solid yellow'
          }}
        />
        <div id="me-ad-container" ref={adContainerRef}></div>
        <canvas id="vu-canvas" width="100" height="200" ref={canvasRef} />
      </div>
      <div className={"options"}>
        <label>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
        </label>
      </div>
    </>
  )
}

// @ts-ignore
function initCSAI(video, adContainer, adTag, adCues, clppPlayer) {
  console.info("AAA Activated IMA SDK ads")

  // @ts-ignore
  const adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, video);
  // @ts-ignore
  const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  // datazoom_context_csai.attachImaAdsLoader(adsLoader);

  // @ts-ignore
  let adsManager;

  // @ts-ignore
  adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, event => {
      adsManager = event.getAdsManager(video);
      // datazoom_context_csai.attachImaAdsManager(adsManager);

      // @ts-ignore
      adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
          video.pause();
          adContainer.hidden = false;
      });

      // @ts-ignore
      adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
          video.ended || video.play();
          adContainer.hidden = true;
      });

      // @ts-ignore
      adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
        clppPlayer.vuMeter.attachToImaAdsVideo(adContainer);
      });
      // @ts-ignore
      adsManager.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS, () => {
        clppPlayer.vuMeter.attachToImaAdsVideo(adContainer);
      });

      try {
          // @ts-ignore
          adsManager.init(video.clientWidth, video.clientHeight, google.ima.ViewMode.NORMAL);
          adsManager.start();
      }
      catch (error) {
          console.error("adsManager could not be started");
          video.play();
      }
  });

  // @ts-ignore
  adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, event => {
    console.error(event.getError());
    // @ts-ignore
    adsManager && adsManager.destroy();
    adsManager = null;
    video.play();
    adContainer.hidden = true;
  });

  video.addEventListener("ended", () => {
    adsLoader.contentComplete()
  });

  // @ts-ignore
  video.addEventListener("timeupdate", event => {
      if (adCues && video.currentTime >= adCues[0]) {
          video.pause();
          while (video.currentTime >= adCues[0]) { adCues.shift() }
          adCues.length || (adCues = null)

          // @ts-ignore
          let adsRequest = new google.ima.AdsRequest()
          adsRequest.adTagUrl = adTag;
          adsRequest.linearAdSlotWidth = video.clientWidth
          adsRequest.linearAdSlotHeight = video.clientHeight
          adsRequest.nonLinearAdSlotWidth = video.clientWidth
          adsRequest.nonLinearAdSlotHeight = video.clientHeight / 3;
          adsLoader.requestAds(adsRequest);

          // datazoom_context_csai.generateEvent("ad_request");
      }
  });

  const resizeObserver = new ResizeObserver((entries) => {
    // @ts-ignore
      adsManager && adsManager.resize(video.clientWidth, video.clientHeight, google.ima.ViewMode.NORMAL);
  });
  resizeObserver.observe(video);

  // initEventTrace(document.getElementById("events_csai"), "CSAI");
  // initDataTrace(datazoom_context_csai, document.getElementById("data_csai"));

  adDisplayContainer.initialize();
  adContainer.hidden = true;

  // player_csai.load({
  //     source: [{ url: url, type: clpp.Type.HLS }],
  //     autoplay: false,
  //     muted: true
  // });
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
