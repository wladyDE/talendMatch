package com.quinscape.service;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.model.Level;
import com.quinscape.model.Skill;
import com.quinscape.repository.EmployeeRepository;
import com.quinscape.repository.EmployeeSkillRepository;
import com.quinscape.repository.SkillRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSkillService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private SkillRepository skillRepository;

    public EmployeeSkill addEmployeeSkill(EmployeeSkillDTO employeeSkillDTO) {
        Employee employee = employeeRepository.findById(employeeSkillDTO.getEmployeeId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
        Skill skill = skillRepository.findById(employeeSkillDTO.getSkillId())
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));
        Level level = Level.valueOf(employeeSkillDTO.getLevel());

        EmployeeSkill employeeSkill = EmployeeSkill.builder()
                .employee(employee)
                .skill(skill)
                .level(level)
                .build();

        return employeeSkillRepository.save(employeeSkill);
    }
}
