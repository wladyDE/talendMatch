package com.quinscape.data;

import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.repository.EmployeeRepository;
import com.quinscape.service.AzureTokenService;
import com.quinscape.service.AzureUserService;
import com.quinscape.service.EmployeeService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeInitializer {

    @Autowired
    private AzureUserService azureUserService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AzureTokenService azureTokenService;

    @PostConstruct
    @Transactional
    public void init() {
        try {
            String graphAccessToken = azureTokenService.getGraphAccessToken();

            List<AzureUser> azureUsers = azureUserService.fetchUsersData(graphAccessToken);

            List<Employee> existingEmployees = employeeRepository.findAll();
            List<Employee> newEmployees = new ArrayList<>();

            for (AzureUser azureUser : azureUsers) {
                boolean exists = existingEmployees.stream()
                        .anyMatch(emp -> emp.getEmployeeId().equals(azureUser.getId()));

                if (!exists) {
                    Employee newEmployee = employeeService.createEmployee(azureUser);
                    newEmployees.add(newEmployee);
                }
            }

            if (!newEmployees.isEmpty()) {
                employeeRepository.saveAll(newEmployees);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

