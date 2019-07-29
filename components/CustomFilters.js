import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

const CustomFilters = ({ sampleRate, setSampleRate, bitRate, setBitRate, pitch ,setPitch }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>
                    { `Sample Rate: ${sampleRate}khz` }
                </Text>
                <Slider
                    minimumValue={1000}
                    maximumValue={44100}
                    step={100}
                    value={sampleRate}
                    onValueChange={value => setSampleRate(value)}
                />
            </View>
            <View>
                <Text>
                    { `Bit Rate: ${bitRate}bit` }
                </Text>
                <Slider
                    minimumValue={2}
                    maximumValue={16}
                    step={1}
                    value={bitRate}
                    onValueChange={value => setBitRate(value)}
                />
            </View>
            <View>
                <Text>
                    { `Pitch: ${pitch}` }
                </Text>
                <Slider
                    minimumValue={0.1}
                    maximumValue={2.0}
                    step={0.1}
                    value={pitch}
                    onValueChange={value => setPitch(value)}
                />
            </View>
        </View>
    );
};

export default CustomFilters;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    presetText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});