const util = require("util");

// ANSI escape codes for colors
const COLORS = {
  reset: "\x1b[0m",
  white: "\x1b[37m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
};

function formatArgs(args) {
  return args
    .map((arg) =>
      typeof arg === "string"
        ? arg
        : util.inspect(arg, { colors: true, depth: null })
    )
    .join(" ");
}

console.log = (...args) => {
  process.stdout.write(
    `${COLORS.blue}[LOG] ${formatArgs(args)}${COLORS.reset}\n`
  );
};

console.warn = (...args) => {
  process.stdout.write(
    `${COLORS.yellow}[WARN] ${formatArgs(args)}${COLORS.reset}\n`
  );
};

console.error = (...args) => {
  process.stdout.write(
    `${COLORS.red}[ERROR] ${formatArgs(args)}${COLORS.reset}\n`
  );
};

console.info = (...args) => {
  process.stdout.write(
    `${COLORS.cyan}[INFO] ${formatArgs(args)}${COLORS.reset}\n`
  );
};

console.success = (...args) => {
  process.stdout.write(
    `${COLORS.green}[SUCCESS] ${formatArgs(args)}${COLORS.reset}\n`
  );
};
