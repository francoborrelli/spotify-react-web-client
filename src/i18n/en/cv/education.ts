// Education

const APU = {
  APU_NAME: 'Analyst Programmer',
  APU_ARTIST: 'Facultad de Informática | UNLP',
  APU_LENGTH: 'Feb 2015 - Nov 2019',
  APU_DESCRIPTION: `Degree GPA: 9.19/10\nThe Analyst Programmer career aims to train graduates with basic knowledge of the discipline's fundamentals and current technologies, enabling them to be qualified for professional work in systems of small and medium complexity.\nThe labor reality at the Faculty indicates that a significant number of students enter the market before graduating, primarily in program and system development, for which a basic understanding of the discipline's fundamentals and the development of problem-solving skills through subjects with intense practice are required. This is the profile sought with the UAP, aiming to enhance students' competitiveness. Additionally, graduates can continue their studies in Systems or Informatics without major difficulties.`,
};

const LICENCIATURA = {
  LICENCIATURA_NAME: `Bachelor's Degree in Systems`,
  LICENCIATURA_ARTIST: 'Facultad de Informática | UNLP',
  LICENCIATURA_LENGTH: 'Feb 2015 - Mar 2021',
  LICENCIATURA_DESCRIPTION: `Degree GPA: 9.35/10\nThe Bachelor's Degree in Systems is internationally certified by EUROINF.\nThe profile of the graduate in the Bachelor's Degree in Systems is that of a professional specially oriented towards the market linked with computer systems, particularly the aspects related to software and data management within an organization. The basic training also allows for participation in Research, Development, and Innovation activities within the discipline.`,
};

const ENGLISH_CAMBRIDGE = {
  ENGLISH_CAMBRIDGE_NAME: 'Cambridge English: First (FCE) – CEFR level C1',
  ENGLISH_CAMBRIDGE_ARTIST: 'Cambridge University Press & Assessment English',
  ENGLISH_CAMBRIDGE_LENGTH: 'Dic 2014',
  ENGLISH_CAMBRIDGE_DESCRIPTION: `Grade: A\nThe Cambridge English: Advanced (CAE) certification is proof of high-level English language skills for academic and professional purposes. It is recognized by universities and employers worldwide as a demonstration of proficiency in English.`,
};

const MIKROWAYS_KUBERNETES = {
  MIKROWAYS_KUBERNETES_NAME: 'Foundations of Kubernetes',
  MIKROWAYS_KUBERNETES_ARTIST: 'Mikroways',
  MIKROWAYS_KUBERNETES_LENGTH: 'Feb 2020',
  MIKROWAYS_KUBERNETES_DESCRIPTION: `This course provided me with a comprehensive understanding of Kubernetes, a powerful container orchestration platform. I learned how to deploy, manage, and scale containerized applications using Kubernetes, enabling me to optimize the performance and reliability of my applications.`,
};

const REACT_UDEMY = {
  REACT_UDEMY_NAME: 'React - The Complete Guide',
  REACT_UDEMY_ARTIST: 'Udemy',
  REACT_UDEMY_LENGTH: 'Mar 2018',
  REACT_UDEMY_DESCRIPTION: `This course equipped me with the skills to develop modern, dynamic web applications using React. I learned how to build reusable components, manage application state with React Hooks, and integrate routing and state management using React Router and Redux. This training was instrumental in enhancing my proficiency in frontend development and expanding my toolkit of technologies and frameworks.`,
};

const FISCALIA = {
  FISCALIA_NAME: 'Web Development with REST Architecture',
  FISCALIA_ARTIST: 'Fiscalía de Estado | Provincia de Buenos Aires',
  FISCALIA_LENGTH: 'Feb 2019',
  FISCALIA_DESCRIPTION: `The course focused on teaching me development using the REST architecture, with an introduction to backend development with .NET and frontend development with Angular. I learned to create efficient web services with .NET and to build web applications with Angular. By the end of the course, I acquired skills to develop modern and scalable web applications that meet industry standards.`,
};

const ANGULAR_UDEMY = {
  ANGULAR_UDEMY_NAME: 'Angular: From Zero to Expert',
  ANGULAR_UDEMY_ARTIST: 'Udemy',
  ANGULAR_UDEMY_LENGTH: 'May 2019',
  ANGULAR_UDEMY_DESCRIPTION: `This course provided me with a comprehensive understanding of Angular, a powerful frontend framework. I learned how to build dynamic web applications using Angular, including creating reusable components, managing application state, and integrating routing and state management. This training was instrumental in enhancing my proficiency in frontend development and expanding my toolkit of technologies and frameworks.`,
};

const MAGISTER_DATA_ANALYSIS = {
  MAGISTER_DATA_ANALYSIS_NAME: `Master's Degree in Data Intelligence with a focus on Big Data`,
  MAGISTER_DATA_ANALYSIS_ARTIST: 'Facultad de Informática | UNLP',
  MAGISTER_DATA_ANALYSIS_LENGTH: 'Mar 2021 - Jul 2024',
  MAGISTER_DATA_ANALYSIS_DESCRIPTION: `
The Master's Degree in Data Intelligence with a focus on Big Data is aimed at university graduates in Computer Science and/or related fields. It awards the title of Master in Data Intelligence with a focus on Big Data.
\nThe objective is to train professionals capable of designing and implementing intelligent systems to process Big Data, clearly and efficiently extracting and communicating relevant patterns and/or relationships that are highly useful for decision-making.
\nThe program aims to ensure that graduates acquire up-to-date knowledge of the fundamentals of the field and the technologies currently in use in Data Intelligence. At the same time, it seeks to train graduates with R&D&I capabilities who can complete a PhD in Computer Science, continuing the thematic axes of the Master's program.
\nThe topics include Machine Learning, Data and Text Mining, Time Series Analysis, and Data Visualization, studied from the perspective of intelligent data analysis in Big Data environments.`,
};

export const EDUCATION = {
  ...APU,
  ...FISCALIA,
  ...REACT_UDEMY,
  ...LICENCIATURA,
  ...ANGULAR_UDEMY,
  ...ENGLISH_CAMBRIDGE,
  ...MIKROWAYS_KUBERNETES,
  ...MAGISTER_DATA_ANALYSIS,
} as const;
