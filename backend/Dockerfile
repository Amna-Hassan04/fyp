# Use an official lightweight Python image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for OpenCV (cv2)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first to leverage Docker caching
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend source code
COPY . .

# Expose port 7860 (Hugging Face Spaces default incoming port)
EXPOSE 7860

# Run the FastAPI app using uvicorn on port 7860 and host 0.0.0.0
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]