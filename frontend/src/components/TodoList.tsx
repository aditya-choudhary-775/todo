import { Todo } from "@/context/todoContext";
import TodoItem from "./TodoItem";
import DueDatePicker from "./DueDatePicker";
import DescriptionEditor from "./DescriptionEditor";
import { motion, AnimatePresence } from "motion/react";
import { slideDown, smoothTransition } from "@/constants/animations";

type TodoListProps = {
  todos: Todo[];
  onDelete?: (id: number) => void;
  onToggle?: (id: number) => void;
  openDesc: boolean;
  setOpenDesc: (value: boolean) => void;
  openDueDate: boolean;
  setOpenDueDate: (value: boolean) => void;
  description: string;
  setDescription: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
};

const TodoList = ({
  todos,
  onDelete,
  onToggle,
  openDesc,
  setOpenDesc,
  openDueDate,
  setOpenDueDate,
  description,
  setDescription,
  dueDate,
  setDueDate,
}: TodoListProps) => {
  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-scroll rounded-2xl border border-white/15 p-3 shadow-[inset_0px_0px_50px_theme(colors.cyan-900)]">
      <AnimatePresence>
        {openDueDate && (
          <DueDatePicker
            dueDate={dueDate}
            onDueDateChange={setDueDate}
            onClose={() => setOpenDueDate(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {openDesc ? (
          <DescriptionEditor
            description={description}
            onDescriptionChange={setDescription}
            onClose={() => setOpenDesc(false)}
          />
        ) : (
          <motion.div
            layout
            key="list"
            {...slideDown}
            transition={smoothTransition}
            className="flex w-full flex-col gap-2"
          >
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
