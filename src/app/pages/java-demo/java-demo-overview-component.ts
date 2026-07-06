import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

import { SiteHeader } from '../../shared/site-header/site-header';

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
  imports: [NgFor, BreadcrumbsComponent, SiteHeader],
  templateUrl: './java-demo-overview-component.html',
  styleUrl: './java-demo-overview-component.css',
})
export class JavaDemoOverviewComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Java Demo', route: '/java-demo' },
    { label: 'Overview' },
  ];

  badges: TechBadge[] = [
    { label: 'Java 26', icon: '☕' },
    { label: 'Spring Boot', icon: '◉' },
    { label: 'Gradle', icon: '🐘' },
    { label: 'H2 Database', icon: 'H2' },
    { label: 'Swagger / OpenAPI', icon: '{}' },
    { label: 'SQL / JPA', icon: '▣' },
    { label: 'Docker', icon: '🐳' },
  ];

  coverageItems: string[] = [
    'Examples from multiple Java releases',
    'Interview exercises for common backend topics',
    'Animal and polymorphism examples',
    'SQL and JPA demonstrations',
    'In-memory H2 database exploration',
    'API-first development with Swagger/OpenAPI',
    'Local development workflow',
    'Cloud-ready deployment workflow',
  ];

  stackItems: StackItem[] = [
    { label: 'Java 26', icon: '☕' },
    { label: 'Spring Boot', icon: '◉' },
    { label: 'Gradle', icon: '🐘' },
    { label: 'H2 Database', icon: 'H2' },
    { label: 'Swagger / OpenAPI', icon: '{}' },
    { label: 'Docker', icon: '🐳' },
  ];

  stackFooterItems: StackItem[] = [
    { label: 'REST', icon: '◎' },
    { label: 'JSON', icon: '{ }' },
    { label: 'JPA / Hibernate', icon: '▤' },
  ];

  featureCards: FeatureCard[] = [
    {
      title: 'Release Demos',
      icon: '</>',
      description: 'Explore language features from Java 8 through 9, 10, 11, 21, and 26.',
    },
    {
      title: 'SQL & JPA Endpoints',
      icon: '▤',
      description: 'REST endpoints showcasing repositories, queries, relationships, and data access patterns.',
    },
    {
      title: 'API Documentation',
      icon: '▨',
      description: 'Swagger UI and OpenAPI support make the project browsable and easy to test.',
    },
    {
      title: 'H2 Console Access',
      icon: '▣',
      description: 'Browse and query the in-memory H2 database directly during local development.',
    },
    {
      title: 'Java 9 Module Demo',
      icon: '◇',
      description: 'A separate module demonstrates the Java Platform Module System.',
    },
    {
      title: 'Run Anywhere',
      icon: '↗',
      description: 'Run locally, package as a JAR, containerize with Docker, or deploy to cloud hosting.',
    },
  ];

  summaryItems: StackItem[] = [
    { label: 'Modern Java', sublabel: 'Java 26 target', icon: '☕' },
    { label: 'Backend Demo App', sublabel: 'API-first and practical', icon: '⚙' },
    { label: 'In-Memory DB', sublabel: 'H2 for fast iteration', icon: 'H2' },
    { label: 'API Docs', sublabel: 'Swagger / OpenAPI', icon: '{}' },
    { label: 'Dockerized', sublabel: 'Portable and consistent', icon: '🐳' },
    { label: 'Cloud Ready', sublabel: 'Deployable workflow', icon: '☁' },
  ];
}