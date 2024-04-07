export const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

export const parseValue = (value) => {
   let Value = 0;
   let unit = '';

   if (typeof value === 'number') {
      Value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value;
   } else if (typeof value === 'string') {
      const match = value.match(numberAndUnit);
      if (match) {
         Value = parseFloat(match[1]);
         if (match[5] === '%') {
            Value /= 100;
         } else if (match[5] === 's') {
            Value *= 1000;
         }
         unit = match[5];
      }
   } else if (value instanceof SVGNumber) {
      Value = value.valueOf();
      unit = value.unit;
   }

   return { Value, unit };
}

export function capitalize(s) {
   return s.charAt(0).toUpperCase() + s.slice(1)
}

export const UUID = () => {
   let uuid;
   do {
      uuid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
         const r = Math.random() * 16 | 0;
         const v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      });
   } while (document.getElementById(uuid));
   return 'r' + uuid;
}

export const mapInterval = (value, oldMin, oldMax, newMin, newMax) => {
   const newValue = (((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
   return newValue.toString();
}

export const setTextSVGCursor = (e) => {
   let cursor = document.getElementById('SVGcursor');
   cursor.innerHTML = `SVG( x: ${e.x.toFixed(2)}   y: ${e.y.toFixed(2)} )`
}


export function radians(d) {
   return d % 360 * Math.PI / 180
}



export function map(array, block) {
   let i
   const il = array.length
   const result = []

   for (i = 0; i < il; i++) {
      result.push(block(array[i]))
   }

   return result
}
//=================================================================================//
//=========================== Dom Manipulation ====================================//

export const SVG_NS = 'http://www.w3.org/2000/svg'
export const html = 'http://www.w3.org/1999/xhtml'
export const xmlns = 'http://www.w3.org/2000/xmlns/'
export const xlink = 'http://www.w3.org/1999/xlink'
export const svgjs = 'http://svgjs.dev/svgjs'
export const root = 'Svg'

//=================================================================================//
export function createSvgElement(name, attrs, opt_parent) {
   const e = document.createElementNS(SVG_NS, String(name));
   for (const key in attrs) {
      e.setAttribute(key, `${attrs[key]}`);
   }
   if (opt_parent) {
      opt_parent.appendChild(e);
   }
   return e;
}

//=================================================================================//
export function addClass(element, className) {
   const classNames = className.split(' ');
   if (classNames.every((name) => element.classList.contains(name))) {
      return false;
   }
   element.classList.add(...classNames);
   return true;
}

//=================================================================================//
export function removeClasses(element, classNames) {
   element.classList.remove(...classNames.split(' '));
}
//=================================================================================//
export function removeClass(element, className) {
   const classNames = className.split(' ');
   if (classNames.every((name) => !element.classList.contains(name))) {
      return false;
   }
   element.classList.remove(...classNames);
   return true;
}
//=================================================================================//
export function hasClass(element, className) {
   return element.classList.contains(className);
}
//=================================================================================//
export function removeNode(node) {
   return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
//=================================================================================//
export function insertAfter(newNode, refNode) {
   const siblingNode = refNode.nextSibling;
   const parentNode = refNode.parentNode;
   if (!parentNode) {
      throw Error('Reference node has no parent.');
   }
   if (siblingNode) {
      parentNode.insertBefore(newNode, siblingNode);
   } else {
      parentNode.appendChild(newNode);
   }
}
//=================================================================================//
export function containsNode(parent, descendant) {
   return !!(
      parent.compareDocumentPosition(descendant) &
      NodeType.DOCUMENT_POSITION_CONTAINED_BY);
}
//=================================================================================//
export function getAttrFromStr(string){
   const htmlString = string;
   const regex = /(\w+)="([^"]+)"/g;
   let match;
   const attributes = {};

   while ((match = regex.exec(htmlString)) !== null) {
       const attributeName = match[1];
       const attributeValue = match[2];
       attributes[attributeName] = attributeValue;
   }

   return attributes
}