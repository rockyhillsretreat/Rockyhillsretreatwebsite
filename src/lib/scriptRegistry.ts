type ScriptStatus = "idle" | "loading" | "ready" | "error";

type ScriptEntry = {
  status: ScriptStatus;
  promise: Promise<void>;
};

const registry = new Map<string, ScriptEntry>();

export function loadScript(src: string): Promise<void> {
  const existing = registry.get(src);
  if (existing) return existing.promise;

  let resolveFn!: () => void;
  let rejectFn!: (err: unknown) => void;

  const promise = new Promise<void>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  registry.set(src, {
    status: "loading",
    promise,
  });

  const script = document.createElement("script");
  script.src = src;
  script.async = true;

  script.onload = () => {
    registry.set(src, { status: "ready", promise });
    resolveFn();
  };

  script.onerror = (err) => {
    registry.set(src, { status: "error", promise });
    rejectFn(err);
  };

  document.body.appendChild(script);

  return promise;
}

export function getScriptStatus(src: string): ScriptStatus {
  return registry.get(src)?.status ?? "idle";
}
