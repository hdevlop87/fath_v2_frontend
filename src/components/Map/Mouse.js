import { SVG } from '@svgdotjs/svg.js';


export default class Mouse {

   constructor() {
      this.input = {
         id: null,
         button: null,
         target: null,
         pos: {}
      }

      this.scaleFactor = 0.95;
      this.old_zoom = 1;
      this.svg = SVG("#SVG");
      this._mousedownFunc = this._mousedown.bind(this);
      this._mousemoveFunc = this._mousemove.bind(this);
      this._mouseupFunc = this._mouseup.bind(this);
      this._hoverFunc = this._hover.bind(this);
      this._leaveFunc = this._leave.bind(this);
      this._wheelFunc = this._wheel.bind(this);
      this._contextmenuFunc = this._contextmenu.bind(this);

      this.svg.on('contextmenu', this._contextmenuFunc);
      this.svg.on('mousedown', this._mousedownFunc);
      this.svg.on('mouseover', this._hoverFunc);
      this.svg.on('mouseout', this._leaveFunc);
      this.svg.on('wheel', this._wheelFunc);
      this.svg.on('mousemove', this._mousemoveFunc);
      this.svg.on('mouseup', this._mouseupFunc);

      this.mouseText = this.svg.text('');

   }

   _calculateXY(ev) {
      var startPoint = this.svg.point(ev.clientX, ev.clientY);
      this.input.pos.x = startPoint.x
      this.input.pos.y = startPoint.y
      this.input.button = ev.button
      this.input.target = ev.target
      this.input.id = ev.target.id
      return this.input
   }

   _mousedown(ev) {
      ev.preventDefault()
      this._calculateXY(ev);
      this.click && this.click(this.input)
      this.listenersSet = true;
   }

   _mousemove(ev) {
      ev.preventDefault();
      this._calculateXY(ev);
      this.move && this.move(this.input);
      //this.handleMove(this.input)
   }

   _mouseup(ev) {
      ev.preventDefault();
      this._calculateXY(ev);
      this.stop && this.stop(this.input);
      // this.svg.off('mousemove', this._mousemoveFunc);
      // this.svg.off('mouseup', this._mouseupFunc);
   }

   _remove() {
      this.svg.off('mousedown', this._mousedownFunc);
      this.svg.off('mousemove', this._mousemoveFunc);
      this.svg.off('mouseup', this._mouseupFunc);
      this.svg.off('mouseover', this._hoverFunc); // remove hover event listener
      this.svg.off('mouseout', this._leaveFunc);
   }

   _wheel(e) {
      this._calculateXY(e)
      var normalized;
      var delta = e.wheelDelta;

      if (delta) {
         normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
      } else {
         delta = e.deltaY || e.detail || 0;
         normalized = (delta % 3 ? delta * 10 : delta / 3);
      }

      var scaleDelta = normalized > 0 ? this.scaleFactor : 1 / this.scaleFactor;
      this.old_zoom *= scaleDelta;

      if (this.old_zoom >= 4) {
         scaleDelta = 1;
         this.old_zoom = 2
      }

      this.input.wheel = scaleDelta

      this.wheel && this.wheel(this.input)
   }

   _contextmenu(e) {
      e.preventDefault();
      return false;
   }

   _hover(ev) {
      this._calculateXY(ev);
      this.hover && this.hover(this.input)
   }

   _leave(e) {
      this.leave && this.leave(this.input)
   }

   // handleMove(input) {
   //    this.mouseText.text(`   x: ${input.pos.x}, y: ${input.pos.y}`);
   //    this.mouseText.fill('red'); 
   //    this.mouseText.move(0, 0).front();
   // }


}