import { getTodayHabits } from "../api/habits-api.js";
import { HabitSquare } from "../ui/HabitSquare.js";

export class TodayHabits {
  static instance;
  constructor() {
    if (TodayHabits.instance) {
      throw new Error("Impossible de créer une autre instance de TodayHabits");
    }
  }

  static getInstance() {
    if (!TodayHabits.instance) {
      TodayHabits.instance = new TodayHabits();
    }
    return TodayHabits.instance;
  }

  habitsSquare = [];

  async init() {
    this.element = document.querySelector("#today-habits");
    this.refresh();
  }

  async refresh() {
    try {
      this.todayHabits = await getTodayHabits();
      this.render();
    } catch (error) {
      alert("Impossible de recuperer les habitudes du jour");
    }
  }

  async render() {
    this.element.innerHTML = "";

    this.habitsSquare = this.todayHabits.map((habit) => {
      const habitSquare = new HabitSquare(habit.id, habit.title, habit.done);
      this.element.appendChild(habitSquare.element);
    });
  }
}
