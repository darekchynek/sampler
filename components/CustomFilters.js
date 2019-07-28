import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider, WhiteSpace } from '@ant-design/react-native';

const CustomFilters = ({ selectedPad, sampleRate, setSampleRate, bitRate, setBitRate, pitch ,setPitch }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.presetText}>{selectedPad.selectedPreset}</Text>
            <WhiteSpace />
            <WhiteSpace />
            <View style={styles.slider}>
                <Text>
                    { `Sample Rate: ${sampleRate}khz` }
                </Text>
                <Slider
                    min={1000}
                    max={44100}
                    step={100}
                    defaultValue={sampleRate}
                    onChange={value => setSampleRate(value)}
                />
            </View>
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
            <View style={styles.slider}>
                <Text>
                    { `Pitch: ${pitch}` }
                </Text>
                <Slider
                    min={0.1}
                    max={2.0}
                    step={0.1}
                    defaultValue={pitch}
                    onChange={value => setPitch(value)}
                />
            </View>
        </View>
    );
};

export default CustomFilters;

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    slider: {
        width: '100%'
    },
    presetText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});