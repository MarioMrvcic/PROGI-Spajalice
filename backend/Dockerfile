# Builder stage
FROM openjdk:17-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper files (if present)
COPY /backend/.mvn .mvn

# Copy the Maven wrapper script and the POM file
COPY /backend/mvnw .
COPY /backend/pom.xml .

# Copy the source code
COPY /backend/src src

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Application stage
FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/*.jar /app/app.jar

# Expose the port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
