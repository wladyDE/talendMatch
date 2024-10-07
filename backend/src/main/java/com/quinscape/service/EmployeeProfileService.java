package com.quinscape.service;

import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import com.quinscape.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeProfileService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeProfile> getEmployeeProfiles(List<Employee> employees, List<AzureUser> azureEmployees) {
        List<EmployeeProfile> employeeProfiles = new ArrayList<>();
        List<Employee> newEmployees = new ArrayList<>();

        for (AzureUser azureUser : azureEmployees) {
            Employee employee = employees.stream()
                    .filter(emp -> emp.getEmployeeId().equals(azureUser.getId()))
                    .findFirst()
                    .orElse(null);

            if (employee == null) {
                employee = Employee.builder()
                        .employeeId(azureUser.getId())
                        .skillsVisibility(false)
                        .employeeSkills(new ArrayList<>())
                        .build();

                newEmployees.add(employee);
            }

            EmployeeProfile employeeProfile = getEmployeeProfile(employee, azureUser);
            employeeProfiles.add(employeeProfile);
        }

        if (!newEmployees.isEmpty()) {
            employeeRepository.saveAll(newEmployees);
        }

        return employeeProfiles;
    }

    public EmployeeProfile getEmployeeProfile(Employee employee, AzureUser azureUser) {
        return EmployeeProfile.builder()
                .employeeId(employee.getEmployeeId())
                .skillsVisibility(employee.isSkillsVisibility())
                .employeeSkills(employee.getEmployeeSkills())
                .displayName(azureUser.getDisplayName())
                .givenName(azureUser.getGivenName())
                .surname(azureUser.getSurname())
                .jobTitle(azureUser.getJobTitle())
                .mail(azureUser.getMail())
                .mobilePhone(azureUser.getMobilePhone())
                .photo(azureUser.getPhoto())
                .roles(azureUser.getRoles())
                .groups(azureUser.getGroups())
                .build();
    }

    public List<EmployeeProfile> sortEmployeeProfiles(List<EmployeeProfile> employeeProfiles) {
        return employeeProfiles.stream()
                .sorted(Comparator.comparing(EmployeeProfile::getSurname)
                        .thenComparing(EmployeeProfile::getGivenName))
                .collect(Collectors.toList());
    }
}
