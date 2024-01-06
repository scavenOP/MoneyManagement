FROM openjdk:8
EXPOSE 8080
ADD target/money-management.jar money-management.jar
ENTRYPOINT ["java","-jar","/money-management.jar"]