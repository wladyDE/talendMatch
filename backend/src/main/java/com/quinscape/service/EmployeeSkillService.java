package com.quinscape.service;

import com.quinscape.dto.EmployeeSkillDTO;
import com.quinscape.model.Employee;
import com.quinscape.model.EmployeeSkill;
import com.quinscape.model.Level;
import com.quinscape.model.Skill;
import com.quinscape.repository.EmployeeRepository;
import com.quinscape.repository.EmployeeSkillRepository;
import com.quinscape.repository.LevelRepository;
import com.quinscape.repository.SkillRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeSkillService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private LevelRepository levelRepository;

    public void addEmployeeSkill(EmployeeSkillDTO employeeSkillDTO) {
        Employee employee = employeeRepository.findById(employeeSkillDTO.getEmployeeId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
        Skill skill = skillRepository.findById(employeeSkillDTO.getSkillId())
                .orElseThrow(() -> new EntityNotFoundException("Skill not found"));
        Level level = levelRepository.findById(employeeSkillDTO.getLevelId())
                .orElseThrow(() -> new EntityNotFoundException("Level not found"));

        Optional<EmployeeSkill> existingEmployeeSkill = employeeSkillRepository.findByEmployeeAndSkill(employee, skill);

        if (existingEmployeeSkill.isPresent()) {
            EmployeeSkill employeeSkill = existingEmployeeSkill.get();
            employeeSkill.setLevel(level);
            employeeSkillRepository.save(employeeSkill);
        } else {
            EmployeeSkill newEmployeeSkill = EmployeeSkill.builder()
                    .employee(employee)
                    .skill(skill)
                    .level(level)
                    .build();
            employeeSkillRepository.save(newEmployeeSkill);
        }
    }

}
