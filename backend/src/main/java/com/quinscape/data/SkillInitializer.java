package com.quinscape.data;

import com.quinscape.model.Level;
import com.quinscape.model.Skill;
import com.quinscape.model.SkillCategory;
import com.quinscape.model.SkillSubcategory;
import com.quinscape.repository.SkillCategoryRepository;
import com.quinscape.repository.SkillRepository;
import com.quinscape.repository.SkillSubcategoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SkillInitializer {
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    SkillSubcategoryRepository skillSubcategoryRepository;
    @Autowired
    SkillCategoryRepository skillCategoryRepository;

    @PostConstruct
    public void init() {
        SkillCategory softSkills = new SkillCategory(null, "Soft Skills");
        SkillCategory hardSkills = new SkillCategory(null, "Hard Skills");

        if(skillCategoryRepository.count() == 0){
            skillCategoryRepository.save(softSkills);
            skillCategoryRepository.save(hardSkills);
        }

        SkillSubcategory methodSkills = new SkillSubcategory(null, "Methodische Skills", softSkills);
        SkillSubcategory socialSkills = new SkillSubcategory(null, "Soziale Skills", softSkills);
        SkillSubcategory personSkills = new SkillSubcategory(null, "Personale Skills", softSkills);
        SkillSubcategory communicationSkills = new SkillSubcategory(null, "Kommunikative Skills", softSkills);

        SkillSubcategory frontend = new SkillSubcategory(null, "Frontend Entwicklung", hardSkills);
        SkillSubcategory backend = new SkillSubcategory(null, "Backend Entwicklung", hardSkills);
        SkillSubcategory database = new SkillSubcategory(null, "Datenbanken", hardSkills);
        SkillSubcategory devOps = new SkillSubcategory(null, "DevOps", hardSkills);
        SkillSubcategory testing = new SkillSubcategory(null, "Testing", hardSkills);
        SkillSubcategory language = new SkillSubcategory(null, "Sprachen", hardSkills);
        SkillSubcategory science = new SkillSubcategory(null, "Wissenschaften", hardSkills);
        SkillSubcategory clients = new SkillSubcategory(null, "Kundenkenntnisse", hardSkills);
        SkillSubcategory technology = new SkillSubcategory(null, "Technologie Stack", hardSkills);

        if(skillSubcategoryRepository.count() == 0){
            skillSubcategoryRepository.save(methodSkills);
            skillSubcategoryRepository.save(socialSkills);
            skillSubcategoryRepository.save(personSkills);
            skillSubcategoryRepository.save(communicationSkills);

            skillSubcategoryRepository.save(frontend);
            skillSubcategoryRepository.save(backend);
            skillSubcategoryRepository.save(database);
            skillSubcategoryRepository.save(devOps);
            skillSubcategoryRepository.save(testing);
            skillSubcategoryRepository.save(language);
            skillSubcategoryRepository.save(science);
            skillSubcategoryRepository.save(clients);
            skillSubcategoryRepository.save(technology);
        }

        if(skillRepository.count() == 0){
            skillRepository.save(new Skill(null, "Analytische Fähigkeiten", methodSkills));
            skillRepository.save(new Skill(null, "Belastbarkeit", methodSkills));
            skillRepository.save(new Skill(null, "Zeitmanagement", methodSkills));
            skillRepository.save(new Skill(null, "Führungskompetenz", methodSkills));
            skillRepository.save(new Skill(null, "Innovationsfähigkeit", methodSkills));
            skillRepository.save(new Skill(null, "Medienkompetenz", methodSkills));
            skillRepository.save(new Skill(null, "Organisationsvermögen", methodSkills));
            skillRepository.save(new Skill(null, "Präsentationstechniken", methodSkills));
            skillRepository.save(new Skill(null, "Problemlösungskompetenz", methodSkills));
            skillRepository.save(new Skill(null, "Sorgfältigkeit", methodSkills));
            skillRepository.save(new Skill(null, "Strategisches Denken", methodSkills));

            skillRepository.save(new Skill(null, "Aufgeschlossenheit", socialSkills));
            skillRepository.save(new Skill(null, "Delegationsbereitschaft", socialSkills));
            skillRepository.save(new Skill(null, "Emotionale Intelligenz", socialSkills));
            skillRepository.save(new Skill(null, "Integrationsbereitschaft", socialSkills));
            skillRepository.save(new Skill(null, "Konfliktlösungsfähigkeit", socialSkills));
            skillRepository.save(new Skill(null, "Kooperationsbereitschaft", socialSkills));
            skillRepository.save(new Skill(null, "Kritikfähigkeit", socialSkills));
            skillRepository.save(new Skill(null, "Teamfähigkeit", socialSkills));

            skillRepository.save(new Skill(null, "Eigeninitiative", personSkills));
            skillRepository.save(new Skill(null, "Entscheidungsfähigkeit", personSkills));
            skillRepository.save(new Skill(null, "Flexibilität", personSkills));
            skillRepository.save(new Skill(null, "Lernbereitschaft", personSkills));
            skillRepository.save(new Skill(null, "Neugierde", personSkills));
            skillRepository.save(new Skill(null, "Fokussierung", personSkills));
            skillRepository.save(new Skill(null, "Zielstrebigkeit", personSkills));
            skillRepository.save(new Skill(null, "Stressresistenz", personSkills));

            skillRepository.save(new Skill(null, "Aktives Zuhören", communicationSkills));
            skillRepository.save(new Skill(null, "Begeisterungsfähigkeit", communicationSkills));
            skillRepository.save(new Skill(null, "Wissensvermittlung", communicationSkills));
            skillRepository.save(new Skill(null, "Verhandlungsführung", communicationSkills));
            skillRepository.save(new Skill(null, "Gestik und Mimik", communicationSkills));
            skillRepository.save(new Skill(null, "Rhetorik", communicationSkills));
            skillRepository.save(new Skill(null, "Verhandlungskompetenz", communicationSkills));
            skillRepository.save(new Skill(null, "Überzeugungsvermögen", communicationSkills));

            skillRepository.save(new Skill(null, "HTML", frontend));
            skillRepository.save(new Skill(null, "CSS", frontend));
            skillRepository.save(new Skill(null, "JavaScript", frontend));
            skillRepository.save(new Skill(null, "TypeScript", frontend));
            skillRepository.save(new Skill(null, "React", frontend));
            skillRepository.save(new Skill(null, "Angular", frontend));
            skillRepository.save(new Skill(null, "Vue.js", frontend));
            skillRepository.save(new Skill(null, "jQuery", frontend));
            skillRepository.save(new Skill(null, "Bootstrap", frontend));
            skillRepository.save(new Skill(null, "Tailwind CSS", frontend));
            skillRepository.save(new Skill(null, "Webpack", frontend));
            skillRepository.save(new Skill(null, "Babel", frontend));
            skillRepository.save(new Skill(null, "SASS", frontend));
            skillRepository.save(new Skill(null, "LESS", frontend));
            skillRepository.save(new Skill(null, "Styled Components", frontend));
            skillRepository.save(new Skill(null, "Emotion", frontend));

            skillRepository.save(new Skill(null, "Node.js", backend));
            skillRepository.save(new Skill(null, "Express.js", backend));
            skillRepository.save(new Skill(null, "Django", backend));
            skillRepository.save(new Skill(null, "Flask", backend));
            skillRepository.save(new Skill(null, "Spring", backend));
            skillRepository.save(new Skill(null, "ASP.NET", backend));
            skillRepository.save(new Skill(null, "Laravel", backend));
            skillRepository.save(new Skill(null, "Phoenix", backend));
            skillRepository.save(new Skill(null, "NestJS", backend));
            skillRepository.save(new Skill(null, "Kotlin", backend));
            skillRepository.save(new Skill(null, "REST APIs", backend));

            skillRepository.save(new Skill(null, "MySQL", database));
            skillRepository.save(new Skill(null, "PostgreSQL", database));
            skillRepository.save(new Skill(null, "MongoDB", database));
            skillRepository.save(new Skill(null, "SQLite", database));
            skillRepository.save(new Skill(null, "Redis", database));
            skillRepository.save(new Skill(null, "Oracle", database));
            skillRepository.save(new Skill(null, "MariaDB", database));
            skillRepository.save(new Skill(null, "CouchDB", database));
            skillRepository.save(new Skill(null, "Firestore", database));
            skillRepository.save(new Skill(null, "DynamoDB", database));
            skillRepository.save(new Skill(null, "Neo4j", database));
            skillRepository.save(new Skill(null, "Snowflake", database));
            skillRepository.save(new Skill(null, "HBase", database));

            skillRepository.save(new Skill(null, "Docker", devOps));
            skillRepository.save(new Skill(null, "Kubernetes", devOps));
            skillRepository.save(new Skill(null, "Jenkins", devOps));
            skillRepository.save(new Skill(null, "Azure", devOps));
            skillRepository.save(new Skill(null, "Google Cloud", devOps));
            skillRepository.save(new Skill(null, "CI/CD", devOps));
            skillRepository.save(new Skill(null, "Git", devOps));
            skillRepository.save(new Skill(null, "Puppet", devOps));

            skillRepository.save(new Skill(null, "Postman", testing));
            skillRepository.save(new Skill(null, "Selenium", testing));
            skillRepository.save(new Skill(null, "Cypress", testing));
            skillRepository.save(new Skill(null, "Puppeteer", testing));
            skillRepository.save(new Skill(null, "Playwright", testing));
            skillRepository.save(new Skill(null, "Cucumber", testing));
            skillRepository.save(new Skill(null, "JUnit", testing));
            skillRepository.save(new Skill(null, "Mocking", testing));

            skillRepository.save(new Skill(null, "Deutsch", language));
            skillRepository.save(new Skill(null, "Englisch", language));
            skillRepository.save(new Skill(null, "Spanisch", language));
            skillRepository.save(new Skill(null, "Französisch", language));
            skillRepository.save(new Skill(null, "Italienisch", language));
            skillRepository.save(new Skill(null, "Russisch", language));
            skillRepository.save(new Skill(null, "Türkisch", language));
            skillRepository.save(new Skill(null, "Chinesisch", language));

            skillRepository.save(new Skill(null, "Mathematik", science));
            skillRepository.save(new Skill(null, "Physik", science));
            skillRepository.save(new Skill(null, "Informatik", science));
            skillRepository.save(new Skill(null, "Chemie", science));
            skillRepository.save(new Skill(null, "Biologie", science));
            skillRepository.save(new Skill(null, "Astronomie", science));
            skillRepository.save(new Skill(null, "Geographie", science));
            skillRepository.save(new Skill(null, "Psychologie", science));

            skillRepository.save(new Skill(null, "Bayern", clients));
            skillRepository.save(new Skill(null, "Bavaria Film", clients));
            skillRepository.save(new Skill(null, "Bültel", clients));
            skillRepository.save(new Skill(null, "Hochbahn", clients));
            skillRepository.save(new Skill(null, "Devolo", clients));
            skillRepository.save(new Skill(null, "cplace", clients));
            skillRepository.save(new Skill(null, "Continental", clients));
            skillRepository.save(new Skill(null, "Asellion", clients));
            skillRepository.save(new Skill(null, "BEGA", clients));
            skillRepository.save(new Skill(null, "Durable", clients));

            skillRepository.save(new Skill(null, "Intrexx", technology));
            skillRepository.save(new Skill(null, "cplace", technology));
            skillRepository.save(new Skill(null, "Denodo", technology));
            skillRepository.save(new Skill(null, "Talend", technology));
            skillRepository.save(new Skill(null, "snowflake", technology));
            skillRepository.save(new Skill(null, "OneData", technology));
            skillRepository.save(new Skill(null, "Qlik", technology));
            skillRepository.save(new Skill(null, "pyramid", technology));
            skillRepository.save(new Skill(null, "databricks", technology));
            skillRepository.save(new Skill(null, "Jakarta EE", technology));
            skillRepository.save(new Skill(null, "AWS", technology));

        }
    }
}
