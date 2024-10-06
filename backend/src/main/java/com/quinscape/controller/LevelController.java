package com.quinscape.controller;

import com.quinscape.model.Level;
import com.quinscape.service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/talendmatch/api/v1/levels")
public class LevelController {
    @Autowired
    private LevelService levelService;

    @GetMapping
    public ResponseEntity<List<Level>> getLevels() {
        try {
            List<Level> levels = levelService.getLevels();

            if (levels.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(levels);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
