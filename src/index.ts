import { getInput } from "@actions/core";
import axios from "axios";
import { validateInput } from "./validations/validation";
interface TaskInput {
  task: string;
  body: string;
}
export async function run() {
  try {
    const taskInput: TaskInput = {
      task: process.env.INPUT_TASK || "",
      body: process.env.INPUT_BODY || "",
    };

    if (!taskInput.task || !taskInput.body) {
      throw new Error("Task and body inputs are required.");
    }

    const bodyData = JSON.parse(taskInput.body); // Parse the JSON body

    // Validate JSON body based on task type
    validateInput(taskInput.task, bodyData);

    switch (taskInput.task) {
      case "create-issue":
        await createIssue(bodyData);
        break;
      case "create-version":
        await createVersion(bodyData);
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

// Function to create an issue in MantisHub
async function createIssue(body: any) {
  const url = getInput("url");
  const apiKey = getInput("api-key");

  if (!url || !apiKey) {
    throw new Error("URL and API Key are required.");
  }

  try {
    const response = await axios.post(`${url}/api/rest/issues`, body, {
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    // Check if the response status is (success)
    if (![200, 201].includes(response.status)) {
      console.error(`Failed to create version. Status: ${response.status}`);
      process.exit(1);
    }
    console.log("Issue created successfully:", response.data);
  } catch (error: any) {
    console.error("Failed to create version:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    process.exit(1);
  }
}

// Function to create a version in MantisHub
async function createVersion(body: any) {
  const url = getInput("url");
  const apiKey = getInput("api-key");
  const projectId = getInput("project-id");

  if (!url || !apiKey || !projectId) {
    throw new Error("URL, API Key, and Project ID are required.");
  }

  try {
    const response = await axios.post(`${url}/api/rest/projects/${projectId}/versions`, body, {
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    // Check if the response status is (success)
    if (![200, 201].includes(response.status)) {
      console.error(`Failed to create version. Status: ${response.status}`);
      process.exit(1);
    }
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
