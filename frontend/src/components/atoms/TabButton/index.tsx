import "@/styles/export.scss";

export default function TabButton() {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--btn-bg-color-active")
    .trim();
  return <button style={{ backgroundColor: color }}>test</button>;
}
