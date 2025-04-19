
const DEVICES = {
    xSmall: "xSmall",
    small: "small",
    medium: "medium"
}


const SIZES = {
    xSmall: { min: 0, max: 599 },
    small: { min: 600, max: 779 },
    medium: { min: 780, max: 979 },
    large: { min: 980, max: 1279 },
    xLarge: { min: 1280, max: 1339 },
    xxLarge: { min: 1340, max: Infinity },

    // Sidebar/nav related tweakpoints
    largerSidebar: { min: 1100, max: 1339 },
    sidebarFixed: { min: 2000, max: Infinity },

    // TopBar related tweakpoints
    expandedSearch: { min: 1180, max: Infinity },
};

const mediaDevices = {
    between(smallKey, largeKey, excludeLarge = false) {
        if (excludeLarge) {
            return `@media (min-width: ${SIZES[smallKey].min
                }px) and (max-width: ${SIZES[largeKey].min - 1}px)`;
        } else {
            if (SIZES[largeKey].max === Infinity) {
                return `@media (min-width: ${SIZES[smallKey].min}px)`;
            } else {
                return `@media (min-width: ${SIZES[smallKey].min}px) and (max-width: ${SIZES[largeKey].max}px)`;
            }
        }
    },

    greaterThan: (key) => {
        return `@media (min-width: ${SIZES[key].min}px)`;
    },

    lessThan(key) {
        return `@media (max-width: ${SIZES[key].min - 1}px)`;
    },

    size(key) {
        const size = SIZES[key];

        if (size.min == null) {
            return mediaDevices.lessThan(key);
        } else if (size.max == null) {
            return mediaDevices.greaterThan(key);
        } else {
            return mediaDevices.between(key, key);
        }
    },
};

export {
    DEVICES,
    mediaDevices
}