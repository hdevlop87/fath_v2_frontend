import { Line } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes';
import { rotatePoints } from '../Core/geometry/rotation';


class LineShape extends BaseShape(Line) {
    constructor(props,scene) {
        super(props,scene);
        this.apply(props);
    }

    apply(props) {
        this.setSharedProps(props);
        this.plot(props.points);
    }

    _center(newCenter) {
        if(!newCenter) return
        const pivot = this.getPivot();
        const dX = newCenter[0] - pivot[0];
        const dY = newCenter[1] - pivot[1];
        let shiftedPoints = this._getInitialPoints().map(([x, y]) => [x + dX, y + dY]);
        let rotatedPoints = rotatePoints(shiftedPoints, this.rotation(), newCenter);
        this.plot(rotatedPoints);
        this._setInitialPoints(shiftedPoints);
        this.setPivot(newCenter);
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

    _resize(scaleData) {
        const { scaleX, scaleY, staticVertex } = scaleData;
        let scaledPoints = this.getInitialstate().points.map(point => {
            let shiftedX = point[0] - staticVertex[0];
            let shiftedY = point[1] - staticVertex[1];

            shiftedX *= scaleX;
            shiftedY *= scaleY;

            return [
                shiftedX + staticVertex[0],
                shiftedY + staticVertex[1]
            ];
        });

        let rotatedPoints = rotatePoints(scaledPoints, this.rotation(), this.pivot);
        this.plot(rotatedPoints);
    }

    _rotate(newAngle, origin) {
        if (!newAngle) return;
        const [cx, cy] = origin || this.getPivot();
        const points = rotatePoints(this._getInitialPoints(), newAngle, [cx, cy]);
        this.plot(points);
        this.rotation(newAngle)
    }

    getState() {
        return {
            ...this.getSharedState(),
            points: this.array()
        };
    }
}

export default LineShape;