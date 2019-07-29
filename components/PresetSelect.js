import React from 'react';
import { Icon, Picker, Form,  } from "native-base";

const PresetSelect = ({ selectedPreset, onSelectPreset, presets }) => {
    const selectPreset = value => {
        const preset = presets.find(pr => pr.value === value);
        onSelectPreset(preset);
    };

    return (
        <Form>
            <Picker
                mode="dropdown"
                iosHeader="Select Preset"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={selectedPreset.value}
                onValueChange={selectPreset}
            >
                {
                    presets.map(preset => (
                        <Picker.Item
                            key={preset.value}
                            label={preset.label}
                            value={preset.value}
                        />
                    ))
                }
            </Picker>
        </Form>
    );
}

export default PresetSelect;