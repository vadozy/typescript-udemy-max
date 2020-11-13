namespace App {
  // Drag and Drop Interfaces
  export interface Draggable {
    dragStartHandler(ev: DragEvent): void;
    dragEndHandler(ev: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(ev: DragEvent): void;
    dropHandler(ev: DragEvent): void;
    dragLeaveHandler(ev: DragEvent): void;
  }

  console.log('End of drag-drop-interfaces.ts');
}
