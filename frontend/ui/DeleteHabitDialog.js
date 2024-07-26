import { getAllHabits, deleteHabit } from "../api/habits-api";
import { TodayHabits } from "./TodayHabits";

export class DeleteHabitDialog {
  static instance;
  constructor() {
    if (DeleteHabitDialog.instance) {
      throw new Error(
        "Impossible de créer une autre instance de DeleteHabitDialog"
      );
    }
  }

  static getInstance() {
    if (!DeleteHabitDialog.instance) {
      DeleteHabitDialog.instance = new DeleteHabitDialog();
    }
    return DeleteHabitDialog.instance;
  }

  _open = false;

  init = () => {
    this.trigger = document.querySelector("#delete-habit");
    this.dialog = document.querySelector("#delete-habit-dialog");
    this.selectElement = document.querySelector("#habit-select");
    this.form = document.querySelector("#delete-habit-form");

    this.trigger.addEventListener("click", () => {
      this.open = true;
      this.populateHabitSelect();
    });

    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.handleSubmit(event);
    });
  };

  async populateHabitSelect() {
    try {
      const habits = await getAllHabits();
      this.selectElement.innerHTML = "";

      habits.forEach((habit) => {
        const option = document.createElement("option");
        option.value = habit.id;
        option.textContent = habit.title;
        this.selectElement.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching habits:", error);
      alert("Impossible de récupérer la liste des habitudes");
    }
  }

  async handleSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const habitId = formData.get("habit");
    console.log(habitId);

    if (!habitId) {
      alert("Please select an habit to delete.");
      return;
    }

    try {
      await deleteHabit(habitId);
      await TodayHabits.getInstance().refresh();
      this.open = false;
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Impossible de supprimer l'habitude");
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
