import { getAllHabits } from "../api/habits-api";

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error(
        "Impossible de créer une autre instance de HabitHistoryDialog"
      );
    }
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }

  _open = false;

  init = () => {
    this.trigger = document.querySelector("#open-history");
    this.dialog = document.querySelector("#habits-history-dialog");
    this.tableWrapper = document.querySelector("#table-wrapper");

    this.trigger.addEventListener("click", () => {
      this.open = true;
      this.render();
    });
  };

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

  async render() {
    const habits = await getAllHabits();
    const firstDate = getAllDate(habits, 17);
    const today = new Date();
    const days = getDaysBetween(firstDate[0], today);
    const table = document.createElement("table");

    table.appendChild(tableHeader(days));

    tableRow(habits, days).forEach((row) => {
      table.appendChild(row);
    });

    this.tableWrapper.innerHTML = "";
    this.tableWrapper.appendChild(table);
  }
}

const tableRow = (habits, days) => {
  return habits.map((habit) => {
    const row = document.createElement("tr");
    const ceil = document.createElement("td");

    ceil.textContent = habit.title;
    row.appendChild(ceil);

    days.forEach((date) => {
      const dateCeil = document.createElement("td");
      const doneDay = habit.daysDone[date.toISOString().split("T")[0]];
      dateCeil.textContent = doneDay ? "✅" : "❌";
      row.appendChild(dateCeil);
    });
    return row;
  });
};

const tableHeader = (days) => {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.textContent = "Habits";
  tr.appendChild(th);

  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day.toDateString();
    tr.appendChild(th);
  });

  return tr;
};

const getAllDate = (habits, days) => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - days);

  return habits
    .reduce((acc, habit) => {
      return [...acc, ...Object.keys(habit.daysDone)];
    }, [])
    .map((date) => new Date(date))
    .filter((date) => date >= pastDate && date <= currentDate)
    .sort((a, b) => a - b);
};

const getDaysBetween = (start, end) => {
  if (end < start) {
    return [];
  } else if (start === end) {
    return [start];
  }
  return [start, ...getDaysBetween(new Date(start.getTime() + 86400000), end)];
};
