import React, { useState } from 'react';
import { css } from '@emotion/react';
// eslint-disable-next-line import/no-cycle
import KanbanCard from './KanbanCard';
// eslint-disable-next-line import/no-cycle
import KanbanNewCard from './KanbanNewCard';

export default function KanbanColumn({
  onAdd,
  canAddNew = false,
  bgColor,
  title,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  cardList = [],
  onDrop,
  onRemove,
  setDraggedItem,
}) {
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleSubmit = (newCard) => {
    onAdd && onAdd(newCard);
    setShowAdd(false);
  };

  return (
    <section
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      }}
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(true);
      }}
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
      }}
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
      css={css`
      flex: 1 1 ;
      display: flex;
      flex-direction: column;
      border: 1px solid gray;
      border-radius: 1rem;
      background-color: ${bgColor};

      & > h2 {
        margin: 0.6rem 1rem;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid gray;

        & > button {
          float: right;
          margin-top: 0.2rem;
          padding: 0.2rem 0.5rem;
          border: 0;
          border-radius: 1rem;
          height: 1.8rem;
          line-height: 1rem;
          font-size: 1rem;
        }
      }

      & > ul {
        flex: 1;
        flex-basis: 0;
        margin: 1rem;
        padding: 0;
        overflow:auto;
      }

    `}
    >
      <h2>
        {title}
        {canAddNew && (
          <button onClick={handleAdd} disabled={showAdd} type="button">
            &#8853; ???????????????
          </button>
        )}
      </h2>
      <ul>
        {canAddNew && showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
        {cardList.map((props) => (
          <KanbanCard
            key={props.title}
            onDragStart={() => setDraggedItem && setDraggedItem(props)}
            onRemove={onRemove}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        ))}
      </ul>
    </section>
  );
}
