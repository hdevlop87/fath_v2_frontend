import { VERTEXNames } from '../../../utils/constants'
import { midpoint } from '../../geometry/polyline';
import { rotatePoint, rotatePoints } from '../../geometry/rotation';
import UITrRotater from './UITrRotater'

export default class UITrController extends UITrRotater {
    [x: string]: any;

    constructor(tr) {
        super(tr);
    }

    startScale(name) {
        this.calcStaticVertex(name);
        this.setInitialVerticesPos();
    }
    //==================================================================//
    getPointsByVertex = (vertex) => {
        const angle = this.transformer.getTrAngle()
        const newP = this.getUnRotateVertexPos(vertex);
        const pivot = this.getPivot();
        const name = vertex.name();
        let points = this.getInitialVerticesPos();

        let point1 = points[0];
        let point2 = points[1];
        let point3 = points[2];
        let point4 = points[3];

        let dx = this.movingVertex[0] - newP[0]
        let dy = this.movingVertex[1] - newP[1]

        switch (name) {
            case 'topRight':
                point1 = [point1[0] + dx, newP[1]];
                point2 = newP
                point3 = [newP[0], point3[1] + dy];
                point4 = [point1[0], point3[1]];
                break;

            case 'topLeft':
                point1 = newP
                point2 = [point2[0] + dx, newP[1]];
                point3 = [point2[0], point3[1] + dy];
                point4 = [point1[0], point3[1]];
                break;

            case 'bottomRight':
                point3 = newP
                point2 = [point3[0], point1[1] + dy];
                point1 = [point1[0] + dx, point2[1]];
                point4 = [point1[0], point3[1]];
                break;

            case 'bottomLeft':
                point4 = newP;
                point3 = [point3[0] + dx, point4[1]];
                point2 = [point3[0], point1[1] + dy];
                point1 = [point4[0], point2[1]];
                break;

            case 'midTop':
                point1 = [point1[0], newP[1]];
                point2 = [point2[0], newP[1]];
                point3 = [point3[0], point3[1] + dy];
                point4 = [point4[0], point4[1] + dy];
                break;
            case 'midRight':
                point2 = [newP[0], point2[1]];
                point3 = [newP[0], point3[1]];
                point1 = [point1[0] + dx, point1[1]];
                point4 = [point4[0] + dx, point4[1]];
                break;
            case 'midBottom':
                point1 = [point1[0], point1[1] + dy];
                point2 = [point2[0], point2[1] + dy];
                point3 = [point3[0], newP[1]];
                point4 = [point4[0], newP[1]];
                break;
            case 'midLeft':
                point2 = [point2[0] + dx, point2[1]];
                point3 = [point3[0] + dx, point3[1]];
                point1 = [newP[0], point1[1]];
                point4 = [newP[0], point4[1]];
                break;
        }

        const midTop = midpoint(point1, point2);
        const rotationVertex = [midTop[0], midTop[1] - 40];
        const midRight = midpoint(point2, point3);
        const midBottom = midpoint(point3, point4);
        const midLeft = midpoint(point4, point1);

        points = [point1, point2, point3, point4, midTop, midRight, midBottom, midLeft, rotationVertex];
        points = rotatePoints(points, angle, pivot);
        return points
    };

    _getPointsByVertex(vertex) {
        const angle = this.transformer.getTrAngle()
        const pivot = this.getPivot();
        const name = vertex.name();
        const newP = this.getUnRotateVertexPos(vertex);
        let points = this.getUnRotateVerticesPos();

        let point1 = points[0];
        let point2 = points[1];
        let point3 = points[2];
        let point4 = points[3];

        switch (name) {
            case 'topLeft':
                point2 = [point2[0], newP[1]];
                point4 = [newP[0], point4[1]];
                break;
            case 'topRight':
                point1 = [point1[0], newP[1]];
                point3 = [newP[0], point3[1]];
                break;
            case 'bottomRight':
                point2 = [newP[0], point2[1]];
                point4 = [point4[0], newP[1]];
                break;
            case 'bottomLeft':
                point1 = [newP[0], point1[1]];
                point3 = [point3[0], newP[1]];
                break;

            case 'midTop':
                point1 = [point1[0], newP[1]];
                point2 = [point2[0], newP[1]];
                break;
            case 'midRight':
                point2 = [newP[0], point2[1]];
                point3 = [newP[0], point3[1]];
                break;
            case 'midBottom':
                point3 = [point3[0], newP[1]];
                point4 = [point4[0], newP[1]];
                break;
            case 'midLeft':
                point1 = [newP[0], point1[1]];
                point4 = [newP[0], point4[1]];
                break;
        }

        const midTop = midpoint(point1, point2);
        const rotationVertex = [midTop[0], midTop[1] - 40];
        const midRight = midpoint(point2, point3);
        const midBottom = midpoint(point3, point4);
        const midLeft = midpoint(point4, point1);

        points = [point1, point2, point3, point4, midTop, midRight, midBottom, midLeft, rotationVertex];
        points = rotatePoints(points, angle, pivot);
        return points
    }

    calcStaticVertex(name) {
        let angle = this.transformer.getTrAngle();
        let pivot = this.getPivot();
        let points = this.getVerticesPos()
        points = rotatePoints(points, -angle, pivot);
        let point1 = points[0];
        let point2 = points[1];
        let point3 = points[2];
        let point4 = points[3];

        const midTop = midpoint(point1, point2);
        const midRight = midpoint(point2, point3);
        const midBottom = midpoint(point3, point4);
        const midLeft = midpoint(point4, point1);

        switch (name) {
            case 'topLeft':
                this.staticVertex = { name: 'bottomRight', pos: point3 };
                this.movingVertex = point1;
                break;
            case 'topRight':
                this.staticVertex = { name: 'bottomLeft', pos: point4 };
                this.movingVertex = point2;
                break;
            case 'bottomRight':
                this.staticVertex = { name: 'topLeft', pos: point1 };
                this.movingVertex = point3;
                break;
            case 'bottomLeft':
                this.staticVertex = { name: 'topRight', pos: point2 };
                this.movingVertex = point4;
                break;

            case 'midTop':
                this.staticVertex = { name: 'bottomRight', pos: point3 };
                this.movingVertex = midTop;
                break;
            case 'midRight':
                this.staticVertex = { name: 'bottomLeft', pos: point4 };
                this.movingVertex = midRight;
                break;
            case 'midBottom':
                this.staticVertex = { name: 'topRight', pos: point1 };
                this.movingVertex = midBottom;
                break;
            case 'midLeft':
                this.staticVertex = { name: 'topRight', pos: point2 };
                this.movingVertex = midLeft;
                break;
        }
    }

    updateUI(newPoints) {
        if (this.vertices.size === 0) return;
        this.setVerticesPos(newPoints);
        const midPoints = [
            midpoint(newPoints[0], newPoints[1]), // midTop
            midpoint(newPoints[1], newPoints[2]), // midRight
            midpoint(newPoints[2], newPoints[3]), // midBottom
            midpoint(newPoints[3], newPoints[0]), // midLeft
        ];

        midPoints.forEach((point, index) => {
            const midVertexName = VERTEXNames[index + 4];
            const vertex = this.getVertexByName(midVertexName);
            if (vertex) {
                vertex.center(point[0], point[1]);
            }
        });

        const midTopPos = this.getVertexPos('midTop');
        this.rotationVertex.center(midTopPos[0], midTopPos[1] - 40);

        this.setPivotPos(newPoints);
        this.setLinePos();
        this.setBoxPos();
    }

    //======================== set UI =================================//

    setInitialVerticesPos() {
        this.initialVerticesPos = this.getUnRotateVerticesPos();
    }

    setVerticesPos(points) {
        if (this.vertices.size === 0) return;
        points.forEach((point, idx) => {
            this.vertices.get(VERTEXNames[idx]).center(point[0], point[1]);
        });
        this.setPivotPos(points);
        this.setLinePos();
        this.setBoxPos();
    }

    setVertexPos(vertexName, pos) {
        let vertex = this.getVertexByName(vertexName)
        vertex.center(pos[0], pos[1]);
        let points = this._getPointsByVertex(vertex);
        this.setVerticesPos(points)
    }

    setPivotPos(points) {
        if (!points || points.length === 0) return;
        const newPivotPos = [
            Math.round((points[0][0] + points[2][0]) / 2),
            Math.round((points[0][1] + points[2][1]) / 2)
        ];
        this.pivot.center(newPivotPos[0], newPivotPos[1]);
    }

    setLinePos() {
        const midTopPos = this.getVertexPos('midTop');
        const rotationVertexPos = this.getVertexPos('rotator');

        if (midTopPos && rotationVertexPos) {
            this.rotationLine.plot([midTopPos, rotationVertexPos]);
        }
    }

    setBoxPos() {
        const points = this.getCornersPos();
        this.boxSelector.plot(points);
    }

    //======================== get UI =================================//

    getInitialVerticesPos() {
        return this.initialVerticesPos;
    }

    getVertexByName(name) {
        return this.vertices.get(name) || null;
    }

    getVertexPos(name) {
        const vertex = this.getVertexByName(name);
        return vertex ? [vertex.cx(), vertex.cy()] : null
    }

    getVerticesPos() {
        return Array.from(this.vertices.values()).map((v: any) => [v.cx(), v.cy()]);
    }

    getUnRotateVertexPos(vertex) {
        const angle = this.transformer.getTrAngle()
        const pivot = this.getPivot();
        const pos = [vertex.cx(), vertex.cy()]
        return rotatePoint(pos, -angle, pivot);
    }

    getUnRotateVerticesPos() {
        const angle = this.transformer.getTrAngle();
        const points = this.getVerticesPos();
        const pivot = this.getPivot();
        const rotatedPoints = rotatePoints(points, -angle, pivot);
        const roundedPoints = rotatedPoints.map(point => ([
            Number(point[0].toFixed(2)),
            Number(point[1].toFixed(2))]
        ));

        return roundedPoints;
    }

    getPivot() {
        return [this.pivot.cx(), this.pivot.cy()]
    }

    getCornersPos() {
        const cornerNames = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
        return Array.from(this.vertices.entries())
            .filter(([name, _]) => cornerNames.includes(name))
            .map(([_, vertex]) => [vertex.cx(), vertex.cy()]);
    }

    getStaticVertex() {
        return this.staticVertex;
    }

    getMovingVertex() {
        return this.movingVertex;
    }
}
