package com.quinscape.model;

public enum Level {
    BEGINNER("Anfänger"),
    BASIC_KNOWLEDGE("Grundkenntnisse"),
    INTERMEDIATE("Mittelstufe"),
    ADVANCED("Gehoben"),
    PROFICIENT("Fortgeschritten"),
    EXPERT("Experte");

    private final String dbValue;

    Level(String dbValue) {
        this.dbValue = dbValue;
    }

    public String getDbValue() {
        return dbValue;
    }
}

