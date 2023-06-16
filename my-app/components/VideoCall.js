import React from 'react'
import { useHuddle01 } from '@huddle01/react';
import { useLobby ,useAudio, useVideo} from '@huddle01/react/hooks';

const VideoCall = () => {
    const { initialize,isIntialized,meId } = useHuddle01();
    const { joinLobby } = useLobby();
    const { fetchAudioStream, stopAudioStream, error: micError ,stream:videoStream,produceAudio, stopProducingAudio } = useAudio();
    const { fetchVideoStream, stopVideoStream, error: camError,stream:audioStream ,produceVideo, stopProducingVideo} = useVideo();
    const { joinRoom, leaveRoom } = useRoom();
    
    const { peerIds } = usePeers();
    useEffect(() => {
        // its preferable to use env vars to store projectId
        initialize('YOUR_PROJECT_ID');
      }, []);
  return (
    <div>VideoCall

<Video peerId={meId} stream={videoStream} />
<Audio peerId={meId} stream={audioStream} />
<div className="grid grid-cols-4">
          {peerIds.map(peerId => (
              <Video key={peer.peerId} peerId={peer.peerId} debug />
          ))}
 
          {peerIds.map(peerId => (
              <Audio key={peer.peerId} peerId={peer.peerId} debug />
          ))}
        </div>

    </div>

  )
}

export default VideoCall