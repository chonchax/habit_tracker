import "./style.css";
import { TodayHabits } from "../frontend/ui/TodayHabits.js";
import { AddHabitDialog } from "../frontend/ui/AddHabitDialog.js";
import { HabitHistoryDialog } from "../frontend/ui/HabitHistoryDialog.js";
import { DeleteHabitDialog } from "./ui/DeleteHabitDialog.js";
import { initializeDragAndDrop } from "./ui/DragAndDrop.js";

const app = TodayHabits.getInstance();
app.init();
const dialog = AddHabitDialog.getInstance();
dialog.init();
const historyDialog = HabitHistoryDialog.getInstance();
historyDialog.init();
const deleteDialog = DeleteHabitDialog.getInstance();
deleteDialog.init();
initializeDragAndDrop();
