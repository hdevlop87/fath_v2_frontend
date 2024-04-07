import { STROKE, STROKE_WIDTH, FILL_COLOR } from '../utils/constants';

const baseProperties = {
    fill: FILL_COLOR,
    stroke: STROKE,
    strokeWidth: STROKE_WIDTH,
    strokeDasharray: null,
    strokeOpacity: null,
    fillOpacity: null,
};

export const defaultProps = {
    rect: {
        ...baseProperties,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    },
    circle: {
        ...baseProperties,
        r: 50,
    },
    polygon: {
        ...baseProperties,
        points: '0,0 0,100 100,100 100,0',
    },
    path: {
        ...baseProperties,
        path: '0,0 0,100 100,100 100,0',
    },
    line: {
        ...baseProperties,
        points: '0,0 0,100 100',
    },
    text: {
        ...baseProperties,
        fontFamily: "Inconsolata",
        fontSize: "2em",
        fontWeight: "600"
    },
    tspan: {
        fontFamily: "Inconsolata",
        fontSize: "16",
        fontWeight: "600"
    },
    group: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    },
    g: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    }
};


