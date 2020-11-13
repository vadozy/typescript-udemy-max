/// <reference path="base-component.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  // ProjectList Class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragOverHandler(ev: DragEvent): void {
      if (ev.dataTransfer?.types[0] === 'text/plain') {
        ev.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @Autobind
    dropHandler(ev: DragEvent): void {
      // console.log('Drag Drop');
      const prjId = ev.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        prjId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @Autobind
    dragLeaveHandler(_ev: DragEvent): void {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      ) as HTMLUListElement;
      listEl.innerHTML = '';
      for (const prj of this.assignedProjects) {
        let _ignore = new ProjectItem(
          this.element.querySelector('ul')!.id,
          prj
        );
        _ignore = _ignore; // to keep TypeScript happy
      }
    }

    protected configure() {
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(prj => {
          if (this.type === 'active') {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });

      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);
    }

    protected renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
    }
  }
}
