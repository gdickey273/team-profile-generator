class Employee {
  constructor(name, email){
    this.name = name;
    this.email = email;

    Employee.lastId++;
    this.id = Employee.lastId;
  }

  getName(){
    return this.name;
  }

  getId(){
    return this.id;
  }

  getEmail(){
    return this.email;
  }

  getRole(){
    return "Employee";
  }
}

Employee.lastId = 0;

module.exports = Employee;