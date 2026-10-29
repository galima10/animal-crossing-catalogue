export default function FilterSvg({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
      <path
        fill={color}
        d="M29.7 1.9A3 3 0 0 0 26.8 0H5.2a3 3 0 0 0-3 1.9 3 3 0 0 0 .6 3.4l8.4 9.7v15.4a2 2 0 0 0 .8 1.4 2 2 0 0 0 1.5 0l6.4-3.2a2 2 0 0 0 .9-1.4V15l8.4-9.7a3 3 0 0 0 .5-3.4"
      />
    </svg>
  );
}
