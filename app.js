const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
console.log("Welcome to the app!")
const promptEmployeeInfo = async () => {

  let name;
  let email;
  let role;
  
  const promptName = async () => {

    let isValidName;

    await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter employee name."
      },
    ]).then((answers) => {
      if (!/[^abcdefghijklmnopqrstuvwxyz-\s]/.test(answers.name.toLowerCase())) {
        isValidName = true;
        name = answers.name;
      } else isValidName = false;
    });


    while (!isValidName) {
      await inquirer.prompt([{
        message: "Invalid name. Please use only letters A-Z and '-' characters.",
        type: "input",
        name: "name"
      }]).then(answers => {
        if (!/[^abcdefghijklmnopqrstuvwxyz-\s]/.test(answers.name.toLowerCase())) {
          isValidName = true;
          name = answers.name;
        }
      });
    }

  }

  const promptEmail = async () => {

    let isValidEmail;

    await inquirer.prompt([
      {
        name: "email",
        type: "input",
        message: "Please enter employee email."
      },
    ]).then((answers) => {
      if(answers.email.split("@").length !== 2){
        isValidEmail = false;
      } else if(answers.email.trim().split(" ").length > 1){
        isValidEmail = false;
      } else if(answers.email.split("@")[0].split(".").length > 0 || answers.email.split("@")[1].split(".").length < 1){
        isValidEmail = false;
      } else{
        isValidEmail = true;
        email = answers.email;
      }
    });


    while (!isValidEmail) {
      await inquirer.prompt([{
        message: "Please enter a valid email address.",
        type: "input",
        name: "email"
      }]).then((answers) => {
        if(answers.email.split("@").length !== 2){
          isValidEmail = false;
        } else if(answers.email.trim().split(" ").length > 1){
          isValidEmail = false;
        } else if(answers.email.split("@")[0].split(".").length > 1 || answers.email.split("@")[1].split(".").length < 2){
          isValidEmail = false;
        } else{
          isValidEmail = true;
          email = answers.email;
        }
      });
  
    }

  }


  const promptRole = async () => {

    await inquirer.prompt([
      {
        name: "role",
        type: "list",
        message: "Please select employee role.",
        choices: [{ name: "Manager", value: "manager" }, { name: "Engineer", value: "engineer" }, { name: "Intern", value: "intern" }]
      },
    ]).then((answers) => {
      role = answers.role;
    });

  }


  await promptName();
  console.log(name);

  await promptEmail();
  console.log(email);


  const promptManagerInfo = () => {
    let name;
    let email;
    let officeNumber;


  }


  let areMoreEmployees = true;
  while (areMoreEmployees) {
    await promptRole();
    console.log(role);
    switch (role) {
      case "manager":
        promptManagerInfo();
        break;
      case "intern":
        promptInterInfo();
        break;
      case "engineer":
        promptEngineerInfo();
        break;
    };
    console.log("After switch!");
    areMoreEmployees = false;
    //areMoreEmployees = promptMoreEmployees();
  }
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

promptEmployeeInfo();
