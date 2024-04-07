import { defaultProps } from './defaultProps';
import { factory } from '../Core/Factory'
import { SVG } from '@svgdotjs/svg.js';
import { Rima } from '../Core/Rima';

const BaseShape = (Base) => {
    const part = class extends Base {
        constructor(props, scene) {
            super();
            this.scene = scene;
            this.transformer = scene.transformer;
            this.svg = scene.mainSvg;
            this.name(props.type)
        }

        private draw(el) {
            this.layer.add(el);
        }

        private _setLayer(layer) {
            if (typeof layer === 'object') {
                this.layer = layer;
            } 
            else if (typeof layer === 'string') {
                this.layer = SVG('#' + layer);
            } 
        }

        //===================================================================================//
        //============================ set shape methods ====================================//

        public setSharedProps(props) {
            const settings = { ...defaultProps[props.type], ...props };
            this._setLayer(settings.layer);
            this.draw(this);
            this.width(settings.width);
            this.height(settings.height);
            this.setFill(settings.fill)
            this.setStroke(props.stroke)
            this.setId(props.id);
            this.x(props.x);
            this.y(props.y);
            this.cx(props.cx);
            this.cy(props.cy);
            this._move(props.pos);
            this._center(props.center);
            this._rotate(props.rotation || props.rotate, props.pivot);
            props.translate && this._dmove(props.translate);

            
        }

        public setId(id) {
            if (!id) return;
            this.attr({ id: id })
        }

        public setFill(fill) {
            if (!fill) return;
            const fillProps = typeof fill === 'object' ? fill : { color: fill, opacity: fill.fillOpacity };
            this.fill(fillProps);
        }

        public setStroke(stroke) {
            if (!stroke) return;
            const strokeProps = typeof stroke === 'object' ? stroke : {
                color: stroke,
                width: stroke.strokeWidth,
                dasharray: stroke.strokeDasharray,
                opacity: stroke.strokeOpacity
            };
            this.stroke(strokeProps);
        }

        public setLayer(newLayer) {
            this._setLayer(newLayer);
            this.draw(this);
        }

        public setPivot(pos) {
            this.pivot = [pos[0], pos[1]];
            if (this.name() === 'Group' || this.name() === 'Circle' || this.name() === 'Rect') {
                this.updateRotationPivot(this.pivot)
            }
        }

        public setInitialState() {
            this.initialState = this.getState()
        }

        //=======================================================================================//
        //================================ get shape methods ====================================//

        public getBounds() {
            return [
                [this.x(), this.y()],
                [this.x() + this.width(), this.y()],
                [this.x() + this.width(), this.y() + this.height()],
                [this.x(), this.y() + this.height()]
            ];
        }

        public getInitialState() {
            return this.initialState
        }

        public getOriginalPivot() {
            const rbox = this.rbox(this.svg);
            return [rbox.cx, rbox.cy];
        }

        public getPivot() {
            return this.pivot;
        }

        public getStroke() {
            const strokeObject = {
                color: this.attr('stroke'),
                width: this.attr('stroke-width'),
                dasharray: this.attr('stroke-dasharray'),
                opacity: this.attr('stroke-opacity'),
            };

            const filteredStroke = {};
            Object.entries(strokeObject).forEach(([key, value]) => {
                if (value != null) {
                    filteredStroke[key] = value;
                }
            });

            return filteredStroke;
        }

        public getFill() {
            const fillObject = {
                color: this.attr('fill'),
                opacity: this.attr('fill-opacity'),
            };

            const filteredFill = {};
            Object.entries(fillObject).forEach(([key, value]) => {
                if (value !== null) {
                    filteredFill[key] = value;
                }
            });

            return filteredFill;
        }

        public getLayer() {
            return this.layer
        }

        public getSharedState() {
            return {
                id: this.id(),
                name: this.name(),
                category: this.category(),
                width: this.width(),
                height: this.height(),
                fill: this.getFill(),
                stroke: this.getStroke(),
                center: [this.cx(), this.cy()],
                pos: [this.x(), this.y()],
                rotation: this.rotation(),
                pivot: this.getPivot(),
                layer: this.getLayer()
            };
        }

        //=======================================================================================//
        //============================= multie shape methods ====================================//

        public updateRotationPivot(newOrigin) {
            let transformAttr = this.attr('transform');
            if (!transformAttr) return;

            const rotateRegex = /rotate\(([^,]+),[^,]+,[^)]+\)/;
            let angleMatch = transformAttr.match(rotateRegex);
            let angle = angleMatch ? angleMatch[1] : 0;
            const [newOriginX, newOriginY] = newOrigin;
            if (angleMatch) {
                transformAttr = transformAttr.replace(rotateRegex, `rotate(${angle},${Math.round(newOriginX)},${Math.round(newOriginY)})`);
            }
            else {
                transformAttr += ` rotate(${angle},${Math.round(newOriginX)},${Math.round(newOriginY)})`;
            }
            this.attr('transform', transformAttr);
            return this;
        }

        public drawPivot(props?) {
            if (this.pivotCirle) {
                this.pivotCirle.center(this.pivot[0], this.pivot[1]);
            }
            else {
                this.pivotCirle = this.svg.circle(10).fill({ color: props?.color || 'orange' }).center(this.pivot[0], this.pivot[1]);
            }
            return this.pivotCirle
        }

        public drawBBox(props?) {

            if (this.rectBBox) {
                this.rectBBox.plot(this.getBounds());
            }

            else {
                this.rectBBox = Rima('polygon', {
                    points: this.getBounds(),
                    fill: 'none',
                    stroke: { color: props?.color || 'red', width: 2, dasharray: "5,5" }
                });
            }
            return this.rectBBox
        }

        public isScaled() {
            const { scaleX, scaleY } = this.transform();
            return scaleX !== 1 || scaleY !== 1;
        }

        public isRotated() {
            const { rotate } = this.transform();
            return rotate !== 0;
        }

        public hasMatrixTr() {
            const matrixRegex = /^matrix\(/;
            const attrTr = this.attr('transform');
            return matrixRegex.test(attrTr);
        }

        public clone(props = {}) {
            return Rima(this.name(), { ...this.getState(), ...props });
        }

    };

    factory(Base, attrObj);
    return part;
};

export default BaseShape

const attrObj = {
    name: {
        type: 'string',
        defaultValue: ''
    },
    category: {
        type: 'string',
        defaultValue: 'shapes'
    },
    index: {
        type: 'number',
        defaultValue: 20
    },
    rotation: {
        type: 'number',
        defaultValue: 0
    },
    isDraggable: {
        type: 'boolean',
        defaultValue: true
    },
    originalParent: {
        type: 'object',
        defaultValue: null
    }
};