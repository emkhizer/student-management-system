#!/usr/bin/env node

// Importing the 'inquirer' library for user prompts
import inquirer from "inquirer";

// Define a student class
class Student {
  static counter = 10000; // 5 digits unique Id created and assigned to students
  id: number;
  name: string;
  courses: string[];
  balance: number;

  // Constructor to initialize student properties
  constructor(name: string) {
    this.id = Student.counter++; // Incrementing the counter to assign a unique ID to each student
    this.name = name;
    this.courses = []; // Initialize an empty array for courses
    this.balance = 100; // Initial balance set to $100
  }

  // Method to enroll a student in a course
  enroll_course(course: string) {
    this.courses.push(course);
  }

  // Method to view a student's balance
  view_balance() {
    console.log(`Student ${this.name} has a balance of ${this.balance}`);
  }

  // Method to pay student fees
  pay_fees(amount: number) {
    this.balance -= amount; // Deducting fees from the balance
    console.log(`$${amount} fees paid successfully for ${this.name}`);
    console.log(`Remaining Balance: $${this.balance}`);
  }

  // Method to display student status
  show_status() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
  }
}

// Define a student manager class to manage students
class Student_manager {
  students: Student[];

  // Constructor to initialize student array
  constructor() {
    this.students = [];
  }

  // Method to add a new student
  add_student(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      `Student: ${name} added successfully. Student ID: ${student.id}`
    );
  }

  // Method to enroll student in a course
  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.name} enrolled in ${course} successfully`);
    }
  }

  // Method to view a student's balance
  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log("Student not found. Please enter a correct student ID");
    }
  }

  // Method to pay student fees
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log("Student not found. Please enter a correct student ID");
    }
  }

  // Method to display student status
  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }

  // Method to find student by student_id
  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}

// Main function to run the program
async function main() {
  console.log("Student Management System");

  let student_manager: any = new Student_manager();

  // While loop to keep the program running
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: [
          "Add student",
          "Enroll Student",
          "View Student Balance",
          "Pay fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);

    // Switch case to handle user choice
    switch (choice.choice) {
      case "Add student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter a student Name",
          },
        ]);
        student_manager.add_student(name_input.name);
        break;

      case "Enroll Student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter a course Name",
          },
        ]);
        student_manager.enroll_student(
          course_input.student_id,
          course_input.course
        );
        break;

      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

      case "Pay fees":
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter the amount to pay",
          },
        ]);
        student_manager.pay_student_fees(
          fees_input.student_id,
          fees_input.amount
        );
        break;

      case "Show Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a student ID",
          },
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;

      case "Exit":
        console.log("Exiting...");
        process.exit();
    }
  }
}

// Calling the main function to start the program
main();
