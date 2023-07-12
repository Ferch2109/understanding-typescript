import { DragTarget} from '../models/drag-drop';
import Component from './base-component';
import Binded from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project';
import ProjectItem from './project-item';
import { projectState } from '../state/project-state';

class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[];

    // Typescript makes the declaration and assignments of type:
    // "this.propery" for us, so we only have to declare constructor
    // params like this to have the same result as assignation ourselfs.
    constructor(private type: ProjectStatus) {
        super(false, 'project-list', 'app', `${type}-projects`);
        this.assignedProjects = [];
        
        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListener( (projects: Project[]) => {
            this.assignedProjects = projects.filter(project => project.status === this.type);;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    @Binded
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.querySelector('ul')!.classList.add('droppable');
        }
    }

    @Binded
    dropHandler(event: DragEvent): void {
        const id = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(id, this.type);
    }

    @Binded
    dragLeaveHandler(_: DragEvent): void {
        this.element.querySelector('ul')!.classList.remove('droppable');
    }

    private renderProjects() {
        const listId = `${this.type}-project-list`;
        const listEl = document.getElementById(listId)! as HTMLUListElement;
        listEl.replaceChildren('');

        for (const project of this.assignedProjects) {
            new ProjectItem(project, listId);
        }

    }
}

export default ProjectList;