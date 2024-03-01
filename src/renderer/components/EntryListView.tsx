import React, { useEffect, useRef } from 'react';
import './EntryListView.css';
import { ScrollContainer } from 'react-nice-scroll';

export const EntryListView = ({ list, title, itemName, onAdd }: any) => {
  const [renderedItems, setRenderedItems] = React.useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newList = list.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
    setRenderedItems(newList);
    inputRef.current!.value = '';
  }, [list]);

  const filterItems = (search: string) => {
    setRenderedItems(
      list.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  };

  return (
    <div className="entry-list-view__container">
      <div className="entry-list-view__header">
        <span>{title}</span>
      </div>
      <input
        className="entry-list-view__search-bar"
        type="text"
        placeholder={`Search ${title.toLowerCase()}`}
        onChange={(e) => filterItems(e.target.value)}
        ref={inputRef}
      />
      {renderedItems.length === 0 ? (
        <div className="entry-list-view__no-tasks">
          <h1>No {title.toLowerCase()} found</h1>
          <p>Try adding a new {itemName.toLowerCase()}</p>
        </div>
      ) : (
        <ScrollContainer>
          <div className="entry-list-view__students-list">
            {renderedItems.map((item: any) => (
              <button
                className="entry-list-view__student-list-button-item"
                key={item.id}
              >
                <h2>{item.name}</h2>
              </button>
            ))}
          </div>
        </ScrollContainer>
      )}
      <button className="entry-list-view__add-floating-button" onClick={onAdd}>
        +
      </button>
    </div>
  );
};

export default EntryListView;
