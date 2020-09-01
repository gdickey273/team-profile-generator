const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");
const Employee = require("./Employee");


const employeeArray = [];


const createEmployee = async () => {

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
      if (!/[^a-z-\s]/.test(answers.name.toLowerCase())) {
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
        if (!/[^a-z-\s]/.test(answers.name.toLowerCase())) {
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
      if (answers.email.split("@").length !== 2) {
        isValidEmail = false;
      } else if (answers.email.trim().split(" ").length > 1) {
        isValidEmail = false;
      } else if (answers.email.split("@")[0].split(".").length > 1 || answers.email.split("@")[1].split(".").length < 2) {
        isValidEmail = false;
      } else {
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
        if (answers.email.split("@").length !== 2) {
          isValidEmail = false;
        } else if (answers.email.trim().split(" ").length > 1) {
          isValidEmail = false;
        } else if (answers.email.split("@")[0].split(".").length > 1 || answers.email.split("@")[1].split(".").length < 2) {
          isValidEmail = false;
        } else {
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
        choices: [{ name: "Manager", value: "Manager" }, { name: "Engineer", value: "Engineer" }, { name: "Intern", value: "Intern" }]
      },
    ]).then((answers) => {
      role = answers.role;
    });

  }

  const createManager = async () => {
    let officeNumber;

    const promptOfficeNumber = async () => {

      let isValidOfficeNumber;

      await inquirer.prompt([
        {
          name: "officeNumber",
          type: "input",
          message: `Please enter ${name}'s office number.`
        },
      ]).then((answers) => {
        if (!/[^a-z0-9.-\s]/.test(answers.officeNumber.toLowerCase())) {
          isValidOfficeNumber = true;
          officeNumber = answers.officeNumber;
        } else isValidOfficeNumber = false;
      });


      while (!isValidOfficeNumber) {
        await inquirer.prompt([{
          message: "Invalid Office Number. Please use only letters A-Z, numbers 0-9, and '-' or '.' characters.",
          type: "input",
          name: "officeNumber"
        }]).then(answers => {
          if (!/[^a-z0-9.-\s]/.test(answers.officeNumber.toLowerCase())) {
            isValidOfficeNumber = true;
            officeNumber = answers.officeNumber;
          }
        });
      }

    }

    await promptOfficeNumber();
    let manager = new Manager(name, email, officeNumber);
    employeeArray.push(manager);
  }

  const createIntern = async () => {
    let school;

    const promptSchoolName = async () => {

      let isValidSchool;

      await inquirer.prompt([
        {
          name: "school",
          type: "input",
          message: `Please enter the name of ${name}'s school.`
        },
      ]).then((answers) => {
        if (!/[^a-z\s]/.test(answers.school.toLowerCase())) {
          isValidSchool = true;
          school = answers.school;
        } else isValidSchool = false;
      });


      while (!isValidSchool) {
        await inquirer.prompt([{
          message: "Invalid school name. Please use only letters A-Z",
          type: "input",
          name: "school"
        }]).then(answers => {
          if (!/[^a-z\s]/.test(answers.school.toLowerCase())) {
            isValidSchool = true;
            school = answers.school;
          }
        });
      }

    }

    await promptSchoolName();
    let intern = new Intern(name, email, school);
    employeeArray.push(intern);
  }

  const createEngineer = async () => {
    let github;

    const promptGithub = async () => {

      let isValidGithub;

      await inquirer.prompt([
        {
          name: "github",
          type: "input",
          message: `Please enter ${name}'s github account.`
        },
      ]).then((answers) => {
        if (!/[^a-z0-9-]/.test(answers.github.trim().toLowerCase())) {
          if (/--/.test(answers.github)) {
            isValidGithub = false;
          } else if (answers.github.trim()[0] === "-" || answers.github.trim()[answers.github.trim().length - 1] === "-") {
            isValidGithub = false;
          } else {
            isValidGithub = true;
            github = answers.github.trim();
          }
        } else isValidGithub = false;
      });


      while (!isValidGithub) {
        await inquirer.prompt([{
          message: "Invalid github username. Usernames can only contain alphanumeric characters and single hyphens and cannot begin or end in a hyphen.",
          type: "input",
          name: "github"
        }]).then((answers) => {
          if (!/[^a-z0-9-]/.test(answers.github.trim().toLowerCase())) {
            if (/--/.test(answers.github)) {
              isValidGithub = false;
            } else if (answers.github.trim()[0] === "-" || answers.github.trim()[answers.github.trim().length - 1] === "-") {
              isValidGithub = false;
            } else {
              isValidGithub = true;
              github = answers.github.trim();
            }
          } else isValidGithub = false;
        });
      }

    }

    await promptGithub();
    let engineer = new Engineer(name, email, github);
    employeeArray.push(engineer);
  }
  await promptName();
  console.log(name);
  await promptEmail();
  console.log(email);
  await promptRole();
  console.log(role);

  switch (role) {
    case "Manager":
      await createManager();
      break;
    case "Intern":
      await createIntern();
      break;
    case "Engineer":
      await createEngineer();
      break;
  };





}
const fillEmployeeArray = async () => {
  let areMoreEmployees = true;

  while (areMoreEmployees) {
    await createEmployee();
    await inquirer.prompt([
      { type: "confirm", name: "areMoreEmployees", message: "Would you like to add another employee?" }]).then(answers => {
        areMoreEmployees = answers.areMoreEmployees;
      });
    console.log(employeeArray);
  }
}

const renderHTML = async () => {
  await fillEmployeeArray();
  
  const html = render(employeeArray);
  fs.writeFileSync("./output/team.html", html, "utf-8");

}

module.exports = renderHTML;