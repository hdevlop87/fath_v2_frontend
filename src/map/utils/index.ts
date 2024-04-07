import { GRID_CELL, LEFT_CLICK } from '../utils/constants';

export function UUID() {
    let uuid;
    do {
        uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    } while (document.getElementById(uuid));
    return 'r' + uuid;
}

export function extend(modules, methods) {
    let key, i
    modules = Array.isArray(modules) ? modules : [modules]
    for (i = modules.length - 1; i >= 0; i--) {
        for (key in methods) {
            modules[i].prototype[key] = methods[key]
        }
    }
}

export const getCoordsFromEvent = (ev) => {
    if (ev.changedTouches) {
        ev = ev.changedTouches[0]
    }
    return { x: ev.clientX, y: ev.clientY }
}

export function isElementID(element, id) {
    while (element && element.nodeName !== 'SVG') {
        if (element.id && element.id.startsWith(id)) {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}

export function getIdByTarget(target) {
    while (target) {
        if (target.id.startsWith('pins')) {
            return null;
        }
        if (target.id.startsWith('part_')) {
            return target.parentElement.id;
        }
        else if (target.id.startsWith('connection_')) {
            return target.id;
        }
        target = target.parentElement;
    }

    return null;
}

export function getLastIndex(points, targetPoint) {
    let lastIndex = -1;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point[0] === targetPoint[0] && point[1] === targetPoint[1]) {
            lastIndex = i;
        }
    }

    return lastIndex;
}

export function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) {
            return false;
        }
    }

    return true;
}

export function isLeftClick(ev) {
    return ev.button == LEFT_CLICK
}

export function IsPinOrJunction(el) {
    return isElementID(el, 'pin') || isElementID(el, 'junction')
}

export function parsePoint(pos) {
    const parsers = {
        array: (p) => ({ x: p[0], y: p[1] }),
        string: (p) => {
            const [x, y] = p.split(',').map(Number);
            return { x, y };
        },
        object: (p) => {
            return { x: p.x, y: p.y };
        }
    };

    const inputType = Array.isArray(pos) ? 'array' : typeof pos;
    const parser = parsers[inputType];

    if (!parser) {
        throw new Error('Invalid position format');
    }

    return parser(pos);
}

export function isDifferent(arr1, arr2) {
    if (arr1.length !== arr2.length) return true;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return true;
    }
    return false;
}

export function isDifferentObj(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return true;
    }

    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);

        if (areObjects && isDifferentObj(val1, val2)) {
            return true;
        }
        else if (!areObjects && val1 !== val2) {
            return true;
        }
    }
    return false;
}

export function isObject(object) {
    return object != null && typeof object === 'object';
}

export function checkSvgType(svgData) {

    if (isSvgFile(svgData)) {
        return 'file';
    }

    if (isSvgUrl(svgData)) {
        return 'path';
    }

    if (isHtmlSvg(svgData)) {
        return 'htmlSvg';
    }

    if (isNoObj(svgData)) {
        return "notSvgObj";
    }

    if (isObjWithEmptyChild(svgData)) {
        return "svgObj";
    }

    return "svgObj";
}

export function isEmptyArray(children) {
    return Array.isArray(children) && children.length === 0;
}

export function isObjWithEmptyChild(svgObj) {
    return (svgObj.children === undefined || isEmptyArray(svgObj.children))
}

export function isSvgUrl(url) {
    const svgUrlRegex = /\/[^/]+\.[a-zA-Z0-9]+\.svg(?:\?|$)/i;
    return typeof url === 'string' && svgUrlRegex.test(url);
}

export function isSvgFile(svgData) {
    return typeof svgData === 'string' && svgData.trim().startsWith('<svg');
}

export function isNoObj(svgData) {
    return typeof svgData !== 'object' || !svgData.hasOwnProperty('type');
}

export function isHtmlSvg(svgData) {
    const htmlSvgElementsRegex = /<(rect|circle|path|line|polyline|polygon|ellipse|text|tspan)\s/i;
    return typeof svgData === 'string' && htmlSvgElementsRegex.test(svgData);
}

export function extractTransform(transformString) {
    const regex = /(?:translate\(([^)]+)\))?\s*(?:rotate\(([^)]+)\))?\s*(?:scale\(([^)]+)\))?/;
    const match = transformString.match(regex);
    
    if (!match) return null;

    const [, translate, rotate, scale] = match;

    const parsedValues = {
        translate: translate ? translate.split(' ').map(parseFloat) : null,
        rotate: rotate ? parseFloat(rotate) : null,
        scale: scale ? scale.split(' ').map(parseFloat) : null,
    };

    return Object.entries(parsedValues).reduce((acc, [key, val]) => {
        return val !== null ? { ...acc, [key]: val } : acc;
    }, {});
}