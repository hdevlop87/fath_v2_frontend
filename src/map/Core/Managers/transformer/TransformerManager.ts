import UITrController from './UITrController';
import CenterShapeCommand from '../../Commands/CenterShape';
import RotateShapeCommand from '../../Commands/RotateShape';
import ScaleShapeCommand from '../../Commands/ScaleShape';

export default class Transformer {

    [x: string]: any;

    constructor(scene) {
        this.scene = scene;
        this.invoker = scene.invoker;
        this.attachedShapes = [];
        this.initialTrState = {
            pos: 0,
            width: 0,
            height: 0,
            scaleX: 0,
            scaleY: 0,
            staticVertex: 0,
            pivot: 0,
            rotation: 0,
        };
        this.ui = new UITrController(this);
        this.scene.on('startDrag', this.startDrag.bind(this));
        this.scene.on('onDrag', this.onDrag.bind(this));
        this.scene.on('endDrag', this.endDrag.bind(this));
    }


    public link(shape) {
        this.linkedShape = shape
        const bounds = this.linkedShape.getBounds();
        const angle = this.linkedShape.rotation();
        this.ui.updateUI(bounds);
        this.ui.rotate(angle);
        this.ui.showUI();
        this.setInitialTrState();
    }

    private startDrag({ detail: el }) {
        this.setInitialTrState();
        if (el.id().startsWith('vertex')) {
            this.setDirectionVector(el);
            this.ui.startScale(el.name());
        }
       // this.linkedShape.setInitialState();
    }

    private onDrag({ detail: el }) {
        const id = el.id();
        let newPos = [el.cx(), el.cy()];

        switch (true) {
            case id.startsWith('vertex'):
                this.scaleTrByVertex(el);
                this.linkedShape._scale(this.getTrState());
                break;
            case id === 'rotator':
                this.dragTrRotator(newPos);
                this.linkedShape._rotate(this.getTrAngle());
                break;
            case id === 'transformerBox':
                this.centerTr(newPos);
                this.linkedShape._center(newPos);
                break;
        }
    }

    private endDrag({ detail: el }) {
        const id = el.id();
        switch (true) {
            case id.startsWith('vertex'):
                this.scaleCommand();
                break;
            case id === 'rotator':
                this.rotateCommand();
                break;
            case id === 'transformerBox':
                this.centerCommand();
                break;
        }
    }

    //======================================================================//
    //============================ Commands ================================//

    public centerCommand() {
        const pos = this.getTrPivot();
        const command = new CenterShapeCommand(this.linkedShape, pos);
        this.invoker.execute(command)
    }

    public rotateCommand() {
        const angle = this.getTrAngle();
        const command = new RotateShapeCommand(this.linkedShape, angle);
        this.invoker.execute(command)
    }

    public scaleCommand() {
        const scaleData = this.getTrState();
        const command = new ScaleShapeCommand(this.linkedShape, scaleData);
        this.invoker.execute(command)
    }

    //=======================================================================//

    public rotateTr(angle) {
        this.ui.rotate(angle);
        this.rotateCommand();
    }

    public centerTr(pos) {
        const currentPoints = this.ui.getVerticesPos();
        const pivot = this.getTrPivot()
        const offset = [pos[0] - pivot[0], pos[1] - pivot[1]];
        const newPoints = currentPoints.map(([x, y]) => [x + offset[0], y + offset[1]]);
        this.ui.setVerticesPos(newPoints);
    }

    public scaleTr(width, height) {
        this.setTrWidth(width);
        this.setTrHeight(height);
    }

    public scaleTrByVertex(vertex) {
        if (vertex) {
            let points = this.ui._getPointsByVertex(vertex);
            this.ui.setVerticesPos(points)
        }
    }

    private dragTrRotator(pos) {
        this.ui.dragRotator(pos);
    }

    public showTrUI() {
        this.ui.showUI()
    }

    public hideTrUI() {
        this.ui.hideUI();
    }

    public removeTrUI() {
        this.ui.hideUI();
        this.resetTrAng();
    }

    public resetTrAng() {
        this.ui.resetAngle()
    }

    private canKeepRatio(el) {
        let pivot = this.getTrPivot();
        let currentPos = { x: el.x(), y: el.y() };

        let scalar = Math.sqrt(
            Math.pow(pivot[0] - currentPos.x, 2) +
            Math.pow(pivot[1] - currentPos.y, 2)
        ) / Math.sqrt(
            Math.pow(this.directionVector.x, 2) +
            Math.pow(this.directionVector.y, 2)
        );

        const newX = pivot[0] + this.directionVector.x * scalar;
        const newY = pivot[1] + this.directionVector.y * scalar;

        el.cx(newX);
        el.cy(newY);
    }

    private setDirectionVector(el) {
        let pivot = this.getTrPivot();
        this.directionVector = {
            x: el.cx() - pivot[0],
            y: el.cy() - pivot[1]
        };
    }

    public setTrPos(pos) {
        const currentPoints = this.ui.getVerticesPos();
        const newPoints = currentPoints.map(([x, y]) => {
            return [x + pos[0], y + pos[1]];
        });
        this.ui.setVerticesPos(newPoints);
    }

    public setTrWidth(newWidth) {
        this.setInitialTrState();
        this.ui.startScale('topRight')
        const topLeft = this.ui.getVertexPos('topLeft');
        const topRight = this.ui.getVertexPos('topRight');
        const angleRadians = Math.atan2(topRight[1] - topLeft[1], topRight[0] - topLeft[0]);

        const newTopRight = [
            topLeft[0] + newWidth * Math.cos(angleRadians),
            topLeft[1] + newWidth * Math.sin(angleRadians)
        ];
        this.ui.setVertexPos('topRight', newTopRight);

        this.resizeShape();
        this.endScaleShape();
    }

    public setTrHeight(newHeight) {
        this.setInitialTrState();
        this.ui.startScale('bottomRight')
        const topRight = this.ui.getVertexPos('topRight');
        const bottomLeft = this.ui.getVertexPos('bottomRight');
        const angleRadians = Math.atan2(bottomLeft[1] - topRight[1], bottomLeft[0] - topRight[0]);

        const newBottomLeft = [
            topRight[0] + newHeight * Math.cos(angleRadians),
            topRight[1] + newHeight * Math.sin(angleRadians)
        ];

        this.ui.setVertexPos('bottomRight', newBottomLeft);

        this.resizeShape();
        this.endScaleShape();
    }

    private setInitialTrState() {
        this.initialTrState = this.getTrState();
    }

    //=================================================================================//
    //========================= get methods transformer ===============================//

    public getTrPos() {
        const position = this.ui.getVertexPos('topLeft');
        return [position[0], position[1]];
    }

    public getTrWidth() {
        const [topLeft, topRight] = [this.ui.getVertexPos('topLeft'), this.ui.getVertexPos('topRight')];
        return Math.hypot(topRight[0] - topLeft[0], topRight[1] - topLeft[1]);
    }

    public getTrHeight() {
        const [topLeft, bottomLeft] = [this.ui.getVertexPos('topLeft'), this.ui.getVertexPos('bottomLeft')];
        return Math.hypot(bottomLeft[0] - topLeft[0], bottomLeft[1] - topLeft[1]);
    }

    public getTrPivot() {
        return this.ui.getPivot()
    }

    public getTrScale() {
        const initialState = this.getInitialTrState();
        const currentStateW = this.getTrWidth();
        const currentStateH = this.getTrHeight();
        const scaleX = currentStateW / initialState.width;
        const scaleY = currentStateH / initialState.height;
        return { scaleX, scaleY };
    }

    public getTrAngle() {
        return this.ui.angle
    }

    public getTrRelativeAngle() {
        return this.ui.relativeAngle
    }

    public getTrState() {
        const { scaleX, scaleY } = this.getTrScale();
        return {
            pos: this.getTrPos(),
            width: this.getTrWidth(),
            height: this.getTrHeight(),
            scaleX,
            scaleY,
            staticVertex: this.getTrStaticVertex(),
            pivot: this.getTrPivot(),
            rotation: this.ui.angle,
        };
    }

    public getInitialTrState() {
        return this.initialTrState;
    }

    public getTrStaticVertex() {
        return this.ui.getStaticVertex()
    }
}

