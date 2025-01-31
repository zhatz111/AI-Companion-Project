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
- Create an instance in AWS EC2. Preference is `Amazon Linux 2023` (free tier eligible) with `t2.micro` (free tier eligible).
- Connect to the instance using either EC2 instance connect or SSH. Prefer to use SSH. SSH command for terminal: (Ensure you are in the directory where your key pair exists)
```bash
ssh -i "sweetaura_key_pair.pem" ec2-user@ec2-18-117-93-45.us-east-2.compute.amazonaws.com
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
scp -i "sweetaura_key_pair.pem" -r ./backend ec2-user@ec2-18-117-93-45.us-east-2.compute.amazonaws.com:~/backend
#  Check on EC2 instance that they were copied
ls ~/backend

# Copy the .env file to EC2 instance
scp -i "sweetaura_key_pair.pem" -r .env ec2-user@ec2-18-117-93-45.us-east-2.compute.amazonaws.com:~/backend
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
```
- Deactivate the venv to install the next package and obtain the certificate:
```bash
# Deactivate the venv
deactivate

# To obtain a wildcard SSL certificate use the DNS plugin for AWS Route53
sudo yum install python3-certbot-dns-route53 -y



# Use Certbot to obtain and configure the SSL certificate, this requires you to have a domain name already:
sudo AWS_ACCESS_KEY_ID=your_access_key AWS_SECRET_ACCESS_KEY=your_secret_key certbot certonly \
    --authenticator dns-route53 \
    -d "*.sweetaura.ai" -d "sweetaura.ai"

```
- After certbot runs correctly the result should have the following information:
```bash
# The result should have this information in it
Certificate is saved at: /etc/letsencrypt/live/sweetaura.ai/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/sweetaura.ai/privkey.pem
This certificate expires on 2025-04-16.
```
- Now we can edit the nginx config file and replace the `server` section with:
```bash
# To edit the conf file for nginx
sudo nano /etc/nginx/nginx.conf
```
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
# Activate the venv
source venv/bin/activate

# Start the uvicorn server
uvicorn main:app --host 0.0.0.0 --port 8000
```
- Use this command to check the processes currently running on Linux. Helpful for determining if the server is already up and running.
```bash
ps aux
```

### Using Gunicorn to Run Mulitple Uvicorn Workers for Backend
- It seems like good practice to use gunicorn with uvicorn to be able to run mulitple uvicorn workers in the case that there is an issue with the uvicorn server. To do this follow the steps below:
- Install gunicorn using pip
```bash
pip install gunicorn
```
- Create gunicorn config file for more configuration flexibility
```bash
nano gunicorn.conf.py

# Paste in these commands which can be modified based on the system
bind = "0.0.0.0:8000"
workers = 4  # Number of worker processes
worker_class = "uvicorn.workers.UvicornWorker"
loglevel = "info"
accesslog = "logs/gunicorn_access.log"  # Path to access log, if error from this you can remove it
errorlog = "logs/gunicorn_error.log"    # Path to error log, if error from this you can remove it
timeout = 120  # Timeout in seconds

# create logs folder and files, ensure you are in backend folder
mkdir logs
touch logs/gunicorn_access.log
touch logs/gunicorn_error.log

# make logs folder read/writable to all
sudo chmod 777 logs

# Start the server
gunicorn main:app -c gunicorn.conf.py
```
- Use systemd to make sure the server is restarted if it ever goes down
```bash
# Create a service file and add the information below
sudo nano /etc/systemd/system/fastapi.service
```

```ini
[Unit]
Description=FastAPI with Gunicorn
After=network.target

[Service]
User=ec2-user
WorkingDirectory=/home/ec2-user/AI-Companion-Project/backend/
ExecStart=/home/ec2-user/AI-Companion-Project/.venv/bin/gunicorn main:app -c /home/ec2-user/AI-Companion-Project/backend/gunicorn.conf.py
Restart=always

[Install]
WantedBy=multi-user.target
```
- Useful commands to save the config, enable the service, and check for any errors
```bash
# Reload the systemd config
sudo systemctl daemon-reload

# restart the service to apply changes
sudo systemctl restart fastapi

# Enable the service to start on boot
sudo systemctl enable fastapi

# Check the status of the service
sudo systemctl status fastapi

# Debug issues with logs for errors
journalctl -u fastapi
```

## Deploying FastAPI Backend on AWS EC2 instance with ```uv``` and ```git```


### The purpose of this is to make it easier to add required files using ```git``` and pull new changes to the backend. Also will be easier to manage python packages using ```uv```

### Creating and Setting up an EC2 instance
- Create an instance in AWS EC2. Preference is `Amazon Linux 2023` (free tier eligible) with `t2.micro` (free tier eligible).
- Connect to the instance using either EC2 instance connect or SSH. Prefer to use SSH. SSH command for terminal: (Ensure you are in the directory where your key pair exists)
```bash
ssh -i "sweetaura_key_pair.pem" ec2-user@ec2-18-116-43-7.us-east-2.compute.amazonaws.com
```
- After connecting to your EC2 instance, it is necessary to update the system and install python 3.11 using the commands below:
```bash
# Update the system
sudo yum update -y

- install uv for python management
```bash
# doanload uv for the command line interface
curl -LsSf https://astral.sh/uv/install.sh | sh

# install required python version
uv python install 3.11
```

- need to setup ssh key to remote into git to clone the desired repository
```bash
# generate an shh private and public key
ssh-keygen -t rsa -b 4096 -C sweetaura200@gmail.com

# make the private key not publicly available
chmod 600 ~/.ssh/id_rsa

# start ssh-agent then run the ssh-add command
eval `ssh-agent -s
ssh-add -k ~/.ssh/id_rsa

# view and copy the public key
cat ~/.ssh/id_rsa.pub  # If you prefer appear on screen

# move the public key into the authorized keys folder that should already be created
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```
  - After going through the process of creating and adding an ssh key go to GitHub -> SSH keys -> New SSH key
  - Add the SSH key you copied (this process will need to be done for every EC2 instance that is created)

- clone the GitHub repository using SSH
```bash
# install git if not installed already
sudo yum install git -y

# clone the GitHub repo
git clone git@github.com:zhatz111/AI-Companion-Project.git
```

### Setting up GitHub Webhooks to auto deploy backend after GitHub commit

- Install and setup the latest version of ```Go```
```bash
# find the latest Linux version from "https://go.dev/dl/" and install it
wget https://go.dev/dl/go1.23.5.linux-amd64.tar.gz

# extract the tar file to the .local folder in main user directory
sudo tar -C /usr/local -xzf go1.23.5.linux-amd64.tar.gz

# setup the Go environment
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOROOT/bin:$GOPATH/bin:$PATH

# apply updated path changes
source ~/.bashrc

# check Go installed correctly
go version
which go
```

- Install and setup WebHooks
```bash
# install webhooks latest version with go
go install github.com/adnanh/webhook@latest

# check that webhooks was installed
cd go/bin/
ls -la

# Create webhooks directory structure
mkdir ~/webhooks
mkdir ~/webhooks/sweetaura-deployment
touch ~/webhooks/hooks.json
touch ~/webhooks/sweetaura-deployment/deploy.sh
chmod +x ~/webhooks/sweetaura-deployment/deploy.sh
```

- Set up webhook files we created
```bash
# add configuration into hooks.json
nano hooks.json
[{
    "id": "sweetaura-deployment",
    "execute-command": "/root/webhooks/sweetaura-deployment/deploy.sh",
    "command-working-directory": "/home/ec2-user/AI-Companion-Project",
    "response-message": "Executing deploy script...",
    # "trigger-rule": {
    #     "match": {
    #         "type": "payload-hash-sha1",
    #         "secret": "The Returners",
    #         "parameter": {
    #             "source": "header",
    #             "name": "X-Hub-Signature"
    #         }
    #     }
    # }
}]

```
- Setup the ```deploy.sh``` bash script to pull from git and rebuild backend using the system service for fastapi
```bash
#!/bin/bash

# Enable error handling
set -e

# Define project directory
PROJECT_DIR="/home/ec2-user/AI-Companion-Project"
LOG_FILE="$PROJECT_DIR/deploy.log"

# Log deployment start
echo "Starting deployment: $(date)" >> $LOG_FILE

# Navigate to the project directory
cd $PROJECT_DIR

# Pull latest changes from main
echo "Pulling latest changes..." >> $LOG_FILE
git fetch origin main
git reset --hard origin/main

# Activate virtual environment (adjust path if needed)
echo "Activating virtual environment..." >> $LOG_FILE
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..." >> $LOG_FILE
cd backend/
uv pip install -r requirements.txt

# Restart FastAPI application (adjust based on process manager)
echo "Restarting FastAPI application..." >> $LOG_FILE
sudo systemctl restart fastapi  # If using systemd

# Log completion
echo "Deployment finished: $(date)" >> $LOG_FILE
```

- to start the hooks webserver so that it listens for commits
```bash
# ensure you are in "ec2-user" folder and run:
~/go/bin/webhook -hooks /home/ec2-user/webhooks/hooks.json -ip 0.0.0.0 -verbose
```

```bash
sudo nano /etc/systemd/system/webhook.service
```
```ini
[Unit]
Description=GitHub Webhook Listener
After=network.target

[Service]
ExecStart=/home/ec2-user/go/bin/webhook -hooks /home/ec2-user/webhooks/hooks.json -ip 0.0.0.0 -verbose
WorkingDirectory=/home/ec2-user/webhooks
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

- Useful commands to save the config, enable the service, and check for any errors
```bash
# Reload the systemd config
sudo systemctl daemon-reload

# restart the service to apply changes
sudo systemctl restart webhook

# Enable the service to start on boot
sudo systemctl enable webhook

# Check the status of the service
sudo systemctl status webhook

# Debug issues with logs for errors
journalctl -u webhook
```

### Steps to set up EC2 instance for FastAPI backend deployment and Reverse Proxy
- transfer ```.env``` file to git repo on ec2 instance
```bash
scp -i "sweetaura_key_pair.pem" -r .env ec2-user@ec2-18-116-43-7.us-east-2.compute.amazonaws.com:~/AI-Companion-Project
```