import React, { useState } from 'react';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Text, Footer, FooterTab } from 'native-base';
import Presets from './components/Presets';
import HeaderContainer from './components/HeaderContainer';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [micPermission, setMicPermission] = useState(false);

    const askForPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });

        if (status === 'granted') {
            return true;
        }
    };

    const startApp = async () => {
        await askForPermissions().then(response => {
            setMicPermission(response);
        })
    };

    startApp().then(() => setIsLoading(false));

    return (
        <Container>
            <HeaderContainer />
            <Content>
                {
                    isLoading
                        ? <Text>loading...</Text>
                        : <Presets micPermission={micPermission}/>
                }
            </Content>
        </Container>
    );
}