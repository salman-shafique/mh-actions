# Create MantisHub Version GitHub Action

This GitHub Action allows you to create a new version in MantisHub by making a REST API call. It is reusable across multiple repositories and configurable via parameters.

## Inputs

| Input         | Required | Description                                      |
|---------------|----------|--------------------------------------------------|
| `url`         | Yes      | Base URL of the MantisHub API                    |
| `api-key`     | Yes      | API key for authentication                       |
| `project-id`  | Yes      | Project ID or name in MantisHub                  |
| `name`        | Yes      | Name of the version to create                    |
| `description` | No      | Description for the version                      |
| `released`    | No       | Set to `true` if the version is released         |
| `obsolete`    | No       | Set to `true` if the version is obsolete         |
| `timestamp`        | No       | Date of the release eg. YYYY-MM-DD         |

## Usage

To use this action in your repository, add the following step to your workflow file:

```yaml
jobs:
  create-version:
    runs-on: ubuntu-latest
    steps:
      - uses: your-username/your-action-repo/create-mantis-version@v1
        with:
          url: 'https://example.mantishub.io'
          api-key: ${{ secrets.MANTISHUB_API_KEY }}
          project-id: '123'
          version-name: 'v1.0.1'
          version-description: 'Initial release'
          released: 'false'
          obsolete: 'false'
          timestamp: '2024-09-20'
