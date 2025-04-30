/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReadInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  thumbnailUrl: string,
  AuthorName: string,
  userId: string,
};

export type ModelReadConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnailUrl?: ModelStringInput | null,
  AuthorName?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelReadConditionInput | null > | null,
  or?: Array< ModelReadConditionInput | null > | null,
  not?: ModelReadConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Read = {
  __typename: "Read",
  id: string,
  title: string,
  description?: string | null,
  thumbnailUrl: string,
  AuthorName: string,
  userId: string,
  user?: User | null,
  slides?: ModelSlideConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  givenName: string,
  dailyStreak: number,
  lastActive: string,
  reads?: ModelReadConnection | null,
  progress?: ModelUserBookProgressConnection | null,
  achievements?: ModelAchievementConnection | null,
  badges?: ModelBadgeConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelReadConnection = {
  __typename: "ModelReadConnection",
  items:  Array<Read | null >,
  nextToken?: string | null,
};

export type ModelUserBookProgressConnection = {
  __typename: "ModelUserBookProgressConnection",
  items:  Array<UserBookProgress | null >,
  nextToken?: string | null,
};

export type UserBookProgress = {
  __typename: "UserBookProgress",
  id: string,
  userId: string,
  user?: User | null,
  bookId: string,
  lastSlideNumber: number,
  updatedAt: string,
  createdAt: string,
};

export type ModelAchievementConnection = {
  __typename: "ModelAchievementConnection",
  items:  Array<Achievement | null >,
  nextToken?: string | null,
};

export type Achievement = {
  __typename: "Achievement",
  id: string,
  userId: string,
  user?: User | null,
  name: string,
  description?: string | null,
  unlockedAt: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelBadgeConnection = {
  __typename: "ModelBadgeConnection",
  items:  Array<Badge | null >,
  nextToken?: string | null,
};

export type Badge = {
  __typename: "Badge",
  id: string,
  userId: string,
  user?: User | null,
  name: string,
  iconUrl?: string | null,
  earnedAt: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelSlideConnection = {
  __typename: "ModelSlideConnection",
  items:  Array<Slide | null >,
  nextToken?: string | null,
};

export type Slide = {
  __typename: "Slide",
  id: string,
  readId: string,
  read?: Read | null,
  slideNumber: number,
  text: string,
  imageUrl: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReadInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  thumbnailUrl?: string | null,
  AuthorName?: string | null,
  userId?: string | null,
};

export type DeleteReadInput = {
  id: string,
};

export type CreateSlideInput = {
  id?: string | null,
  readId: string,
  slideNumber: number,
  text: string,
  imageUrl: string,
};

export type ModelSlideConditionInput = {
  readId?: ModelIDInput | null,
  slideNumber?: ModelIntInput | null,
  text?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  and?: Array< ModelSlideConditionInput | null > | null,
  or?: Array< ModelSlideConditionInput | null > | null,
  not?: ModelSlideConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateSlideInput = {
  id: string,
  readId?: string | null,
  slideNumber?: number | null,
  text?: string | null,
  imageUrl?: string | null,
};

export type DeleteSlideInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  givenName: string,
  dailyStreak: number,
  lastActive: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  givenName?: ModelStringInput | null,
  dailyStreak?: ModelIntInput | null,
  lastActive?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  id?: ModelStringInput | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  givenName?: string | null,
  dailyStreak?: number | null,
  lastActive?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateUserBookProgressInput = {
  id?: string | null,
  userId: string,
  bookId: string,
  lastSlideNumber: number,
  updatedAt?: string | null,
};

export type ModelUserBookProgressConditionInput = {
  userId?: ModelIDInput | null,
  bookId?: ModelIDInput | null,
  lastSlideNumber?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserBookProgressConditionInput | null > | null,
  or?: Array< ModelUserBookProgressConditionInput | null > | null,
  not?: ModelUserBookProgressConditionInput | null,
  createdAt?: ModelStringInput | null,
};

export type UpdateUserBookProgressInput = {
  id: string,
  userId?: string | null,
  bookId?: string | null,
  lastSlideNumber?: number | null,
  updatedAt?: string | null,
};

export type DeleteUserBookProgressInput = {
  id: string,
};

export type CreateAchievementInput = {
  id?: string | null,
  userId: string,
  name: string,
  description?: string | null,
  unlockedAt: string,
};

export type ModelAchievementConditionInput = {
  userId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unlockedAt?: ModelStringInput | null,
  and?: Array< ModelAchievementConditionInput | null > | null,
  or?: Array< ModelAchievementConditionInput | null > | null,
  not?: ModelAchievementConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateAchievementInput = {
  id: string,
  userId?: string | null,
  name?: string | null,
  description?: string | null,
  unlockedAt?: string | null,
};

export type DeleteAchievementInput = {
  id: string,
};

export type CreateBadgeInput = {
  id?: string | null,
  userId: string,
  name: string,
  iconUrl?: string | null,
  earnedAt: string,
};

export type ModelBadgeConditionInput = {
  userId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  iconUrl?: ModelStringInput | null,
  earnedAt?: ModelStringInput | null,
  and?: Array< ModelBadgeConditionInput | null > | null,
  or?: Array< ModelBadgeConditionInput | null > | null,
  not?: ModelBadgeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateBadgeInput = {
  id: string,
  userId?: string | null,
  name?: string | null,
  iconUrl?: string | null,
  earnedAt?: string | null,
};

export type DeleteBadgeInput = {
  id: string,
};

export type ModelReadFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnailUrl?: ModelStringInput | null,
  AuthorName?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReadFilterInput | null > | null,
  or?: Array< ModelReadFilterInput | null > | null,
  not?: ModelReadFilterInput | null,
  owner?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSlideFilterInput = {
  id?: ModelIDInput | null,
  readId?: ModelIDInput | null,
  slideNumber?: ModelIntInput | null,
  text?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSlideFilterInput | null > | null,
  or?: Array< ModelSlideFilterInput | null > | null,
  not?: ModelSlideFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  givenName?: ModelStringInput | null,
  dailyStreak?: ModelIntInput | null,
  lastActive?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelUserBookProgressFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  bookId?: ModelIDInput | null,
  lastSlideNumber?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserBookProgressFilterInput | null > | null,
  or?: Array< ModelUserBookProgressFilterInput | null > | null,
  not?: ModelUserBookProgressFilterInput | null,
};

export type ModelAchievementFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unlockedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAchievementFilterInput | null > | null,
  or?: Array< ModelAchievementFilterInput | null > | null,
  not?: ModelAchievementFilterInput | null,
};

export type ModelBadgeFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  iconUrl?: ModelStringInput | null,
  earnedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBadgeFilterInput | null > | null,
  or?: Array< ModelBadgeFilterInput | null > | null,
  not?: ModelBadgeFilterInput | null,
};

export type ModelSubscriptionReadFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  thumbnailUrl?: ModelSubscriptionStringInput | null,
  AuthorName?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReadFilterInput | null > | null,
  or?: Array< ModelSubscriptionReadFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionSlideFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  readId?: ModelSubscriptionIDInput | null,
  slideNumber?: ModelSubscriptionIntInput | null,
  text?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSlideFilterInput | null > | null,
  or?: Array< ModelSubscriptionSlideFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  givenName?: ModelSubscriptionStringInput | null,
  dailyStreak?: ModelSubscriptionIntInput | null,
  lastActive?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  id?: ModelStringInput | null,
};

export type ModelSubscriptionUserBookProgressFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  bookId?: ModelSubscriptionIDInput | null,
  lastSlideNumber?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserBookProgressFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserBookProgressFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionAchievementFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  unlockedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAchievementFilterInput | null > | null,
  or?: Array< ModelSubscriptionAchievementFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionBadgeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  iconUrl?: ModelSubscriptionStringInput | null,
  earnedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBadgeFilterInput | null > | null,
  or?: Array< ModelSubscriptionBadgeFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type CreateReadMutationVariables = {
  input: CreateReadInput,
  condition?: ModelReadConditionInput | null,
};

export type CreateReadMutation = {
  createRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReadMutationVariables = {
  input: UpdateReadInput,
  condition?: ModelReadConditionInput | null,
};

export type UpdateReadMutation = {
  updateRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReadMutationVariables = {
  input: DeleteReadInput,
  condition?: ModelReadConditionInput | null,
};

export type DeleteReadMutation = {
  deleteRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSlideMutationVariables = {
  input: CreateSlideInput,
  condition?: ModelSlideConditionInput | null,
};

export type CreateSlideMutation = {
  createSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSlideMutationVariables = {
  input: UpdateSlideInput,
  condition?: ModelSlideConditionInput | null,
};

export type UpdateSlideMutation = {
  updateSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSlideMutationVariables = {
  input: DeleteSlideInput,
  condition?: ModelSlideConditionInput | null,
};

export type DeleteSlideMutation = {
  deleteSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserBookProgressMutationVariables = {
  input: CreateUserBookProgressInput,
  condition?: ModelUserBookProgressConditionInput | null,
};

export type CreateUserBookProgressMutation = {
  createUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type UpdateUserBookProgressMutationVariables = {
  input: UpdateUserBookProgressInput,
  condition?: ModelUserBookProgressConditionInput | null,
};

export type UpdateUserBookProgressMutation = {
  updateUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type DeleteUserBookProgressMutationVariables = {
  input: DeleteUserBookProgressInput,
  condition?: ModelUserBookProgressConditionInput | null,
};

export type DeleteUserBookProgressMutation = {
  deleteUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type CreateAchievementMutationVariables = {
  input: CreateAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type CreateAchievementMutation = {
  createAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAchievementMutationVariables = {
  input: UpdateAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type UpdateAchievementMutation = {
  updateAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAchievementMutationVariables = {
  input: DeleteAchievementInput,
  condition?: ModelAchievementConditionInput | null,
};

export type DeleteAchievementMutation = {
  deleteAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBadgeMutationVariables = {
  input: CreateBadgeInput,
  condition?: ModelBadgeConditionInput | null,
};

export type CreateBadgeMutation = {
  createBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBadgeMutationVariables = {
  input: UpdateBadgeInput,
  condition?: ModelBadgeConditionInput | null,
};

export type UpdateBadgeMutation = {
  updateBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBadgeMutationVariables = {
  input: DeleteBadgeInput,
  condition?: ModelBadgeConditionInput | null,
};

export type DeleteBadgeMutation = {
  deleteBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetReadQueryVariables = {
  id: string,
};

export type GetReadQuery = {
  getRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReadsQueryVariables = {
  filter?: ModelReadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReadsQuery = {
  listReads?:  {
    __typename: "ModelReadConnection",
    items:  Array< {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReadsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReadsByUserIdQuery = {
  readsByUserId?:  {
    __typename: "ModelReadConnection",
    items:  Array< {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSlideQueryVariables = {
  id: string,
};

export type GetSlideQuery = {
  getSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSlidesQueryVariables = {
  filter?: ModelSlideFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSlidesQuery = {
  listSlides?:  {
    __typename: "ModelSlideConnection",
    items:  Array< {
      __typename: "Slide",
      id: string,
      readId: string,
      slideNumber: number,
      text: string,
      imageUrl: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SlidesByReadIdAndSlideNumberQueryVariables = {
  readId: string,
  slideNumber?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSlideFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SlidesByReadIdAndSlideNumberQuery = {
  slidesByReadIdAndSlideNumber?:  {
    __typename: "ModelSlideConnection",
    items:  Array< {
      __typename: "Slide",
      id: string,
      readId: string,
      slideNumber: number,
      text: string,
      imageUrl: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserBookProgressQueryVariables = {
  id: string,
};

export type GetUserBookProgressQuery = {
  getUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type ListUserBookProgressesQueryVariables = {
  filter?: ModelUserBookProgressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserBookProgressesQuery = {
  listUserBookProgresses?:  {
    __typename: "ModelUserBookProgressConnection",
    items:  Array< {
      __typename: "UserBookProgress",
      id: string,
      userId: string,
      bookId: string,
      lastSlideNumber: number,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserBookProgressesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserBookProgressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserBookProgressesByUserIdQuery = {
  userBookProgressesByUserId?:  {
    __typename: "ModelUserBookProgressConnection",
    items:  Array< {
      __typename: "UserBookProgress",
      id: string,
      userId: string,
      bookId: string,
      lastSlideNumber: number,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAchievementQueryVariables = {
  id: string,
};

export type GetAchievementQuery = {
  getAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAchievementsQueryVariables = {
  filter?: ModelAchievementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAchievementsQuery = {
  listAchievements?:  {
    __typename: "ModelAchievementConnection",
    items:  Array< {
      __typename: "Achievement",
      id: string,
      userId: string,
      name: string,
      description?: string | null,
      unlockedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AchievementsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAchievementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AchievementsByUserIdQuery = {
  achievementsByUserId?:  {
    __typename: "ModelAchievementConnection",
    items:  Array< {
      __typename: "Achievement",
      id: string,
      userId: string,
      name: string,
      description?: string | null,
      unlockedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBadgeQueryVariables = {
  id: string,
};

export type GetBadgeQuery = {
  getBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBadgesQueryVariables = {
  filter?: ModelBadgeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBadgesQuery = {
  listBadges?:  {
    __typename: "ModelBadgeConnection",
    items:  Array< {
      __typename: "Badge",
      id: string,
      userId: string,
      name: string,
      iconUrl?: string | null,
      earnedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BadgesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBadgeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BadgesByUserIdQuery = {
  badgesByUserId?:  {
    __typename: "ModelBadgeConnection",
    items:  Array< {
      __typename: "Badge",
      id: string,
      userId: string,
      name: string,
      iconUrl?: string | null,
      earnedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReadSubscriptionVariables = {
  filter?: ModelSubscriptionReadFilterInput | null,
  owner?: string | null,
};

export type OnCreateReadSubscription = {
  onCreateRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReadSubscriptionVariables = {
  filter?: ModelSubscriptionReadFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReadSubscription = {
  onUpdateRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReadSubscriptionVariables = {
  filter?: ModelSubscriptionReadFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReadSubscription = {
  onDeleteRead?:  {
    __typename: "Read",
    id: string,
    title: string,
    description?: string | null,
    thumbnailUrl: string,
    AuthorName: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    slides?:  {
      __typename: "ModelSlideConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSlideSubscriptionVariables = {
  filter?: ModelSubscriptionSlideFilterInput | null,
  owner?: string | null,
};

export type OnCreateSlideSubscription = {
  onCreateSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSlideSubscriptionVariables = {
  filter?: ModelSubscriptionSlideFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSlideSubscription = {
  onUpdateSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSlideSubscriptionVariables = {
  filter?: ModelSubscriptionSlideFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSlideSubscription = {
  onDeleteSlide?:  {
    __typename: "Slide",
    id: string,
    readId: string,
    read?:  {
      __typename: "Read",
      id: string,
      title: string,
      description?: string | null,
      thumbnailUrl: string,
      AuthorName: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    slideNumber: number,
    text: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    givenName: string,
    dailyStreak: number,
    lastActive: string,
    reads?:  {
      __typename: "ModelReadConnection",
      nextToken?: string | null,
    } | null,
    progress?:  {
      __typename: "ModelUserBookProgressConnection",
      nextToken?: string | null,
    } | null,
    achievements?:  {
      __typename: "ModelAchievementConnection",
      nextToken?: string | null,
    } | null,
    badges?:  {
      __typename: "ModelBadgeConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserBookProgressSubscriptionVariables = {
  filter?: ModelSubscriptionUserBookProgressFilterInput | null,
  userId?: string | null,
};

export type OnCreateUserBookProgressSubscription = {
  onCreateUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnUpdateUserBookProgressSubscriptionVariables = {
  filter?: ModelSubscriptionUserBookProgressFilterInput | null,
  userId?: string | null,
};

export type OnUpdateUserBookProgressSubscription = {
  onUpdateUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnDeleteUserBookProgressSubscriptionVariables = {
  filter?: ModelSubscriptionUserBookProgressFilterInput | null,
  userId?: string | null,
};

export type OnDeleteUserBookProgressSubscription = {
  onDeleteUserBookProgress?:  {
    __typename: "UserBookProgress",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    bookId: string,
    lastSlideNumber: number,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type OnCreateAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  userId?: string | null,
};

export type OnCreateAchievementSubscription = {
  onCreateAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  userId?: string | null,
};

export type OnUpdateAchievementSubscription = {
  onUpdateAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAchievementSubscriptionVariables = {
  filter?: ModelSubscriptionAchievementFilterInput | null,
  userId?: string | null,
};

export type OnDeleteAchievementSubscription = {
  onDeleteAchievement?:  {
    __typename: "Achievement",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description?: string | null,
    unlockedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBadgeSubscriptionVariables = {
  filter?: ModelSubscriptionBadgeFilterInput | null,
  userId?: string | null,
};

export type OnCreateBadgeSubscription = {
  onCreateBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBadgeSubscriptionVariables = {
  filter?: ModelSubscriptionBadgeFilterInput | null,
  userId?: string | null,
};

export type OnUpdateBadgeSubscription = {
  onUpdateBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBadgeSubscriptionVariables = {
  filter?: ModelSubscriptionBadgeFilterInput | null,
  userId?: string | null,
};

export type OnDeleteBadgeSubscription = {
  onDeleteBadge?:  {
    __typename: "Badge",
    id: string,
    userId: string,
    user?:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      givenName: string,
      dailyStreak: number,
      lastActive: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    iconUrl?: string | null,
    earnedAt: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
