import { Path } from '@svgdotjs/svg.js';
import BaseShape from './BaseShapes'

interface ShapeInterface {
    init(props: any): void;
    getBounds(): number[][];
    _center(newCenter: number[]): void;
    _move(pos: number[]): void;
    _resize(scaleData: { scaleX: number; scaleY: number; staticVertex: number[] }): void;
    _rotate(newAngle: number, origin?: number[]): void;
    getInitialPoints():any;
    getState(): any;
}

class PathShape extends BaseShape(Path) implements ShapeInterface{

    constructor(props, scene) {
        super(props, scene);
        this.init(props);
    }

    init(props) {
        this.setSharedProps(props);
        this.plot(props.d);
        this.pivot = this.getOriginalPivot();
        this.setInitialState();
    }

    _center(newCenter) {

    }

    _move(pos) {

    }

    _resize(scaleData) {

    }

    _rotate(newAngle) {

    }

    getInitialPoints() {

    }

    getState() {

    }


}

export default PathShape;