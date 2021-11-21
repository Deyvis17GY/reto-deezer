/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useRef } from "react";
import Amplitude from "amplitudejs";
import "animate.css";
const ModalSingle = ({ jsonMusic = {}, closeModal }) => {
  const inputRef = useRef();
  // console.log("ModalSingle", jsonMusic);
  Amplitude.init({
    songs: [
      {
        ...jsonMusic,
      },
    ],
  });

  const advanceMusic = (e) => {
    const offset = inputRef.current.getBoundingClientRect();
    const x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage(
      (parseFloat(x) / parseFloat(inputRef.current.offsetWidth)) * 100
    );
  };
  return (
    <Fragment>
      <h1 style={{ color: "white" }} onClick={closeModal}>
        X
      </h1>
      <div className="cardMusic">
        <div className="cardMusic_single-song-player">
          <img data-amplitude-song-info="cover_art_url" />
          <div className="cardMusic_bottom-container">
            <div className="cardMusic_time">
              <span className="current-time">
                <span className="amplitude-current-minutes"></span>:
                <span className="amplitude-current-seconds"></span>
              </span>
              <span className="duration">
                <span className="amplitude-duration-minutes"></span>:
                <span className="amplitude-duration-seconds"></span>
              </span>
            </div>

            <progress
              ref={inputRef}
              onClick={advanceMusic}
              className="amplitude-song-played-progress"
            ></progress>

            <div className="cardMusic_control_meta-container">
              <span
                data-amplitude-song-info="name"
                className="song-name"
              ></span>
              <span data-amplitude-song-info="artist"></span>
            </div>

            <div className="cardMusic_control">
              <div className="cardMusic_control_inputs">
                <div className="amplitude-prev" id="previous"></div>
                <div className="amplitude-play-pause" id="play-pause"></div>
                <div className="amplitude-next" id="next"></div>
                {/* <div className="amplitude-repeat" id="repeat"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalSingle;
