import { MantisHubService } from "./services/mantisHubService";

export async function getProjectID(url: string, apiKey: string, projectName: string) {
  try {
    const mantisHubService = new MantisHubService(url, apiKey);
    const response = await mantisHubService.fetchProjects();
    // Check if response.projects is empty
    if (!(Object.prototype.hasOwnProperty.call(response, "projects") && response.projects.length > 0)) {
      console.log(`No results found`);
      process.exit(1);
    }
    // use `find` to search for the project by name
    const project = response.projects.find((p: { name: string }) => p.name === projectName);
    if (project) {
      return project.id; // Return the project ID if found
    } else {
      console.error(`Project with name "${projectName}" not found.`);
      process.exit(1);
    }
  } catch (error: any) {
    console.error("Error fetching projects:", error.message);
    process.exit(1);
  }
}
export function isNumber(value: any): boolean {
  return !isNaN(Number(value));
}
// Utility function to get input as a boolean
export function getInputAsBoolean(name: string): boolean {
  const input = name.toLowerCase();
  return input === "true";
}
