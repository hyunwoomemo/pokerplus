export default function debounce(fn, duration = 500) {
  let timeout = null;
  return (args) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(args);
    }, duration);
  };
}
