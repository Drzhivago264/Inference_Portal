django-inference-portal
=======================

This is a simple dynamic django server that uses django channels, django ninja, celery, vectordb and Redis to interact with GPU servers for language model inference.

Purpose
-------

The purpose of this project is to offer users simple interfaces to interact with GPU servers.
This website processses API and HTTP requests from users, forwards them to the GPU servers and forwards the responses back in a dynamic manner, this includes real-time chat rooms. In addition, this website also provides an implementation of REACT agent (refer to [Yao et al., 2022](https://arxiv.org/abs/2210.03629)).

Design
-------
- The /frontend of this website uses React.js which are packed into bundle in frontend/templates/frontend_index.html using webpack. 
- The backend of this website can be found in /server which use Django Rest Framework to serve requests from the frontend.
- Redis server fowards the message for the websockets that are used for real time chat.
- Django Channel with async customers are used to serve real-time chat messages. 
- The chat and prompt history of user is vectorised and stored for vector search.
- Django Ninja open REST api endpoints forward the user requests to GPU servers.
- GPU servers do inference, each GPU server holds one model and uses vLLM to open endpoints. 
- Nginx is used as a proxy for the Django server and serve static files.
- Celery is used to run multiple background tasks including spin up, stop, create and terminate EC GPU instances. Celery is also used to queue 
 API requests to GPU servers. Noting that Celery does not run properly on Window, so you should switch to Linux or living with with --solo pool.
- Postgresql runs locally and can only be accessed from Django

The implementation of React and data flow is explained in the diagram below

![Alt text](React+Vec.drawio.png)

Installation
--------------

First of all, for start using django-inference-portal, you must download it using git

    git clone https://github.com/Drzhivago264/Inference_Portal.git

Before install dependencies, you need to install Postgres, and create a table named professorparakeet. 

    sudo apt install postgresql postgresql-contrib
    sudo apt-get install libpq-dev

    sudo -i -u postgres #postgress is the default user when install postgres
    createdb professorparakeet
    psql
    \password
    #create a password for postgres user

    sudo systemctl start postgresql.service

    #if you want to enable postgres on start up use this command
    sudo systemctl enable postgresql

You also need to install NPM and Node.js for the frontend.
    
    sudo apt install nodejs
    sudo apt install npm

Next you must install dependencies and migrate the db to Postgresql:

    pip install -r "requirements.txt"
    
    python manage.py migrate
    python manage.py loaddata whole.json

Next you must install Redis and start Redis Server at port 6380:

    sudo apt install lsb-release curl gpg
    curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
    sudo apt-get update
    sudo apt-get install redis
    redis-server --port 6380

Next you must install celery and celery-beat with redis support and launch a Celery Worker and a Celery Beat Worker:

    pip install celery[redis]
    celery -A inferenceportal worker --loglevel=info --pool threads
    celery -A inferenceportal worker --loglevel=info --pool threads -Q "periodic"
    celery -A inferenceportal beat --loglevel=info

Next you must setup STRIPE CLI and start a webhook:

    curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
    echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe list
    sudo apt update
    sudo apt install stripe
    stripe listen --forward-to localhost:8000/webhooks/stripe/

Next you must setup Monero and start a rpc server, I am working on a full tutorial to deploy your own node and payment server:

    ./monero-wallet-rpc --daemon-address {Your node address} --rpc-bind-port 18082 --wallet-file {your wallet file} --password {your password} --disable-rpc-login

*Noting that in production server you must generate "View-only" wallet from your local wallet (secret key) to avoid being robbed by the society.

Next you need to set up .env file and setup the following key:

    STRIPE_PUBLISHABLE_KEY=""
    STRIPE_SECRET_KEY=""
    BACKEND_DOMAIN=""
    PAYMENT_SUCCESS_URL=""
    PAYMENT_CANCEL_URL=""
    STRIPE_WEBHOOK_SECRET="" 
    EMAIL_ADDRESS = "" (The EMAIL_ADDRESS that fowards contact form)
    EMAIL_PASSWORD = "" (The password for EMAIL_ADDRESS that fowards contact form)
    DJANGO_SETTINGS_MODULE="inferenceportal.settings"
    aws_access_key_id="" (The AWS key that can perform boot/stop/reboot/terminiate operation on your GPU instances)
    aws_secret_access_key="" (The AWS secret key that can perform boot/stop/reboot/terminiate operation on your GPU instances)
    ADMIN_PATH = "" (your admin path, keep it hard to guess)
    DJANGO_SECRET_KEY = "" 
    POSTGRES_USER = "" (Your Postgres Username)
    POSTGRES_PASSWORD = "" (YOUR Postgres Password)
    GPT_KEY = "" (OPENAI key for the agent function)
    CMC_API = "" (Coinmarketcap API to get the exchange rate of Monero, you may use different API but you need to rewrite the update_crypto_rate() in celery_tasks.py)

*Noting that if you run your own private node and process payment via RPC, querying 3rd party exchange for conversion rate does not affect your privacy, unless, you give them a request pattern along with payment pattern to trace you down. However, if people go that far to trace you down, you seem to have bigger problems to deal with already. Good luck with them.

Finally you can test the server with:

    python manage.py runserver

In production environment, you may want to configure the server to be served by Daphne or both Daphne and Gurnicorn (refer to [Channels Docs](https://channels.readthedocs.io/en/1.x/deploying.html?highlight=django)).

Contents in `staticfiles` directory are served as `/static/`. In production environment this folder need to be removed from root and served by NGINX or APACHE

About the GPU intances, you need to set up a vLLM server to serve the models listed in LLM.model:

    # Install vLLM with CUDA 12.1.
    pip install vllm
    python -m vllm.entrypoints.api_server --model {your model}

If you expose this instance to the internet you may need Nginx or Apache server in front of it. If you route it through your subnet or have a security policy that only accept requests from your Django server then you are good to go.

In addition, as we need to automatically boot and shutdown your GPU intances, you may consider using Supervisor or equivalent to setup the vLLM on startup.

Development environment setup
-----------------------------
After finishing the steps above, you need to set up a vLLM server to serve the models listed in model.LLM (check admin page and remember to avoid 8000 and 6380 port that Django is running):

    pip install vllm
    python -m vllm.entrypoints.api_server --model gpt2 --port 8080

If you have more than 1 GPU, you can serve multiple models at multiple ports (remember of use unique ports):

    CUDA_VISIBLE_DEVICES = 0 python -m vllm.entrypoints.api_server --model gpt2 --port 8080
    CUDA_VISIBLE_DEVICES = 1 python -m vllm.entrypoints.api_server --model gpt2-large --port 8888  

If you have issue, you may need to seperate vLLM into multiple local environments.

If you want to customise frontend, you should run:

    npm run dev

This command will automatically update your changes to the /static folder. Also, you need to change the DEBUG = True to see the changes as you made them.

However, in production env, you must run later:

    npm run build

This command will remove error traceback and pack up your code into much smaller size that is suitable for production. These files still live in /static and you must follow up the command below to hash the filenames and move it to /staticfiles:

    python manage.py collectstatic

Currently, this website use cloudflare CDN to serve webpack bundles. However, you can adjust the settings.py and directly use your /staticfiles 

Final words
-----------

This project is actively developed stage if you have any suggestions you can tell me. I also need your help if you have some.
