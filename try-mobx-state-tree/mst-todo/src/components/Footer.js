import { observer } from "mobx-react";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed",
};

export default observer(({ store }) => {
  const renderTodoCount = () => {
    const { activeCount } = store;
    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span>
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
    );
  };

  const renderFilterLink = (filter) => {
    const title = FILTER_TITLES[filter];
    const selectedFilter = store.filter;

    return <a onClick={() => store.setFilter(filter)}>{title}</a>;
  };

  const renderClearButton = () => {
    const { completedCount, clearCompleted } = store;
    if (completedCount > 0) {
      return <button onClick={() => clearCompleted()}>Clear completed</button>;
    }
  };

  return (
    <footer>
      {renderTodoCount()}
      <ul>
        {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map((filter) => (
          <li key={filter}>{renderFilterLink(filter)}</li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
});
