import { Text } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes';

export default class TextShape extends BaseShape(Text) {

    constructor(props, scene) {
        super(props, scene);
        this.init(props);
    }

    init(props) {
        this.text(props.textContent);
        this.font({
            size:props.fontSize,
            family:props.fontFamily,
            weight:props.fontWeight,
        });
        this.setSharedProps(props);
        this.setInitialState();
    }

    _center(pos) {
        if (!pos) return;
        this.center(pos[0], pos[1]);
        this.setPivot(pos)
    }

    _move(pos) {
        if (!pos) return;
        this.x(pos[0]);
        this.y(pos[1]);
        this.setPivot([this.x(), this.y()]);
    }

    _dmove(dpos) {
        if (!dpos) return;
        this.transform({
            translateX: dpos[0],
            translateY: dpos[1],
          })
    }

    _rotate(newAngle, origin) {
        if (newAngle == undefined) return;
        const [x, y] = origin ? origin : this.getOriginalPivot() || [0, 0];
        this.attr('transform', `rotate(${newAngle},${x},${y})`);
        this.rotation(newAngle);
    }

    _scale(scaleData) {
        const { scaleX, scaleY, pivot } = scaleData;
        const fontSize = parseFloat(this.fontSize()) || 12;
        const newFontSize = fontSize * scaleX;
        this.fontSize(newFontSize);
        this._move(pivot);
    }

    getState() {
        return {
            ...this.getSharedState(),
            textContent: this.text(),
            // fontSize: this.fontSize(),
            // fontFamily: this.fontFamily(),
            fill: this.fill(),
            x: this.x(),
            y: this.y(),
        };
    }

    revertScale(oldScaleData) {
        const { fontSize } = oldScaleData;
        const currentFontSize = parseFloat(this.fontSize()) || 12;
        const scaleX = fontSize / currentFontSize;
        const scaleY = scaleX; // Assuming same scale factor for x and y
        this._scale({ scaleX, scaleY, pivot: oldScaleData.pivot });
    }
}
