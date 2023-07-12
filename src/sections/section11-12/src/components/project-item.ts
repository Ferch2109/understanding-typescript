import { Draggable } from '../models/drag-drop';
import Component from './base-component';
import { Project } from '../models/project';
import Binded from '../decorators/autobind';

class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
{
    title: HTMLHeadingElement;
    description: HTMLParagraphElement;
    people: HTMLSpanElement;

    get persons(): string {
        if (this.project.people === 1) {
            return this.project.people.toString() + ' person assigned';
        }

        return this.project.people.toString() + ' persons assigned';
    }

    constructor (public project: Project, listId: string) {
        super(false, 'single-project', listId, project.id);

        this.title = document.createElement('h2');
        this.description = document.createElement('p');
        this.people = document.createElement('span');
    
        this.configure();
        this.renderContent();
    }

    configure() {
        this.title.textContent = this.project.title;
        this.description.textContent = this.project.description;
        this.people.textContent = this.persons;

        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.appendChild(this.title);
        this.element.appendChild(this.people);
        this.element.appendChild(this.description);
    }

    @Binded
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @Binded
    dragEndHandler(_: DragEvent): void {}
}

export default ProjectItem;