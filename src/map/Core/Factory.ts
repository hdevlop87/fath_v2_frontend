
export function factory(constructor, attrObj) {
    for (let attr in attrObj) {
        if (attrObj.hasOwnProperty(attr)) {
            const privateAttr = '_' + attr;
            const defaultValue = attrObj[attr].defaultValue;

            constructor.prototype[attr] = function (value) {
                if (arguments.length === 0) {
                    return this[privateAttr] !== undefined ? this[privateAttr] : defaultValue;
                } else {
                    this[privateAttr] = value;
                }
            };
        }
    }

    const originalConstructor = constructor;
    
    constructor = function (this: any, options: any = {}) {
        for (let attr in attrObj) {
            if (attrObj.hasOwnProperty(attr)) {
                const defaultValue = attrObj[attr].defaultValue;
                this['_' + attr] = options[attr] !== undefined ? options[attr] : defaultValue;
            }
        }
        originalConstructor.apply(this, arguments);
    };

    return constructor;
}

