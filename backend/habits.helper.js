import fs from "fs/promises";
import path from "path";

const habitsDatabase = path.join(process.cwd(), "../database.json");

const parseDatabase = async () => {
  const db = JSON.parse(await fs.readFile(habitsDatabase, "utf-8"));
  return db;
};

const writeDatabase = async (newDb) => {
  await fs.writeFile(habitsDatabase, JSON.stringify(newDb, null, 2));
};

export const getHabits = async () => {
  const db = await parseDatabase();
  return db.habits;
};

export const getTodayHabits = async () => {
  const habits = await getHabits();
  const dateToday = new Date().toISOString().slice(0, 10);
  return habits.map((habit) => ({
    id: habit.id,
    title: habit.title,
    done: habit.daysDone[dateToday] || false,
  }));
};

export const addHabit = async (title) => {
  const db = await parseDatabase();
  const newHabit = {
    id: db.habits.length ? db.habits[db.habits.length - 1].id + 1 : 1,
    title,
    daysDone: {},
  };
  db.habits.push(newHabit);
  await writeDatabase(db);
};

export const editHabit = async (id, done) => {
  const db = await parseDatabase();
  const habit = db.habits.find((habit) => habit.id === id);
  if (!habit) {
    throw new Error("Habit not found");
  }
  const dateToday = new Date().toISOString().slice(0, 10);
  habit.daysDone[dateToday] = done;
  await writeDatabase(db);
};

export const deleteHabit = async (id) => {
  const db = await parseDatabase();
  const habitIndex = db.habits.findIndex((habit) => habit.id === id);
  if (habitIndex === -1) {
    throw new Error("Habit not found");
  }
  db.habits.splice(habitIndex, 1);
  await writeDatabase(db);
};
