import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeesComponent implements OnInit {
  employeeForm!: FormGroup;
  employees: Employee[] = [];
  editingEmployee: Employee | null = null;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(1)]]
    });
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }


  saveEmployee(): void {
    if (this.employeeForm.invalid) return;

    if (this.editingEmployee) {
      const updated: Employee = { ...this.editingEmployee, ...this.employeeForm.value };
      this.employeeService.updateEmployee(updated);
      this.editingEmployee = null;
    } else {
      const newEmployee: Employee = { id: this.employeeService.getNextId(), ...this.employeeForm.value };
      this.employeeService.addEmployee(newEmployee);
    }

    this.employeeForm.reset({ salary: 0 });
    this.loadEmployees();
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = employee;
    this.employeeForm.patchValue(employee);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
    this.loadEmployees();
  }

  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void { this.currentPage = page; }
  get totalPages(): number { return Math.ceil(this.employees.length / this.itemsPerPage); }
}
