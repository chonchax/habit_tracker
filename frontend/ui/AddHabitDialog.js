import { addHabit } from "../api/habits-api";
import { TodayHabits } from "./TodayHabits";

export class AddHabitDialog {
  static instance;
  constructor() {
    if (AddHabitDialog.instance) {
      throw new Error(
        "Impossible de créer une autre instance de AddHabitDialog"
      );
    }
  }

  static getInstance() {
    if (!AddHabitDialog.instance) {
      AddHabitDialog.instance = new AddHabitDialog();
    }
    return AddHabitDialog.instance;
  }

  _open = false;

  init = () => {
    this.trigger = document.querySelector("#add-new-habit");
    this.dialog = document.querySelector("#add-habit-dialog");
    this.form = document.querySelector("#add-habit-form");
    this.input = this.form.querySelector("input[name='title']");

    this.trigger.addEventListener("click", () => {
      console.log(this.input.value);
      this.open = true;
      this.input.value = "";
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit(event);
    });
  };

  async handleSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    try {
      await addHabit(title);
      await TodayHabits.getInstance().refresh();

      this.open = false;
    } catch (error) {
      console.error("Error adding new habit:", error);
      alert("Impossible d'ajouter cette habitude");
    }
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
    } else {
      this.dialog.removeAttribute("open");
    }
  }
}
