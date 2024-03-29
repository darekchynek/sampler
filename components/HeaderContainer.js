import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const HeaderContainer = () => {
    return (
        <Header>
            <Left>
            </Left>
            <Body>
                <Title>Sampler</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Right>
        </Header>
    );
};

export default HeaderContainer;