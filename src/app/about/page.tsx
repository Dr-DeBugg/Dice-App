import {
  ServerStackIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function About() {
  return (
    <>
      <div className="flex justify-center">
        <div className="p-6 space-y-4">
          <h2 className="rainbow-heading-text rainbow-text">Technologies Used</h2>
          <ul className="space-y-2">
            {technologies.map((tech, index) => (
              <li key={index} className="text-style">
                {tech.icon}
                <span>{tech.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const ReactLogo = () => (
  <svg
    className="icon-size"
    viewBox="-11.5 -10.23174 23 20.46348"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const technologies = [
  {
    icon: <RocketLaunchIcon className="icon-size text-sky-700" />,
    text: "Built with Next.js and TypeScript",
  },
  {
    icon: ReactLogo(),
    text: "React 19 - React compiler for memoization",
  },
  {
    icon: <ServerStackIcon className="icon-size text-blue-700" />,
    text: "PostgreSQL database from Vercel",
  },
  {
    icon: <SparklesIcon className="icon-size text-yellow-400" />,
    text: "Shadcn/ui components, utilizing Tailwind",
  },
  {
    icon: <HeartIcon className="icon-size text-red-600" />,
    text: (
      <a href="https://github.com/3d-dice/dice-box" target="_blank" rel="noopener noreferrer">
        Dice-box JavaScript library for rolling dices
      </a>
    ),
  },
  {
    icon: <CheckCircleIcon className="icon-size text-green-400" />,
    text: "React-hook-form w/ fullstack Zod validation",
  },
];
