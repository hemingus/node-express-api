// Color coded event logger

const colors = {
    reset: "\x1b[0m",
    gray: "\x1b[90m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
};

type Scope = "AUTH" | "NOTES" | "SYSTEM";
type Level = "INFO" | "WARN" | "ERROR";

function colorFor(scope: Scope) {
    switch (scope) {
        case "AUTH": return colors.cyan;
        case "NOTES": return colors.green;
        case "SYSTEM": return colors.magenta;
  }
}

function levelColor(level: Level) {
    switch (level) {
        case "INFO": return colors.gray;
        case "WARN": return colors.yellow;
        case "ERROR": return colors.red;
  }
}

function log(level: Level, scope: Scope, event: string, meta?: Record<string, unknown>) {
    const time = new Date().toISOString();
    const scopeColor = colorFor(scope);
    const lvlColor = levelColor(level);

    console.log(
        `${colors.gray}${time}${colors.reset} ` +
        `${scopeColor}[${scope}]${colors.reset} ` +
        `${lvlColor}${event}${colors.reset}`,
        meta ? meta : ""
  );
}

export const logger = {
    auth(event: string, meta?: Record<string, unknown>) {
        log("INFO", "AUTH", event, meta);
    },
    notes(event: string, meta?: Record<string, unknown>) {
        log("INFO", "NOTES", event, meta);
    },
    system(event: string, meta?: Record<string, unknown>) {
        log("INFO", "SYSTEM", event, meta);
    },
    error(event: string, meta?: Record<string, unknown>) {
        log("ERROR", "SYSTEM", event, meta);
    },
};