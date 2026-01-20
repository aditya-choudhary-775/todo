import { motion } from "motion/react";
import { slideUp, springTransition } from "@/constants/animations";
import Button from "./Button";

type DueDatePickerProps = {
  dueDate: string;
  onDueDateChange: (value: string) => void;
  onClose: () => void;
};

const DueDatePicker = ({
  dueDate,
  onDueDateChange,
  onClose,
}: DueDatePickerProps) => {
  return (
    <motion.div
      layout
      {...slideUp}
      transition={springTransition}
      className="mb-3 flex items-center gap-3 rounded-2xl border border-red-600 bg-white/5 p-2 shadow-[0_2px_8px_rgba(245,60,60,0.12)]"
    >
      <label
        htmlFor="due-date-picker"
        className="text-sm font-semibold text-red-600"
      >
        Set due date:
      </label>
      <input
        id="due-date-picker"
        type="date"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
        className="relative cursor-pointer rounded-md border border-red-600 bg-transparent p-2 text-red-500 shadow-sm transition outline-none before:absolute before:top-[10px] before:right-[8px] before:-z-10 before:size-5 before:rounded-sm before:bg-red-500 hover:border-red-500 focus:border-red-500"
        aria-label="Set due date"
        placeholder="Due date"
      />
      <div className="flex flex-1 items-center justify-end">
        <Button variant="secondary" onClick={onClose}>
          Done
        </Button>
      </div>
    </motion.div>
  );
};

export default DueDatePicker;
