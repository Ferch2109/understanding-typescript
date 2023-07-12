import { Project, ProjectStatus } from '../models/project';

type Listener<T> = (items: T[]) => void;

/** STATE BASE CLASS */
abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project>{
    private static instance: ProjectState;
    private projects: Project[];

    private constructor() {
        super();
        this.projects = [];
    }

    static getInstance = (): ProjectState => {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE
        );
        this.projects.push(newProject);

        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // -slice- to send a copy
        }
    }
}

/** INTANCES */
export const projectState = ProjectState.getInstance();