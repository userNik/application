import React, {useEffect, useRef } from "react";
import { SET_DIMENSIONS } from "../../store/actions";
import { roundToThousands } from "../../utils";
import { useDispatch } from "react-redux";

const videoSource = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
const Player = ({ markAsError }) => {
    const videoRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        window.shaka.polyfill.installAll();

        const ui = videoRef.current['ui'];

        if (!ui) {
            markAsError(true);
            return;
        }
        const config = {
            overflowMenuButtons : ['quality']
        };
        ui.configure(config);
        const controls = ui.getControls();
        const player = controls.getPlayer();
        const eventManager = new window.shaka.util.EventManager();

        const updateState = () => {
            const { streamBandwidth, height: quality, playTime, bufferingTime  } = player.getStats();

            dispatch({
                type: SET_DIMENSIONS,
                data: {
                    streamBandwidth: roundToThousands(streamBandwidth / 1024),
                    bufferingTime,
                    quality,
                    timeProgress: playTime * 100
                }
            });
        };

        eventManager.listen(player.getMediaElement(), `timeupdate`, updateState);
        player.addEventListener("ratechange", updateState);

        const loadSet = async () => {
            try {
                await player.load(videoSource);
            } catch (error) {
                markAsError(true);
            }
        };

        loadSet();

        return () => {
            eventManager.unlisten(player.getMediaElement(), 'timeupdate');
            player.removeEventListener("ratechange", updateState);
        }
    }, [markAsError]);

    const styles = {
        videoStyle: {
            width: "100%",
            height: "100%",
        },
        containerStyle: {
            maxWidth: "40em"
        }
    };

    return (
        <div
            style={styles.containerStyle}
            data-shaka-player-container
            data-shaka-player-cast-receiver-id="7B25EC44">
            <video ref={videoRef} data-shaka-player style={styles.videoStyle}></video>
        </div>
    )
};

export default Player;
