import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  makeStateKey,
  OnInit,
  PLATFORM_ID,
  signal,
  TransferState,
} from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

interface TechBadge {
  label: string;
  icon: string;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

interface StackItem {
  label: string;
  sublabel?: string;
  icon: string;
}

@Component({
  selector: 'app-java-demo-overview',
  standalone: true,
  imports: [NgFor, BreadcrumbsComponent],
  templateUrl: './java-demo-overview-component.html',
  styleUrl: './java-demo-overview-component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JavaDemoOverviewComponent implements OnInit {
  readonly javaDemoRunning = signal(false);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
  private readonly javaDemoRunningKey = makeStateKey<boolean>('javaDemoRunning');

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.javaDemoRunning.set(this.transferState.get(this.javaDemoRunningKey, false));
      this.transferState.remove(this.javaDemoRunningKey);
      return;
    }

    this.http
      .get('http://java26demo-env.eba-tsngktpv.us-east-2.elasticbeanstalk.com/health', {
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.javaDemoRunning.set(true);
          this.transferState.set(this.javaDemoRunningKey, true);
        },
        error: () => {
          this.javaDemoRunning.set(false);
          this.transferState.set(this.javaDemoRunningKey, false);
        },
      });
  }

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Java Demo', route: '/java-demo' },
    { label: 'Overview' },
  ];

  badges: TechBadge[] = [
    { label: 'Java 26', icon: 'devicon:java' },
    { label: 'Spring Boot', icon: 'devicon:spring' },
    { label: 'Gradle', icon: 'devicon:gradle' },
    { label: 'H2 Database', icon: 'simple-icons:h2database' },
    { label: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' },
    { label: 'SQL / JPA', icon: 'mdi:database' },
    { label: 'Docker', icon: 'devicon:docker' },
  ];

  stackItems: StackItem[] = [
    { label: 'Java 26', icon: 'devicon:java' },
    { label: 'Spring Boot', icon: 'devicon:spring' },
    { label: 'Gradle', icon: 'devicon:gradle' },
    { label: 'H2 Database', icon: 'simple-icons:h2database' },
    { label: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' },
    { label: 'Docker', icon: 'devicon:docker' },
  ];

  stackFooterItems: StackItem[] = [
    { label: 'REST', icon: 'mdi:api' },
    { label: 'JSON', icon: 'mdi:code-json' },
    { label: 'JPA / Hibernate', icon: 'simple-icons:hibernate' },
  ];

  featureCards: FeatureCard[] = [
    {
      title: 'Release Demos',
      icon: 'mdi:language-java',
      description: 'Explore language features from Java 8 through 9, 10, 11, 21, and 26.',
    },
    {
      title: 'Endpoints for SQL & JPA',
      icon: 'mdi:database-search',
      description:
        'REST endpoints showcasing repositories, queries, relationships, and data access patterns.',
    },
    {
      title: 'Living Contracts',
      icon: 'simple-icons:swagger',
      description: 'Swagger UI and OpenAPI support make the project browsable and easy to test.',
    },
    {
      title: 'H2 Console Access',
      icon: 'simple-icons:h2database',
      description: 'Browse and query the in-memory H2 database directly during local development.',
    },
    {
      title: 'Java 9 Module Demo',
      icon: 'mdi:cube-outline',
      description: 'A separate module demonstrates the Java Platform Module System.',
    },
    {
      title: 'Run Anywhere',
      icon: 'mdi:rocket-launch-outline',
      description:
        'Run locally, package as a JAR, containerize with Docker, or deploy to cloud hosting.',
    },
  ];

  summaryItems: StackItem[] = [
    { label: 'Modern Java', sublabel: 'Java 26 target', icon: 'devicon:java' },
    {
      label: 'Backend API',
      sublabel: 'Practical microservice architecture',
      icon: 'mdi:cog-outline',
    },
    { label: 'In-Memory DB', sublabel: 'H2 for fast iteration', icon: 'simple-icons:h2database' },
    { label: 'API Docs', sublabel: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' },
    { label: 'Dockerized', sublabel: 'Portable and consistent', icon: 'devicon:docker' },
    { label: 'Cloud Ready', sublabel: 'Deployable workflow', icon: 'mdi:cloud-outline' },
  ];

  coverageItems: string[] = [
    'Examples from multiple Java releases',
    'Interview exercises for common backend topics',
    'Polymorphism examples',
    'SQL and JPA demonstrations',
    'In-memory H2 database exploration',
    'API-first architecture exposed through Swagger/OpenAPI',
    'Cloud-ready deployment workflow',
  ];
}
