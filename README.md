# Nutricia

Nutricia is a React-based web application that focuses on providing users with nutritional information and recommendations.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Usage](#usage)
- [Libraries and Their Purpose](#libraries-and-their-purpose)
- [Testing](#testing)
- [Contribute](#contribute)
- [License](#license)

## Introduction

Nutricia is a comprehensive web application designed to help users make informed decisions about their dietary needs. It provides a wide range of features, including nutritional information, personalized recommendations, and educational content.

## Technologies Used

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A fast and opinionated build tool for modern web applications.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds optional static typing.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version v22.19.0 or higher)
- [npm](https://www.npmjs.com/) (version 10.9.3 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/nitesh-kesarkar-cb/nutricia.git
   ```
2. Navigate to the project directory:
   ```
   cd nutricia
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Usage

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your web browser and navigate to `http://localhost:5173/` to view the application.

## Libraries and Their Purpose

Nutricia uses a variety of libraries to enhance its functionality and improve the development experience. Here's a breakdown of the libraries used and their purpose:

| Library                              | Purpose                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **@radix-ui/react-dropdown-menu**    | Provides a set of accessible, customizable, and unstyled dropdown menu components for React.                  |
| **@radix-ui/react-slot**             | Provides a way to create flexible, composable, and extensible UI components in React.                         |
| **@tanstack/react-router**           | A powerful, type-safe, and framework-agnostic routing solution for React applications.                        |
| **class-variance-authority**         | Helps with managing CSS class names in a scalable and maintainable way, particularly when using Tailwind CSS. |
| **clsx**                             | Allows you to conditionally join CSS classes together.                                                        |
| **i18next** and **react-i18next**    | Provide internationalization and localization features for React applications.                                |
| **i18next-browser-languagedetector** | Detects the user's language in the browser and sets it as the active language in i18next.                     |
| **lucide-react**                     | Provides a set of customizable, open-source icons for React applications.                                     |
| **tailwind-merge**                   | Helps with merging Tailwind CSS classes in a more efficient way.                                              |
| **tailwindcss-animate**              | Provides a set of utility classes for adding CSS animations to your Tailwind CSS-based components.            |

These libraries were chosen to enhance the development experience, improve the user interface, and provide robust functionality for the Nutricia application.

## Testing

Nutricia uses the following testing libraries:

| Library                         | Purpose                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **@testing-library/jest-dom**   | Provides a set of custom Jest matchers that allow you to assert on DOM nodes.          |
| **@testing-library/react**      | A lightweight, opinionated library for testing React components.                       |
| **@testing-library/user-event** | Fires events the same way the user would.                                              |
| **@vitest/coverage-v8**         | Provides coverage reporting using the V8 profiler.                                     |
| **jsdom**                       | A JavaScript implementation of the WHATWG DOM and HTML standards for testing purposes. |
| **vitest**                      | A modern, fast, and powerful testing framework for JavaScript and TypeScript projects. |

To run the tests, use the following commands:

```
npm test
npm run test:run
npm run coverage
```

## Contribute

We welcome contributions to the Nutricia project. If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

Nutricia is licensed under the [MIT License](LICENSE).
