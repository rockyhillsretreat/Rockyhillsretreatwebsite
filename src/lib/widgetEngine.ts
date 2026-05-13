export type WidgetMountConfig = {
  container: HTMLElement;
  render: () => void;
  cleanup?: () => void;
};

const mountedWidgets = new WeakMap<HTMLElement, () => void>();

export function mountWidget({ container, render, cleanup }: WidgetMountConfig) {
  // prevent duplicate mount in React StrictMode
  const existingCleanup = mountedWidgets.get(container);
  if (existingCleanup) {
    existingCleanup();
  }

  // clear DOM safely
  container.innerHTML = "";

  // mount
  render();

  // store cleanup
  const finalCleanup = () => {
    container.innerHTML = "";
    cleanup?.();
  };

  mountedWidgets.set(container, finalCleanup);

  return finalCleanup;
}

export function unmountWidget(container: HTMLElement) {
  const cleanup = mountedWidgets.get(container);
  if (cleanup) cleanup();
  mountedWidgets.delete(container);
}
