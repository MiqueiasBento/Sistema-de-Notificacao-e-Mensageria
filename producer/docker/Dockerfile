# Stage build (Maven + Temurin)
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /build

# copiar apenas o necessário para acelerar cache
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src

RUN mvn -e -B clean package -DskipTests

# Stage runtime
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY --from=builder /build/target/*.jar /app/app.jar

EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]
