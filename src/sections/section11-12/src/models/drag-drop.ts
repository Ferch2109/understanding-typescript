export interface Draggable {
    dragStartHandler(event: DragEvent): void,
    dragEndHandler(event: DragEvent): void
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void, // Permits the drag
    dropHandler(event: DragEvent): void, // Handle the drop
    dragLeaveHandler(event: DragEvent): void // Return feedback once it's dropped
}