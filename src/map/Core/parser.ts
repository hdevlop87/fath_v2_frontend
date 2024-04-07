import { locate } from 'locate-character';
import {extractTransform} from '../utils/index'

const validNameCharacters = /[a-zA-Z0-9:_-]/;
const whitespace = /[\s\t\r\n]/;
const quotemark = /['"]/;

function repeat(str, i) {
    let result = '';
    while (i--) result += str;
    return result;
}

function underscoreToCamelCase(str) {
    return str.replace(/[_-]([a-z])/g, function (match, group1) {
        return group1.toUpperCase();
    });
}

export function parse(source) {
    let header = '';
    let stack = [];

    let currentElement = null;
    let root = null;
    let i = 0;

    let currentState = state;

    function error(message) {
        const { line, column } = locate(source, i);
        const before = source.slice(0, i);
        const beforeLine = /(^|\n).*$/.exec(before)[0].replace(/\t/g, '  ');
        const after = source.slice(i);
        const afterLine = /.*(\n|$)/.exec(after)[0];

        const snippet = `${beforeLine}${afterLine}\n${repeat(' ', beforeLine.length)}^`;

        throw new Error(
            `${message} (${line}:${column}). If this is valid SVG, it's probably a bug in svg-parser. Please raise an issue at https://github.com/Rich-Harris/svg-parser/issues – thanks!\n\n${snippet}`
        );
    }

    function state() {
        let i = 0;
        while ((i < source.length && source[i] !== '<') || !validNameCharacters.test(source[i + 1])) {
            header += source[i++];
        }
        return neutral();
    }

    function neutral() {
        let text = '';
        while (i < source.length && source[i] !== '<') text += source[i++];

        if (/\S/.test(text)) {
            currentElement.props.textContent = text;
        }

        if (source[i] === '<') {
            return tag;
        }

        return neutral;
    }

    function tag() {
        const char = source[i];

        if (char === '?') return neutral; // <?xml...

        if (char === '!') {
            if (source.slice(i + 1, i + 3) === '--') return comment;
            if (source.slice(i + 1, i + 8) === '[CDATA[') return cdata;
            if (/doctype/i.test(source.slice(i + 1, i + 8))) return neutral;
        }

        if (char === '/') return closingTag;

        const type = getName();

        const element:any = {
            type,
            props: {},
            children: []
        };

        if (currentElement) {
            currentElement.children.push(element);
        } else {
            root = element;
        }

        let attribute;
        while (i < source.length && (attribute = getAttribute())) {
            element.props[attribute.name] = attribute.value.toString();
            if (attribute.name === 'transform') {
                const transformValues = extractTransform(attribute.value);
                if (transformValues !== null) {
                    Object.assign(element.props, transformValues);
                    delete element.props?.transform;
                }
            }
        }

        let selfClosing = false;

        if (source[i] === '/') {
            i += 1;
            selfClosing = true;
        }

        if (source[i] !== '>') {
            error('Expected >');
        }

        if (!selfClosing) {
            currentElement = element;
            stack.push(element);
        }

        return neutral;
    }

    function comment() {
        const index = source.indexOf('-->', i);
        if (!~index) error('expected -->');

        i = index + 2;
        return neutral;
    }

    function cdata() {
        const index = source.indexOf(']]>', i);
        if (!~index) error('expected ]]>');

        currentElement.children.push(source.slice(i + 7, index));

        i = index + 2;
        return neutral;
    }

    function closingTag() {
        const type = getName();

        if (!type) error('Expected tag name');

        if (type !== currentElement.type) {
            error(`Expected closing tag </${type}> to match opening tag <${currentElement.type}>`);
        }

        allowSpaces();

        if (source[i] !== '>') {
            error('Expected >');
        }

        stack.pop();
        currentElement = stack[stack.length - 1];

        return neutral;
    }

    function getName() {
        let name = '';
        while (i < source.length && validNameCharacters.test(source[i])) name += source[i++];
        return underscoreToCamelCase(name);
    }

    function getAttribute() {
        if (!whitespace.test(source[i])) return null;
        allowSpaces();

        const name = getName();
        if (!name) return null;

        let value;

        allowSpaces();
        if (source[i] === '=') {
            i += 1;
            allowSpaces();

            value = getAttributeValue();
            if (!isNaN(value) && value.trim() !== '') value = +value;
        }

        return { name, value };
    }

    function getAttributeValue() {
        return quotemark.test(source[i]) ? getQuotedAttributeValue() : getUnquotedAttributeValue();
    }

    function getUnquotedAttributeValue() {
        let value = '';
        do {
            const char = source[i];
            if (char === ' ' || char === '>' || char === '/') {
                return value;
            }

            value += char;
            i += 1;
        } while (i < source.length);

        return value;
    }

    function getQuotedAttributeValue() {
        const quotemark = source[i++];

        let value = '';
        let escaped = false;

        while (i < source.length) {
            const char = source[i++];
            if (char === quotemark && !escaped) {
                return value;
            }

            if (char === '\\' && !escaped) {
                escaped = true;
            }

            value += escaped ? `\\${char}` : char;
            escaped = false;
        }
    }

    function allowSpaces() {
        while (i < source.length && whitespace.test(source[i])) i += 1;
    }

    while (i < source.length) {
        currentState = currentState();
        i += 1;
    }

    return root;
}


