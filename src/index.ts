import { getInput } from "@actions/core";
import { validateInput } from "./validations/validation";
import { getProjectID, isNumber } from "./util";
import { MantisHubService } from "./services/mantisHubService";

interface TaskInput {
  task: string;
  url: string;
  apiKey: string;
  project: string | number;
}

/**
 * Main run function
 *
 */
export async function run() {
  try {
    const taskInput: TaskInput = {
      task: getInput("task") || process.env.GITHUB_JOB || "",
      url: getInput("url") || "",
      apiKey: getInput("api-key") || "",
      project: getInput("project") || "",
    };
    if (!taskInput.task) {
      throw new Error("Task must defined");
    }
    if (!taskInput.url || !taskInput.apiKey || !taskInput.project) {
      throw new Error("Project name, url and api-key inputs are required.");
    }

    switch (taskInput.task) {
      case "create-issue":
        await createIssue(taskInput);
        break;
      case "create-version":
        await createVersion(taskInput);
        break;
      default:
        console.error(`Unknown task: ${taskInput.task}`);
        process.exit(1);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Function to create an issue in MantisHub
 *
 * @param data
 */
async function createIssue(data: any) {
  try {
    const body = {
      summary: getInput("summary"),
      description: getInput("description"),
      category: {
        name: getInput("category"),
      },
      project: {
        name: data.project,
      },
    };
    const validatedBody = validateInput(data.task, body);
    const mantisHubService = new MantisHubService(data.url, data.apiKey);
    return await mantisHubService.createIssue(validatedBody);
  } catch (error: any) {
    console.error("Failed to create version:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    process.exit(1);
  }
}

/**
 * Function to create a version in MantisHub
 *
 * @param data
 */
async function createVersion(data: any) {
  try {
    const body = {
      name: getInput("name"),
      description: getInput("description"),
      released: getInput("released"),
      obsolete: getInput("obsolete"),
      timestamp: getInput("timestamp"),
    };
    // validate request body for create version
    const validatedBody = validateInput(data.task, body);
    // fetch project id from project name
    const projectID = isNumber(data.project)
      ? data.project
      : await getProjectID(data.url, data.apiKey, String(data.project));
    // create version API call
    const mantisHubService = new MantisHubService(data.url, data.apiKey);
    return await mantisHubService.createVersion(validatedBody, projectID);
  } catch (error: any) {
    console.error("Failed to create version:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    process.exit(1);
  }
}

if (!process.env.JEST_WORKER_ID) {
  run();
}
