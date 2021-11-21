function PinIcon({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number | string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6"></path>
      <line x1={12} y1={16} x2={12} y2={21}></line>
      <line x1={8} y1={4} x2={16} y2={4}></line>
    </svg>
  );
}

export default PinIcon;
