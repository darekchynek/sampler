import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import CustomFilters from './CustomFilters';
import RecordPlayButtons from './RecordPlayButtons';
import { DEFAULT_BIT_RATE, DEFAULT_SAMPLE_RATE, DEFAULT_PITCH} from '../helpers/constants';
import { setPadSettings, padsSettings } from '../helpers/PadSettings';

const AudioContainer = ({ micPermission, selectedPad }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState(null);
    const [sound, setSound] = useState(null);
    const [canPlay, setCanPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sampleRate, setSampleRate] = useState(DEFAULT_SAMPLE_RATE);
    const [bitRate, setBitRate] = useState(DEFAULT_BIT_RATE);
    const [pitch, setPitch] = useState(DEFAULT_PITCH);

    useEffect(() => {
        const { id } = selectedPad;
        const currentPad = padsSettings.find(pad => pad.id === id);
        setSampleRate(currentPad.padCustomFilters.sampleRate);
        setBitRate(currentPad.padCustomFilters.bitRate);
    })

    const setSampleRateAndSettings = value => {
        const changedPadCustomFilters = {
            ...selectedPad.padCustomFilters,
            sampleRate: value
        }
        setSampleRate(value);
        setPadSettings(selectedPad.id, changedPadCustomFilters)
    };

    const setBitRateAndSettings = value => {
        const changedPadCustomFilters = {
            ...selectedPad.padCustomFilters,
            bitRate: value
        }
        setBitRate(value);
        setPadSettings(selectedPad.id, changedPadCustomFilters)
    };

    const changePreset = preset => {
        preset.ios.linearPCMBitDepth = bitRate;
        preset.ios.sampleRate = sampleRate;

        return preset
    }

    const recordingSettings = JSON.parse(JSON.stringify(changePreset(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)));

    const setAudioMode = async ({ allowsRecordingIOS }) => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            });
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const recordAudio = async () => {
        await setAudioMode({ allowsRecordingIOS: true });
        try {
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(recordingSettings);
            recording.setOnRecordingStatusUpdate(setCanPlay);
            setIsRecording(true);
            setRecord(recording);
            await recording.startAsync()
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const stopRecording = async () => {
        try {
            await record.stopAndUnloadAsync();
            await setAudioMode({ allowsRecordingIOS: false })
            setIsRecording(false);
        } catch (error) {
            console.log('error: ', error);
        }

        await record.setOnRecordingStatusUpdate(null);

        await FileSystem.getInfoAsync(record.getURI());

        const { sound } = await record.createNewLoadedSoundAsync(
            {
                isLooping: false,
                isMuted: false,
                volume: 1.0,
                rate: pitch,
                shouldCorrectPitch: false,
                pitchCorrectionQuality: Audio.PitchCorrectionQuality.High
            },
            status => setCanPlay(status)
        );
        setSound(sound);
    }

    const playSound = () => {
        if (sound != null) {
            if (isPlaying) {
                sound.stopAsync();
                setIsPlaying(false);
            } else {
                sound.playAsync();
                setIsPlaying(true);
            }
        }
    }

    return (
        <View style={styles.container}>
            <CustomFilters
                selectedPad={selectedPad}
                sampleRate={sampleRate}
                setSampleRate={setSampleRateAndSettings}
                bitRate={bitRate}
                setBitRate={setBitRateAndSettings}
                pitch={pitch}
                setPitch={setPitch}
            />
            <RecordPlayButtons
                isRecording={isRecording}
                stopRecording={stopRecording}
                recordAudio={recordAudio}
                micPermission={micPermission}
                canPlay={canPlay}
                playSound={playSound}
                isPlaying={isPlaying}
            />
        </View>
    )
}

export default AudioContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});