import { rotatePoint } from '../../geometry/rotation';
import UITrBuilder from './UITrBuilder'

export default class UITrRotater extends UITrBuilder{
    [x: string]: any;

    constructor(tr) {
        super(tr)
        this.transformer = tr;
        this.angle = 0;
        this.relativeAngle = 0;
        this.isInitialRotate = true;
    }

    public rotate(angle) {
        if (!angle || angle === 0) return;
        const pos = [this.rotationVertex.cx(), this.rotationVertex.cy()];
        const pivotPos = this.getPivot();
        const rotater: any = rotatePoint(pos, angle, pivotPos);
        this.dragRotator(rotater);
    }

    public dragRotator(input) {
        let pos;
        if (input && input.detail) {
            pos = [input.detail.cx(), input.detail.cy()];
        } else if (Array.isArray(input) && input.length === 2) {
            pos = input;
        }
        const midTopPos = this.getVertexPos('midTop');
        const pivotPos = this.getPivot();
        const angleRadians = Math.atan2(pos[1] - pivotPos[1], pos[0] - pivotPos[0]);

        const distance = Math.hypot(midTopPos[0] - pivotPos[0], midTopPos[1] - pivotPos[1]) + 40;
        const relativeAngleDegrees = ((angleRadians * 180 / Math.PI) - this.angle) % 360;
        const [newCircleX, newCircleY] = [pivotPos[0] + distance * Math.cos(angleRadians), pivotPos[1] + distance * Math.sin(angleRadians)];
        this.rotationVertex.center(newCircleX, newCircleY);

        this.relativeAngle = Math.round(relativeAngleDegrees + 90);
        this.angle = ((this.angle + this.relativeAngle) + 360) % 360;

        this.rotateVertices(this.relativeAngle);
        this.rotateLine();
        this.rotateBox();
    }

    private rotateVertices(angle) {
        const pivot = this.getPivot()
        this.vertices.forEach((vertex) => {
            if (vertex.name() !== 'rotator') {
                const newPos = rotatePoint([vertex.cx(), vertex.cy()], angle, pivot);
                vertex.center(newPos[0], newPos[1]);
            }
        });
    }

    private rotateLine() {

        const midTopPos = this.getVertexPos('midTop');
        const rotationVertexPos = this.getVertexPos('rotator');

        if (midTopPos && rotationVertexPos) {
            this.rotationLine.plot([midTopPos, rotationVertexPos]);
        }
    }

    private rotateBox() {
        const points = this.getCornersPos();
        this.boxSelector.plot(points);
    }

    public resetAngle() {
        this.angle = 0;
        this.isInitialRotate = true;
    }

}