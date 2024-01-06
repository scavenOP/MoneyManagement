FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/money-management.jar money-management.jar
ENTRYPOINT ["java","-jar","/money-management.jar"]
EXPOSE 8080
