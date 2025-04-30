/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getRead = /* GraphQL */ `query GetRead($id: ID!) {
  getRead(id: $id) {
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
` as GeneratedQuery<APITypes.GetReadQueryVariables, APITypes.GetReadQuery>;
export const listReads = /* GraphQL */ `query ListReads(
  $filter: ModelReadFilterInput
  $limit: Int
  $nextToken: String
) {
  listReads(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListReadsQueryVariables, APITypes.ListReadsQuery>;
export const readsByUserId = /* GraphQL */ `query ReadsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReadFilterInput
  $limit: Int
  $nextToken: String
) {
  readsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ReadsByUserIdQueryVariables,
  APITypes.ReadsByUserIdQuery
>;
export const getSlide = /* GraphQL */ `query GetSlide($id: ID!) {
  getSlide(id: $id) {
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
` as GeneratedQuery<APITypes.GetSlideQueryVariables, APITypes.GetSlideQuery>;
export const listSlides = /* GraphQL */ `query ListSlides(
  $filter: ModelSlideFilterInput
  $limit: Int
  $nextToken: String
) {
  listSlides(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      readId
      slideNumber
      text
      imageUrl
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSlidesQueryVariables,
  APITypes.ListSlidesQuery
>;
export const slidesByReadIdAndSlideNumber = /* GraphQL */ `query SlidesByReadIdAndSlideNumber(
  $readId: ID!
  $slideNumber: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelSlideFilterInput
  $limit: Int
  $nextToken: String
) {
  slidesByReadIdAndSlideNumber(
    readId: $readId
    slideNumber: $slideNumber
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      readId
      slideNumber
      text
      imageUrl
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SlidesByReadIdAndSlideNumberQueryVariables,
  APITypes.SlidesByReadIdAndSlideNumberQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getUserBookProgress = /* GraphQL */ `query GetUserBookProgress($id: ID!) {
  getUserBookProgress(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserBookProgressQueryVariables,
  APITypes.GetUserBookProgressQuery
>;
export const listUserBookProgresses = /* GraphQL */ `query ListUserBookProgresses(
  $filter: ModelUserBookProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserBookProgresses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      bookId
      lastSlideNumber
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserBookProgressesQueryVariables,
  APITypes.ListUserBookProgressesQuery
>;
export const userBookProgressesByUserId = /* GraphQL */ `query UserBookProgressesByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserBookProgressFilterInput
  $limit: Int
  $nextToken: String
) {
  userBookProgressesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      bookId
      lastSlideNumber
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserBookProgressesByUserIdQueryVariables,
  APITypes.UserBookProgressesByUserIdQuery
>;
export const getAchievement = /* GraphQL */ `query GetAchievement($id: ID!) {
  getAchievement(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAchievementQueryVariables,
  APITypes.GetAchievementQuery
>;
export const listAchievements = /* GraphQL */ `query ListAchievements(
  $filter: ModelAchievementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      name
      description
      unlockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAchievementsQueryVariables,
  APITypes.ListAchievementsQuery
>;
export const achievementsByUserId = /* GraphQL */ `query AchievementsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAchievementFilterInput
  $limit: Int
  $nextToken: String
) {
  achievementsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      name
      description
      unlockedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AchievementsByUserIdQueryVariables,
  APITypes.AchievementsByUserIdQuery
>;
export const getBadge = /* GraphQL */ `query GetBadge($id: ID!) {
  getBadge(id: $id) {
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
` as GeneratedQuery<APITypes.GetBadgeQueryVariables, APITypes.GetBadgeQuery>;
export const listBadges = /* GraphQL */ `query ListBadges(
  $filter: ModelBadgeFilterInput
  $limit: Int
  $nextToken: String
) {
  listBadges(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      name
      iconUrl
      earnedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBadgesQueryVariables,
  APITypes.ListBadgesQuery
>;
export const badgesByUserId = /* GraphQL */ `query BadgesByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBadgeFilterInput
  $limit: Int
  $nextToken: String
) {
  badgesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      name
      iconUrl
      earnedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BadgesByUserIdQueryVariables,
  APITypes.BadgesByUserIdQuery
>;
