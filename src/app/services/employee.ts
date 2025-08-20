// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { LocalStorageService } from './Localsstorage.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private storageKey = 'employees';

  constructor(private localStorage: LocalStorageService) {}

  getEmployees(): Employee[] {
    const data = this.localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveEmployees(employees: Employee[]): void {
    this.localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
  }

  updateEmployee(updated: Employee): void {
    const employees = this.getEmployees().map(emp =>
      emp.id === updated.id ? updated : emp
    );
    this.saveEmployees(employees);
  }

  deleteEmployee(id: number): void {
    const employees = this.getEmployees().filter(emp => emp.id !== id);
    this.saveEmployees(employees);
  }

  getNextId(): number {
    const employees = this.getEmployees();
    return employees.length > 0
      ? Math.max(...employees.map(e => e.id)) + 1
      : 1;
  }
}
