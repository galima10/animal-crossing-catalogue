export default function FishSvg({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
      <path
        fill={color}
        d="M31.8 10c-1-.6-4.6 2.9-5.7 4.3-3.6-2.2-6.8-3.6-6.8-3.6s1.4-6.2-.5-5.9-5.1 2.7-7.9 4.8C6.3 11 .6 14.1 0 17.1c1.8 6 12 8.8 18 10 3 .7 1.3-3.5 1.3-3.5S22.5 22 26 20c1 1.4 4.8 4.8 5.7 4.3S30.4 17 30.4 17s2.3-6.6 1.4-7.1M6.4 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
      />
    </svg>
  );
}
