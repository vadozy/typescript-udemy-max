namespace App {
  // Project State Management [ SINGLETON ]

  type Listener<T> = (projects: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState = new ProjectState();

    private constructor() {
      super();
    }

    static getInstance() {
      return this.instance;
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(id: string, newStatus: ProjectStatus) {
      const prj = this.projects.find(p => p.id === id);
      if (prj && prj.status !== newStatus) {
        prj.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance(); // Singleton
}
