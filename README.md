# User Management Backend Core API Module

This module provides core functionality for handling user-related operations, including User, Roles, Screens, UserGroup, etc., in the backend of your application. It encompasses business logic for creating and manipulating these entities.

## Configuration

Before using this module, you need to configure it by passing necessary environment variables and establishing a PostgreSQL connection.

### 1. Environment Variables

Ensure the following environment variables are set:

-  AUTH0_DOMAIN
-  AUTH0_CLIENT_ID
-  AUTH0_CLIENT_SECRET
-  AUDIENCE
-  AUTH0_TOKEN_URL
-  AUTH0_MANAGEMENT_API_AUDIENCE
-  AUTH0_EMAIL_API_URL

### 2. PostgreSQL Connection

This module relies on a PostgreSQL database for storing user-related data. Make sure to provide the correct PostgreSQL connection details in the `sequelize` config variable.

## Installation

1. Install the module as a dependency in your project:

   ```bash
   npm install @exalent/user-management-api

## Usage

1. Initialize this module before using the logic
   `
    const {initialize} = require('@exalent/user-management-api')
    let config = {sequelize: pgsqlConnection, ...process.env}
    await initialize(config)
   `
2. Importing the modules

    `
        const {
            userController,
            screenController,
            roleController,
            RoleAccessScreenController,
            ModuleController,
            AuthUpdatePassword} = getControllers()

        const { 
            AuditController,
            userGroupController,
            MemberController,
            ClaimsHistoryController,
            EpisodeHistoryController,
            EpisodeClaims,
            EpisodeCodeSetCodesController,
            EpisodeCodeSetsController,
            EpisodeRuleController,
            EpisodeDefinitionsController,
        } = require('../Controllers')
    `

