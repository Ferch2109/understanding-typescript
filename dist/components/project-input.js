var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component';
import * as Validation from '../utils/validation';
import Binded from '../decorators/autobind';
import { projectState } from '../state/project-state';
class ProjectInput extends Component {
    constructor() {
        super(true, 'project-input', 'app', 'user-input');
        this.configure = () => {
            this.element.addEventListener('submit', this.submitHandler);
        };
        this.renderContent = () => { };
        this.gatherInput = () => {
            const title = this.titleEl.value;
            const description = this.descriptionEl.value;
            const people = +this.peopleEl.value;
            const titleValidatable = {
                value: title,
                required: true,
                minLength: 1,
                maxLength: 20
            };
            const descValidatable = {
                value: description,
                required: true,
                minLength: 10,
                maxLength: 50
            };
            const peopleValidatable = {
                value: people,
                required: true,
                min: 1,
                max: 10
            };
            if (!Validation.validate(titleValidatable) ||
                !Validation.validate(descValidatable) ||
                !Validation.validate(peopleValidatable)) {
                alert('Invalid inputs');
                return;
            }
            return [title, description, people];
        };
        this.clearContent = () => {
            this.titleEl.value = '';
            this.descriptionEl.value = '';
            this.peopleEl.value = '';
        };
        this.titleEl = this.element.querySelector('#title');
        this.descriptionEl = this.element.querySelector('#description');
        this.peopleEl = this.element.querySelector('#people');
        this.configure();
    }
    submitHandler(event) {
        event.preventDefault();
        const inputValues = this.gatherInput();
        if (Array.isArray(inputValues)) {
            const [title, description, people] = inputValues;
            projectState.addProject(title, description, people);
            this.clearContent();
        }
    }
}
__decorate([
    Binded
], ProjectInput.prototype, "submitHandler", null);
export default ProjectInput;
//# sourceMappingURL=project-input.js.map