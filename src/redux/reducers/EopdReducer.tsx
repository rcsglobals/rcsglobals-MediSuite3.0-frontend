import { ActionTypes } from "../constants/ActionTypes";

const initialState = {
    dignosisData: [],
};

export const EopdReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_DIAGNOSIS_INFO:
            const { opdNo, updates } = action.payload;

            const existingIndex = state.dignosisData.findIndex((item: any) => item.opdNo === opdNo);

            if (existingIndex !== -1) {
                // Update existing object
                const updatedDiagnosisData = state.dignosisData.map((item: any, index) =>
                    index === existingIndex
                        ? { ...item, ...updates }
                        : item
                );

                return {
                    ...state,
                    dignosisData: updatedDiagnosisData
                };
            } else {
                // Add new object
                return {
                    ...state,
                    dignosisData: [...state.dignosisData, { opdNo, ...updates }]
                };
            }

        default:
            return state;
    }
}

export default EopdReducer;