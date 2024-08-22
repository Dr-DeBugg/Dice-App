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
          <h2 className="rainbow-heading-text rainbow-text pb-8">Technologies Used</h2>
          <ul className="space-y-2">
            {technologies.map((tech, index) => (
              <li key={index} className={`text-style justify-center ${tech.github ? "pt-8" : ""}`}>
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

const GitHubLogo = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
);

const technologies = [
  {
    icon: <RocketLaunchIcon className="icon-size text-sky-700" />,
    text: "Built with Next.js and TypeScript",
  },
  {
    icon: <ServerStackIcon className="icon-size text-blue-700" />,
    text: "PostgreSQL database from Vercel",
  },
  {
    icon: ReactLogo(),
    text: "React 19 - compiler for memoization",
  },
  {
    icon: <SparklesIcon className="icon-size text-yellow-400" />,
    text: "Shadcn/ui components, utilizing Tailwind",
  },
  {
    icon: <HeartIcon className="icon-size text-red-600" />,
    text: (
      <a href="https://github.com/3d-dice/dice-box" target="_blank" rel="noopener noreferrer">
        Dice-box JavaScript library for dice rolling
      </a>
    ),
  },
  {
    icon: <CheckCircleIcon className="icon-size text-green-400" />,
    text: "React-hook-form w/ fullstack Zod validation",
  },
  {
    icon: GitHubLogo(),
    github: true,
    text: (
      <a href="https://github.com/Dr-DeBugg/Dice-App" target="_blank" rel="noopener noreferrer">
        Check out the source on GitHub
      </a>
    ),
  },
];
