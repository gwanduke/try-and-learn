import { autorun, observable } from "./mobx";

export const album = observable({
  title: "OK Computer",
  year: 1997,
  playCount: 0,
});

autorun(() => {
  console.log(`count: ${album.playCount}`);
});

console.log("----- Reactions -----");

setTimeout(() => {
  album.playCount = 1;
}, 1000);
setTimeout(() => {
  album.playCount = 2;
}, 2000);
setTimeout(() => {
  album.playCount = 3;
}, 3000);
