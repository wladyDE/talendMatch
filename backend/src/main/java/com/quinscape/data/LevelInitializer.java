package com.quinscape.data;

import com.quinscape.model.Level;
import com.quinscape.repository.LevelRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LevelInitializer {
    @Autowired
    private LevelRepository levelRepository;

    @PostConstruct
    public void init() {
        if (levelRepository.count() == 0) {
            levelRepository.save(new Level(null, "Einsteiger"));
            levelRepository.save(new Level(null, "Grundlegend"));
            levelRepository.save(new Level(null, "Fortgeschritten"));
            levelRepository.save(new Level(null, "Kompetent"));
            levelRepository.save(new Level(null, "Sehr erfahren"));
            levelRepository.save(new Level(null, "Meisterhaft"));
        }
    }
}
