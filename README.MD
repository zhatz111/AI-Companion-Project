# AI Companion

This repository contains the frontend and backend code for the AI companion website, sweetaura.ai. The website aims to offer a personalized companion experience for users seeking meaningful interactions.

Each companion is tailored to the user's preferences specified during sign-up, emphasizing individuality to reflect the uniqueness of real-life personalities. This distinctive feature sets the platform apart from other AI companion services.

The website encourages users to form a meaningful bond with their companion. By fostering realistic, engaging conversations, it seeks to alleviate loneliness often linked to online dependency. Additionally, it aims to help users build confidence and social skills that can enhance real-world interactions.

## Useful Links
- Deep dive into `uv` for python and all the functionalities it provides
  - https://www.saaspegasus.com/guides/uv-deep-dive/#what-is-uv
- Good tutorial on how to implement webhooks for github
  - https://betterprogramming.pub/how-to-automatically-deploy-from-github-to-server-using-webhook-79f837dcc4f4
- How to install golang on an AWS instance to use webhooks
  - https://edwinsiby.medium.com/installing-golang-on-an-aws-instance-97089f3be2de

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

## Frontend and Routing Deployment
- Frontend deployed using AWS amplify with GitHub webhooks that listen for pushes and rebuild the frontend code
- DNS routing is handled with Route53 on AWS. Original domain name ```sweetaura.ai``` was purchased through ```Spaceship.com``` and then redirected to AWS using Route53 nameservers.


## Auto Deploying FastAPI Backend on AWS EC2 instance with ```uv```, ```git```, and ```webhooks```


### The purpose of this is to make it easier to add required files using ```git``` and pull new changes to the backend. Also will be easier to manage python packages using ```uv```

### Creating and Setting up an EC2 instance (Current EC2 Instance Public IPv4 Address: ```52.14.76.39```)
- Create an instance in AWS EC2. Preference is `Amazon Linux 2023` (free tier eligible) with `t2.micro` (free tier eligible).
- Connect to the instance using either EC2 instance connect or SSH. Prefer to use SSH. SSH command for terminal: (Ensure you are in the directory where your key pair exists)
```bash
ssh -i "sweetaura_key_pair.pem" ec2-user@ec2-52-14-76-39.us-east-2.compute.amazonaws.com
```
- After connecting to your EC2 instance, it is necessary to update the system and install python 3.11 using the commands below:
```bash
# Update the system
sudo yum update -y
```
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
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa

# view and copy the public key
cat ~/.ssh/id_rsa.pub  # If you prefer appear on screen

# move the public key into the authorized keys folder that should already be created
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```
- After going through the process of creating and adding an ssh key go to GitHub -> SSH keys -> New SSH key
- Add the SSH key you copied (this process will need to be done for every EC2 instance that is created)

### GitHub Repo set-up

- clone the GitHub repository using SSH
```bash
# install git if not installed already
sudo yum install git -y

# clone the GitHub repo
git clone git@github.com:zhatz111/AI-Companion-Project.git

# create a virtual environment using uv venv 
cd /home/ec2-user/AI-Companion-Project
uv venv

# go to backend to install dependencies
cd backend/
uv pip install -r requirements.txt
```
- transfer ```.env``` file to git repo on ec2 instance
```bash
# go to .env file directory
cd .\Documents\GitHub\AI-Companion-Project\

# transfer the file, go to home computer for this command
scp -i "sweetaura_key_pair.pem" -r .env ec2-user@ec2-52-14-76-39.us-east-2.compute.amazonaws.com:~/AI-Companion-Project
```

### Setting up ```nginx``` reverse proxy server to forward https requests to http
```bash
# Install nginx
sudo yum install nginx -y

# Install Certbot for SSL Certificates (Let's Encrypt SSL)
sudo yum install certbot python3-certbot-nginx -y
```
- Obtain an SSL certificate with certbot:
```bash
# To obtain a wildcard SSL certificate use the DNS plugin for AWS Route53
sudo yum install python3-certbot-dns-route53 -y

# Use Certbot to obtain and configure the SSL certificate, this requires you to have a domain name already:
sudo AWS_ACCESS_KEY_ID=your_access_key AWS_SECRET_ACCESS_KEY=your_secret_key certbot certonly \
    --authenticator dns-route53 \
    -d "*.sweetaura.ai" -d "sweetaura.ai"
```
```bash
# The Certbot result should have this information in it
Certificate is saved at: /etc/letsencrypt/live/sweetaura.ai/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/sweetaura.ai/privkey.pem
This certificate expires on 2025-05-01.
```
- Now we can edit the nginx config file and replace the `server` section
```bash
# To edit the conf file for nginx
sudo nano /etc/nginx/nginx.conf
```
- data to replace `server` section with:
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

    # Proxy for backend API (port 8000)
    location / {
        proxy_pass http://localhost:8000;  # Backend API server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Proxy for webhook service (port 9000)
    location /hooks/ {
        proxy_pass http://0.0.0.0:9000;  # Webhook server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- After editing the file make sure to save it with `Ctrl O` and exit out of it with `Ctrl X`
- Restart the nginx server.
```bash
# restart the nginx server after making changes
sudo systemctl restart nginx
```

### Using Gunicorn to Run Mulitple Uvicorn Workers for Backend
- Good practice to use gunicorn with uvicorn to be able to run mulitple uvicorn workers in the case that there is an issue with the uvicorn server. To do this follow the steps below:
```bash
# go back to home directory
cd /home/ec2-user/AI-Companion-Project

# start the virtual env
source .venv/bin/activate
```
- Create gunicorn config file for more configuration flexibility
```bash
# create and modify the conf file for gunicorn
nano /home/ec2-user/AI-Companion-Project/backend/gunicorn.conf.py

# go to backend folder
cd /home/ec2-user/AI-Companion-Project/backend/

# create logs folder and files
mkdir /home/ec2-user/AI-Companion-Project/backend/logs
touch /home/ec2-user/AI-Companion-Project/backend/logs/gunicorn_access.log
touch /home/ec2-user/AI-Companion-Project/backend/logs/gunicorn_error.log

# make logs folder read/writable to all
sudo chmod 777 /home/ec2-user/AI-Companion-Project/backend/logs
```
- Paste in these commands into the `gunicorn.conf.py` file
```js
bind = "0.0.0.0:8000"
workers = 3  # Number of worker processes
worker_class = "uvicorn.workers.UvicornWorker"
loglevel = "info"
accesslog = "/home/ec2-user/AI-Companion-Project/backend/logs/gunicorn_access.log"
errorlog = "/home/ec2-user/AI-Companion-Project/backend/logs/gunicorn_error.log"
timeout = 120  # Timeout in seconds
```
- test to ensure the gunicorn serving is working properly
```bash
# Start the server to test it is working
cd /home/ec2-user/AI-Companion-Project/backend/
gunicorn main:app -c gunicorn.conf.py

# check the server and stop it after testing if needed
ps ax|grep gunicorn
pkill gunicorn

# deactivate the virtual env
deactivate
```
- Use systemd to make sure the gunicorn server is restarted on system startup
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

### Setting up GitHub Webhooks to auto deploy backend after GitHub commit

- Install and setup the latest version of ```Go```
```bash
# go to ec2 directory
cd /home/ec2-user

# find the latest Linux version from "https://go.dev/dl/" and install it
wget https://go.dev/dl/go1.23.5.linux-amd64.tar.gz

# extract the tar file to the local folder in root usr directory
sudo tar -C /usr/local -xzf go1.23.5.linux-amd64.tar.gz

# setup the Go environment
export PATH=$PATH:/usr/local/go/bin

# export GOROOT=/usr/local/go
# export GOPATH=$HOME/go
# export PATH=$GOROOT/bin:$GOPATH/bin:$PATH

# apply updated path changes
source ~/.bashrc

# check Go installed correctly
go version
which go
```

- Install and setup WebHooks
```bash
# install webhooks latest version with go
# this installs it in /home/ec2-user/go/bin
go install github.com/adnanh/webhook@latest

# check that webhooks was installed
cd /home/ec2-user/go/bin
ls -la

# Create webhooks directory structure
mkdir /home/ec2-user/webhooks
mkdir /home/ec2-user/webhooks/sweetaura-deployment
touch /home/ec2-user/webhooks/hooks.json
touch /home/ec2-user/webhooks/sweetaura-deployment/deploy.sh
chmod +x /home/ec2-user/webhooks/sweetaura-deployment/deploy.sh
```

- Set up webhook files ```hooks.json``` to direct the webhook to your deploy script
```bash
# add configuration into hooks.json
nano /home/ec2-user/webhooks/hooks.json
```
```json
[{
    "id": "sweetaura-deployment",
    "execute-command": "/home/ec2-user/webhooks/sweetaura-deployment/deploy.sh",
    "command-working-directory": "/home/ec2-user/AI-Companion-Project",
    "response-message": "Executing deploy script..."
    // "trigger-rule": {
    //     "match": {
    //         "type": "payload-hash-sha1",
    //         "secret": "The Returners",
    //         "parameter": {
    //             "source": "header",
    //             "name": "X-Hub-Signature"
    //         }
    //     }
    // }
}]

```
- Setup the ```deploy.sh``` bash script to pull from git and rebuild backend using the system service for fastapi
```bash
# create a new deploy.sh file
nano /home/ec2-user/webhooks/sweetaura-deployment/deploy.sh

# create deploy.log file as well
touch /home/ec2-user/AI-Companion-Project/deploy.log
```
```bash
#!/usr/bin/env bash

# Switch to ec2-user and run the deployment commands
sudo su - ec2-user <<'EOF'
set -e  # Enable error handling

# Define project directory and log file
PROJECT_DIR=/home/ec2-user/AI-Companion-Project
LOG_FILE=$PROJECT_DIR/deploy.log

# Navigate to project directory
cd $PROJECT_DIR || exit

# Start SSH agent if not running, add ssh password in plain text (not recommended generally)
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa <<< "sweetaura"

# Debugging steps
echo "Current User: $(whoami)" >> $LOG_FILE
echo "Project Directory: $PROJECT_DIR" >> $LOG_FILE
echo "SSH Keys Loaded: $(ssh-add -l 2>&1)" >> $LOG_FILE
echo "Git Remote Info:" >> $LOG_FILE
git remote -v >> $LOG_FILE

# Log deployment start
echo 'Starting deployment: ' $(date) >> $LOG_FILE

# Set up SSH key for GitHub
export GIT_SSH_COMMAND="ssh -i /home/ec2-user/.ssh/id_rsa"

# Ensure Git directory is marked as safe
git config --global --add safe.directory $PROJECT_DIR

# Check if remote 'origin' exists, and add if missing
if ! git remote | grep -q origin; then
    echo 'Adding remote origin...' >> $LOG_FILE
    git remote add origin git@github.com:zhatz111/AI-Companion-Project.git
fi

# Pull latest changes from main
echo 'Pulling latest changes...' >> $LOG_FILE
git fetch origin main
git reset --hard origin/main

# Activate virtual environment
if [ -d '.venv' ]; then
    echo 'Activating virtual environment...' >> $LOG_FILE
    source .venv/bin/activate
else
    echo 'Virtual environment not found, skipping activation.' >> $LOG_FILE
fi

# Install dependencies
echo 'Installing dependencies...' >> $LOG_FILE
cd backend/
uv pip install -r requirements.txt

# Restart FastAPI application
echo 'Restarting FastAPI application...' >> $LOG_FILE
sudo systemctl restart fastapi  # Adjust based on process manager

# Log completion
echo 'Deployment finished: ' $(date) >> $LOG_FILE
EOF
```

- to start the hooks webserver so that it listens for commits, should listen on port 9000
```bash
# ensure that the webhooks server works correctly and is listening
/home/ec2-user/go/bin/webhook -hooks /home/ec2-user/webhooks/hooks.json -ip 0.0.0.0 -verbose
```
- create a system service to automatically start the webhooks server on startup
```bash
# create service file
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

### Ensure GitHub is set up for webhooks
- After creating and adding an ssh key go to GitHub -> SSH keys -> New SSH key
- Add the SSH key you copied (this process will need to be done for every EC2 instance that is created)
```bash
# view and copy the public key to GitHub
cat ~/.ssh/id_rsa.pub 
```
- Modify the routing in Route53 to be the Public IP of EC2 instance
```
Public IPv4 = 52.14.76.39
```
- Go to the repository settings -> Webhooks and add the URL below to access the webhook on EC2
```
Webhooks link: https://api.sweetaura.ai/hooks/sweetaura-deployment
```
- Tes the webhook on the EC2 instance by going to the webhooks link, then check the logs to ensure it was successful
```bash
# webhooks log
journalctl -u webhook

# deployment log
cat /home/ec2-user/AI-Companion-Project/deploy.log
```
