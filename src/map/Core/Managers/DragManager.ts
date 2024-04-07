
export default class DragManager {
    [x: string]: any;

    constructor(scene) {

        this.scene = scene
        this.mouse = scene.mouse;
        this.transformer = scene.transformer;
        this.svg = scene.mainSvg;
        this.box = { x: 0, y: 0 };
        this.lastClick = { x: 0, y: 0 };
        this.dragging = false;

        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);

    }

    startDrag(el, pos) {
        this.el = el;
        this.box = this.el.bbox();
        this.lastClick = pos;
        this.dragging = true;
        this.scene.fire('startDrag', this.el);
        this.mouse.registerEvent('mousemove', this.drag);
        this.mouse.registerEvent('mouseup', this.endDrag);
    }

    drag({ pos }) {
        if (!this.dragging) return;
        let dx = pos.x - this.lastClick.x;
        let dy = pos.y - this.lastClick.y;
        this.box.x += dx;
        this.box.y += dy;
        this.el.dmove(dx, dy);
        this.lastClick = pos;
        this.scene.fire('onDrag', this.el);
    }

    endDrag(ev) {
        if (!this.dragging) return;
        this.scene.fire('endDrag', this.el);
        this.mouse.unregisterEvent('mousemove', this.drag);
        this.mouse.unregisterEvent('mouseup', this.endDrag);
        this.dragging = false;
    }

}

