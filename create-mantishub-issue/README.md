
# Create MantisHub Issue using GitHub Action

This GitHub Action allows you to create a new issue in MantisHub by making a REST API call. It is reusable across multiple repositories and configurable via parameters.

## Inputs

| Input         | Required | Description                     |
|---------------|----------|---------------------------------|
| `url`         | Yes      | Base URL of the MantisHub API   |
| `api-key`     | Yes      | API key for authentication      |
| `project-id`  | Yes      | Project ID or name in MantisHub |
| `summary`     | Yes      | Summary of the issue            |
| `description` | Yes      | Description of the issue        |
| `category`    | Yes      | Category of the issue           |

## Usage

To use this action in your repository, add the following step to your workflow file:

```yaml
jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: your-username/your-action-repo/create-mantis-issue@v1
        with:
          url: 'https://example.mantishub.io'
          api-key: ${{ secrets.MANTISHUB_API_KEY }}
          project-id: '123'
          summary: 'New issue created via GitHub Actions'
          description: 'Details of the issue...'
          category: 'General'
