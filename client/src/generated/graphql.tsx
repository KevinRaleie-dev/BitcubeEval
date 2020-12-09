import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  lecturers: Array<Lecturer>;
  getLecturer?: Maybe<Lecturer>;
  getStudents: Array<Student>;
  getDegrees: Array<Degree>;
  getLecturerStudents?: Maybe<Array<Degree>>;
  courses: Array<Course>;
  getDegreeCourses?: Maybe<Array<Course>>;
};


export type QueryGetDegreeCoursesArgs = {
  id: Scalars['Int'];
};

export type Lecturer = {
  __typename?: 'Lecturer';
  id: Scalars['Int'];
  forenames: Scalars['String'];
  surname: Scalars['String'];
  emailAddress: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  degrees: Array<Degree>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Degree = {
  __typename?: 'Degree';
  id: Scalars['Int'];
  degreeName: Scalars['String'];
  durationInYears: Scalars['Int'];
  students?: Maybe<Array<Student>>;
  lecturer?: Maybe<Lecturer>;
  courses?: Maybe<Array<Course>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Float'];
  forenames: Scalars['String'];
  surname: Scalars['String'];
  emailAddress: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  degree?: Maybe<Degree>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Float'];
  courseName: Scalars['String'];
  durationInMonths: Scalars['Int'];
  degree?: Maybe<Degree>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerLecturer: LecturerResponse;
  loginLecturer: LoginResponse;
  addStudent: StudentResponse;
  addDegree: Degree;
  addCourse: Scalars['Boolean'];
};


export type MutationRegisterLecturerArgs = {
  input: RegisterInput;
};


export type MutationLoginLecturerArgs = {
  input: LoginInput;
};


export type MutationAddStudentArgs = {
  input: StudentInput;
};


export type MutationAddDegreeArgs = {
  input: DegreeInput;
};


export type MutationAddCourseArgs = {
  input: CourseInput;
};

export type LecturerResponse = {
  __typename?: 'LecturerResponse';
  errors?: Maybe<Array<FieldError>>;
  lecturer?: Maybe<Lecturer>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type RegisterInput = {
  forenames: Scalars['String'];
  email: Scalars['String'];
  surname: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  accessToken?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  surname: Scalars['String'];
  email: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type StudentInput = {
  forenames: Scalars['String'];
  email: Scalars['String'];
  surname: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  degreeID: Scalars['Int'];
};

export type DegreeInput = {
  degreeName: Scalars['String'];
  durationYears: Scalars['Int'];
};

export type CourseInput = {
  degreeID: Scalars['Int'];
  courseName: Scalars['String'];
  durationMonths: Scalars['Int'];
};

export type DegreeQueryVariables = Exact<{ [key: string]: never; }>;


export type DegreeQuery = (
  { __typename?: 'Query' }
  & { getDegrees: Array<(
    { __typename?: 'Degree' }
    & Pick<Degree, 'id' | 'degreeName'>
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginLecturerMutationVariables = Exact<{
  surname: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginLecturerMutation = (
  { __typename?: 'Mutation' }
  & { loginLecturer: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RegisterLecturerMutationVariables = Exact<{
  email: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  forenames: Scalars['String'];
  surname: Scalars['String'];
}>;


export type RegisterLecturerMutation = (
  { __typename?: 'Mutation' }
  & { registerLecturer: (
    { __typename?: 'LecturerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, lecturer?: Maybe<(
      { __typename?: 'Lecturer' }
      & Pick<Lecturer, 'id' | 'firstName'>
    )> }
  ) }
);


export const DegreeDocument = gql`
    query Degree {
  getDegrees {
    id
    degreeName
  }
}
    `;

/**
 * __useDegreeQuery__
 *
 * To run a query within a React component, call `useDegreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDegreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDegreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useDegreeQuery(baseOptions?: Apollo.QueryHookOptions<DegreeQuery, DegreeQueryVariables>) {
        return Apollo.useQuery<DegreeQuery, DegreeQueryVariables>(DegreeDocument, baseOptions);
      }
export function useDegreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DegreeQuery, DegreeQueryVariables>) {
          return Apollo.useLazyQuery<DegreeQuery, DegreeQueryVariables>(DegreeDocument, baseOptions);
        }
export type DegreeQueryHookResult = ReturnType<typeof useDegreeQuery>;
export type DegreeLazyQueryHookResult = ReturnType<typeof useDegreeLazyQuery>;
export type DegreeQueryResult = Apollo.QueryResult<DegreeQuery, DegreeQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginLecturerDocument = gql`
    mutation LoginLecturer($surname: String!, $email: String!) {
  loginLecturer(input: {email: $email, surname: $surname}) {
    errors {
      field
      message
    }
    accessToken
  }
}
    `;
export type LoginLecturerMutationFn = Apollo.MutationFunction<LoginLecturerMutation, LoginLecturerMutationVariables>;

/**
 * __useLoginLecturerMutation__
 *
 * To run a mutation, you first call `useLoginLecturerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginLecturerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginLecturerMutation, { data, loading, error }] = useLoginLecturerMutation({
 *   variables: {
 *      surname: // value for 'surname'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginLecturerMutation(baseOptions?: Apollo.MutationHookOptions<LoginLecturerMutation, LoginLecturerMutationVariables>) {
        return Apollo.useMutation<LoginLecturerMutation, LoginLecturerMutationVariables>(LoginLecturerDocument, baseOptions);
      }
export type LoginLecturerMutationHookResult = ReturnType<typeof useLoginLecturerMutation>;
export type LoginLecturerMutationResult = Apollo.MutationResult<LoginLecturerMutation>;
export type LoginLecturerMutationOptions = Apollo.BaseMutationOptions<LoginLecturerMutation, LoginLecturerMutationVariables>;
export const RegisterLecturerDocument = gql`
    mutation RegisterLecturer($email: String!, $dateOfBirth: DateTime!, $forenames: String!, $surname: String!) {
  registerLecturer(
    input: {email: $email, dateOfBirth: $dateOfBirth, forenames: $forenames, surname: $surname}
  ) {
    errors {
      field
      message
    }
    lecturer {
      id
      firstName
    }
  }
}
    `;
export type RegisterLecturerMutationFn = Apollo.MutationFunction<RegisterLecturerMutation, RegisterLecturerMutationVariables>;

/**
 * __useRegisterLecturerMutation__
 *
 * To run a mutation, you first call `useRegisterLecturerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterLecturerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerLecturerMutation, { data, loading, error }] = useRegisterLecturerMutation({
 *   variables: {
 *      email: // value for 'email'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      forenames: // value for 'forenames'
 *      surname: // value for 'surname'
 *   },
 * });
 */
export function useRegisterLecturerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterLecturerMutation, RegisterLecturerMutationVariables>) {
        return Apollo.useMutation<RegisterLecturerMutation, RegisterLecturerMutationVariables>(RegisterLecturerDocument, baseOptions);
      }
export type RegisterLecturerMutationHookResult = ReturnType<typeof useRegisterLecturerMutation>;
export type RegisterLecturerMutationResult = Apollo.MutationResult<RegisterLecturerMutation>;
export type RegisterLecturerMutationOptions = Apollo.BaseMutationOptions<RegisterLecturerMutation, RegisterLecturerMutationVariables>;