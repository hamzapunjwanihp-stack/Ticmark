import { areas } from "@/data/areas";
import { categories } from "@/data/categories";
import { developers } from "@/data/developers";
import { projects } from "@/data/projects";
import { properties } from "@/data/properties";
import type { Area, Category, CategorySlug, Developer, Project, Property } from "@/lib/types";

export { areas, categories, developers, projects, properties };

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const getDeveloper = (slug: string) => developers.find((d) => d.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export function areaName(slug: string) {
  return getArea(slug)?.name ?? slug;
}

export function developerName(slug?: string) {
  return (slug && getDeveloper(slug)?.name) || "";
}

export function categoryName(slug: CategorySlug) {
  return getCategory(slug)?.name ?? slug;
}

/** Developer for a listing: taken from its project, or set directly on the listing. */
export function propertyDeveloperSlug(property: Property) {
  if (property.developerSlug) return property.developerSlug;
  return property.projectSlug ? getProject(property.projectSlug)?.developerSlug : undefined;
}

export const featuredProjects = () => projects.filter((p) => p.featured);
export const featuredAreas = () => areas.filter((a) => a.featured);
export const featuredDevelopers = () => developers.filter((d) => d.featured);

export function recentProperties(limit?: number) {
  const sorted = [...properties].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** The newest listings get a "New" badge — kept to a small number on purpose. */
export function newPropertySlugs(count = 2) {
  return new Set(recentProperties(count).map((p) => p.slug));
}

export const projectsInArea = (area: Area) => projects.filter((p) => p.areaSlug === area.slug);
export const propertiesInArea = (area: Area) => properties.filter((p) => p.areaSlug === area.slug);
export const projectsByDeveloper = (developer: Developer) => projects.filter((p) => p.developerSlug === developer.slug);
export const propertiesInProject = (project: Project) => properties.filter((p) => p.projectSlug === project.slug);

export function developersInArea(area: Area) {
  const slugs = new Set(projectsInArea(area).map((p) => p.developerSlug));
  return developers.filter((d) => slugs.has(d.slug));
}

export function areasForDeveloper(developer: Developer) {
  const slugs = new Set(projectsByDeveloper(developer).map((p) => p.areaSlug));
  return areas.filter((a) => slugs.has(a.slug));
}

export function isActiveProject(project: Project) {
  return project.status !== "Completed";
}

export function relatedProperties(property: Property, limit = 4) {
  const score = (p: Property) =>
    (p.projectSlug && p.projectSlug === property.projectSlug ? 3 : 0) +
    (p.areaSlug === property.areaSlug ? 2 : 0) +
    (p.categorySlug === property.categorySlug ? 1 : 0);
  return properties
    .filter((p) => p.slug !== property.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.dateAdded.localeCompare(a.p.dateAdded))
    .slice(0, limit)
    .map(({ p }) => p);
}

export function relatedProjects(project: Project, limit = 3) {
  const score = (p: Project) =>
    (p.areaSlug === project.areaSlug ? 2 : 0) +
    (p.developerSlug === project.developerSlug ? 1 : 0) +
    (p.categories.some((c) => project.categories.includes(c)) ? 1 : 0);
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function categoriesWithCounts(): Array<Category & { count: number }> {
  return categories.map((c) => ({
    ...c,
    count: properties.filter((p) => p.categorySlug === c.slug).length,
  }));
}
