FROM nikolaik/python-nodejs:python3.11-nodejs18

# Create the app directory
RUN mkdir /Inference_Portal

# Set the working directory inside the container
WORKDIR /Inference_Portal
COPY package*.json ./
# Set environment variables
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Upgrade pip
RUN pip install --upgrade pip

# Copy the Django project  and install dependencies
COPY requirements.txt  /Inference_Portal/
RUN apt-get update && \
    apt-get install -qqy build-essential
# run this command to install all dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project to the container
COPY . /Inference_Portal/

# Expose the Django port
EXPOSE 8000

# Run Django’s development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]