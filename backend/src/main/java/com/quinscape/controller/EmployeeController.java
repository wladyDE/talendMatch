package com.quinscape.controller;

import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/talendmatch/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        for (Employee employee : employees) {
            List<EmployeeSkill> skills = employeeService.getSkillsByEmployeeId(employee.getEmployeeId());
            employee.setEmployeeSkills(skills);
        }
        employees.sort(Comparator.comparing(Employee::getEmployeeName));
        return employees;
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            List<EmployeeSkill> skills = employeeService.getSkillsByEmployeeId(id);
            employee.setEmployeeSkills(skills);
        }
        return employee;
    }
}
