var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component';
import Binded from '../decorators/autobind';
class ProjectItem extends Component {
    get persons() {
        if (this.project.people === 1) {
            return this.project.people.toString() + ' person assigned';
        }
        return this.project.people.toString() + ' persons assigned';
    }
    constructor(project, listId) {
        super(false, 'single-project', listId, project.id);
        this.project = project;
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
    renderContent() {
        this.element.appendChild(this.title);
        this.element.appendChild(this.people);
        this.element.appendChild(this.description);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) { }
}
__decorate([
    Binded
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Binded
], ProjectItem.prototype, "dragEndHandler", null);
export default ProjectItem;
//# sourceMappingURL=project-item.js.map