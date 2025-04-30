/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createRead = /* GraphQL */ `mutation CreateRead(
  $input: CreateReadInput!
  $condition: ModelReadConditionInput
) {
  createRead(input: $input, condition: $condition) {
    id
    title
    description
    thumbnailUrl
    AuthorName
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    slides {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReadMutationVariables,
  APITypes.CreateReadMutation
>;
export const updateRead = /* GraphQL */ `mutation UpdateRead(
  $input: UpdateReadInput!
  $condition: ModelReadConditionInput
) {
  updateRead(input: $input, condition: $condition) {
    id
    title
    description
    thumbnailUrl
    AuthorName
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    slides {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReadMutationVariables,
  APITypes.UpdateReadMutation
>;
export const deleteRead = /* GraphQL */ `mutation DeleteRead(
  $input: DeleteReadInput!
  $condition: ModelReadConditionInput
) {
  deleteRead(input: $input, condition: $condition) {
    id
    title
    description
    thumbnailUrl
    AuthorName
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    slides {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReadMutationVariables,
  APITypes.DeleteReadMutation
>;
export const createSlide = /* GraphQL */ `mutation CreateSlide(
  $input: CreateSlideInput!
  $condition: ModelSlideConditionInput
) {
  createSlide(input: $input, condition: $condition) {
    id
    readId
    read {
      id
      title
      description
      thumbnailUrl
      AuthorName
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
    slideNumber
    text
    imageUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSlideMutationVariables,
  APITypes.CreateSlideMutation
>;
export const updateSlide = /* GraphQL */ `mutation UpdateSlide(
  $input: UpdateSlideInput!
  $condition: ModelSlideConditionInput
) {
  updateSlide(input: $input, condition: $condition) {
    id
    readId
    read {
      id
      title
      description
      thumbnailUrl
      AuthorName
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
    slideNumber
    text
    imageUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSlideMutationVariables,
  APITypes.UpdateSlideMutation
>;
export const deleteSlide = /* GraphQL */ `mutation DeleteSlide(
  $input: DeleteSlideInput!
  $condition: ModelSlideConditionInput
) {
  deleteSlide(input: $input, condition: $condition) {
    id
    readId
    read {
      id
      title
      description
      thumbnailUrl
      AuthorName
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
    slideNumber
    text
    imageUrl
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSlideMutationVariables,
  APITypes.DeleteSlideMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    email
    givenName
    dailyStreak
    lastActive
    reads {
      nextToken
      __typename
    }
    progress {
      nextToken
      __typename
    }
    achievements {
      nextToken
      __typename
    }
    badges {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    email
    givenName
    dailyStreak
    lastActive
    reads {
      nextToken
      __typename
    }
    progress {
      nextToken
      __typename
    }
    achievements {
      nextToken
      __typename
    }
    badges {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    username
    email
    givenName
    dailyStreak
    lastActive
    reads {
      nextToken
      __typename
    }
    progress {
      nextToken
      __typename
    }
    achievements {
      nextToken
      __typename
    }
    badges {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createUserBookProgress = /* GraphQL */ `mutation CreateUserBookProgress(
  $input: CreateUserBookProgressInput!
  $condition: ModelUserBookProgressConditionInput
) {
  createUserBookProgress(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    bookId
    lastSlideNumber
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserBookProgressMutationVariables,
  APITypes.CreateUserBookProgressMutation
>;
export const updateUserBookProgress = /* GraphQL */ `mutation UpdateUserBookProgress(
  $input: UpdateUserBookProgressInput!
  $condition: ModelUserBookProgressConditionInput
) {
  updateUserBookProgress(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    bookId
    lastSlideNumber
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserBookProgressMutationVariables,
  APITypes.UpdateUserBookProgressMutation
>;
export const deleteUserBookProgress = /* GraphQL */ `mutation DeleteUserBookProgress(
  $input: DeleteUserBookProgressInput!
  $condition: ModelUserBookProgressConditionInput
) {
  deleteUserBookProgress(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    bookId
    lastSlideNumber
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserBookProgressMutationVariables,
  APITypes.DeleteUserBookProgressMutation
>;
export const createAchievement = /* GraphQL */ `mutation CreateAchievement(
  $input: CreateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  createAchievement(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    description
    unlockedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAchievementMutationVariables,
  APITypes.CreateAchievementMutation
>;
export const updateAchievement = /* GraphQL */ `mutation UpdateAchievement(
  $input: UpdateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  updateAchievement(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    description
    unlockedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAchievementMutationVariables,
  APITypes.UpdateAchievementMutation
>;
export const deleteAchievement = /* GraphQL */ `mutation DeleteAchievement(
  $input: DeleteAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  deleteAchievement(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    description
    unlockedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAchievementMutationVariables,
  APITypes.DeleteAchievementMutation
>;
export const createBadge = /* GraphQL */ `mutation CreateBadge(
  $input: CreateBadgeInput!
  $condition: ModelBadgeConditionInput
) {
  createBadge(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    iconUrl
    earnedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBadgeMutationVariables,
  APITypes.CreateBadgeMutation
>;
export const updateBadge = /* GraphQL */ `mutation UpdateBadge(
  $input: UpdateBadgeInput!
  $condition: ModelBadgeConditionInput
) {
  updateBadge(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    iconUrl
    earnedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBadgeMutationVariables,
  APITypes.UpdateBadgeMutation
>;
export const deleteBadge = /* GraphQL */ `mutation DeleteBadge(
  $input: DeleteBadgeInput!
  $condition: ModelBadgeConditionInput
) {
  deleteBadge(input: $input, condition: $condition) {
    id
    userId
    user {
      id
      username
      email
      givenName
      dailyStreak
      lastActive
      createdAt
      updatedAt
      __typename
    }
    name
    iconUrl
    earnedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBadgeMutationVariables,
  APITypes.DeleteBadgeMutation
>;
