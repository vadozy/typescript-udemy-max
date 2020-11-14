import { Component } from './base-component';
import { Autobind } from '../decorators/autobind';
import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(ev: DragEvent): void {
    // console.log('Drag Start');
    ev.dataTransfer!.setData('text/plain', this.project.id);
    ev.dataTransfer!.effectAllowed = 'move';
    console.log(ev);
  }

  @Autobind
  dragEndHandler(ev: DragEvent): void {
    console.log('Drag End');
    console.log(ev);
  }

  protected configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  protected renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
