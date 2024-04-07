import { UUID } from '../../utils';
import { Parts } from '../Rima';

export default class PartManager {

    parts: Map<any, any>;
    scene: any;
    partLayer: any;

    constructor(scene) {
        this.parts = new Map();
        this.scene = scene;
        this.partLayer = scene.partLayer;
    }

    addPart(type, props) {
        const PartClass = Parts[type];
        if (!PartClass) {
            throw new Error("Part type  not found");
        }
        
        if (!props.layer) {
            props.layer = 'SVG';
        }

        const category = props.category || 'shapes';
        const id = props.id || UUID();
        const part = new PartClass({ ...props, type }, this.scene);

        part.id(id);
        part.category(category);
        part.isDraggable(false);
        this.parts.set(id, part);
        return part;
    }

    getPartsByCategory(category) {
        const partsByCategory = [];
        this.parts.forEach((part) => {
            if (part.category() === category) {
                partsByCategory.push(part);
            }
        });
        return partsByCategory;
    }

    getPartCategory(id) {
        const part = this.parts.get(id.toString());
        if (part) {
            return part.category();
        } else {
            throw new Error('Part does not exist.');
        }
    }

    getPartById(partId) {
        return this.parts.get(partId);
    }

    getAll() {
        return Array.from(this.parts.values());
    }

    getAllParts() {
        let allElements = Array.from(this.parts.values());
        const filteredParts = allElements.filter(part =>
            this.isShape(part.id())
        );
        return filteredParts
    }

    getAllPartsIds() {
        return Array.from(this.parts.keys());
    }

    removePart(part) {
        const partId = part.id();
        if (this.hasPart(partId)) {
            part.remove();
            this.parts.delete(partId);
        } else {
            throw new Error('Part does not exist.');
        }
    }

    removePartById(partId) {
        if (!this.hasPart(partId)) {
            throw new Error('Part does not exist.');
        }
        const part = this.getPartById(partId);
        part.remove();
        this.parts.delete(partId);
    }

    clearAllParts() {
        this.parts.forEach((part, id) => {
            this.removePartById(id);
        });
        this.parts.clear();
    }

    hasPart(partId) {
        return this.parts.has(partId);
    }

    isShape(id) {
        return this.getPartCategory(id) === 'shapes'
    }

    isUIElements(id) {
        return this.getPartCategory(id) === 'UIElements'
    }

    serializeAllParts() {
        let serializedParts: any = [];
        this.parts.forEach((part) => {

        });
        return serializedParts;
    }

    deserializeAllParts(serializedParts) {
        serializedParts.forEach(partData => {
            this.deserializePart(partData);
        });
    }

    deserializePart(partData) {
        return this.addPart(partData.name(), partData.part);
    }

    restorePart(shape) {
        let layer = shape.layer;
        layer.add(shape);
        this.parts.set(shape.id(), shape);
    }

}
