import Component from './base-component';
import * as Validation from '../utils/validation';
import Binded from '../decorators/autobind';
import { projectState } from '../state/project-state';

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl: HTMLInputElement;
    peopleEl: HTMLInputElement;

    constructor () {
        super(true, 'project-input', 'app', 'user-input');
        
        this.titleEl = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionEl = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleEl = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    configure = (): void => {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent = ():void => {}

    private gatherInput = (): [string, string, number] | void => {
        const title = this.titleEl.value;
        const description = this.descriptionEl.value;
        const people = +this.peopleEl.value;

        const titleValidatable: Validation.Validatable = {
            value: title,
            required: true,
            minLength: 1,
            maxLength: 20
        };

        const descValidatable: Validation.Validatable = {
            value: description,
            required: true,
            minLength: 10,
            maxLength: 50
        };

        const peopleValidatable: Validation.Validatable = {
            value: people,
            required: true,
            min: 1,
            max: 10
        };
        
        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert('Invalid inputs');
            return;
        }

        return [title, description, people];
    }

    @Binded
    private submitHandler(event: Event) {
        event.preventDefault();

        const inputValues = this.gatherInput();

        if (Array.isArray(inputValues)) {
            const [title, description, people] = inputValues;
            projectState.addProject(title, description, people);
            this.clearContent();
        }
    }

    private clearContent = (): void => {
        this.titleEl.value = '';
        this.descriptionEl.value = '';
        this.peopleEl.value = '';
    }
}

export default ProjectInput;