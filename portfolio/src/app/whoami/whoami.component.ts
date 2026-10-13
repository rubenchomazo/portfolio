import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WhoamiService } from './service/whoami.service';
import { Notification } from './shared/notification.model';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.css'],
})
export class WhoamiComponent implements AfterViewInit, OnDestroy {
  language: 'en' | 'es' = 'en';
  readonly translations = {
    en: {
      who: 'Who I am', experience: 'Experience', stackNav: 'Technical stack and last projects', contact: 'Contact me', contactText: 'Have a technical challenge or want to explore an idea? Let’s start with a direct conversation.', whatsappButton: 'Start a conversation on WhatsApp', linkedinButton: 'Connect on LinkedIn', githubButton: 'View GitHub',
      hi: "Hi, I'm", role: 'Senior Software Engineer | Staff Engineer track', intro: 'I am a Senior Software Engineer with over 15 years of experience, focused on AI-assisted engineering and the design, development and operation of integration platforms for banking systems in the cloud. I build reliable solutions across AWS, Angular, TypeScript, Java and Spring, combining software architecture, DevOps practices and AI tools such as Codex and Claude to turn complex business needs into measurable outcomes.', focusLabel: 'What I bring', focus1: 'AI-assisted engineering with Codex & Claude', focus2: 'Cloud-native banking platforms', focus3: 'Java, Spring & Angular architecture', focus4: 'DevOps, CI/CD & observability', contactButton: 'Contact me', work: 'Work History',
      technicalStack: 'Technical stack', programming: 'Programming languages', programmingText: 'Core languages and frameworks I use to build maintainable products, services and integration platforms.', databases: 'Databases', databasesText: 'Relational and NoSQL technologies for consistent, scalable and reliable data solutions.', cloud: 'Cloud', cloudText: 'Cloud platforms and services for resilient, scalable and observable architectures.',
      devops: 'DevOps', devopsText: 'Automation, containers and delivery practices that make software releases repeatable and reliable.', observability: 'Observability', observabilityText: 'Tools and practices for understanding production behavior, detecting issues and improving reliability.', ai: 'AI', projects: 'Last projects', solutions: 'Solutions', send: 'Send Message',
      success: 'Message sent successfully', design: 'Designed & developed by @Rubencho.',
      srEngineer: 'Senior Software Engineer', cto: 'CTO', technicalLead: 'Technical Lead', javaDeveloper: 'Senior Java/JEE Developer', careerTimeline: 'CAREER TIMELINE', activeRole: 'ACTIVE ROLE', completedRole: 'COMPLETED', platformEngineering: 'PLATFORM ENGINEERING', techLeadership: 'TECHNICAL LEADERSHIP', fullStackDelivery: 'FULL STACK DELIVERY', javaEnterprise: 'JAVA ENTERPRISE', namePlaceholder: 'Name', messagePlaceholder: 'Message',
      mercadoDate: 'May 2024 - Present', keifiCtoDate: 'January 2023 - May 2024',
      earlierRole: 'Earlier: Java Developer — Universidad Nacional de Colombia (2009 - 2012)',
      meli1: 'Designing and evolving integration platforms for banking systems in the cloud.', meli2: 'Building reliable solutions with Java, Spring Boot, AWS and distributed systems.', meli3: 'Driving technical decisions, engineering quality and platform observability.',
      cto1: 'Led technology strategy, architecture and delivery for products and platforms.', cto2: 'Guided engineering teams and evaluated technologies against business needs.', cto3: 'Balanced product goals, technical quality and operational reliability.',
      formError: 'Error - Be sure to fill in the form correctly', previous: 'Previous', next: 'Next',
      springMicroservices: 'Spring Microservices', springKafka: 'Spring Kafka Integration', springSecurity: 'Spring Security OAuth2 Integration',
      reverseProxy: 'Reverse Proxy and Java Integration with ELK Stack', gptConsole: 'GPT Console',
      impactTitle: 'Selected Engineering Impact', impactAi: 'AI-assisted engineering', impactAiText: 'Codex, Claude, Skills and MCP integrated into practical workflows for faster, more thoughtful delivery.', impactCloud: 'Cloud-native banking platforms', impactCloudText: 'AWS, Serverless, API Gateway, Lambda, SQS, DynamoDB, RDS and Fargate for reliable banking integrations.', impactSystems: 'Enterprise integration & distributed systems', impactSystemsText: 'Java, Spring Boot, Kafka, REST, SOAP, Hibernate and event-driven architectures.', impactArchitecture: 'Software architecture & APIs', impactArchitectureText: 'Designing maintainable services, integration contracts and scalable APIs aligned with business goals.', impactObservability: 'Observability & reliability', impactObservabilityText: 'New Relic, Datadog and engineering practices that turn production signals into continuous improvement.', impactLeadership: 'Technical leadership & delivery', impactLeadershipText: 'Technical direction, DevOps, CI/CD and collaboration across teams to deliver with confidence.', aiTitle: 'AI-assisted engineering', aiText: 'I use AI as an engineering multiplier: exploring solutions, accelerating delivery, creating reusable workflows and integrating tools responsibly into the development lifecycle.', aiCodex: 'Codex for coding workflows and delivery', aiClaude: 'Claude for analysis and technical reasoning', aiSkills: 'Skills for repeatable engineering workflows', aiMcp: 'MCP for connecting models with tools and context', aiApps: 'App integrations for practical automation', aiObservability: 'New Relic & Datadog for production feedback',
      keifiDate: 'January 2023 - January 2024', tataDate: 'August 2014 - January 2023', ideaDate: 'March 2012 - August 2014',
      keifi1: 'Evaluated and adopted new technologies to address changing industry needs.',
      keifi2: 'Identified value opportunities to maximize product effectiveness for the business.',
      keifi3: 'Supervised architecture, design and implementation of company-wide platforms and applications.',
      tata1: 'Reviewed project specifications and designed technology solutions that met or exceeded performance expectations.',
      tata2: 'Provided direction and guidance for process improvements and established policies.',
      tata3: 'Promoted experience with Kubernetes, Docker and Amazon Web Services while analyzing customer needs and vendor costs.',
      idea1: 'Participated in requirements gathering and design development meetings.',
      idea2: 'Adjusted design parameters to incorporate new features.'
    },
    es: {
      who: 'Quién soy', experience: 'Experiencia', stackNav: 'Stack técnico y últimos proyectos', contact: 'Contáctame', contactText: '¿Tienes un reto técnico o quieres explorar una idea? Comencemos con una conversación directa.', whatsappButton: 'Iniciar conversación por WhatsApp', linkedinButton: 'Conectar en LinkedIn', githubButton: 'Ver GitHub',
      hi: 'Hola, soy', role: 'Ingeniero de Software Senior | proyección a Staff Engineer', intro: 'Soy Ingeniero de Software Senior con más de 15 años de experiencia, enfocado en ingeniería asistida por IA y en el diseño, desarrollo y operación de plataformas de integración para sistemas bancarios en la nube. Construyo soluciones confiables con AWS, Angular, TypeScript, Java y Spring, combinando arquitectura de software, prácticas DevOps y herramientas como Codex y Claude para convertir necesidades complejas en resultados medibles.', focusLabel: 'Lo que aporto', focus1: 'Ingeniería asistida con IA, Codex y Claude', focus2: 'Plataformas bancarias cloud-native', focus3: 'Arquitectura Java, Spring y Angular', focus4: 'DevOps, CI/CD y observabilidad', contactButton: 'Contáctame', work: 'Experiencia laboral',
      technicalStack: 'Stack técnico', programming: 'Lenguajes de programación', programmingText: 'Lenguajes y frameworks que utilizo para construir productos, servicios y plataformas de integración mantenibles.', databases: 'Bases de datos', databasesText: 'Tecnologías relacionales y NoSQL para soluciones de datos consistentes, escalables y confiables.', cloud: 'Cloud', cloudText: 'Plataformas y servicios cloud para arquitecturas resilientes, escalables y observables.',
      devops: 'DevOps', devopsText: 'Automatización, contenedores y prácticas de entrega para publicar software de forma repetible y confiable.', observability: 'Observabilidad', observabilityText: 'Herramientas y prácticas para entender el comportamiento en producción, detectar problemas y mejorar la confiabilidad.', ai: 'IA', projects: 'Últimos proyectos', solutions: 'Soluciones', send: 'Enviar mensaje',
      success: 'Mensaje enviado correctamente', design: 'Diseñado y desarrollado por @Rubencho.',
      srEngineer: 'Ingeniero de Software Senior', cto: 'CTO', technicalLead: 'Líder técnico', javaDeveloper: 'Desarrollador Senior Java/JEE', careerTimeline: 'LÍNEA DE TIEMPO PROFESIONAL', activeRole: 'ROL ACTUAL', completedRole: 'FINALIZADO', platformEngineering: 'INGENIERÍA DE PLATAFORMAS', techLeadership: 'LIDERAZGO TÉCNICO', fullStackDelivery: 'ENTREGA FULL STACK', javaEnterprise: 'JAVA EMPRESARIAL', namePlaceholder: 'Nombre', messagePlaceholder: 'Mensaje',
      mercadoDate: 'Mayo 2024 - Actualidad', keifiCtoDate: 'Enero 2023 - Mayo 2024',
      earlierRole: 'Experiencia anterior: Java Developer — Universidad Nacional de Colombia (2009 - 2012)',
      meli1: 'Diseño y evolución de plataformas de integración para sistemas bancarios en la nube.', meli2: 'Construcción de soluciones confiables con Java, Spring Boot, AWS y sistemas distribuidos.', meli3: 'Liderazgo de decisiones técnicas, calidad de ingeniería y observabilidad de plataformas.',
      cto1: 'Lideré la estrategia tecnológica, arquitectura y entrega de productos y plataformas.', cto2: 'Acompañé equipos de ingeniería y evalué tecnologías según las necesidades del negocio.', cto3: 'Equilibré objetivos de producto, calidad técnica y confiabilidad operativa.',
      formError: 'Error - Verifica que el formulario esté diligenciado correctamente', previous: 'Anterior', next: 'Siguiente',
      springMicroservices: 'Microservicios con Spring', springKafka: 'Integración de Spring con Kafka', springSecurity: 'Integración de Spring Security OAuth2',
      reverseProxy: 'Proxy inverso e integración Java con stack ELK', gptConsole: 'Consola GPT',
      impactTitle: 'Impacto de ingeniería seleccionado', impactAi: 'Ingeniería asistida por IA', impactAiText: 'Codex, Claude, Skills y MCP integrados en flujos prácticos para entregar más rápido y con mejor criterio técnico.', impactCloud: 'Plataformas bancarias cloud-native', impactCloudText: 'AWS, Serverless, API Gateway, Lambda, SQS, DynamoDB, RDS y Fargate para integraciones bancarias confiables.', impactSystems: 'Integración empresarial y sistemas distribuidos', impactSystemsText: 'Java, Spring Boot, Kafka, REST, SOAP, Hibernate y arquitecturas orientadas a eventos.', impactArchitecture: 'Arquitectura de software y APIs', impactArchitectureText: 'Diseño de servicios mantenibles, contratos de integración y APIs escalables alineadas con los objetivos del negocio.', impactObservability: 'Observabilidad y confiabilidad', impactObservabilityText: 'New Relic, Datadog y prácticas de ingeniería que convierten las señales de producción en mejora continua.', impactLeadership: 'Liderazgo técnico y entrega', impactLeadershipText: 'Dirección técnica, DevOps, CI/CD y colaboración entre equipos para entregar con confianza.', aiTitle: 'Ingeniería asistida por IA', aiText: 'Uso la IA como multiplicador de ingeniería: exploro soluciones, acelero entregas, creo flujos reutilizables e integro herramientas de forma responsable en el ciclo de desarrollo.', aiCodex: 'Codex para flujos de programación y entrega', aiClaude: 'Claude para análisis y razonamiento técnico', aiSkills: 'Skills para flujos de ingeniería repetibles', aiMcp: 'MCP para conectar modelos con herramientas y contexto', aiApps: 'Integración de apps para automatización práctica', aiObservability: 'New Relic y Datadog para feedback de producción',
      keifiDate: 'Enero 2023 - Enero 2024', tataDate: 'Agosto 2014 - Enero 2023', ideaDate: 'Marzo 2012 - Agosto 2014',
      keifi1: 'Evalué y adopté nuevas tecnologías para responder a las necesidades cambiantes de la industria.',
      keifi2: 'Identifiqué oportunidades de valor para maximizar la efectividad del producto para el negocio.',
      keifi3: 'Supervisé la arquitectura, el diseño y la implementación de plataformas y aplicaciones corporativas.',
      tata1: 'Revisé especificaciones y diseñé soluciones tecnológicas que cumplieran o superaran las expectativas de rendimiento.',
      tata2: 'Brindé dirección y acompañamiento para mejorar procesos y establecer políticas.',
      tata3: 'Fortalecí la experiencia con Kubernetes, Docker y Amazon Web Services, analizando necesidades y costos de proveedores.',
      idea1: 'Participé en reuniones de levantamiento de requisitos y diseño de soluciones.',
      idea2: 'Ajusté parámetros de diseño para incorporar nuevas funcionalidades.'
    }
  };
  showMenu: boolean = false;
  showMoonFill: boolean = false;
  showJob1: boolean = true;
  showJob2: boolean = false;
  showJob3: boolean = false;
  showJob4: boolean = false;
  showStack1: boolean = false;
  showStack2: boolean = false;
  showStack3: boolean = false;
  showStack4: boolean = false;
  showStack5: boolean = true;
  showStack6: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;
  contactFormControl: any;
  notificationModel: Notification | undefined;
  scrollProgress = 0;
  private revealObserver?: IntersectionObserver;

  constructor(
    private whoamiService: WhoamiService,
    private formBuilder: FormBuilder
  ) {
    this.contactFormControl = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      subject: 'Contact Portfolio',
      content: '',
    });
  }

  ngOnInit() {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.classList.add('dark');
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage === 'es') {
      this.language = 'es';
    }
    document.documentElement.lang = this.language;
    let w = window.innerWidth;
    if (w > 1024) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  t(key: string) {
    return (this.translations[this.language] as Record<string, string>)[key] ?? key;
  }

  toggleLanguage() {
    this.language = this.language === 'en' ? 'es' : 'en';
    localStorage.setItem('portfolio-language', this.language);
    document.documentElement.lang = this.language;
  }

  ngAfterViewInit() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach((element) => element.classList.add('is-visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.scroll-reveal').forEach((element) => this.revealObserver?.observe(element));
    this.updateScrollProgress();
  }

  ngOnDestroy() {
    this.revealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  updateScrollProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = documentHeight > 0
      ? Math.min(100, Math.max(0, (window.scrollY / documentHeight) * 100))
      : 0;
  }

  changeMode(mode: string) {
    if (mode == 'light') {
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      this.showMoonFill = true;
    } else if (mode == 'dark') {
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      this.showMoonFill = false;
    }
  }

  menuHidden() {
    const menuItems = document.querySelector('#menu');
    const menuButtonSpans = document.querySelectorAll('#menu-button span');
    //Open Menu
    menuItems?.classList.toggle('hidden');
    menuButtonSpans.forEach((span) => {
      span.classList.toggle('animado');
    });
    this.showMenu = true;
  }

  menuShow() {
    this.showMenu = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    let w = event.target.innerWidth;
    if (w > 1024) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  // Job Section
  changeJob(jobId: string) {
    let firstLink = document.querySelector('#link1');
    if (jobId == 'job1') {
      this.showJob1 = true;
      this.showJob2 = false;
      this.showJob3 = false;
      this.showJob4 = false;
    } else if (jobId == 'job2') {
      this.showJob1 = false;
      this.showJob2 = true;
      this.showJob3 = false;
      this.showJob4 = false;
      this.changeFocus(firstLink);
    } else if (jobId == 'job3') {
      this.showJob1 = false;
      this.showJob2 = false;
      this.showJob3 = true;
      this.showJob4 = false;
      this.changeFocus(firstLink);
    } else if (jobId == 'job4') {
      this.showJob1 = false;
      this.showJob2 = false;
      this.showJob3 = false;
      this.showJob4 = true;
      this.changeFocus(firstLink);
    }
  }

  changeStack(stackId: string) {
    let firstLink = document.querySelector('#linkStack1');
    if (stackId == 'stack1') {
      this.showStack1 = true;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = false;
      this.showStack6 = false;
    } else if (stackId == 'stack2') {
      this.showStack1 = false;
      this.showStack2 = true;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = false;
      this.showStack6 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack3') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = true;
      this.showStack4 = false;
      this.showStack5 = false;
      this.showStack6 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack4') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = true;
      this.showStack5 = false;
      this.showStack6 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack5') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = true;
      this.showStack6 = false;
      this.changeFocus(firstLink);
    } else if (stackId == 'stack6') {
      this.showStack1 = false;
      this.showStack2 = false;
      this.showStack3 = false;
      this.showStack4 = false;
      this.showStack5 = false;
      this.showStack6 = true;
      this.changeFocus(firstLink);
    }
  }

  changeFocus(firstLink: Element | null) {
    firstLink?.classList.remove(
      'border-sky-500',
      'bg-white',
      'dark:bg-slate-700'
    );
  }

  sendNotification() {
    if (
      (this.contactFormControl.value.name == undefined ||
        this.contactFormControl.value.name == '') &&
      (this.contactFormControl.value.email == undefined ||
        this.contactFormControl.value.email == '')
    ) {
      this.showError = true;
    } else {
      this.notificationModel = new Notification(
        this.contactFormControl?.value.name,
        this.contactFormControl?.value.email,
        'Portfolio Contact me',
        this.contactFormControl?.value.content
      );
      this.whoamiService.sendNotification(this.notificationModel);
      this.showError = false;
      this.showSuccess = true;
    }
  }
}
