import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { ScreenOrientation } from 'expo';
import Pads from './components/Pads';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [micPermission, setMicPermission] = useState(false);

    const askForPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if (status === 'granted') {
            return true;
        }
    };

    const startApp = async () => {
        await askForPermissions().then(response => {
            setMicPermission(response);
            ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
        })
    };

    startApp().then(() => setIsLoading(false));

    return (
        <View style={styles.container}>
            {
              isLoading
                  ? <Text>loading...</Text>
                  : <Pads micPermission={micPermission}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});