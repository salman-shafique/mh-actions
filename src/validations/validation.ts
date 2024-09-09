import Joi from "joi";

// Define schema for creating an issue
export const issueSchema = Joi.object({
  summary: Joi.string().required(),
  description: Joi.string().required(),
  project: Joi.object({
    name: Joi.string().required(),
  }).required(),
  category: Joi.object({
    name: Joi.string().required(),
  }).required(),
});

// Define schema for creating a version
export const versionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  released: Joi.boolean().optional(),
  obsolete: Joi.boolean().optional(),
  timestamp: Joi.string().optional(),
});

// Function to validate input based on task type
export function validateInput(task: string, body: any) {
  let schema;

  switch (task) {
    case "create-issue":
      schema = issueSchema;
      break;
    case "create-version":
      schema = versionSchema;
      break;
    default:
      throw new Error(`Unknown task: ${task}`);
  }

  const { error, value } = schema.validate(body);
  if (error) {
    console.error(`Validation error: ${error.message}`);
    process.exit(1); // Fail the job if validation fails
  }
  return value;
}
