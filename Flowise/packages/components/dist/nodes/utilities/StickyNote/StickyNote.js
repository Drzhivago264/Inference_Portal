"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StickyNote {
    constructor() {
        this.label = 'Sticky Note';
        this.name = 'stickyNote';
        this.version = 1.0;
        this.type = 'StickyNote';
        this.icon = 'stickyNote.svg';
        this.category = 'Utilities';
        this.description = 'Add a sticky note';
        this.inputs = [
            {
                label: '',
                name: 'note',
                type: 'string',
                rows: 1,
                placeholder: 'Type something here',
                optional: true
            }
        ];
        this.baseClasses = [this.type];
    }
    async init() {
        return new StickyNote();
    }
}
module.exports = { nodeClass: StickyNote };
//# sourceMappingURL=StickyNote.js.map