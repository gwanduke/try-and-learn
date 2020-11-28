import { autorun } from "mobx";
import { types } from "mobx-state-tree";

const Note = types
  .model({
    description: "",
    createdTimestamp: Date.now(),
    published: false,
  })
  .actions((self) => ({
    setDescription(description) {
      self.description = description;
    },
  }));

export default Note;
