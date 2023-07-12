abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor (
        private insertAtBeggining: boolean,
        templateId: string,
        hostId: string,
        elementId?: string,
    ) {
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostId)! as T;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        if (elementId) {
            this.element.id = elementId;
        }
        
        this.attach();
    }

    private attach = (): void => {
        const position = this.insertAtBeggining ? 'afterbegin' : 'beforeend';
        this.hostEl.insertAdjacentElement(position, this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
    
}

export default Component;