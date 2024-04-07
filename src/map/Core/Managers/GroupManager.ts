

export default class GroupManager {

    [x: string]: any;

    constructor(scene) {
        this.scene = scene
        this.svg = scene.mainSvg;
        this.transformer = scene.transformer;
    }

    add(shapes) {
        this.GTransfomer = this.scene.transformer.getTrTempGroup();
        shapes.forEach(shape => {
            shape.originalParent(shape.parent())
            this.GTransfomer.add(shape);
        });
        return this.GTransfomer;
    }

    ungroup() {
        let groupRotation = this.GTransfomer.rotation();
        this.GTransfomer.each(function () {
            let parent = this.originalParent();
            let pivot = this.getPivot();
            let childRotation = this.rotation();

            if (this.type === ('polygon' || 'polyline' || 'line' || 'path')) {
                this._rotate(groupRotation + childRotation, this.transformer.getTrPivot());
            }
            else {
                this._rotate(groupRotation + childRotation, pivot);
                this.center(pivot[0], pivot[1]);
            }
            parent.add(this);
        });
        this.GTransfomer.rotation(0)
        this.GTransfomer.untransform();
    }
}