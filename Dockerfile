# Build Stage
FROM maven:3.8.4-openjdk-17 AS build

# Set working directory to the backend directory
WORKDIR /src

# Copy the Maven POM file
COPY pom.xml .

# Copy the entire backend source code
COPY src/ src/

# Build the backend
RUN mvn clean package -DskipTests

# Frontend Stage
FROM node:14 AS frontend

# Set working directory to the frontend directory
WORKDIR /frontend

# Copy the frontend source code
COPY frontend/ .

# Install dependencies and build the React app
RUN npm install
RUN npm run build

# Final Stage
FROM openjdk:17.0.1-jdk-slim

# Set working directory to the backend directory
WORKDIR /backend

# Copy the compiled JAR file from the build stage
COPY --from=build /backend/target/PROGI-Spajalice-0.0.1-SNAPSHOT.jar PROGI-Spajalice.jar

# Copy the built React app from the frontend stage
COPY --from=frontend /frontend/build/ /frontend/build/

# Expose the port for the Spring Boot app
EXPOSE 8080

# Set the entry point to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "PROGI-Spajalice.jar"]
