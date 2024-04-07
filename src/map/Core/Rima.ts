
import scene from './Scene';
import rect from '../Shapes/Rect'
import circle from '../Shapes/Circle'
import line from '../Shapes/Line'
import polygon from '../Shapes/polygon'
import path from '../Shapes/Path'
import group from '../Shapes/Group'
import g from '../Shapes/Group'
import text from '../Shapes/Text'
import tspan from '../Shapes/Tspan'
import { parse } from './parser';
import { checkSvgType } from '../utils/index'

export const Parts = {
    scene,
    rect,
    circle,
    line,
    polygon,
    group,
    g,
    path,
    text,
    tspan
}

export async function addSvgUrl(url) {
    const response = await fetch(url);
    const svgData = await response.text();
    return addSvgFile(svgData);
}

export function addSvgFile(svgFile) {
    const svgData = parse(svgFile);
    svgData.type = 'g';
    return addSvgObj(svgData);
}

export function addSvgHtmlString(svgFile) {
    const svgData = parse(svgFile);
    console.log(svgData);
    
    return addSvgObj(svgData);
}

export function addSvgObj(svgObj, parent = null) {

    const { type, props, children } = svgObj;

    let element = scene.instance.addPart(type, props || {});

    if (parent) {
        element.setLayer(parent);
    }

    if (children && children.length > 0) {
        children.forEach(childData => {
            addSvgObj(childData, element);
        });
    }
    return element
}

export function addPart(svgData) {
    const svgType = checkSvgType(svgData);

    switch (svgType) {
        case 'file':
            return addSvgFile(svgData);
        case 'htmlSvg':
            return addSvgHtmlString(svgData);
        case 'path':
            return addSvgUrl(svgData);
        case 'svgObj':
            return addSvgObj(svgData);
        default:
            console.error('Unsupported SVG type:', svgType);
    }
}

export const Rima = (type, props?) => {

    if (!scene.instance) {
        return new scene(props);
    }

    let newObj = {
        type,
        props
    };

    if (!props) {
        newObj = type;
    }

    return addPart(newObj);
};

Object.assign(Rima, Parts);

