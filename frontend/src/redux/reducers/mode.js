///
/// Mode Types
///

export const setModeAddNode = () => ({
    type: 'SET_MODE_ADD_NODE',
    value: 'add_node',
});

export const setModeAddEdge = () => ({
    type: 'SET_MODE_ADD_EDGE',
    value: 'add_edge',
});

export const setModeMove = () => ({
    type: 'SET_MODE_MOVE',
    value: 'move',
});

export const setModeSelect = () => ({
    type: 'SET_MODE_SELECT',
    value: 'select',
});

export const setModeDelete = () => ({
    type: 'SET_MODE_DELETE',
    value: 'delete',
});

const defaultState = 'select';

export const mode = (state = defaultState, { type, value }) => {
    if (type === 'SET_MODE_ADD_NODE') {
        return value;
    } else if (type === 'SET_MODE_ADD_EDGE') {
        return value;
    } else if (type === 'SET_MODE_ADD_EDGE') {
        return value;
    } else if (type === 'SET_MODE_MOVE') {
        return value;
    } else if (type === 'SET_MODE_SELECT') {
        return value;
    } else if (type === 'SET_MODE_DELETE') {
        return value;
    }
    return state;
}