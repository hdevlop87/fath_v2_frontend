import BaseShape from './BaseShapes';
import { Ellipse } from '@svgdotjs/svg.js';

export default class EllipseShape extends BaseShape(Ellipse) {

    constructor(props, scene) {
        super(props,scene);
        this.init(props);
    }

    init(props) {
        this.setSharedProps(props);
        this.radius(props.r || 50);
        this.pivot = this.getOriginalPivot();
        this.setInitialState();
    }

    getBounds() {
        const r = this.radius();
        const cx = this.cx();
        const cy = this.cy();
        return [
            [cx - r, cy - r],
            [cx + r, cy - r],
            [cx + r, cy + r],
            [cx - r, cy + r]
        ];
    }
    
    _center(pos) {
        if(!pos) return
        this.setPivot(pos);
        this.center(pos[0], pos[1]);
    }

    _move(pos) {
        this.cx(pos[0]);
        this.cy(pos[1]);
        this.setPivot([this.cx(), this.cy()]);
    }

    _dmove(dpos) {
        this.cx(this.cx() + dpos[0]);
        this.cy(this.cy() + dpos[1]);
        this.setPivot([this.cx(), this.cy()]);
    }

    _rotate(newAngle, origin) {
        if (!newAngle) return;
        const [cx, cy] = origin ? origin : this.getPivot() || [0, 0];
        this.attr('transform', 'rotate(' + newAngle + ',' + cx + ',' + cy + ')');
        this.center(cx, cy);
        this.rotation(newAngle);
    }

    _scale(scaleData) {
        const { scaleX, pivot } = scaleData;
        const newRadius = this.initialState.r * scaleX;
        this.radius(newRadius);
        this._center(pivot);
    }

    getState() {
        return {
            ...this.getSharedState(),
            r: this.radius(),
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