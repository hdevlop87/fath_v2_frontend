import { SVG, on } from '@svgdotjs/svg.js';
import { GRID_CELL, RIGHT_CLICK,LEFT_CLICK, ZOOM } from '../../utils/constants'

export default class Mouse {
   [x: string]: any;
   static instance: any;

   constructor() {
      if (!Mouse.instance) {
         Mouse.instance = this;
         this.input = {
            id: null,
            button: null,
            target: null,
            pos: {
               x: 0, y: 0
            },
            wheel: 0,
            clientX:0,
            clientY:0
         }

         this.scaleFactor = 0.95;
         this.old_zoom = 1;
         this.svg = SVG("#SVG");
         this.mouseLayer = SVG("#mouse");
         this._click = this._click.bind(this);
         this._dblclick = this._dblclick.bind(this);
         this._mousedown = this._mousedown.bind(this);
         this._mousemove = this._mousemove.bind(this);
         this._mouseup = this._mouseup.bind(this);
         this._wheel = this._wheel.bind(this);
         this._contextmenu = this._contextmenu.bind(this);
         this._mouseover = this._mouseover.bind(this);
         this._mouseout = this._mouseout.bind(this);

         this.eventCallbacks = {
            click: [],
            dblclick: [],
            mousedown: [],
            mousemove: [],
            mouseup: [],
            wheel: [],
            contextmenu: [],
            mouseover: [],
            mouseout: []
         };

         this._bindEvents();

         // this.mouseText = this.mouseLayer.text('x:0, y:0').fill('orange');
         // this.mouseText.back()
      }

      return Mouse.instance;
   }

   _bindEvents() {
      Object.keys(this.eventCallbacks).forEach(event => {
         this.svg.on(event, this[`_${event}`].bind(this), { passive: false });
      });
   }

   registerEvent(eventType, callback) {
      if (this.eventCallbacks[eventType]) {
         this.eventCallbacks[eventType].push(callback);
      }
   }

   unregisterEvent(eventType, callback) {
      if (this.eventCallbacks[eventType]) {
         this.eventCallbacks[eventType] = this.eventCallbacks[eventType].filter(cb => cb !== callback);
      }
   }

   _triggerEvent(eventType, input) {
      this.eventCallbacks[eventType].forEach(callback => callback(input));
   }

   clearAllEvents() {
      Object.keys(this.eventCallbacks).forEach(eventType => {
         this.eventCallbacks[eventType] = [];
      });
   }

   _calculateXY(ev) {
      const startPoint = this.svg.point(ev.clientX, ev.clientY);
      return {
         ...this.input,
         pos: {
            x: startPoint.x,
            y: startPoint.y,
         },
         button: ev.button,
         target: ev.target,
         id: ev.target.id,
         clientX:ev.clientX,
         clientY:ev.clientY
      };
   }

   _click(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      this._triggerEvent('click', this.input);
   }

   _dblclick(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      this._triggerEvent('dblclick', this.input);
   }

   _mousedown(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      this.input.rightClick = (ev.button === RIGHT_CLICK);
      this.input.leftClick = (ev.button === LEFT_CLICK);
      this._triggerEvent('mousedown', this.input);
   }

   _mousemove(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      // this._drawMousePos(this.input.pos);
      this._triggerEvent('mousemove', this.input);
   }

   _mouseup(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      this._triggerEvent('mouseup', this.input);
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

      this._triggerEvent('wheel', this.input);
   }

   _contextmenu(ev) {
      ev.preventDefault();
      this.input = this._calculateXY(ev);
      this._triggerEvent('contextmenu', this.input);
      return false;
   }

   _mouseover(ev) {
      this.input = this._calculateXY(ev);
      this._triggerEvent('mouseover', this.input);
   }

   _mouseout(ev) {
      this.input = this._calculateXY(ev);
      this._triggerEvent('mouseout', this.input);
   }

   private snapToGrid(pos) {
      return {
          x: Math.round(pos.x / 4) * 4,
          y: Math.round(pos.y / 4) * 4
      };
  }

   _drawMousePos(pos) {
      const xOffset = 10;
      const yOffset = 20;
      let {x,y} = this.snapToGrid(pos)
      this.mouseText.text(`x:${x}, y:${y}`);
      this.mouseText.move(x + xOffset, y + yOffset);
   }

   _isRightClick(){

   }

}