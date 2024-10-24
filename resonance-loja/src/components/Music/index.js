import React, { useState, useEffect, useRef } from 'react';
import "./styles.css";  
import MyHeroMusic from "../../assets/audio/MyHero.mp3";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import CapaAlbum from "../../assets/images/FooFightersCapaAlbum.jfif";

const Music = () => {
    const [play, setPlay] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(new Audio(MyHeroMusic));
    const fixedVolume = 0.1; 
    const [currentTime, setCurrentTime] = useState(0);
    const [spanCount, setSpanCount] = useState(120); // Inicializa com 120 spans

    const playAudio = () => {
        setPlay(true);
        audioRef.current.currentTime = currentTime;
        audioRef.current.play();
    };

    const pauseAudio = () => {
        setPlay(false);
        setCurrentTime(audioRef.current.currentTime);
        audioRef.current.pause();
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        audioRef.current.muted = !isMuted; 
        if (!isMuted) {
            audioRef.current.volume = 0; 
        } else {
            audioRef.current.volume = fixedVolume; 
        }
    };

    useEffect(() => {
        audioRef.current.volume = fixedVolume;

        const handleEnded = () => {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        const updateCurrentTime = setInterval(() => {
            if (play) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 1000);

        return () => clearInterval(updateCurrentTime);
    }, [play]);

    useEffect(() => {
        const updateSpanCount = () => {
            const width = window.innerWidth;

            // Defina o número de spans com base na largura da tela
            if (width < 550) {
                setSpanCount(30); // Exibe 30 spans em telas pequenas
            } else if (width < 768) {
                setSpanCount(60); // Exibe 60 spans em telas médias
            } else {
                setSpanCount(120); // Exibe 120 spans em telas grandes
            }
        };

        // Atualiza a contagem de spans ao redimensionar a tela
        window.addEventListener('resize', updateSpanCount);
        updateSpanCount(); // Chama a função para definir a contagem inicial

        return () => {
            window.removeEventListener('resize', updateSpanCount);
        };
    }, []);

    return (
        <div className="music">
            <div style={{ backgroundImage: `url(${CapaAlbum})`, backgroundSize: 'cover' }} className='album'>
                {play 
                    ? <button className='buttonMusic' onClick={pauseAudio}><FaPause /></button> 
                    : <button className='buttonMusic' onClick={playAudio}><FaPlay /></button>
                }
                <button className='buttonMusic' onClick={toggleMute}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>
            {[...Array(spanCount)].map((_, index) => (
                <span key={index} className={play ? 'animate' : 'static'}></span>
            ))}
        </div>
    );
};

export default Music;
