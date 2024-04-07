import { Polygon } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes'
import { rotatePoints } from '../Core/geometry/rotation';
import { centerPolygon } from '../Core/geometry/translation';

interface ShapeInterface {
    init(props: any): void;
    getBounds(): number[][];
    _center(newCenter: number[]): void;
    _move(pos: number[]): void;
    _scale(scaleData: { scaleX: number; scaleY: number; staticVertex: number[] }): void;
    _rotate(newAngle: number, origin?: number[]): void;
    getState(): any;
}

class PolygonShape extends BaseShape(Polygon) implements ShapeInterface {

    constructor(props, scene) {
        super(props, scene);
        this.init(props);
    }

    init(props) {
        this.setSharedProps(props);
        this.plot(props.points);
        this.pivot = this.getOriginalPivot();
        this.setInitialState();
    }

    getBounds() {
        let points = this.getUnRotatePoints(this.array());
        let minX = points[0][0], minY = points[0][1], maxX = points[0][0], maxY = points[0][1];
        points.forEach(point => {
            minX = Math.min(minX, point[0]);
            minY = Math.min(minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        });

        return [
            [minX, minY],
            [maxX, minY],
            [maxX, maxY],
            [minX, maxY]
        ];
    }

    _center(newCenter) {
        if (!newCenter) return
        centerPolygon(this, newCenter);
    }

    _move(pos) {
        if (!pos) return;
        this.cx(pos[0]);
        this.cy(pos[1]);
        this.setPivot([this.cx(), this.cy()]);
    }

    _dmove(dpos) {
        if (!dpos) return;
        this.x(this.x() + dpos[0]);
        this.y(this.y() + dpos[1]);
        this.setPivot([this.x(), this.y()]);
    }

    _scale(scaleData) {

        const { scaleX, scaleY, staticVertex } = scaleData;
        const points = this.getUnRotatePoints(this.getInitialState().points);

        let scaledPoints = points.map(point => {
            let shiftedX = point[0] - staticVertex.pos[0];
            let shiftedY = point[1] - staticVertex.pos[1];

            shiftedX *= scaleX;
            shiftedY *= scaleY;

            return [
                shiftedX + staticVertex.pos[0],
                shiftedY + staticVertex.pos[1]
            ];
        });

        let rotatedPoints = rotatePoints(scaledPoints, this.rotation(), this.getPivot());
        this.plot(rotatedPoints);
    }

    _rotate(newAngle, origin) {
        if (!newAngle) return;
        const [cx, cy] = origin || this.getPivot();
        const points = rotatePoints(this.getUnRotatePoints(this.array()), newAngle, [cx, cy]);
        this.plot(points);
        this.rotation(newAngle);
        this.drawPivot()
    }

    getUnRotatePoints(points) {
        const angle = this.rotation();
        const pivot = this.getPivot();
        return rotatePoints(points, -angle, pivot);
    }

    getState() {
        return {
            ...this.getSharedState(),
            points: this.array()
        };
    }

}

export default PolygonShape;


