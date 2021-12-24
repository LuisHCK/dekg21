import { TMachineryState } from 'types/machinery'

export const machineryInitialState: TMachineryState = {
    loading: false,
    error: false,
    machines: [],
    machineryForm: null,
    currentMachine: null,
}
