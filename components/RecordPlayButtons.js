import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, WhiteSpace } from "@ant-design/react-native";

const RecordPlayButtons = ({
    isRecording,
    stopRecording,
    recordAudio,
    micPermission,
    canPlay,
    playSound,
    isPlaying
}) => {
    return (
        <View>
            <Button
                type='warning'
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
};

export default RecordPlayButtons;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});