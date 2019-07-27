import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, WhiteSpace, Slider, Switch } from '@ant-design/react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

export default function App() {
    const [micPermission, setMicPermission] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [record, setRecord] = useState(null);
    const [sound, setSound] = useState(null);
    const [canPlay, setCanPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sampleRate, setSampleRate] = useState(44100);
    const [bitRate, setBitRate] = useState(16);
    const [isMono, setIsMono] = useState(false);

    const changePreset = preset => {
        preset.ios.linearPCMBitDepth = bitRate;
        preset.ios.sampleRate = sampleRate;
        preset.ios.numberOfChannels = isMono ? 1 : 2;
        return preset
    }

    const recordingSettings = JSON.parse(JSON.stringify(changePreset(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)));

    const askForPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if (status === 'granted') {
            setMicPermission(true);
        }
    };

    askForPermissions()

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

      const info = await FileSystem.getInfoAsync(record.getURI());

      const { sound } = await record.createNewLoadedSoundAsync(
          {
              isLooping: true,
              isMuted: false,
              volume: 1.0,
              rate: 1.0,
              shouldCorrectPitch: true,
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
          <View style={styles.slider}>
              <Text>
                  { `Sample Rate: ${sampleRate}khz` }
              </Text>
              <Slider
                  min={8000}
                  max={44100}
                  step={100}
                  defaultValue={sampleRate}
                  onChange={value => setSampleRate(value)}
              />
          </View>
          <WhiteSpace />
          <View style={styles.slider}>
              <Text>Mono?</Text>
              <WhiteSpace />
              <Switch
                  checked={isMono}
                  onChange={value => setIsMono(value)}
              />
          </View>
          <WhiteSpace />
          <WhiteSpace />
          <View style={styles.slider}>
              <Text>
                  { `Bit Rate: ${bitRate}bit` }
              </Text>
              <Slider
                  min={2}
                  max={16}
                  step={1}
                  defaultValue={bitRate}
                  onChange={value => setBitRate(value)}
              />
          </View>
          <WhiteSpace />
          <WhiteSpace />
          <Button
              onPress={isRecording ? stopRecording : recordAudio}
              disabled={!micPermission}
          >
              {
                isRecording
                    ? 'Zatrzymaj'
                    : 'Nagraj'
              }
          </Button>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button
              disabled={!canPlay}
              onPress={playSound}
          >
              {
                  isPlaying
                      ? 'Stop'
                      : 'Play'
              }
          </Button>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        width: '60%'
    }
});