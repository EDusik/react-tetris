import { AiOutlineSound } from "react-icons/ai";
import { GiSoundOff } from "react-icons/gi";

import React from "react";

import { StyledAudioButton } from "../../styles/StyledAudioButton";

const AudioPlayerController = ({ muted, callback }) => {
	return (
		<>
			<StyledAudioButton onClick={callback}>
				{muted ? <AiOutlineSound size={36} alt="Enable sound" /> : <GiSoundOff size={36} alt="Disable sound" />}
			</StyledAudioButton>
		</>
	);
};

export default AudioPlayerController;
