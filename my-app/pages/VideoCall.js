import React,{useEffect} from 'react'
import { useHuddle01 } from '@huddle01/react';
// import { useLobby ,useAudio, useVideo,useRoom,usePeers} from '@huddle01/react/hooks';
// import {Video,Audio} from "@huddle01/react/components"
import { ConnectButton } from '@rainbow-me/rainbowkit';

const VideoCall = () => {
    const { initialize,isIntialized } = useHuddle01();
    // const { joinLobby } = useLobby();
    // const { fetchAudioStream, stopAudioStream, error: micError ,stream:videoStream,produceAudio, stopProducingAudio } = useAudio();
    // const { fetchVideoStream, stopVideoStream, error: camError,stream:audioStream ,produceVideo, stopProducingVideo} = useVideo();
    // const { joinRoom, leaveRoom } = useRoom();
    
    // const { peerIds } = usePeers();
    // // initialize('mcyC3teDgY4n6stHvAYbsqHj7lEgWWwW')
    // useEffect(() => {
    //     // its preferable to use env vars to store projectId
    //     initialize('mcyC3teDgY4n6stHvAYbsqHj7lEgWWwW');
    //   }, []);
  return (
    <div>VideoCall
      <ConnectButton/>
      {console.log(isIntialized)}
    <button onClick={()=>initialize("mcyC3teDgY4n6stHvAYbsqHj7lEgWWwW")}>init</button>
{/* <Video peerId={meId} stream={videoStream} />
<Audio peerId={meId} stream={audioStream} /> */}
{/* <div className="grid grid-cols-4">
          {peerIds.map(peer => (
              <Video key={peer.peerId} peerId={peer.peerId} debug />
          ))}
 
          {peerIds.map(peer => (
              <Audio key={peer.peerId} peerId={peer.peerId} debug />
          ))}
        </div> */}

        {/* <div>
          <button onClick={()=>{console.log("clicked") 
          initialize('mcyC3teDgY4n6stHvAYbsqHj7lEgWWwW')}}>initialise</button>
        <button 
          disabled={joinLobby.isCallable} 
          onClick={() => joinLobby('12345')
        }>
          Join Lobby
        </button>
 
        <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
          FETCH_AUDIO_STREAM
        </button>
 
        <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
          FETCH_VIDEO_STREAM
        </button>
 
        <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
          JOIN_ROOM 
        </button>
 
        <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
          LEAVE_ROOM 
        </button>
 
        <button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
          Produce Cam  
        </button>
 
        <button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
          Produce Mic  
        </button>
 
        <button disabled={!stopProducingVideo.isCallable} onClick={stopProducingVideo}>
          Stop Producing Cam  
        </button>
 
        <button disabled={!stopProducingAudio.isCallable} onClick={stopProducingAudio}>
          Stop Producing Mic  
        </button>
        </div> */}

    </div>

  )
}

export default VideoCall