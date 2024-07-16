package com.quinscape.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SkillFilterRequest {
    private List<Long> skillIds;
}
