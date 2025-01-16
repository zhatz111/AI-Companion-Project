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

## Deploying my Web Application to AWS Elastic BeanStalk
- Zip the directory to easily upload the folder for use with Docker and make sure to exclude installed package folders
```bash
zip -r sweetaura.zip . -x ".venv/*" "./frontend/node_modules/*" "misc/*"
```

- Dockerfile to deploy to AWS ECR for the frontend:
```dockerfile
# Dockerfile for React Vite App
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Serve the build with a lightweight server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80
```

- Dockerfile to deploy to AWS ECR for the backend:
```dockerfile
# Dockerfile for FastAPI Backend
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000
```

## Deploying FastAPI Backend on AWS EC2 instance

### Creating and Setting up an EC2 instance
- Create an instance in AWS EC2. Preference is `Amazon Linux 2023` (free tier eligable) with `t2.micro` (free tier eligable).
- Connect to the instance using either EC2 instance connect or SSH. Prefer to use SSH. SSH command for terminal: (Ensure you are in the directory where your key pair exists)
```bash
ssh -i "sweetaura_key_pair.pem" ec2-user@ec2-3-137-169-130.us-east-2.compute.amazonaws.com
```
- After connecting to your EC2 instance, it is necessary to update the system and install python 3.11 using the commands below:
```bash
# Update the system
sudo yum update -y
# Instal python 3.11
sudo dnf install python3.11 -y
# Install pip
sudo dnf install python3.11-pip -y

# Can check the python version to ensure it works
python3.11 --version
```
- After installing python we need to copy the backend files from the local computer to the instance in terminal. This may be modified in the future to just clone the git repo so things can be pulled easier. Use the command below on your local computer (NOT EC2 instance) to copy the files:
```bash
# Copy all backend files to EC2 instance
scp -i "sweetaura_key_pair.pem" -r ./backend ec2-user@ec2-3-137-169-130.us-east-2.compute.amazonaws.com:~/backend
#  Check on EC2 instance that they were copied
ls ~/backend

# Copy the .env file to EC2 instance
scp -i "sweetaura_key_pair.pem" -r .env ec2-user@ec2-3-137-169-130.us-east-2.compute.amazonaws.com:~/backend
# Check to make sure the .env file was copied to the EC2 instance
ls ~/backend/.env
```
- Create a virtual envirnoment in the backend folder with python
```bash
# Change directory to backend if not already in it
cd backend/

# Create virtual environment
python3.11 -m venv venv

# Activate the virtual environment
source venv/bin/activate
```
- Install the requirements of the backend API app using the `requirements.txt` file:
```bash
# Install the required packages
pip install -r requirements.txt

# Upgrade pip if needed
pip install --upgrade pip
```
- Test that the FastAPI app runs as expected using uvicorn
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
### Accessing the backend and Setting up reverse Proxy with NGINX
- You can access the backend with the Public IPv4 address, in my case `http://3.137.169.130:8000`
  - In `Network and Security` go to `Security Groups` and find the security group for the EC2 instance and click on the ID.
  - Click on `Edit inbound rules` and add a rule with `Type: Custom TCP`, `Port Range: 8000`, and `Source: 0.0.0.0/0`. This will open up port 8000 to all traffic so we can access it through the browser. It is important to not that this must be accessed using **http** rather than **https** since the server is not set up for **https** yet.
- Reverse Proxy set-up using nginx and serving HTTPS on it:
```bash
# Install nginx
sudo yum install nginx -y

# Install Certbot for SSL Certificates (Let's Encrypt SSL)
sudo yum install certbot python3-certbot-nginx -y

# To obtain a wildcard SSL certificate use the DNS plugin for Spaceship
pip install certbot-dns-spaceship

# Obtain API and Secret key from Spaceship and create credentials file
nano spaceship_credentials.ini

# In the file enter this:
[spaceship]
api_key = your_api_key
api_secret = your_api_secret

# Secure the credentials file:
chmod 600 spaceship_credentials.ini

# Use Certbot to obtain and configure the SSL certificate, this requires you to have a domain name already:
sudo certbot certonly \
    --authenticator dns-spaceship \
    --dns-spaceship-credentials /home/ec2-user/backend/spaceship_credentials.ini \
    -d "*.sweetaura.ai" -d "sweetaura.ai" \
    --debug-challenges

```
- After certbot runs correctly the result should have the following information:
```bash
# The result should have this information in it
Certificate is saved at: /etc/letsencrypt/live/sweetaura.ai/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/sweetaura.ai/privkey.pem
This certificate expires on 2025-04-15.
```
- Now we can edit the nginx config file and replace the `server` section with:
```js
# Redirect HTTP (port 80) to HTTPS (port 443)
server {
    listen 80;
    server_name sweetaura.ai *.sweetaura.ai;

    # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

# Serve HTTPS (port 443) with SSL
server {
    listen 443 ssl;
    server_name sweetaura.ai *.sweetaura.ai;

    # SSL certificate and key files
    ssl_certificate /etc/letsencrypt/live/sweetaura.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sweetaura.ai/privkey.pem;

    # Location block to proxy requests to the backend
    location / {
        proxy_pass http://localhost:8000; # Backend server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

```
- After editing the file make sure to save it with `Ctrl O` and exit out of it with `Ctrl X`
- Restart the nginx server `sudo systemctl restart nginx` and then we can run the `uvicorn server`.
  - The uvicorn server can be started normally because the reverse proxy will redirect traffic from https to the http server at port 8000.
  - We can also edit the port configuration and take off port 8000 so users can not directly access that port, only the nginx port 80 can be accessed.
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
