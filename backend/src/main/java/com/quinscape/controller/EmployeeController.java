package com.quinscape.controller;

import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.request.SkillFilterRequest;
import com.quinscape.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/talendmatch/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();

        return employees.stream()
                .sorted(Comparator.comparing(Employee::getLastname)
                        .thenComparing(Employee::getFirstname))
                .collect(Collectors.toList());
    }

    @PostMapping
    public List<Employee> getEmployees(@RequestBody SkillFilterRequest skillFilterRequest) {
        List<Long> skillIds = skillFilterRequest.getSkillIds();
        List<Employee> employees = employeeService.getEmployeesBySkills(skillIds);
        loadSpecifiedSkillsForEmployees(employees, skillIds);

        return employees.stream()
                .sorted(Comparator.comparing(Employee::getLastname)
                        .thenComparing(Employee::getFirstname))
                .collect(Collectors.toList());
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

    private void loadSpecifiedSkillsForEmployees(List<Employee> employees, List<Long> skillIds) {
        for (Employee employee : employees) {
            List<EmployeeSkill> specifiedSkills = employeeService.getSpecifiedSkillsByEmployeeId(employee.getEmployeeId(), skillIds);
            employee.setEmployeeSkills(specifiedSkills);
        }
    }
}
