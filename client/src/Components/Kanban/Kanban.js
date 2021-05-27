import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Scrollable from '../Scrollable/Scrollable';

import './Kanban.css';

const itemsFromBackend = [
  { id: uuidv4(), content: 'First task' },
  { id: uuidv4(), content: 'Second task' },
  { id: uuidv4(), content: 'Third task' },
  { id: uuidv4(), content: 'Fourth task' },
  { id: uuidv4(), content: 'Fifth task' },
  { id: uuidv4(), content: 'Last task' },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: 'Pending',
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: 'Ongoing',
    items: [],
  },
  [uuidv4()]: {
    name: 'Completed',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className='kanban'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className='kanban__columnSpace' key={columnId}>
              <div className='kanban__columnHeader'>{column.name}</div>
              <div className='kanban__columnBody'>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Scrollable>
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? '#525252'
                              : '#252525',
                            width: '100%',
                            minHeight: '100%',
                          }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#ff8c42'
                                          : '#252525',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}>
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      </Scrollable>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
