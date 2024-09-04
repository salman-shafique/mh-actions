# MantisHub GitHub Actions

This repository provides reusable GitHub Actions for interacting with MantisHub, including creating issues and managing versions.

## Actions

### 1. Create MantisHub Issue

An action to create issues in MantisHub by making a REST API call. It is reusable across multiple repositories and configurable via parameters.

#### Inputs

| Input        | Required | Description                              |
|--------------|----------|------------------------------------------|
| `url`        | Yes      | Base URL of the MantisHub API            |
| `api-key`    | Yes      | API key for authentication               |
| `project-id` | Yes      | Project ID in MantisHub                  |
| `summary`    | Yes      | Summary of the issue                     |
| `description`| Yes      | Description of the issue                 |
| `category`   | Yes      | Category of the issue                    |

#### Usage

To use this action to create an issue in MantisHub, add the following step to your workflow file:

```yaml
jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: vboctor/mh-gh-actions/create-mantishub-issue@v1
        with:
          url: 'https://example.mantishub.io'
          api-key: ${{ secrets.MANTISHUB_API_KEY }}
          project-id: '123'
          summary: 'Bug Report'
          description: 'Details of the bug...'
          category: 'General'
```

### 2. Create MantisHub Version

An action to create a new version in MantisHub by making a REST API call. It is reusable across multiple repositories and configurable via parameters.

#### Inputs

| Input         | Required | Description                                      |
|---------------|----------|--------------------------------------------------|
| `url`         | Yes      | Base URL of the MantisHub API                    |
| `api-key`     | Yes      | API key for authentication                       |
| `project-id`  | Yes      | Project ID or name in MantisHub                  |
| `name`        | Yes      | Name of the version to create                    |
| `description` | No       | Description for the version                      |
| `released`    | No       | Set to `true` if the version is released         |
| `obsolete`    | No       | Set to `true` if the version is obsolete         |
| `timestamp`   | No       | Date of the release e.g., YYYY-MM-DD             |

#### Usage

To use this action to create a version in MantisHub, add the following step to your workflow file:

```yaml
jobs:
  create-version:
    runs-on: ubuntu-latest
    steps:
      - uses: vboctor/mh-gh-actions/create-mantishub-version@v1
        with:
          url: 'https://example.mantishub.io'
          api-key: ${{ secrets.MANTISHUB_API_KEY }}
          project-id: '123'
          name: 'v1.0.1'
          description: 'Initial release'
          released: 'false'
          obsolete: 'false'
          timestamp: '2024-09-20'
```

### Notes

- Ensure you replace `your-username/your-action-repo` with the correct repository name.
- Use GitHub Secrets to securely pass sensitive information like the API key.
