import { motion } from "motion/react";
import { slideDown, smoothTransition } from "@/constants/animations";
import Button from "./Button";

type DescriptionEditorProps = {
  description: string;
  onDescriptionChange: (value: string) => void;
  onClose: () => void;
};

const DescriptionEditor = ({
  description,
  onDescriptionChange,
  onClose,
}: DescriptionEditorProps) => {
  return (
    <motion.div
      layout
      key="textarea"
      layoutId="desc"
      {...slideDown}
      transition={smoothTransition}
      className="flex h-full w-full flex-col gap-2 rounded-2xl border border-cyan-600 p-4 text-cyan-500"
    >
      <textarea
        placeholder="Enter task description..."
        aria-label="Task description"
        className="h-full w-full resize-none bg-transparent focus:outline-none"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <div className="flex items-center justify-end">
        <Button onClick={onClose}>Done</Button>
      </div>
    </motion.div>
  );
};

export default DescriptionEditor;
