import React, { useState, useEffect, useRef } from 'react';
import "./styles.css";  
import MyHeroMusic from "../../assets/audio/MyHero.mp3";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import CapaAlbum from "../../assets/images/FooFightersCapaAlbum.jfif";

const Music = () => {
    const [play, setPlay] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(new Audio(MyHeroMusic)); // Usar useRef para armazenar a instância de Audio
    const fixedVolume = 0.1; 
    const [currentTime, setCurrentTime] = useState(0);

    const playAudio = () => {
        setPlay(true);
        audioRef.current.currentTime = currentTime; // Retorna ao ponto onde parou
        audioRef.current.play();
    };

    const pauseAudio = () => {
        setPlay(false);
        setCurrentTime(audioRef.current.currentTime); // Armazena o tempo atual
        audioRef.current.pause();
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        audioRef.current.muted = !isMuted; 
        if (!isMuted) {
            audioRef.current.volume = 0; // Silencia o áudio
        } else {
            audioRef.current.volume = fixedVolume; // Restaura o volume fixo
        }
    };

    useEffect(() => {
        audioRef.current.volume = fixedVolume; // Define o volume fixo do áudio

        // Função para reiniciar a música quando terminar
        const handleEnded = () => {
            audioRef.current.currentTime = 0; // Reseta o tempo
            audioRef.current.play(); // Recomeça a música
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.removeEventListener('ended', handleEnded); // Limpa o evento ao desmontar
        };
    }, []);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        // Atualiza o tempo atual do áudio em intervalos regulares
        const updateCurrentTime = setInterval(() => {
            if (play) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 1000);

        return () => clearInterval(updateCurrentTime); // Limpa o intervalo ao desmontar
    }, [play]);

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
            {[...Array(120)].map((_, index) => (
                <span key={index} className={play ? 'animate' : 'static'}></span>
            ))}
        </div>
    );
};

export default Music;
