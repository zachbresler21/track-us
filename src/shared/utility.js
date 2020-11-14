export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkIfDefined = (value, defaultValue) => {
    if (value !== undefined && value !== null) {
        return value
    }
    return defaultValue
};