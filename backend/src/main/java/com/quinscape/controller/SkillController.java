package com.quinscape.controller;

import com.quinscape.model.Skill;
import com.quinscape.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/talendmatch/api/v1/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        try {
            List<Skill> skills = skillService.getAllSkills();

            if (skills.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}