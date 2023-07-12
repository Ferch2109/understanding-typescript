class Component {
    constructor(insertAtBeggining, templateId, hostId, elementId) {
        this.insertAtBeggining = insertAtBeggining;
        this.attach = () => {
            const position = this.insertAtBeggining ? 'afterbegin' : 'beforeend';
            this.hostEl.insertAdjacentElement(position, this.element);
        };
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId) {
            this.element.id = elementId;
        }
        this.attach();
    }
}
export default Component;
//# sourceMappingURL=base-component.js.map