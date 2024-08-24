// Education
const APU = {
  APU_NAME: 'Analista Programador Universitario',
  APU_ARTIST: 'Facultad de Informática | UNLP',
  APU_LENGTH: 'Feb 2015 - Nov 2019',
  APU_DESCRIPTION: `Promedio de la carrera: 9.19\nLa carrera Analista Programador Universitario tiene como objetivo la formación de un graduado con conocimientos básicos de los fundamentos de la disciplina y de las tecnologías actuales, a fin de resultar capacitado para el trabajo profesional en sistemas de pequeña y mediana complejidad.\nLa realidad laboral en la Facultad indica que un número importante de alumnos se vuelca al mercado antes de egresar, fundamentalmente en desarrollo de programas y sistemas, para lo cual se requiere un conocimiento básico de los fundamentos de la disciplina y un desarrollo de aptitudes para la resolución de problemas, mediante asignaturas con intensa práctica. Este es el perfil buscado con el APU, de modo de aumentar la competencia de los alumnos. Además, el egresado puede continuar la carrera de Licenciatura en Sistemas o Informática sin mayores dificultades.`,
};

const LICENCIATURA = {
  LICENCIATURA_NAME: 'Licenciatura en Sistemas',
  LICENCIATURA_ARTIST: 'Facultad de Informática | UNLP',
  LICENCIATURA_LENGTH: 'Feb 2015 - Mar 2021',
  LICENCIATURA_DESCRIPTION: `Promedio de la carrera: 9.35\nLa Licenciatura en Sistemas se encuentra certificada Internacionalmente por EUROINF.\nEl perfil del graduado en la Licenciatura en Sistemas es el de un profesional orientado especialmente al mercado vinculado con los sistemas informáticos, en particular los aspectos propios del manejo de software y datos dentro de una organización. La formación básica permite también una participación en actividades de Investigación, Desarrollo e Innovación dentro de la disciplina.`,
};

const ENGLISH_CAMBRIDGE = {
  ENGLISH_CAMBRIDGE_NAME: 'Cambridge English: First (FCE) – CEFR level C1',
  ENGLISH_CAMBRIDGE_ARTIST: 'Cambridge University Press & Assessment English',
  ENGLISH_CAMBRIDGE_LENGTH: 'Dic 2014',
  ENGLISH_CAMBRIDGE_DESCRIPTION: `Nota: A\nEl Cambridge English: First (FCE) es un examen de nivel intermedio alto que evalúa la capacidad de los candidatos para comunicarse en inglés en situaciones cotidianas y laborales. El examen abarca las cuatro habilidades lingüísticas: comprensión auditiva, expresión oral, comprensión lectora y expresión escrita. Obtener el FCE demuestra que el candidato puede utilizar el inglés cotidiano escrito y hablado con confianza y precisión en un entorno laboral o académico.`,
};

const MIKROWAYS_KUBERNETES = {
  MIKROWAYS_KUBERNETES_NAME: 'Fundamentos de Kubernetes',
  MIKROWAYS_KUBERNETES_ARTIST: 'Mikroways',
  MIKROWAYS_KUBERNETES_LENGTH: 'Feb 2020',
  MIKROWAYS_KUBERNETES_DESCRIPTION: `Este curso me proporcionó una comprensión integral de Kubernetes, una potente plataforma de orquestación de contenedores. Aprendí a implementar, administrar y escalar aplicaciones contenerizadas utilizando Kubernetes, lo que me permitió optimizar el rendimiento y la confiabilidad de mis aplicaciones.`,
};

const REACT_UDEMY = {
  REACT_UDEMY_NAME: 'React - La guía completa',
  REACT_UDEMY_ARTIST: 'Udemy',
  REACT_UDEMY_LENGTH: 'Mar 2018',
  REACT_UDEMY_DESCRIPTION: `Este curso me proporcionó las habilidades para desarrollar aplicaciones web modernas y dinámicas utilizando React. Aprendí a construir componentes reutilizables, gestionar el estado de la aplicación con React Hooks e integrar enrutamiento y gestión de estado utilizando React Router y Redux. Esta formación fue fundamental para mejorar mi competencia en el desarrollo frontend y ampliar mi conjunto de tecnologías y frameworks.`,
};

const FISCALIA = {
  FISCALIA_NAME: 'Desarrollo Web sobre arquitectura REST',
  FISCALIA_ARTIST: 'Fiscalía de Estado | Provincia de Buenos Aires',
  FISCALIA_LENGTH: 'Feb 2019',
  FISCALIA_DESCRIPTION: `El curso se centró en enseñarme el desarrollo utilizando la arquitectura REST, con una introducción al desarrollo backend con .NET y al desarrollo frontend con Angular. Aprendí a crear servicios web eficientes con .NET y a construir aplicaciones web con Angular. Al final del curso, adquirí habilidades para desarrollar aplicaciones web modernas y escalables que cumplen con los estándares de la industria.`,
};

const ANGULAR_UDEMY = {
  ANGULAR_UDEMY_NAME: 'Angular: De cero a experto',
  ANGULAR_UDEMY_ARTIST: 'Udemy',
  ANGULAR_UDEMY_LENGTH: 'Jun 2018',
  ANGULAR_UDEMY_DESCRIPTION: `Este curso me proporcionó una comprensión profunda de Angular, un framework de desarrollo frontend ampliamente utilizado. Aprendí a construir aplicaciones web dinámicas y escalables utilizando Angular, lo que me permitió mejorar mi competencia en el desarrollo frontend y ampliar mi conjunto de habilidades técnicas.`,
};

const MAGISTER_DATA_ANALYSIS = {
  MAGISTER_DATA_ANALYSIS_NAME: `Maestría en Inteligencia de Datos orientada a Big Data`,
  MAGISTER_DATA_ANALYSIS_ARTIST: 'Facultad de Informática | UNLP',
  MAGISTER_DATA_ANALYSIS_LENGTH: 'Mar 2021 - Jul 2024',
  MAGISTER_DATA_ANALYSIS_DESCRIPTION: `La Maestría en Inteligencia de Datos orientada a Big Data está dirigida a egresados universitarios de Informática y/o carreras afines. Otorga el título de Magister en Inteligencia de Datos orientada a Big Data.
\nTiene por objetivo formar profesionales capaces diseñar e implementar sistemas inteligentes para procesar Big Data (Datos Masivos) extrayendo y comunicando en forma clara y eficiente, patrones y/o relaciones relevantes de suma utilidad para la toma de decisiones.
\nSe busca que el graduado obtenga conocimientos actualizados de los fundamentos del tema y de las tecnologías actualmente en uso en Inteligencia de Datos.
\nAl mismo tiempo se trata de formar graduados con capacidad de I+D+I que puedan completar el Doctorado en Cs Informáticas, continuando los ejes temáticos de la Maestría.
\nLos temas incluyen Aprendizaje Automático, Minería de Datos y de Textos, Análisis de Series Temporales, Visualización de Datos estudiados desde la perspectiva del análisis inteligente de los datos en entornos Big Data.`,
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
