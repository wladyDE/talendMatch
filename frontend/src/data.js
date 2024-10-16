import { FaBrain, FaHandshake, FaUserTie, FaComments, FaCode, FaServer, FaDatabase, FaTools, FaFlask, FaLanguage, FaAtom, FaIndustry, FaStar } from 'react-icons/fa';
import user1 from './img/users/user-1.jpg';
import user2 from './img/users/user-2.jpg';
import user3 from './img/users/user-3.jpg';
import user4 from './img/users/user-4.jpg';
import user5 from './img/users/user-5.jpg';
import user6 from './img/users/user-6.jpg';

export const skillsData = {
    skill_subcategories: [
        {
            skill_subcategory_name: "Methodische Soft Skills",
            skill_category_id: 1,
            skills: [
                "Analytische Fähigkeiten",
                "Ausdauer, Beharrlichkeit",
                "Belastbarkeit",
                "Deduktionsfähigkeit",
                "Zeit- und Selbstmanagement",
                "Führungskompetenz",
                "Innovationsfähigkeit",
                "Medienkompetenz",
                "Organisationsvermögen",
                "Präsentationstechniken",
                "Problemlösungskompetenz",
                "Sorgfältigkeit/Sorgfalt",
                "Strategisches Denken",
                "Strukturiertes und zielorientiertes Arbeiten"
            ]
        },
        {
            skill_subcategory_name: "Soziale Soft Skills",
            skill_category_id: 1,
            skills: [
                "Aufgeschlossenheit",
                "Delegationsbereitschaft",
                "Diversitätskompetenz",
                "Emotionale Intelligenz",
                "Empathie",
                "Integrationsbereitschaft",
                "Interkulturelle Kompetenz",
                "Konfliktlösungsfähigkeit",
                "Kooperationsbereitschaft",
                "Kritikfähigkeit",
                "Mediation",
                "Menschenkenntnis",
                "Teamfähigkeit"
            ]
        },
        {
            skill_subcategory_name: "Personale Soft Skills",
            skill_category_id: 1,
            skills: [
                "(Rasche) Auffassungsgabe",
                "Ehrgeiz, Selbstmotivation",
                "Eigeninitiative, Selbstständigkeit",
                "Entscheidungsfähigkeit",
                "Entwicklungsfähigkeit",
                "Flexibilität",
                "Frustrationstoleranz",
                "Leidenschaft, Engagement",
                "Lernbereitschaft",
                "Neugierde",
                "Selbstbewusstsein",
                "Selbstdisziplin, Fokussierung",
                "Selbstkritik, Selbstreflexion",
                "Zuverlässigkeit",
                "Zielstrebigkeit",
                "Stressresistenz",
                "Verantwortungsbewusstsein"
            ]
        },
        {
            skill_subcategory_name: "Kommunikative Soft Skills",
            skill_category_id: 1,
            skills: [
                "Aktives Zuhören",
                "Begeisterungsfähigkeit",
                "Durchsetzungsvermögen",
                "Wissensvermittlung",
                "Gesprächs- und Verhandlungsführung",
                "Gestik und Mimik",
                "Kommunikationsfähigkeit",
                "Motivationsfähigkeit",
                "Rhetorik, sprachliche Gewandtheit",
                "Verhandlungskompetenz",
                "Überzeugungsvermögen",
                "Umgangsstile"
            ]
        },
        {
            skill_subcategory_name: "Frontend Entwicklung",
            skill_category_id: 2,
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "React",
                "Angular",
                "Vue.js",
                "Svelte",
                "jQuery",
                "Bootstrap",
                "Tailwind CSS",
                "Webpack",
                "Parcel",
                "Babel",
                "SASS",
                "LESS",
                "PostCSS",
                "Styled Components",
                "Emotion",
                "Storybook"
            ]
        },
        {
            skill_subcategory_name: "Backend Entwicklung",
            skill_category_id: 2,
            skills: [
                "Node.js",
                "Express.js",
                "Django",
                "Flask",
                "Spring",
                "Ruby on Rails",
                "ASP.NET",
                "Laravel",
                "Phoenix",
                "NestJS",
                "Koa",
                "Hapi",
                "Fastify",
                "Elixir",
                "Golang",
                "Kotlin",
                "Scala",
                "GraphQL",
                "REST APIs",
                "gRPC"
            ]
        },
        {
            skill_subcategory_name: "Datenbanken",
            skill_category_id: 2,
            skills: [
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "SQLite",
                "Redis",
                "Oracle",
                "SQL Server",
                "Cassandra",
                "MariaDB",
                "CouchDB",
                "Firestore",
                "DynamoDB",
                "InfluxDB",
                "Neo4j",
                "Amazon RDS",
                "BigQuery",
                "Redshift",
                "Snowflake",
                "HBase",
                "Memcached"
            ]
        },
        {
            skill_subcategory_name: "DevOps",
            skill_category_id: 2,
            skills: [
                "Docker",
                "Kubernetes",
                "Jenkins",
                "Terraform",
                "Ansible",
                "Puppet",
                "Chef",
                "AWS",
                "Azure",
                "Google Cloud",
                "CI/CD",
                "Git",
                "GitHub Actions",
                "GitLab CI",
                "CircleCI",
                "Travis CI",
                "Helm",
                "Istio",
                "Prometheus",
                "Grafana"
            ]
        },
        {
            skill_subcategory_name: "Testing",
            skill_category_id: 2,
            skills: [
                "Jest",
                "Mocha",
                "Chai",
                "Selenium",
                "Cypress",
                "Puppeteer",
                "Playwright",
                "TestCafe",
                "Jasmine",
                "Karma",
                "Protractor",
                "QUnit",
                "Ava",
                "Enzyme",
                "Testing Library",
                "Appium",
                "Robot Framework",
                "SoapUI",
                "Postman",
                "Cucumber"
            ]
        },
        {
            skill_subcategory_name: "Sprachen",
            skill_category_id: 2,
            skills: [
                "Deutsch",
                "Englisch",
                "Spanisch",
                "Französisch",
                "Chinesisch"
            ]
        },
        {
            skill_subcategory_name: "Wissenschaften",
            skill_category_id: 2,
            skills: [
                "Mathematik",
                "Physik",
                "Informatik",
                "Chemie",
                "Biologie"
            ]
        },
        {
            skill_subcategory_name: "Kundenkenntnisse",
            skill_category_id: 2,
            skills: [
                "Volkswagen",
                "Bayern",
                "Bavaria Film"
            ]
        },
        {
            skill_subcategory_name: "Spezielle Fähigkeiten",
            skill_category_id: 2,
            skills: [
                "Intrexx",
                "cplace",
                "Denodo",
                "Talend"
            ]
        }
    ]
  };

  export const iconsMap = {
    "Methodische Soft Skills": <FaBrain />,
    "Soziale Soft Skills": <FaHandshake />,
    "Personale Soft Skills": <FaUserTie />,
    "Kommunikative Soft Skills": <FaComments />,
    "Frontend Entwicklung": <FaCode />,
    "Backend Entwicklung": <FaServer />,
    "Datenbanken": <FaDatabase />,
    "DevOps": <FaTools />,
    "Testing": <FaFlask />,
    "Sprachen": <FaLanguage />,
    "Wissenschaften": <FaAtom />,
    "Kundenkenntnisse": <FaIndustry />,
    "Spezielle Fähigkeiten": <FaStar />
};

export const employees = [
    {
        name: "Max Mustermann",
        year: 1985,
        email: "max.mustermann@example.com",
        location: "Berlin",
        department: "Vertrieb",
        position: "Vertriebsleiter",
        image: user1
    },
    {
        name: "Anna Müller",
        year: 1990,
        email: "anna.mueller@example.com",
        location: "München",
        department: "Marketing",
        position: "Marketing Manager",
        image: user2
    },
    {
        name: "Peter Schmidt",
        year: 1982,
        email: "peter.schmidt@example.com",
        location: "Hamburg",
        department: "Entwicklung",
        position: "Softwareentwickler",
        image: user3
    },
    {
        name: "Laura Becker",
        year: 1995,
        email: "laura.becker@example.com",
        location: "Köln",
        department: "Personal",
        position: "Personalleiter",
        image: user4
    },
    {
        name: "Michael Weber",
        year: 1978,
        email: "michael.weber@example.com",
        location: "Frankfurt",
        department: "Finanzen",
        position: "Finanzanalyst",
        image: user5
    },
    {
        name: "Julia Wagner",
        year: 1988,
        email: "julia.wagner@example.com",
        location: "Stuttgart",
        department: "Support",
        position: "Kundensupport",
        image: user6
    },
    {
        name: "Max Mustermann",
        year: 1985,
        email: "max.mustermann@example.com",
        location: "Berlin",
        department: "Vertrieb",
        position: "Vertriebsleiter",
        image: user1
    },
    {
        name: "Anna Müller",
        year: 1990,
        email: "anna.mueller@example.com",
        location: "München",
        department: "Marketing",
        position: "Marketing Manager",
        image: user2
    },
    {
        name: "Peter Schmidt",
        year: 1982,
        email: "peter.schmidt@example.com",
        location: "Hamburg",
        department: "Entwicklung",
        position: "Softwareentwickler",
        image: user3
    },
    {
        name: "Laura Becker",
        year: 1995,
        email: "laura.becker@example.com",
        location: "Köln",
        department: "Personal",
        position: "Personalleiter",
        image: user4
    },
    {
        name: "Michael Weber",
        year: 1978,
        email: "michael.weber@example.com",
        location: "Frankfurt",
        department: "Finanzen",
        position: "Finanzanalyst",
        image: user5
    },
    {
        name: "Julia Wagner",
        year: 1988,
        email: "julia.wagner@example.com",
        location: "Stuttgart",
        department: "Support",
        position: "Kundensupport",
        image: user6
    },
    {
        name: "Max Mustermann",
        year: 1985,
        email: "max.mustermann@example.com",
        location: "Berlin",
        department: "Vertrieb",
        position: "Vertriebsleiter",
        image: user1
    },
    {
        name: "Anna Müller",
        year: 1990,
        email: "anna.mueller@example.com",
        location: "München",
        department: "Marketing",
        position: "Marketing Manager",
        image: user2
    },
    {
        name: "Peter Schmidt",
        year: 1982,
        email: "peter.schmidt@example.com",
        location: "Hamburg",
        department: "Entwicklung",
        position: "Softwareentwickler",
        image: user3
    },
    {
        name: "Laura Becker",
        year: 1995,
        email: "laura.becker@example.com",
        location: "Köln",
        department: "Personal",
        position: "Personalleiter",
        image: user4
    },
    {
        name: "Michael Weber",
        year: 1978,
        email: "michael.weber@example.com",
        location: "Frankfurt",
        department: "Finanzen",
        position: "Finanzanalyst",
        image: user5
    },
    {
        name: "Julia Wagner",
        year: 1988,
        email: "julia.wagner@example.com",
        location: "Stuttgart",
        department: "Support",
        position: "Kundensupport",
        image: user6
    }
];