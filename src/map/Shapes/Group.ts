import { G } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes'


class GroupShape extends BaseShape(G) {

    constructor(props, scene) {
        super(props, scene);
        this.init(props);
        this.shapes = [];
    }

    init(props) {
        this.setSharedProps(props);
        this.setInitialState();
    }

    getBounds() {
        let x: any = this.x();
        let y: any = this.y();
        let width: any = this.width();
        let height: any = this.height();
        return [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
    }

    getPivot() {
        return [this.rbox(this.svg).cx, this.rbox(this.svg).cy];
    }

    _rotate(newAngle) {
        if (!this.shapes) return;
        const pivot = this.getPivot();
        this.shapes.forEach(shape => {
            shape._rotate(newAngle,pivot)
        })
    }

    _center(pos) {
        if (!pos) return
        this.center(pos[0], pos[1]);
        this.setPivot([pos[0], pos[1]]);
    }

    _move(pos) {
        if (!pos) return
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

    _resize(newWidth, newHeight, pivot) {
        this.size(newWidth, newHeight);
        this._center(pivot);
    }

    group(shapes) {
        if (shapes.length > 1) {
            shapes.forEach(shape => {
                shape.originalParent(shape.parent())
                this.add(shape);
                this.shapes.push(shape);
            });
            return this
        }
    }

    ungroup() {
        const groupRotationAngle = this.rotation();
        const groupPivot = this.getPivot();

        this.shapes.forEach(shape => {
            const pivot = shape.getPivot();
            const childRotation = shape.rotation();
            const parent = shape.originalParent();

            if (parent) {
                shape._rotate(groupRotationAngle + childRotation, pivot);
                shape.center(pivot[0], pivot[1]);
                parent.add(shape);
            }
            
        });

        this.rotation(0);
        this.untransform();
        this.shapes = [];
    }

    getState() {
        return {
            ...this.getSharedState(),
        };
    }

}

export default GroupShape;