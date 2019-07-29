import uuid from "uuid";
import { DEFAULT_SAMPLE_RATE, DEFAULT_BIT_RATE } from './constants';

export const setPresetSettings = (selectedPadValue, padCustomFilters) => {
    presetSettings.map(preset => preset.value === selectedPadValue ? preset.padCustomFilters = padCustomFilters : preset);
}

export const presetSettings = [
    {
        label: 'Boss SP-202 - Hifi',
        value: uuid(),
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 31250
        },
        sound: null
    },
    {
        label: 'Boss SP-202 - Standard',
        value: uuid(),
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 15630
        },
        sound: null
    },
    {
        label: 'Boss SP-202 - Lofi',
        value: uuid(),
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 7180
        },
        sound: null
    },
    {
        label: 'Boss SP-202 - Lofi2',
        value: uuid(),
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 3910
        },
        sound: null
    },
    {
        label: 'Akai S900 - Low',
        value: uuid(),
        padCustomFilters: {
            bitRate: 12,
            sampleRate: 8000
        },
        sound: null
    },
    {
        label: 'Custom',
        value: uuid(),
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: DEFAULT_SAMPLE_RATE
        },
        sound: null
    }
];