import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import React from 'react';

import  { StyledAudioButton }  from '../../styles/StyledAudioButton';

const AudioPlayerController = ({ muted, callback }) => {

    return (
        <>
            <StyledAudioButton onClick={callback}>
                {muted ?
                    <AiFillPlayCircle size={36} />
                :
                    <AiFillPauseCircle size={36} />
                }
            </StyledAudioButton>
        </>
    )
}

export default AudioPlayerController;
