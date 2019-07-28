import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { padsSettings }  from '../helpers/PadSettings';
import AudioContainer from "./AudioContainer";

const Pad = ({ pad, onSelectPad }) => {
    return (
        <TouchableHighlight
            onPress={() => onSelectPad(pad)}
            style={styles.pad}
        >
            <Text>{pad.title}</Text>
        </TouchableHighlight>
    )
}

const Pads = ({ micPermission }) => {
    const [selectedPad, selectPad] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.padContainer}>
                {padsSettings.map(pad => {
                    return (
                        <Pad
                            key={pad.id}
                            onSelectPad={selectPad}
                            pad={pad}
                        />
                    )
                })}
            </View>
            {
                selectedPad
                    ? (
                        <View style={styles.audioContainer}>
                            <AudioContainer
                                selectedPad={selectedPad}
                                micPermission={micPermission}
                            />
                        </View>
                    )
                    : <Text>Select Pad</Text>
            }

        </View>
    );
};

export default Pads;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    padContainer: {
        marginTop: 20,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    pad: {
        padding: 20,
        backgroundColor: '#ABB1B7',
        borderRadius: 2
    },
    text: {
        color: 'black'
    },
    textHover: {
        color: 'white'
    },
    audioContainer: {
        flex: 1,
        width: '90%',
        padding: 8
    }
});