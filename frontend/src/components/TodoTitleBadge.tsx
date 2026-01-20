const TodoTitleBadge = () => {
  return (
    <div className="flex h-full w-[200px] items-center justify-center gap-3 rounded-2xl border border-white/15 shadow-[inset_0px_20px_50px_theme(colors.cyan.800)] text-4xl text-green-500">
      <span className="font-great-vibes">Your</span>
      <span className="font-tilt-prism">Todo</span>
    </div>
  );
};

export default TodoTitleBadge;
