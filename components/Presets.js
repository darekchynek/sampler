import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { presetSettings }  from '../helpers/PresetSettings';
import AudioContainer from "./AudioContainer";
import PresetSelect from "./PresetSelect";

const Presets = ({ micPermission }) => {
    const [selectedPreset, selectPreset] = useState(presetSettings[0]);

    return (
        <View style={styles.container}>
            <View style={styles.presetSelect}>
                <PresetSelect
                    onSelectPreset={selectPreset}
                    selectedPreset={selectedPreset}
                    presets={presetSettings}
                />
            </View>
            {
                selectedPreset
                    ? (
                        <View style={styles.audioContainer}>
                            <AudioContainer
                                selectedPreset={selectedPreset}
                                micPermission={micPermission}
                            />
                        </View>
                    )
                    : <Text>Select Pad</Text>
            }
        </View>
    );
};

export default Presets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    presetSelect: {
        flex: 1,
        marginTop: 12,
        marginBottom: 12,
        width: '100%'
    },
    text: {
        color: 'black'
    },
    textHover: {
        color: 'white'
    },
    audioContainer: {
        flex: 2,
        width: '90%',
        justifyContent: 'flex-end'
    }
});