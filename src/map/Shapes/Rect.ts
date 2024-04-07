import { Rect } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes';

export default class RectShape extends BaseShape(Rect) {

    constructor(props, scene) {
        super(props,scene);
        this.init(props);
    }

    init(props) {
        this.setSharedProps(props);
        this.ry(props.ry);
        this.rx(props.rx);
        this.pivot = this.getOriginalPivot();
        this.setInitialState();
    }

    _center(pos) {
        if (!pos) return;
        this.center(pos[0], pos[1]);
        this.setPivot(pos)
    }

    _move(pos) {
        if (!pos) return;
        this.cx(pos[0]);
        this.cy(pos[1]);
        this.setPivot([this.cx(), this.cy()]);
    }

    _dmove(dpos) {
        if (!dpos) return;
        this.cx(this.cx() + dpos[0]);
        this.cy(this.cy() + dpos[1]);
        this.setPivot([this.cx(), this.cy()]);
    }

    _rotate(newAngle, origin) {
        if (newAngle == undefined) return;
        const [cx, cy] = origin ? origin : this.getPivot() || [0, 0];
        this.attr('transform', 'rotate(' + newAngle + ',' + cx + ',' + cy + ')');
        this.rotation(newAngle);
    }

    _scale(scaleData) {
        const { scaleX, scaleY, pivot } = scaleData;
        const newWidth = this.initialState.width * scaleX;
        const newHeight = this.initialState.height * scaleY;
        this.size(newWidth, newHeight);
        this._center(pivot);
    }

    getState() {
        return {
            ...this.getSharedState(),
            rx: this.rx(),
            ry: this.ry(),
        };
    }

    revertScale(oldScaleData) {
        const { width, height } = oldScaleData;
        const currentWidth = this.width();
        const currentHeight = this.height();
        const scaleX = width / currentWidth;
        const scaleY = height / currentHeight;
        this._scale({ scaleX, scaleY, pivot: oldScaleData.pivot });
    }
}

