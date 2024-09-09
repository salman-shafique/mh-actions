# MantisHub GitHub Actions

The goal is to offer a set of GitHub Actions that MantisHub (and possibly MantisBT) users can use to integrate MantisHub into their GitHub workflows.

### Create-Version

This is an action that will often be triggered when a new tag is applied to the repo. For example, when a tag is added, create a version in MantisHub for the release.

```yaml
create-version: 
  - url: https://example.mantishub.io 
  - token: {{some-token}} 
  - project: "my-project" 
  - name: "{{tag-name}}" 
  - released: true
```
The defaults for field are:

- `released` defaults to `true`.
- `obsolete` defaults to `false`.
- `timestamp` defaults to `now`.

### Next-Version
One pattern is to always have the next release be named “vNext” and renaming such release to the appropriate name when released and then creating a new “vNext”. It should be possible to implement such pattern.

```yaml
create-version: 
  - url: https://example.mantishub.io 
  - token: {{some-token}} 
  - project: "my-project" 
  - name: "{{tag-name}}" 
  - released: true
```
This will do the following:

- Rename `vNext` to `{{tag-name}}` and mark it as released by setting `released = true` and `release-date = now`
- Create a new `vNext` release with `release-date` of `now + 7` days and `released = false` and `obsolete = false`.

### 2. Create-Issue

There can be cases where it makes sense to create issues in MantisHub from GitHub actions. For
example:
- After creating a new release, create a work item for follow-up steps.
- When build breaks, open a work item to fix it.
- Certain workflow that is manually creating and includes some manual work to be done as a follow-up.


```yaml
create-issue:
  - url: https://example.mantishub.io
  - token: {{some-token}}
  - project: "my-project"
  - summary: "Build is broken"
  - description: "{{error}}"
  - handler: "some-engineer"
```
