import { Polygon } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes'
import { defaultProps } from './defaultProps';
import { rotatePoints } from '../Core/geometry/rotation';
import { Rima } from '../Core/Rima';
import { SVG } from '@svgdotjs/svg.js';

class PolygonShape extends BaseShape(Polygon) {

    constructor(props, scene) {
        super(props);
        this.apply(props);
        this.scene = scene;
        this.transformer = scene.transformer;
        this.currentRotation = 0;
        this.svg = SVG("#SVG");
        this.originalPoints = [];
    }

    apply(props) {
        const settings = { ...defaultProps['Polygon'], ...props };
        this.plot(settings.points);
        this.storeOriginalPoints(this.array());
        props.cx !== undefined && this.cx(settings.cx);
        props.cy !== undefined && this.cy(settings.cy);
        props.x !== undefined && this.x(settings.x);
        props.y !== undefined && this.y(settings.y);
    }

    storeOriginalPoints(points) {
        this.originalPoints = points;
    }

    getBounds() {
        console.log(this.originalPoints);
        
        const pivot = this.getPivot();
        const rotationAngle = this._getRotation();
        let points = rotatePoints(this.array(), -rotationAngle, pivot);
        const minX = Math.min(...points.map(p => p[0]));
        const minY = Math.min(...points.map(p => p[1]));
        const maxX = Math.max(...points.map(p => p[0]));
        const maxY = Math.max(...points.map(p => p[1]));

        const width = maxX - minX;
        const height = maxY - minY;

        return [[minX, minY], [minX + width, minY], [minX + width, minY + height], [minX, minY + height]];
    }

    _getRotation() {
        return this.currentRotation;
    }

    _center(pos) {
        this.center(pos[0], pos[1]);
        this.setPivotOrigin(pos);
    }

    getPivot() {
        const rbox= this.rbox(this.svg)
        return [rbox.cx, rbox.cy];
    }

    _rotate(angle, origin) {
        const [cx, cy] = origin ? origin : this.getPivot();
        this.rotation(angle)
        this.currentRotation = angle - this.currentRotation
        let points = this.array();
        points = rotatePoints(points, this.currentRotation, [cx, cy]);
        this.plot(points);
        this.currentRotation = angle;
    }

    _resize() {

    }

    drawBBox(props?) {

        if (this.rectBBox) {
            this.rectBBox.plot(this.getBounds());
        }

        else {
            this.rectBBox = Rima('polygon', {
                points: this.getBounds(),
                fill: 'none',
                stroke: { color: props?.color || 'red', width: 2, dasharray: "5,5" }
            });
        }

        let bbox = this.rectBBox.bbox();
        Rima('circle', {
            r: 6,
            fill: 'green',
            cx:bbox.cx,
            cy:bbox.cy
        })

        return this.rectBBox
    }
}

export default PolygonShape;


// import { Polygon } from '@svgdotjs/svg.js';
// import BaseShape from './BaseShapes'
// import { rotatePoints } from '../Core/geometry/rotation';
// import { centerPolygon } from '../Core/geometry/translation';
// import { rotatePolygon, rotatePolygonPoints } from '../Core/geometry/rotation'

// interface ShapeInterface {
//     init(props: any): void;
//     getBounds(): number[][];
//     _center(newCenter: number[]): void;
//     _move(pos: number[]): void;
//     _resize(scaleData: { scaleX: number; scaleY: number; staticVertex: number[] }): void;
//     _rotate(newAngle: number, origin?: number[]): void;
//     getInitialPoints(): number[][];
//     getState(): any;
// }

// class PolygonShape extends BaseShape(Polygon) implements ShapeInterface {

//     constructor(props, scene) {
//         super(props, scene);
//         this.init(props);
//     }

//     init(props) {
//         this.setSharedProps(props);
//         this.plot(props.points);
//         this.pivot = this.getOriginalPivot();
//         this.setInitialState();
//     }

//     getBounds() {
//         let points = this.getInitialPoints();
//         let minX = points[0][0], minY = points[0][1], maxX = points[0][0], maxY = points[0][1];
//         points.forEach(point => {
//             minX = Math.min(minX, point[0]);
//             minY = Math.min(minY, point[1]);
//             maxX = Math.max(maxX, point[0]);
//             maxY = Math.max(maxY, point[1]);
//         });

//         return [
//             [minX, minY],
//             [maxX, minY],
//             [maxX, maxY],
//             [minX, maxY]
//         ];
//     }

//     _center(newCenter) {
//         if (!newCenter) return
//          centerPolygon(this, newCenter);
//         console.log(newCenter);

//         // const pivot = this.getPivot();
//         // const dX = newCenter[0] - pivot[0];
//         // const dY = newCenter[1] - pivot[1];
//         // let shiftedPoints = this.getInitialPoints().map(([x, y]) => [x + dX, y + dY]);
//         // let rotatedPoints = rotatePoints(shiftedPoints, this.rotation(), newCenter);
//         // this.plot(rotatedPoints);
//         // this.setInitialState();
//         this.setPivot(newCenter);
//         // this.drawPivot()
//     }

//     _move(pos) {
//         if (!pos) return;
//         this.cx(pos[0]);
//         this.cy(pos[1]);
//         this.setPivot([this.cx(), this.cy()]);
//     }

//     _resize(scaleData) {
//         const { scaleX, scaleY, staticVertex } = scaleData;
//         let scaledPoints = this.getInitialstate().points.map(point => {
//             let shiftedX = point[0] - staticVertex[0];
//             let shiftedY = point[1] - staticVertex[1];

//             shiftedX *= scaleX;
//             shiftedY *= scaleY;

//             return [
//                 shiftedX + staticVertex[0],
//                 shiftedY + staticVertex[1]
//             ];
//         });

//         let rotatedPoints = rotatePoints(scaledPoints, this.rotation(), this.pivot);
//         this.plot(rotatedPoints);
//     }

//     _rotate(newAngle, origin) {
//         if (!newAngle) return;
//         const [cx, cy] = origin || this.getPivot();
//         const points = rotatePoints(this.getInitialPoints(), newAngle, [cx, cy]);
//         this.plot(points);
//         this.rotation(newAngle);
//         this.drawPivot()
//     }

//     getInitialPoints() {
//         return this.getInitialState().points
//     }

//     getState() {
//         return {
//             ...this.getSharedState(),
//             points: this.array()
//         };
//     }

// }

// export default PolygonShape;


const parts = {
    "tagName": "g",
    "props": {
        "id": "main",
        "fill": "green",
        "layer": "parts"
    },
    "children": [
        {
            "tagName": "rect",
            "props": {
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "fill": "blue"
            },
            "children": []
        },
        {
            "tagName": "circle",
            "props": {
                "x": 200,
                "y": 100,
                "r": 100,
                "fill": "green"
            },
            "children": []
        },
        {
            "tagName": "text",
            "props": {
                "x": 20,
                "y": 34,
                "fill": "#ff0066",
                "fontFamily": "Inconsolata",
                "fontSize": "2em",
                "textContent": " know that eggs do well to stay out of frying pans."
            },
            "children": []
        },
        {
            "tagName": "g",
            "props": {
                "id": "group1",
                "fill": "red",
            },
            // "children": [
            //     {
            //         "tagName": "circle",
            //         "props": {
            //             "x": 200,
            //             "y": 100,
            //             "r": 100,
            //             "fill": "green"
            //         },
            //         "children": []
            //     },
            //     {
            //         "tagName": "text",
            //         "props": {
            //             "x": 20,
            //             "y": 34,
            //             "fill": "#ff0066",
            //             "fontFamily": "Inconsolata",
            //             "fontSize": "2em",
            //             "textContent": " know that eggs do well to stay out of frying pans."
            //         },
            //         "children": []
            //     }
            // ]
        }
    ]
}

const bulkSvgObj = {
    "type": "g",
    "props": {
        "id": "main",
        "fill": "green",
        "layer": "parts"
    },
    "children": [
        {
            "type": "rect",
            "props": {
                "x": 50,
                "y": 50,
                "width": 100,
                "height": 100,
                "fill": "blue"
            },
            "children": []
        },
        {
            "type": "circle",
            "props": {
                "x": 200,
                "y": 100,
                "r": 100,
                "fill": "green"
            },
            "children": []
        },
        {
            "type": "text",
            "props": {
                "x": 20,
                "y": 34,
                "fill": "#ff0066",
                "fontFamily": "Inconsolata",
                "fontSize": "2em",
                "textContent": " know that eggs do well to stay out of frying pans."
            },
            "children": []
        },
    ]
}

const svgFile = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">  <text x="10" y="30" class="small">You are<tspan>not</tspan>a banana!</text></svg>';

const simpleSvgObj = {
    "type": "rect",
    "props": {
        "layer": "parts",
        "x": 50,
        "y": 50,
        "width": 100,
        "height": 100,
        "fill": "blue"
    }
};
