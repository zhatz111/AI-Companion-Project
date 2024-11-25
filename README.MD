# AI Companion

This repository contains the frontend and backend code for the AI companion website, sweetaura.ai. The website aims to offer a personalized companion experience for users seeking meaningful interactions.

Each companion is tailored to the user's preferences specified during sign-up, emphasizing individuality to reflect the uniqueness of real-life personalities. This distinctive feature sets the platform apart from other AI companion services.

The website encourages users to form a meaningful bond with their companion. By fostering realistic, engaging conversations, it seeks to alleviate loneliness often linked to online dependency. Additionally, it aims to help users build confidence and social skills that can enhance real-world interactions.

## Development History

**Project Inception: 2024-11-22**

Initial Development Activities: 2024-11-23
- Downloaded ```Node.js``` to build ```React.js``` frontend app for deployment with ```Flask``` API in future.
  - This installs ```npm```, which can be used to run the server for the react app. Refer to the README file for more information in the ```src``` directory folder for the app.
- Built initial frontend features to understand how ```react.js``` script is used.
- When running on new machine before you can start the ```React.js``` frontend make sure to delete the ```package-lock.json``` in project folder and install react-scripts, dependencies, and then start the server:
```bash
npm install react-scripts
npm install
npm start
``` 
- Ensure you use the stand-alone terminal and not the one in VSCode
  - https://stackoverflow.com/questions/47612580/react-scripts-command-not-found 

**Crash Course on React.js: 2024-11-24**
- Followed a tutorial from youtube to learn the basics of the React.js framework: https://www.youtube.com/watch?v=LDB4uaJ87e0 
- This tutorial uses a slightly newer way of building the frontend with Vite which is suppose to be much quicker overall. Commands to create a project:
```bash
# npm 7+, extra double-dash is needed:
npm create vite@latest my-react-app -- --template react
```
- Instead of normall CSS styling I learned Tailwind CSS which makes it easy to style in-line. Commands to install and setup Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- JS code for the tailwind config file:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- CSS code for the index.css file:
```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Command to run the development environment for React.js
```bash
npm install
npm run dev
```
