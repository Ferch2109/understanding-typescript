var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component';
import Binded from '../decorators/autobind';
import ProjectItem from './project-item';
import { projectState } from '../state/project-state';
class ProjectList extends Component {
    constructor(type) {
        super(false, 'project-list', 'app', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        projectState.addListener((projects) => {
            this.assignedProjects = projects.filter(project => project.status === this.type);
            ;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul').classList.add('droppable');
        }
    }
    dropHandler(event) {
        const id = event.dataTransfer.getData('text/plain');
        projectState.moveProject(id, this.type);
    }
    dragLeaveHandler(_) {
        this.element.querySelector('ul').classList.remove('droppable');
    }
    renderProjects() {
        const listId = `${this.type}-project-list`;
        const listEl = document.getElementById(listId);
        listEl.replaceChildren('');
        for (const project of this.assignedProjects) {
            new ProjectItem(project, listId);
        }
    }
}
__decorate([
    Binded
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Binded
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Binded
], ProjectList.prototype, "dragLeaveHandler", null);
export default ProjectList;
//# sourceMappingURL=project-list.js.map