import axios, { AxiosInstance } from "axios";

export class MantisHubService {
  private apiClient: AxiosInstance;

  constructor(private baseUrl: string, private apiKey: string) {
    // Initialize the Axios instance with default configuration
    this.apiClient = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Creates an issue in MantisHub
   * @param payload - The issue data
   */
  async createIssue(payload: Record<string, any>): Promise<any> {
    try {
      const response = await this.apiClient.post("/api/rest/issues", payload);
      this.handleResponse(response);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  /**
   * Creates a new version in MantisHub
   * @param payload - The version data
   */
  async createVersion(payload: Record<string, any>, projectID: number): Promise<any> {
    try {
      const response = await this.apiClient.post(`/api/rest/projects/${projectID}/versions`, payload);
      this.handleResponse(response);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }
  /**
   * Fetch projects
   */
  async fetchProjects(): Promise<any> {
    try {
      const response = await this.apiClient.get("api/rest/projects");
      this.handleResponse(response);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }
  /**
   * Handles successful responses
   * @param response - The Axios response object
   */
  private handleResponse(response: any): void {
    if (![200, 201].includes(response.status)) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    console.log("Request successful:", response.data);
  }

  /**
   * Handles errors for Axios requests
   * @param error - The error object
   */
  private handleError(error: any): void {
    if (error.response) {
      // Request made and server responded with a status code outside the 2xx range
      console.error("API Error:", error.response.data);
      throw new Error(`API Error: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response received from the API");
    } else {
      // Error setting up the request
      console.error("Error in request setup:", error.message);
      throw new Error(`Error in request setup: ${error.message}`);
    }
  }
}
