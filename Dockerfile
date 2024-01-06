FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/money-management.jar.jar money-management.jar.jar
ENTRYPOINT ["java","-jar","/money-management.jar"]
EXPOSE 8080
