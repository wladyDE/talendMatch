package com.quinscape.model;

public enum Role {
    USER("BENUTZER"),
    ADMIN("ADMINISTRATOR"),
    TEAM_LEADER("TEAMLEITER");

    private final String dbValue;

    Role(String dbValue) {
        this.dbValue = dbValue;
    }

    public String getDbValue() {
        return dbValue;
    }
}
