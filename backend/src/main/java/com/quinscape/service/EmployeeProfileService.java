package com.quinscape.service;

import com.quinscape.model.AzureUser;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeProfile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeProfileService {

    public List<EmployeeProfile> getEmployeeProfiles(List<Employee> employees, List<AzureUser> azureEmployees) {
        List<EmployeeProfile> employeeProfiles = new ArrayList<>();

        for (AzureUser azureUser : azureEmployees) {
            Employee employee = employees.stream()
                    .filter(emp -> emp.getEmployeeId().equals(azureUser.getId()))
                    .findFirst()
                    .orElse(null);

            if (employee != null) {
                EmployeeProfile employeeProfile = getEmployeeProfile(employee, azureUser);
                employeeProfiles.add(employeeProfile);
            }
        }

        return sortEmployeeProfiles(employeeProfiles);
    }

    public EmployeeProfile getEmployeeProfile(Employee employee, AzureUser azureUser) {
        return EmployeeProfile.builder()
                .employeeId(azureUser.getId())
                .skillsVisibility(employee.isSkillsVisibility())
                .employeeSkills(employee.getEmployeeSkills())
                .displayName(azureUser.getDisplayName())
                .givenName(azureUser.getGivenName())
                .surname(azureUser.getSurname())
                .jobTitle(azureUser.getJobTitle())
                .mail(azureUser.getMail())
                .mobilePhone(azureUser.getMobilePhone())
                .photo(azureUser.getPhoto())
                .groups(azureUser.getGroups())
                .build();
    }

    private List<EmployeeProfile> sortEmployeeProfiles(List<EmployeeProfile> employeeProfiles) {
        return employeeProfiles.stream()
                .sorted(Comparator.comparing(EmployeeProfile::getDisplayName))
                .collect(Collectors.toList());
    }
}
