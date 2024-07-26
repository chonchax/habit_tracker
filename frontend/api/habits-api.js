const BASE_URL = "http://127.0.0.1:3001";

export const getTodayHabits = async () =>
  await fetch(`${BASE_URL}/habits/today`).then((response) => response.json());

export const getAllHabits = async () =>
  await fetch(`${BASE_URL}/habits`).then((response) => response.json());

export const updateTodayHabits = async (id, done) =>
  await fetch(`${BASE_URL}/habits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done,
    }),
  });

export const addHabit = async (title) =>
  await fetch(`${BASE_URL}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

export const deleteHabit = async (id) =>
  await fetch(`${BASE_URL}/habits/${id}`, {
    method: "DELETE",
  });
