import {
  getHabits,
  getTodayHabits,
  addHabit,
  editHabit,
  deleteHabit,
} from "../habits.helper.js";

export async function habitsRoutes(fastify) {
  fastify.get("/", async () => {
    const habits = await getHabits();
    return habits;
  });

  fastify.get("/today", async () => {
    const todayHabits = await getTodayHabits();
    return todayHabits;
  });

  fastify.post("/", async (request, reply) => {
    const body = request.body;
    if (!body.title) {
      reply.code(400);
      return { success: false, error: "Title is required" };
    }
    const newHabit = await addHabit(body.title);

    return newHabit;
  });

  fastify.patch("/:id", async (request, reply) => {
    const body = request.body;
    const id = Number(request.params.id);
    if (!body.done === undefined) {
      reply.code(400);
      return { success: false, error: "done is reqired in the body" };
    }
    if (typeof body.done !== "boolean") {
      reply.code(400);
      return { success: false, error: "done must be a boolean" };
    }

    const newHabit = await editHabit(id, body.done);

    return newHabit;
  });

  fastify.delete("/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const habits = await getHabits();
    const habitIndex = habits.findIndex((habit) => habit.id === id);
    if (habitIndex === -1) {
      reply.code(404);
      return { success: false, error: "Habit not found" };
    }

    await deleteHabit(id);
    return { success: true, id: id, message: "Habit deleted" };
  });
}
