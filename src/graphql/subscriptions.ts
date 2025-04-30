/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRead = /* GraphQL */ `subscription OnCreateRead(
  $filter: ModelSubscriptionReadFilterInput
  $owner: String
) {
  onCreateRead(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReadSubscriptionVariables,
  APITypes.OnCreateReadSubscription
>;
export const onUpdateRead = /* GraphQL */ `subscription OnUpdateRead(
  $filter: ModelSubscriptionReadFilterInput
  $owner: String
) {
  onUpdateRead(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReadSubscriptionVariables,
  APITypes.OnUpdateReadSubscription
>;
export const onDeleteRead = /* GraphQL */ `subscription OnDeleteRead(
  $filter: ModelSubscriptionReadFilterInput
  $owner: String
) {
  onDeleteRead(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReadSubscriptionVariables,
  APITypes.OnDeleteReadSubscription
>;
export const onCreateSlide = /* GraphQL */ `subscription OnCreateSlide(
  $filter: ModelSubscriptionSlideFilterInput
  $owner: String
) {
  onCreateSlide(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSlideSubscriptionVariables,
  APITypes.OnCreateSlideSubscription
>;
export const onUpdateSlide = /* GraphQL */ `subscription OnUpdateSlide(
  $filter: ModelSubscriptionSlideFilterInput
  $owner: String
) {
  onUpdateSlide(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSlideSubscriptionVariables,
  APITypes.OnUpdateSlideSubscription
>;
export const onDeleteSlide = /* GraphQL */ `subscription OnDeleteSlide(
  $filter: ModelSubscriptionSlideFilterInput
  $owner: String
) {
  onDeleteSlide(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSlideSubscriptionVariables,
  APITypes.OnDeleteSlideSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onCreateUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onUpdateUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onDeleteUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateUserBookProgress = /* GraphQL */ `subscription OnCreateUserBookProgress(
  $filter: ModelSubscriptionUserBookProgressFilterInput
  $userId: String
) {
  onCreateUserBookProgress(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserBookProgressSubscriptionVariables,
  APITypes.OnCreateUserBookProgressSubscription
>;
export const onUpdateUserBookProgress = /* GraphQL */ `subscription OnUpdateUserBookProgress(
  $filter: ModelSubscriptionUserBookProgressFilterInput
  $userId: String
) {
  onUpdateUserBookProgress(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserBookProgressSubscriptionVariables,
  APITypes.OnUpdateUserBookProgressSubscription
>;
export const onDeleteUserBookProgress = /* GraphQL */ `subscription OnDeleteUserBookProgress(
  $filter: ModelSubscriptionUserBookProgressFilterInput
  $userId: String
) {
  onDeleteUserBookProgress(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserBookProgressSubscriptionVariables,
  APITypes.OnDeleteUserBookProgressSubscription
>;
export const onCreateAchievement = /* GraphQL */ `subscription OnCreateAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $userId: String
) {
  onCreateAchievement(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAchievementSubscriptionVariables,
  APITypes.OnCreateAchievementSubscription
>;
export const onUpdateAchievement = /* GraphQL */ `subscription OnUpdateAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $userId: String
) {
  onUpdateAchievement(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAchievementSubscriptionVariables,
  APITypes.OnUpdateAchievementSubscription
>;
export const onDeleteAchievement = /* GraphQL */ `subscription OnDeleteAchievement(
  $filter: ModelSubscriptionAchievementFilterInput
  $userId: String
) {
  onDeleteAchievement(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAchievementSubscriptionVariables,
  APITypes.OnDeleteAchievementSubscription
>;
export const onCreateBadge = /* GraphQL */ `subscription OnCreateBadge(
  $filter: ModelSubscriptionBadgeFilterInput
  $userId: String
) {
  onCreateBadge(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBadgeSubscriptionVariables,
  APITypes.OnCreateBadgeSubscription
>;
export const onUpdateBadge = /* GraphQL */ `subscription OnUpdateBadge(
  $filter: ModelSubscriptionBadgeFilterInput
  $userId: String
) {
  onUpdateBadge(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBadgeSubscriptionVariables,
  APITypes.OnUpdateBadgeSubscription
>;
export const onDeleteBadge = /* GraphQL */ `subscription OnDeleteBadge(
  $filter: ModelSubscriptionBadgeFilterInput
  $userId: String
) {
  onDeleteBadge(filter: $filter, userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBadgeSubscriptionVariables,
  APITypes.OnDeleteBadgeSubscription
>;
