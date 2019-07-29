import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Text, Icon } from 'native-base';

const RecordPlayButtons = ({
    isRecording,
    stopRecording,
    recordAudio,
    micPermission,
    playSound,
    isPlaying,
    sound,
    setSound
}) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const timerInterval = setInterval( () => setTimer(timer => timer + 1), 1000 );

        return () => {
            clearInterval(timerInterval);
            setTimer(0)
        }
    }, [!isRecording]);


    const startRecording = () => {
        recordAudio();
    }

    const handleStopRecording = () => {
        stopRecording();
    }

    const removeSound = () => {
        setSound(null);
    }

    return (
        <View style={styles.container}>
            {
                !sound
                    ? (
                        <Button
                            style={styles.button}
                            rounded
                            danger
                            title='record'
                            onPress={isRecording ? handleStopRecording : startRecording}
                            disabled={!micPermission}
                        >
                            {
                                isRecording
                                    ? <Text style={styles.icon}>{timer}</Text>
                                    : <Icon
                                        name='recording'
                                        style={styles.icon}
                                    />
                            }

                        </Button>
                    )
                    : (
                        <View style={styles.playContainer}>
                            <Button
                                style={styles.button}
                                rounded
                                success
                                title='play'
                                onPress={playSound}
                            >
                                <Icon
                                    name={isPlaying ? 'pause' : 'play'}
                                    style={styles.icon}
                                />
                            </Button>
                            <Button
                                style={styles.deleteButton}
                                rounded
                                danger
                                title='delete'
                                onPress={removeSound}
                            >
                                <Icon
                                    name='trash'
                                    style={styles.deleteIcon}
                                />
                            </Button>
                        </View>
                    )
            }
        </View>
    );
};

export default RecordPlayButtons;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'flex-end',
        flex: 0,
        alignItems: 'center',
    },
    button: {
        marginTop: 40,
        width: 180,
        height: 180,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playContainer: {
        flexDirection: 'row',
    },
    deleteButton: {
        width: 70,
        height: 70,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -40,
        left: 190
    },
    iconContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 100
    },
    deleteIcon: {
        fontSize: 50
    }
});