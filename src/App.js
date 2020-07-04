import React, { useRef, useEffect } from 'react';
import ShakaPlayer from 'shaka-player-react';

function App() {
  const src = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
  const playerRef = useRef(null);

  useEffect(() => {
    const { player, videoElement } = playerRef.current;
    console.log(player, "player");
    console.log(videoElement, "videoElement");

    async function loadAsset() {
      // Load an asset.
      await player.load(src);

      // Trigger play.
      // videoElement.play();
    }

    loadAsset().then();

  }, []);

  return (
      <ShakaPlayer ref={playerRef} />
  );
}

export default App;
