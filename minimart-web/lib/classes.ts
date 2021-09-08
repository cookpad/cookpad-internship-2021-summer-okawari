export const classes = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ');
};
