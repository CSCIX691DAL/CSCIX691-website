# CSCI X691
## Class Project - Course Website

### Helpful Links:
#### Hosted App
https://x691webapp.web.app 

https://x691webapp.firebaseapp.com

#### Azure
https://dev.azure.com/x691w21i/Website

#### Firebase
https://console.firebase.google.com/u/0/project/x691webapp/overview

#### Figma
https://www.figma.com/files/team/931947114085387645/X691-Website-Winter-2021


### LocalHost

For Windows:

Use Win + R open CMD (Command Line)  

cd to local repo directory. 

Execute: npm install  

Execute: ng serve  

Web browser: localhost:4200

### Testing
As of the moment, there is some basic unit testing in place for the purpose of continiuous integration, but they are not being run automatically on merges due to an issue with github actions not recognizing "ng test" as a command it knows. The resolution of this has been left as an activity for a future group. For the moment, developers can run the tests locally with the command "ng test".
