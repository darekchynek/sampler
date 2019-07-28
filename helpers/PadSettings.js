import uuid from "uuid";
import { DEFAULT_SAMPLE_RATE, DEFAULT_BIT_RATE } from './constants';

export const setPadSettings = (selectedPadId, padCustomFilters) => {
    padsSettings.map(pad => pad.id === selectedPadId ? pad.padCustomFilters = padCustomFilters : pad);
    console.log(padsSettings);
}

export const padsSettings = [
    {
        title: 'pad1',
        id: uuid(),
        selectedPreset: 'Boss SP-202 - Hifi',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 31250
        },
        sound: null
    },
    {
        title: 'pad2',
        id: uuid(),
        selectedPreset: 'Boss SP-202 - Standard',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 15630
        },
        sound: null
    },
    {
        title: 'pad3',
        id: uuid(),
        selectedPreset: 'Boss SP-202 - Lofi',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 7180
        },
        sound: null
    },
    {
        title: 'pad4',
        id: uuid(),
        selectedPreset: 'Boss SP-202 - Lofi2',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: 3910
        },
        sound: null
    },
    {
        title: 'pad5',
        id: uuid(),
        selectedPreset: 'Akai S900 - Low',
        padCustomFilters: {
            bitRate: 12,
            sampleRate: 8000
        },
        sound: null
    },
    {
        title: 'pad6',
        id: uuid(),
        selectedPreset: 'none',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: DEFAULT_SAMPLE_RATE
        },
        sound: null
    },
    {
        title: 'pad7',
        id: uuid(),
        selectedPreset: 'none',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: DEFAULT_SAMPLE_RATE
        },
        sound: null
    },
    {
        title: 'pad8',
        id: uuid(),
        selectedPreset: 'none',
        padCustomFilters: {
            bitRate: DEFAULT_BIT_RATE,
            sampleRate: DEFAULT_SAMPLE_RATE
        },
        sound: null
    },
];