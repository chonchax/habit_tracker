import { updateTodayHabits } from "../api/habits-api";

export class HabitSquare {
  constructor(id, title, done) {
    this.id = id;
    this.title = title;
    this.done = done;

    this.element = createElement(title, done);
    this.element.addEventListener("click", () => {
      updateTodayHabits(this.id, !this.done).then(() => {
        this.done = !this.done;
        if (this.done) {
          this.element.classList.add("habit-done");
        } else {
          this.element.classList.remove("habit-done");
        }
        this.element.textContent = this.title + " " + (this.done ? "✅" : "❌");
      });
    });
  }
}

const createElement = (title, done) => {
  const element = document.createElement("span");
  element.classList.add("habit-square");
  if (done) {
    element.classList.add("habit-done");
  }
  const titleElement = createTitleElement(title);
  element.appendChild(titleElement);

  const doneElement = createDoneElement(done);
  element.appendChild(doneElement);

  return element;
};

const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;
  return titleElement;
};

const createDoneElement = (done) => {
  const doneElement = document.createElement("span");
  done ? (doneElement.textContent = "✅") : (doneElement.textContent = "❌");
  return doneElement;
};
