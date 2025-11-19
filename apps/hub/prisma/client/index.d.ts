
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Repository
 * 
 */
export type Repository = $Result.DefaultSelection<Prisma.$RepositoryPayload>
/**
 * Model Issue
 * 
 */
export type Issue = $Result.DefaultSelection<Prisma.$IssuePayload>
/**
 * Model PullRequest
 * 
 */
export type PullRequest = $Result.DefaultSelection<Prisma.$PullRequestPayload>
/**
 * Model Commit
 * 
 */
export type Commit = $Result.DefaultSelection<Prisma.$CommitPayload>
/**
 * Model Release
 * 
 */
export type Release = $Result.DefaultSelection<Prisma.$ReleasePayload>
/**
 * Model VersionTag
 * 
 */
export type VersionTag = $Result.DefaultSelection<Prisma.$VersionTagPayload>
/**
 * Model Contributor
 * 
 */
export type Contributor = $Result.DefaultSelection<Prisma.$ContributorPayload>
/**
 * Model ContributorContribution
 * 
 */
export type ContributorContribution = $Result.DefaultSelection<Prisma.$ContributorContributionPayload>
/**
 * Model DocumentationContent
 * 
 */
export type DocumentationContent = $Result.DefaultSelection<Prisma.$DocumentationContentPayload>
/**
 * Model DocumentationMetadata
 * 
 */
export type DocumentationMetadata = $Result.DefaultSelection<Prisma.$DocumentationMetadataPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const IssueState: {
  open: 'open',
  closed: 'closed'
};

export type IssueState = (typeof IssueState)[keyof typeof IssueState]


export const PrState: {
  open: 'open',
  closed: 'closed',
  merged: 'merged'
};

export type PrState = (typeof PrState)[keyof typeof PrState]


export const SyncStatus: {
  pending: 'pending',
  in_progress: 'in_progress',
  completed: 'completed',
  failed: 'failed'
};

export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus]

}

export type IssueState = $Enums.IssueState

export const IssueState: typeof $Enums.IssueState

export type PrState = $Enums.PrState

export const PrState: typeof $Enums.PrState

export type SyncStatus = $Enums.SyncStatus

export const SyncStatus: typeof $Enums.SyncStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Repositories
 * const repositories = await prisma.repository.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Repositories
   * const repositories = await prisma.repository.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.repository`: Exposes CRUD operations for the **Repository** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repositories
    * const repositories = await prisma.repository.findMany()
    * ```
    */
  get repository(): Prisma.RepositoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.issue`: Exposes CRUD operations for the **Issue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Issues
    * const issues = await prisma.issue.findMany()
    * ```
    */
  get issue(): Prisma.IssueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pullRequest`: Exposes CRUD operations for the **PullRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PullRequests
    * const pullRequests = await prisma.pullRequest.findMany()
    * ```
    */
  get pullRequest(): Prisma.PullRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commit`: Exposes CRUD operations for the **Commit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commits
    * const commits = await prisma.commit.findMany()
    * ```
    */
  get commit(): Prisma.CommitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.release`: Exposes CRUD operations for the **Release** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Releases
    * const releases = await prisma.release.findMany()
    * ```
    */
  get release(): Prisma.ReleaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.versionTag`: Exposes CRUD operations for the **VersionTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VersionTags
    * const versionTags = await prisma.versionTag.findMany()
    * ```
    */
  get versionTag(): Prisma.VersionTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contributor`: Exposes CRUD operations for the **Contributor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contributors
    * const contributors = await prisma.contributor.findMany()
    * ```
    */
  get contributor(): Prisma.ContributorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contributorContribution`: Exposes CRUD operations for the **ContributorContribution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContributorContributions
    * const contributorContributions = await prisma.contributorContribution.findMany()
    * ```
    */
  get contributorContribution(): Prisma.ContributorContributionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentationContent`: Exposes CRUD operations for the **DocumentationContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentationContents
    * const documentationContents = await prisma.documentationContent.findMany()
    * ```
    */
  get documentationContent(): Prisma.DocumentationContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentationMetadata`: Exposes CRUD operations for the **DocumentationMetadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentationMetadata
    * const documentationMetadata = await prisma.documentationMetadata.findMany()
    * ```
    */
  get documentationMetadata(): Prisma.DocumentationMetadataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Repository: 'Repository',
    Issue: 'Issue',
    PullRequest: 'PullRequest',
    Commit: 'Commit',
    Release: 'Release',
    VersionTag: 'VersionTag',
    Contributor: 'Contributor',
    ContributorContribution: 'ContributorContribution',
    DocumentationContent: 'DocumentationContent',
    DocumentationMetadata: 'DocumentationMetadata',
    SyncLog: 'SyncLog',
    Settings: 'Settings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "repository" | "issue" | "pullRequest" | "commit" | "release" | "versionTag" | "contributor" | "contributorContribution" | "documentationContent" | "documentationMetadata" | "syncLog" | "settings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Repository: {
        payload: Prisma.$RepositoryPayload<ExtArgs>
        fields: Prisma.RepositoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepositoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepositoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findFirst: {
            args: Prisma.RepositoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepositoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findMany: {
            args: Prisma.RepositoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          create: {
            args: Prisma.RepositoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          createMany: {
            args: Prisma.RepositoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepositoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          delete: {
            args: Prisma.RepositoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          update: {
            args: Prisma.RepositoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          deleteMany: {
            args: Prisma.RepositoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepositoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepositoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          upsert: {
            args: Prisma.RepositoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          aggregate: {
            args: Prisma.RepositoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepository>
          }
          groupBy: {
            args: Prisma.RepositoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepositoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepositoryCountArgs<ExtArgs>
            result: $Utils.Optional<RepositoryCountAggregateOutputType> | number
          }
        }
      }
      Issue: {
        payload: Prisma.$IssuePayload<ExtArgs>
        fields: Prisma.IssueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IssueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IssueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          findFirst: {
            args: Prisma.IssueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IssueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          findMany: {
            args: Prisma.IssueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>[]
          }
          create: {
            args: Prisma.IssueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          createMany: {
            args: Prisma.IssueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IssueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>[]
          }
          delete: {
            args: Prisma.IssueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          update: {
            args: Prisma.IssueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          deleteMany: {
            args: Prisma.IssueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IssueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IssueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>[]
          }
          upsert: {
            args: Prisma.IssueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IssuePayload>
          }
          aggregate: {
            args: Prisma.IssueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIssue>
          }
          groupBy: {
            args: Prisma.IssueGroupByArgs<ExtArgs>
            result: $Utils.Optional<IssueGroupByOutputType>[]
          }
          count: {
            args: Prisma.IssueCountArgs<ExtArgs>
            result: $Utils.Optional<IssueCountAggregateOutputType> | number
          }
        }
      }
      PullRequest: {
        payload: Prisma.$PullRequestPayload<ExtArgs>
        fields: Prisma.PullRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PullRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PullRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          findFirst: {
            args: Prisma.PullRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PullRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          findMany: {
            args: Prisma.PullRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>[]
          }
          create: {
            args: Prisma.PullRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          createMany: {
            args: Prisma.PullRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PullRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>[]
          }
          delete: {
            args: Prisma.PullRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          update: {
            args: Prisma.PullRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          deleteMany: {
            args: Prisma.PullRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PullRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PullRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>[]
          }
          upsert: {
            args: Prisma.PullRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PullRequestPayload>
          }
          aggregate: {
            args: Prisma.PullRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePullRequest>
          }
          groupBy: {
            args: Prisma.PullRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<PullRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.PullRequestCountArgs<ExtArgs>
            result: $Utils.Optional<PullRequestCountAggregateOutputType> | number
          }
        }
      }
      Commit: {
        payload: Prisma.$CommitPayload<ExtArgs>
        fields: Prisma.CommitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          findFirst: {
            args: Prisma.CommitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          findMany: {
            args: Prisma.CommitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          create: {
            args: Prisma.CommitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          createMany: {
            args: Prisma.CommitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          delete: {
            args: Prisma.CommitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          update: {
            args: Prisma.CommitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          deleteMany: {
            args: Prisma.CommitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          upsert: {
            args: Prisma.CommitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          aggregate: {
            args: Prisma.CommitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommit>
          }
          groupBy: {
            args: Prisma.CommitGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommitGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommitCountArgs<ExtArgs>
            result: $Utils.Optional<CommitCountAggregateOutputType> | number
          }
        }
      }
      Release: {
        payload: Prisma.$ReleasePayload<ExtArgs>
        fields: Prisma.ReleaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReleaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReleaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          findFirst: {
            args: Prisma.ReleaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReleaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          findMany: {
            args: Prisma.ReleaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>[]
          }
          create: {
            args: Prisma.ReleaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          createMany: {
            args: Prisma.ReleaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReleaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>[]
          }
          delete: {
            args: Prisma.ReleaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          update: {
            args: Prisma.ReleaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          deleteMany: {
            args: Prisma.ReleaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReleaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReleaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>[]
          }
          upsert: {
            args: Prisma.ReleaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReleasePayload>
          }
          aggregate: {
            args: Prisma.ReleaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRelease>
          }
          groupBy: {
            args: Prisma.ReleaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReleaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReleaseCountArgs<ExtArgs>
            result: $Utils.Optional<ReleaseCountAggregateOutputType> | number
          }
        }
      }
      VersionTag: {
        payload: Prisma.$VersionTagPayload<ExtArgs>
        fields: Prisma.VersionTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VersionTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VersionTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          findFirst: {
            args: Prisma.VersionTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VersionTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          findMany: {
            args: Prisma.VersionTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>[]
          }
          create: {
            args: Prisma.VersionTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          createMany: {
            args: Prisma.VersionTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VersionTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>[]
          }
          delete: {
            args: Prisma.VersionTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          update: {
            args: Prisma.VersionTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          deleteMany: {
            args: Prisma.VersionTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VersionTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VersionTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>[]
          }
          upsert: {
            args: Prisma.VersionTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionTagPayload>
          }
          aggregate: {
            args: Prisma.VersionTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVersionTag>
          }
          groupBy: {
            args: Prisma.VersionTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<VersionTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.VersionTagCountArgs<ExtArgs>
            result: $Utils.Optional<VersionTagCountAggregateOutputType> | number
          }
        }
      }
      Contributor: {
        payload: Prisma.$ContributorPayload<ExtArgs>
        fields: Prisma.ContributorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContributorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContributorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          findFirst: {
            args: Prisma.ContributorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContributorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          findMany: {
            args: Prisma.ContributorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>[]
          }
          create: {
            args: Prisma.ContributorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          createMany: {
            args: Prisma.ContributorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContributorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>[]
          }
          delete: {
            args: Prisma.ContributorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          update: {
            args: Prisma.ContributorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          deleteMany: {
            args: Prisma.ContributorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContributorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContributorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>[]
          }
          upsert: {
            args: Prisma.ContributorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorPayload>
          }
          aggregate: {
            args: Prisma.ContributorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContributor>
          }
          groupBy: {
            args: Prisma.ContributorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContributorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContributorCountArgs<ExtArgs>
            result: $Utils.Optional<ContributorCountAggregateOutputType> | number
          }
        }
      }
      ContributorContribution: {
        payload: Prisma.$ContributorContributionPayload<ExtArgs>
        fields: Prisma.ContributorContributionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContributorContributionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContributorContributionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          findFirst: {
            args: Prisma.ContributorContributionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContributorContributionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          findMany: {
            args: Prisma.ContributorContributionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>[]
          }
          create: {
            args: Prisma.ContributorContributionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          createMany: {
            args: Prisma.ContributorContributionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContributorContributionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>[]
          }
          delete: {
            args: Prisma.ContributorContributionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          update: {
            args: Prisma.ContributorContributionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          deleteMany: {
            args: Prisma.ContributorContributionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContributorContributionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContributorContributionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>[]
          }
          upsert: {
            args: Prisma.ContributorContributionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorContributionPayload>
          }
          aggregate: {
            args: Prisma.ContributorContributionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContributorContribution>
          }
          groupBy: {
            args: Prisma.ContributorContributionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContributorContributionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContributorContributionCountArgs<ExtArgs>
            result: $Utils.Optional<ContributorContributionCountAggregateOutputType> | number
          }
        }
      }
      DocumentationContent: {
        payload: Prisma.$DocumentationContentPayload<ExtArgs>
        fields: Prisma.DocumentationContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentationContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentationContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          findFirst: {
            args: Prisma.DocumentationContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentationContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          findMany: {
            args: Prisma.DocumentationContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>[]
          }
          create: {
            args: Prisma.DocumentationContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          createMany: {
            args: Prisma.DocumentationContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentationContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>[]
          }
          delete: {
            args: Prisma.DocumentationContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          update: {
            args: Prisma.DocumentationContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentationContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentationContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentationContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentationContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationContentPayload>
          }
          aggregate: {
            args: Prisma.DocumentationContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentationContent>
          }
          groupBy: {
            args: Prisma.DocumentationContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentationContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentationContentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentationContentCountAggregateOutputType> | number
          }
        }
      }
      DocumentationMetadata: {
        payload: Prisma.$DocumentationMetadataPayload<ExtArgs>
        fields: Prisma.DocumentationMetadataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentationMetadataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentationMetadataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          findFirst: {
            args: Prisma.DocumentationMetadataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentationMetadataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          findMany: {
            args: Prisma.DocumentationMetadataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>[]
          }
          create: {
            args: Prisma.DocumentationMetadataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          createMany: {
            args: Prisma.DocumentationMetadataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentationMetadataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>[]
          }
          delete: {
            args: Prisma.DocumentationMetadataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          update: {
            args: Prisma.DocumentationMetadataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          deleteMany: {
            args: Prisma.DocumentationMetadataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentationMetadataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentationMetadataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>[]
          }
          upsert: {
            args: Prisma.DocumentationMetadataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentationMetadataPayload>
          }
          aggregate: {
            args: Prisma.DocumentationMetadataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentationMetadata>
          }
          groupBy: {
            args: Prisma.DocumentationMetadataGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentationMetadataGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentationMetadataCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentationMetadataCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    repository?: RepositoryOmit
    issue?: IssueOmit
    pullRequest?: PullRequestOmit
    commit?: CommitOmit
    release?: ReleaseOmit
    versionTag?: VersionTagOmit
    contributor?: ContributorOmit
    contributorContribution?: ContributorContributionOmit
    documentationContent?: DocumentationContentOmit
    documentationMetadata?: DocumentationMetadataOmit
    syncLog?: SyncLogOmit
    settings?: SettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RepositoryCountOutputType
   */

  export type RepositoryCountOutputType = {
    issues: number
    pullRequests: number
    commits: number
    releases: number
    versionTags: number
    contributions: number
    documentationContent: number
    syncLogs: number
  }

  export type RepositoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issues?: boolean | RepositoryCountOutputTypeCountIssuesArgs
    pullRequests?: boolean | RepositoryCountOutputTypeCountPullRequestsArgs
    commits?: boolean | RepositoryCountOutputTypeCountCommitsArgs
    releases?: boolean | RepositoryCountOutputTypeCountReleasesArgs
    versionTags?: boolean | RepositoryCountOutputTypeCountVersionTagsArgs
    contributions?: boolean | RepositoryCountOutputTypeCountContributionsArgs
    documentationContent?: boolean | RepositoryCountOutputTypeCountDocumentationContentArgs
    syncLogs?: boolean | RepositoryCountOutputTypeCountSyncLogsArgs
  }

  // Custom InputTypes
  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryCountOutputType
     */
    select?: RepositoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountIssuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IssueWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountPullRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PullRequestWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountCommitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountReleasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReleaseWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountVersionTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VersionTagWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountContributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributorContributionWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountDocumentationContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentationContentWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountSyncLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
  }


  /**
   * Count Type ContributorCountOutputType
   */

  export type ContributorCountOutputType = {
    contributions: number
  }

  export type ContributorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributions?: boolean | ContributorCountOutputTypeCountContributionsArgs
  }

  // Custom InputTypes
  /**
   * ContributorCountOutputType without action
   */
  export type ContributorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorCountOutputType
     */
    select?: ContributorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContributorCountOutputType without action
   */
  export type ContributorCountOutputTypeCountContributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributorContributionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Repository
   */

  export type AggregateRepository = {
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  export type RepositoryAvgAggregateOutputType = {
    githubId: number | null
    size: number | null
    stargazersCount: number | null
    watchersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
  }

  export type RepositorySumAggregateOutputType = {
    githubId: bigint | null
    size: number | null
    stargazersCount: number | null
    watchersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
  }

  export type RepositoryMinAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    name: string | null
    fullName: string | null
    owner: string | null
    description: string | null
    private: boolean | null
    published: boolean | null
    fork: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    pushedAt: Date | null
    homepage: string | null
    size: number | null
    stargazersCount: number | null
    watchersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    language: string | null
    defaultBranch: string | null
    archived: boolean | null
    disabled: boolean | null
    syncedAt: Date | null
    featured: boolean | null
    emoji: string | null
    faIcon: string | null
    docsPath: string | null
  }

  export type RepositoryMaxAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    name: string | null
    fullName: string | null
    owner: string | null
    description: string | null
    private: boolean | null
    published: boolean | null
    fork: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    pushedAt: Date | null
    homepage: string | null
    size: number | null
    stargazersCount: number | null
    watchersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    language: string | null
    defaultBranch: string | null
    archived: boolean | null
    disabled: boolean | null
    syncedAt: Date | null
    featured: boolean | null
    emoji: string | null
    faIcon: string | null
    docsPath: string | null
  }

  export type RepositoryCountAggregateOutputType = {
    id: number
    githubId: number
    name: number
    fullName: number
    owner: number
    description: number
    private: number
    published: number
    fork: number
    createdAt: number
    updatedAt: number
    pushedAt: number
    homepage: number
    size: number
    stargazersCount: number
    watchersCount: number
    forksCount: number
    openIssuesCount: number
    language: number
    defaultBranch: number
    topics: number
    archived: number
    disabled: number
    syncedAt: number
    featured: number
    emoji: number
    faIcon: number
    docsPath: number
    _all: number
  }


  export type RepositoryAvgAggregateInputType = {
    githubId?: true
    size?: true
    stargazersCount?: true
    watchersCount?: true
    forksCount?: true
    openIssuesCount?: true
  }

  export type RepositorySumAggregateInputType = {
    githubId?: true
    size?: true
    stargazersCount?: true
    watchersCount?: true
    forksCount?: true
    openIssuesCount?: true
  }

  export type RepositoryMinAggregateInputType = {
    id?: true
    githubId?: true
    name?: true
    fullName?: true
    owner?: true
    description?: true
    private?: true
    published?: true
    fork?: true
    createdAt?: true
    updatedAt?: true
    pushedAt?: true
    homepage?: true
    size?: true
    stargazersCount?: true
    watchersCount?: true
    forksCount?: true
    openIssuesCount?: true
    language?: true
    defaultBranch?: true
    archived?: true
    disabled?: true
    syncedAt?: true
    featured?: true
    emoji?: true
    faIcon?: true
    docsPath?: true
  }

  export type RepositoryMaxAggregateInputType = {
    id?: true
    githubId?: true
    name?: true
    fullName?: true
    owner?: true
    description?: true
    private?: true
    published?: true
    fork?: true
    createdAt?: true
    updatedAt?: true
    pushedAt?: true
    homepage?: true
    size?: true
    stargazersCount?: true
    watchersCount?: true
    forksCount?: true
    openIssuesCount?: true
    language?: true
    defaultBranch?: true
    archived?: true
    disabled?: true
    syncedAt?: true
    featured?: true
    emoji?: true
    faIcon?: true
    docsPath?: true
  }

  export type RepositoryCountAggregateInputType = {
    id?: true
    githubId?: true
    name?: true
    fullName?: true
    owner?: true
    description?: true
    private?: true
    published?: true
    fork?: true
    createdAt?: true
    updatedAt?: true
    pushedAt?: true
    homepage?: true
    size?: true
    stargazersCount?: true
    watchersCount?: true
    forksCount?: true
    openIssuesCount?: true
    language?: true
    defaultBranch?: true
    topics?: true
    archived?: true
    disabled?: true
    syncedAt?: true
    featured?: true
    emoji?: true
    faIcon?: true
    docsPath?: true
    _all?: true
  }

  export type RepositoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repository to aggregate.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repositories
    **/
    _count?: true | RepositoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepositoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepositorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepositoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepositoryMaxAggregateInputType
  }

  export type GetRepositoryAggregateType<T extends RepositoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRepository]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepository[P]>
      : GetScalarType<T[P], AggregateRepository[P]>
  }




  export type RepositoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithAggregationInput | RepositoryOrderByWithAggregationInput[]
    by: RepositoryScalarFieldEnum[] | RepositoryScalarFieldEnum
    having?: RepositoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepositoryCountAggregateInputType | true
    _avg?: RepositoryAvgAggregateInputType
    _sum?: RepositorySumAggregateInputType
    _min?: RepositoryMinAggregateInputType
    _max?: RepositoryMaxAggregateInputType
  }

  export type RepositoryGroupByOutputType = {
    id: string
    githubId: bigint
    name: string
    fullName: string
    owner: string
    description: string | null
    private: boolean
    published: boolean
    fork: boolean
    createdAt: Date
    updatedAt: Date
    pushedAt: Date | null
    homepage: string | null
    size: number
    stargazersCount: number
    watchersCount: number
    forksCount: number
    openIssuesCount: number
    language: string | null
    defaultBranch: string
    topics: string[]
    archived: boolean
    disabled: boolean
    syncedAt: Date
    featured: boolean
    emoji: string | null
    faIcon: string | null
    docsPath: string
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  type GetRepositoryGroupByPayload<T extends RepositoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepositoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepositoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
            : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
        }
      >
    >


  export type RepositorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    name?: boolean
    fullName?: boolean
    owner?: boolean
    description?: boolean
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pushedAt?: boolean
    homepage?: boolean
    size?: boolean
    stargazersCount?: boolean
    watchersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    language?: boolean
    defaultBranch?: boolean
    topics?: boolean
    archived?: boolean
    disabled?: boolean
    syncedAt?: boolean
    featured?: boolean
    emoji?: boolean
    faIcon?: boolean
    docsPath?: boolean
    issues?: boolean | Repository$issuesArgs<ExtArgs>
    pullRequests?: boolean | Repository$pullRequestsArgs<ExtArgs>
    commits?: boolean | Repository$commitsArgs<ExtArgs>
    releases?: boolean | Repository$releasesArgs<ExtArgs>
    versionTags?: boolean | Repository$versionTagsArgs<ExtArgs>
    contributions?: boolean | Repository$contributionsArgs<ExtArgs>
    documentationContent?: boolean | Repository$documentationContentArgs<ExtArgs>
    documentationMetadata?: boolean | Repository$documentationMetadataArgs<ExtArgs>
    syncLogs?: boolean | Repository$syncLogsArgs<ExtArgs>
    _count?: boolean | RepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    name?: boolean
    fullName?: boolean
    owner?: boolean
    description?: boolean
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pushedAt?: boolean
    homepage?: boolean
    size?: boolean
    stargazersCount?: boolean
    watchersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    language?: boolean
    defaultBranch?: boolean
    topics?: boolean
    archived?: boolean
    disabled?: boolean
    syncedAt?: boolean
    featured?: boolean
    emoji?: boolean
    faIcon?: boolean
    docsPath?: boolean
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    name?: boolean
    fullName?: boolean
    owner?: boolean
    description?: boolean
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pushedAt?: boolean
    homepage?: boolean
    size?: boolean
    stargazersCount?: boolean
    watchersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    language?: boolean
    defaultBranch?: boolean
    topics?: boolean
    archived?: boolean
    disabled?: boolean
    syncedAt?: boolean
    featured?: boolean
    emoji?: boolean
    faIcon?: boolean
    docsPath?: boolean
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectScalar = {
    id?: boolean
    githubId?: boolean
    name?: boolean
    fullName?: boolean
    owner?: boolean
    description?: boolean
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pushedAt?: boolean
    homepage?: boolean
    size?: boolean
    stargazersCount?: boolean
    watchersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    language?: boolean
    defaultBranch?: boolean
    topics?: boolean
    archived?: boolean
    disabled?: boolean
    syncedAt?: boolean
    featured?: boolean
    emoji?: boolean
    faIcon?: boolean
    docsPath?: boolean
  }

  export type RepositoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "name" | "fullName" | "owner" | "description" | "private" | "published" | "fork" | "createdAt" | "updatedAt" | "pushedAt" | "homepage" | "size" | "stargazersCount" | "watchersCount" | "forksCount" | "openIssuesCount" | "language" | "defaultBranch" | "topics" | "archived" | "disabled" | "syncedAt" | "featured" | "emoji" | "faIcon" | "docsPath", ExtArgs["result"]["repository"]>
  export type RepositoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    issues?: boolean | Repository$issuesArgs<ExtArgs>
    pullRequests?: boolean | Repository$pullRequestsArgs<ExtArgs>
    commits?: boolean | Repository$commitsArgs<ExtArgs>
    releases?: boolean | Repository$releasesArgs<ExtArgs>
    versionTags?: boolean | Repository$versionTagsArgs<ExtArgs>
    contributions?: boolean | Repository$contributionsArgs<ExtArgs>
    documentationContent?: boolean | Repository$documentationContentArgs<ExtArgs>
    documentationMetadata?: boolean | Repository$documentationMetadataArgs<ExtArgs>
    syncLogs?: boolean | Repository$syncLogsArgs<ExtArgs>
    _count?: boolean | RepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepositoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RepositoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RepositoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repository"
    objects: {
      issues: Prisma.$IssuePayload<ExtArgs>[]
      pullRequests: Prisma.$PullRequestPayload<ExtArgs>[]
      commits: Prisma.$CommitPayload<ExtArgs>[]
      releases: Prisma.$ReleasePayload<ExtArgs>[]
      versionTags: Prisma.$VersionTagPayload<ExtArgs>[]
      contributions: Prisma.$ContributorContributionPayload<ExtArgs>[]
      documentationContent: Prisma.$DocumentationContentPayload<ExtArgs>[]
      documentationMetadata: Prisma.$DocumentationMetadataPayload<ExtArgs> | null
      syncLogs: Prisma.$SyncLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: bigint
      name: string
      fullName: string
      owner: string
      description: string | null
      private: boolean
      published: boolean
      fork: boolean
      createdAt: Date
      updatedAt: Date
      pushedAt: Date | null
      homepage: string | null
      size: number
      stargazersCount: number
      watchersCount: number
      forksCount: number
      openIssuesCount: number
      language: string | null
      defaultBranch: string
      topics: string[]
      archived: boolean
      disabled: boolean
      syncedAt: Date
      featured: boolean
      emoji: string | null
      faIcon: string | null
      docsPath: string
    }, ExtArgs["result"]["repository"]>
    composites: {}
  }

  type RepositoryGetPayload<S extends boolean | null | undefined | RepositoryDefaultArgs> = $Result.GetResult<Prisma.$RepositoryPayload, S>

  type RepositoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepositoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepositoryCountAggregateInputType | true
    }

  export interface RepositoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repository'], meta: { name: 'Repository' } }
    /**
     * Find zero or one Repository that matches the filter.
     * @param {RepositoryFindUniqueArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryFindUniqueArgs>(args: SelectSubset<T, RepositoryFindUniqueArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Repository that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryFindUniqueOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RepositoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryFindFirstArgs>(args?: SelectSubset<T, RepositoryFindFirstArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RepositoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Repositories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repositories
     * const repositories = await prisma.repository.findMany()
     * 
     * // Get first 10 Repositories
     * const repositories = await prisma.repository.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repositoryWithIdOnly = await prisma.repository.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepositoryFindManyArgs>(args?: SelectSubset<T, RepositoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Repository.
     * @param {RepositoryCreateArgs} args - Arguments to create a Repository.
     * @example
     * // Create one Repository
     * const Repository = await prisma.repository.create({
     *   data: {
     *     // ... data to create a Repository
     *   }
     * })
     * 
     */
    create<T extends RepositoryCreateArgs>(args: SelectSubset<T, RepositoryCreateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Repositories.
     * @param {RepositoryCreateManyArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepositoryCreateManyArgs>(args?: SelectSubset<T, RepositoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Repositories and returns the data saved in the database.
     * @param {RepositoryCreateManyAndReturnArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Repositories and only return the `id`
     * const repositoryWithIdOnly = await prisma.repository.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepositoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RepositoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Repository.
     * @param {RepositoryDeleteArgs} args - Arguments to delete one Repository.
     * @example
     * // Delete one Repository
     * const Repository = await prisma.repository.delete({
     *   where: {
     *     // ... filter to delete one Repository
     *   }
     * })
     * 
     */
    delete<T extends RepositoryDeleteArgs>(args: SelectSubset<T, RepositoryDeleteArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Repository.
     * @param {RepositoryUpdateArgs} args - Arguments to update one Repository.
     * @example
     * // Update one Repository
     * const repository = await prisma.repository.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepositoryUpdateArgs>(args: SelectSubset<T, RepositoryUpdateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Repositories.
     * @param {RepositoryDeleteManyArgs} args - Arguments to filter Repositories to delete.
     * @example
     * // Delete a few Repositories
     * const { count } = await prisma.repository.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepositoryDeleteManyArgs>(args?: SelectSubset<T, RepositoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepositoryUpdateManyArgs>(args: SelectSubset<T, RepositoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories and returns the data updated in the database.
     * @param {RepositoryUpdateManyAndReturnArgs} args - Arguments to update many Repositories.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Repositories and only return the `id`
     * const repositoryWithIdOnly = await prisma.repository.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepositoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RepositoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Repository.
     * @param {RepositoryUpsertArgs} args - Arguments to update or create a Repository.
     * @example
     * // Update or create a Repository
     * const repository = await prisma.repository.upsert({
     *   create: {
     *     // ... data to create a Repository
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repository we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryUpsertArgs>(args: SelectSubset<T, RepositoryUpsertArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryCountArgs} args - Arguments to filter Repositories to count.
     * @example
     * // Count the number of Repositories
     * const count = await prisma.repository.count({
     *   where: {
     *     // ... the filter for the Repositories we want to count
     *   }
     * })
    **/
    count<T extends RepositoryCountArgs>(
      args?: Subset<T, RepositoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepositoryAggregateArgs>(args: Subset<T, RepositoryAggregateArgs>): Prisma.PrismaPromise<GetRepositoryAggregateType<T>>

    /**
     * Group by Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepositoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepositoryGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepositoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepositoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repository model
   */
  readonly fields: RepositoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repository.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    issues<T extends Repository$issuesArgs<ExtArgs> = {}>(args?: Subset<T, Repository$issuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pullRequests<T extends Repository$pullRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Repository$pullRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commits<T extends Repository$commitsArgs<ExtArgs> = {}>(args?: Subset<T, Repository$commitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    releases<T extends Repository$releasesArgs<ExtArgs> = {}>(args?: Subset<T, Repository$releasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    versionTags<T extends Repository$versionTagsArgs<ExtArgs> = {}>(args?: Subset<T, Repository$versionTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contributions<T extends Repository$contributionsArgs<ExtArgs> = {}>(args?: Subset<T, Repository$contributionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documentationContent<T extends Repository$documentationContentArgs<ExtArgs> = {}>(args?: Subset<T, Repository$documentationContentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documentationMetadata<T extends Repository$documentationMetadataArgs<ExtArgs> = {}>(args?: Subset<T, Repository$documentationMetadataArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    syncLogs<T extends Repository$syncLogsArgs<ExtArgs> = {}>(args?: Subset<T, Repository$syncLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Repository model
   */
  interface RepositoryFieldRefs {
    readonly id: FieldRef<"Repository", 'String'>
    readonly githubId: FieldRef<"Repository", 'BigInt'>
    readonly name: FieldRef<"Repository", 'String'>
    readonly fullName: FieldRef<"Repository", 'String'>
    readonly owner: FieldRef<"Repository", 'String'>
    readonly description: FieldRef<"Repository", 'String'>
    readonly private: FieldRef<"Repository", 'Boolean'>
    readonly published: FieldRef<"Repository", 'Boolean'>
    readonly fork: FieldRef<"Repository", 'Boolean'>
    readonly createdAt: FieldRef<"Repository", 'DateTime'>
    readonly updatedAt: FieldRef<"Repository", 'DateTime'>
    readonly pushedAt: FieldRef<"Repository", 'DateTime'>
    readonly homepage: FieldRef<"Repository", 'String'>
    readonly size: FieldRef<"Repository", 'Int'>
    readonly stargazersCount: FieldRef<"Repository", 'Int'>
    readonly watchersCount: FieldRef<"Repository", 'Int'>
    readonly forksCount: FieldRef<"Repository", 'Int'>
    readonly openIssuesCount: FieldRef<"Repository", 'Int'>
    readonly language: FieldRef<"Repository", 'String'>
    readonly defaultBranch: FieldRef<"Repository", 'String'>
    readonly topics: FieldRef<"Repository", 'String[]'>
    readonly archived: FieldRef<"Repository", 'Boolean'>
    readonly disabled: FieldRef<"Repository", 'Boolean'>
    readonly syncedAt: FieldRef<"Repository", 'DateTime'>
    readonly featured: FieldRef<"Repository", 'Boolean'>
    readonly emoji: FieldRef<"Repository", 'String'>
    readonly faIcon: FieldRef<"Repository", 'String'>
    readonly docsPath: FieldRef<"Repository", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Repository findUnique
   */
  export type RepositoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findUniqueOrThrow
   */
  export type RepositoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findFirst
   */
  export type RepositoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findFirstOrThrow
   */
  export type RepositoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findMany
   */
  export type RepositoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repositories to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository create
   */
  export type RepositoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Repository.
     */
    data: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
  }

  /**
   * Repository createMany
   */
  export type RepositoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repository createManyAndReturn
   */
  export type RepositoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repository update
   */
  export type RepositoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Repository.
     */
    data: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
    /**
     * Choose, which Repository to update.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository updateMany
   */
  export type RepositoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
  }

  /**
   * Repository updateManyAndReturn
   */
  export type RepositoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
  }

  /**
   * Repository upsert
   */
  export type RepositoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Repository to update in case it exists.
     */
    where: RepositoryWhereUniqueInput
    /**
     * In case the Repository found by the `where` argument doesn't exist, create a new Repository with this data.
     */
    create: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
    /**
     * In case the Repository was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
  }

  /**
   * Repository delete
   */
  export type RepositoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter which Repository to delete.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository deleteMany
   */
  export type RepositoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repositories to delete
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to delete.
     */
    limit?: number
  }

  /**
   * Repository.issues
   */
  export type Repository$issuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    where?: IssueWhereInput
    orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[]
    cursor?: IssueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[]
  }

  /**
   * Repository.pullRequests
   */
  export type Repository$pullRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    where?: PullRequestWhereInput
    orderBy?: PullRequestOrderByWithRelationInput | PullRequestOrderByWithRelationInput[]
    cursor?: PullRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PullRequestScalarFieldEnum | PullRequestScalarFieldEnum[]
  }

  /**
   * Repository.commits
   */
  export type Repository$commitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    where?: CommitWhereInput
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    cursor?: CommitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Repository.releases
   */
  export type Repository$releasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    where?: ReleaseWhereInput
    orderBy?: ReleaseOrderByWithRelationInput | ReleaseOrderByWithRelationInput[]
    cursor?: ReleaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReleaseScalarFieldEnum | ReleaseScalarFieldEnum[]
  }

  /**
   * Repository.versionTags
   */
  export type Repository$versionTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    where?: VersionTagWhereInput
    orderBy?: VersionTagOrderByWithRelationInput | VersionTagOrderByWithRelationInput[]
    cursor?: VersionTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VersionTagScalarFieldEnum | VersionTagScalarFieldEnum[]
  }

  /**
   * Repository.contributions
   */
  export type Repository$contributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    where?: ContributorContributionWhereInput
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    cursor?: ContributorContributionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContributorContributionScalarFieldEnum | ContributorContributionScalarFieldEnum[]
  }

  /**
   * Repository.documentationContent
   */
  export type Repository$documentationContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    where?: DocumentationContentWhereInput
    orderBy?: DocumentationContentOrderByWithRelationInput | DocumentationContentOrderByWithRelationInput[]
    cursor?: DocumentationContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentationContentScalarFieldEnum | DocumentationContentScalarFieldEnum[]
  }

  /**
   * Repository.documentationMetadata
   */
  export type Repository$documentationMetadataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    where?: DocumentationMetadataWhereInput
  }

  /**
   * Repository.syncLogs
   */
  export type Repository$syncLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    cursor?: SyncLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * Repository without action
   */
  export type RepositoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
  }


  /**
   * Model Issue
   */

  export type AggregateIssue = {
    _count: IssueCountAggregateOutputType | null
    _avg: IssueAvgAggregateOutputType | null
    _sum: IssueSumAggregateOutputType | null
    _min: IssueMinAggregateOutputType | null
    _max: IssueMaxAggregateOutputType | null
  }

  export type IssueAvgAggregateOutputType = {
    githubId: number | null
    number: number | null
    commentsCount: number | null
  }

  export type IssueSumAggregateOutputType = {
    githubId: bigint | null
    number: number | null
    commentsCount: number | null
  }

  export type IssueMinAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    number: number | null
    title: string | null
    body: string | null
    state: $Enums.IssueState | null
    userLogin: string | null
    userAvatarUrl: string | null
    commentsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    syncedAt: Date | null
  }

  export type IssueMaxAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    number: number | null
    title: string | null
    body: string | null
    state: $Enums.IssueState | null
    userLogin: string | null
    userAvatarUrl: string | null
    commentsCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    syncedAt: Date | null
  }

  export type IssueCountAggregateOutputType = {
    id: number
    githubId: number
    repositoryId: number
    number: number
    title: number
    body: number
    state: number
    userLogin: number
    userAvatarUrl: number
    labels: number
    assignees: number
    commentsCount: number
    createdAt: number
    updatedAt: number
    closedAt: number
    syncedAt: number
    _all: number
  }


  export type IssueAvgAggregateInputType = {
    githubId?: true
    number?: true
    commentsCount?: true
  }

  export type IssueSumAggregateInputType = {
    githubId?: true
    number?: true
    commentsCount?: true
  }

  export type IssueMinAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    commentsCount?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
  }

  export type IssueMaxAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    commentsCount?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
  }

  export type IssueCountAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    labels?: true
    assignees?: true
    commentsCount?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type IssueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Issue to aggregate.
     */
    where?: IssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     */
    orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Issues
    **/
    _count?: true | IssueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IssueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IssueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IssueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IssueMaxAggregateInputType
  }

  export type GetIssueAggregateType<T extends IssueAggregateArgs> = {
        [P in keyof T & keyof AggregateIssue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIssue[P]>
      : GetScalarType<T[P], AggregateIssue[P]>
  }




  export type IssueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IssueWhereInput
    orderBy?: IssueOrderByWithAggregationInput | IssueOrderByWithAggregationInput[]
    by: IssueScalarFieldEnum[] | IssueScalarFieldEnum
    having?: IssueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IssueCountAggregateInputType | true
    _avg?: IssueAvgAggregateInputType
    _sum?: IssueSumAggregateInputType
    _min?: IssueMinAggregateInputType
    _max?: IssueMaxAggregateInputType
  }

  export type IssueGroupByOutputType = {
    id: string
    githubId: bigint
    repositoryId: string
    number: number
    title: string
    body: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl: string | null
    labels: string[]
    assignees: string[]
    commentsCount: number
    createdAt: Date
    updatedAt: Date
    closedAt: Date | null
    syncedAt: Date
    _count: IssueCountAggregateOutputType | null
    _avg: IssueAvgAggregateOutputType | null
    _sum: IssueSumAggregateOutputType | null
    _min: IssueMinAggregateOutputType | null
    _max: IssueMaxAggregateOutputType | null
  }

  type GetIssueGroupByPayload<T extends IssueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IssueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IssueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IssueGroupByOutputType[P]>
            : GetScalarType<T[P], IssueGroupByOutputType[P]>
        }
      >
    >


  export type IssueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    commentsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issue"]>

  export type IssueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    commentsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issue"]>

  export type IssueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    commentsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["issue"]>

  export type IssueSelectScalar = {
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    commentsCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
  }

  export type IssueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "repositoryId" | "number" | "title" | "body" | "state" | "userLogin" | "userAvatarUrl" | "labels" | "assignees" | "commentsCount" | "createdAt" | "updatedAt" | "closedAt" | "syncedAt", ExtArgs["result"]["issue"]>
  export type IssueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type IssueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type IssueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $IssuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Issue"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: bigint
      repositoryId: string
      number: number
      title: string
      body: string | null
      state: $Enums.IssueState
      userLogin: string
      userAvatarUrl: string | null
      labels: string[]
      assignees: string[]
      commentsCount: number
      createdAt: Date
      updatedAt: Date
      closedAt: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["issue"]>
    composites: {}
  }

  type IssueGetPayload<S extends boolean | null | undefined | IssueDefaultArgs> = $Result.GetResult<Prisma.$IssuePayload, S>

  type IssueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IssueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IssueCountAggregateInputType | true
    }

  export interface IssueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Issue'], meta: { name: 'Issue' } }
    /**
     * Find zero or one Issue that matches the filter.
     * @param {IssueFindUniqueArgs} args - Arguments to find a Issue
     * @example
     * // Get one Issue
     * const issue = await prisma.issue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IssueFindUniqueArgs>(args: SelectSubset<T, IssueFindUniqueArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Issue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IssueFindUniqueOrThrowArgs} args - Arguments to find a Issue
     * @example
     * // Get one Issue
     * const issue = await prisma.issue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IssueFindUniqueOrThrowArgs>(args: SelectSubset<T, IssueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Issue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueFindFirstArgs} args - Arguments to find a Issue
     * @example
     * // Get one Issue
     * const issue = await prisma.issue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IssueFindFirstArgs>(args?: SelectSubset<T, IssueFindFirstArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Issue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueFindFirstOrThrowArgs} args - Arguments to find a Issue
     * @example
     * // Get one Issue
     * const issue = await prisma.issue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IssueFindFirstOrThrowArgs>(args?: SelectSubset<T, IssueFindFirstOrThrowArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Issues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Issues
     * const issues = await prisma.issue.findMany()
     * 
     * // Get first 10 Issues
     * const issues = await prisma.issue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const issueWithIdOnly = await prisma.issue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IssueFindManyArgs>(args?: SelectSubset<T, IssueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Issue.
     * @param {IssueCreateArgs} args - Arguments to create a Issue.
     * @example
     * // Create one Issue
     * const Issue = await prisma.issue.create({
     *   data: {
     *     // ... data to create a Issue
     *   }
     * })
     * 
     */
    create<T extends IssueCreateArgs>(args: SelectSubset<T, IssueCreateArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Issues.
     * @param {IssueCreateManyArgs} args - Arguments to create many Issues.
     * @example
     * // Create many Issues
     * const issue = await prisma.issue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IssueCreateManyArgs>(args?: SelectSubset<T, IssueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Issues and returns the data saved in the database.
     * @param {IssueCreateManyAndReturnArgs} args - Arguments to create many Issues.
     * @example
     * // Create many Issues
     * const issue = await prisma.issue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Issues and only return the `id`
     * const issueWithIdOnly = await prisma.issue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IssueCreateManyAndReturnArgs>(args?: SelectSubset<T, IssueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Issue.
     * @param {IssueDeleteArgs} args - Arguments to delete one Issue.
     * @example
     * // Delete one Issue
     * const Issue = await prisma.issue.delete({
     *   where: {
     *     // ... filter to delete one Issue
     *   }
     * })
     * 
     */
    delete<T extends IssueDeleteArgs>(args: SelectSubset<T, IssueDeleteArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Issue.
     * @param {IssueUpdateArgs} args - Arguments to update one Issue.
     * @example
     * // Update one Issue
     * const issue = await prisma.issue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IssueUpdateArgs>(args: SelectSubset<T, IssueUpdateArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Issues.
     * @param {IssueDeleteManyArgs} args - Arguments to filter Issues to delete.
     * @example
     * // Delete a few Issues
     * const { count } = await prisma.issue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IssueDeleteManyArgs>(args?: SelectSubset<T, IssueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Issues
     * const issue = await prisma.issue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IssueUpdateManyArgs>(args: SelectSubset<T, IssueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Issues and returns the data updated in the database.
     * @param {IssueUpdateManyAndReturnArgs} args - Arguments to update many Issues.
     * @example
     * // Update many Issues
     * const issue = await prisma.issue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Issues and only return the `id`
     * const issueWithIdOnly = await prisma.issue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IssueUpdateManyAndReturnArgs>(args: SelectSubset<T, IssueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Issue.
     * @param {IssueUpsertArgs} args - Arguments to update or create a Issue.
     * @example
     * // Update or create a Issue
     * const issue = await prisma.issue.upsert({
     *   create: {
     *     // ... data to create a Issue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Issue we want to update
     *   }
     * })
     */
    upsert<T extends IssueUpsertArgs>(args: SelectSubset<T, IssueUpsertArgs<ExtArgs>>): Prisma__IssueClient<$Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueCountArgs} args - Arguments to filter Issues to count.
     * @example
     * // Count the number of Issues
     * const count = await prisma.issue.count({
     *   where: {
     *     // ... the filter for the Issues we want to count
     *   }
     * })
    **/
    count<T extends IssueCountArgs>(
      args?: Subset<T, IssueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IssueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Issue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IssueAggregateArgs>(args: Subset<T, IssueAggregateArgs>): Prisma.PrismaPromise<GetIssueAggregateType<T>>

    /**
     * Group by Issue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IssueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IssueGroupByArgs['orderBy'] }
        : { orderBy?: IssueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IssueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIssueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Issue model
   */
  readonly fields: IssueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Issue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IssueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Issue model
   */
  interface IssueFieldRefs {
    readonly id: FieldRef<"Issue", 'String'>
    readonly githubId: FieldRef<"Issue", 'BigInt'>
    readonly repositoryId: FieldRef<"Issue", 'String'>
    readonly number: FieldRef<"Issue", 'Int'>
    readonly title: FieldRef<"Issue", 'String'>
    readonly body: FieldRef<"Issue", 'String'>
    readonly state: FieldRef<"Issue", 'IssueState'>
    readonly userLogin: FieldRef<"Issue", 'String'>
    readonly userAvatarUrl: FieldRef<"Issue", 'String'>
    readonly labels: FieldRef<"Issue", 'String[]'>
    readonly assignees: FieldRef<"Issue", 'String[]'>
    readonly commentsCount: FieldRef<"Issue", 'Int'>
    readonly createdAt: FieldRef<"Issue", 'DateTime'>
    readonly updatedAt: FieldRef<"Issue", 'DateTime'>
    readonly closedAt: FieldRef<"Issue", 'DateTime'>
    readonly syncedAt: FieldRef<"Issue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Issue findUnique
   */
  export type IssueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter, which Issue to fetch.
     */
    where: IssueWhereUniqueInput
  }

  /**
   * Issue findUniqueOrThrow
   */
  export type IssueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter, which Issue to fetch.
     */
    where: IssueWhereUniqueInput
  }

  /**
   * Issue findFirst
   */
  export type IssueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter, which Issue to fetch.
     */
    where?: IssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     */
    orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Issues.
     */
    cursor?: IssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Issues.
     */
    distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[]
  }

  /**
   * Issue findFirstOrThrow
   */
  export type IssueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter, which Issue to fetch.
     */
    where?: IssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     */
    orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Issues.
     */
    cursor?: IssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Issues.
     */
    distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[]
  }

  /**
   * Issue findMany
   */
  export type IssueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter, which Issues to fetch.
     */
    where?: IssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     */
    orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Issues.
     */
    cursor?: IssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     */
    skip?: number
    distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[]
  }

  /**
   * Issue create
   */
  export type IssueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * The data needed to create a Issue.
     */
    data: XOR<IssueCreateInput, IssueUncheckedCreateInput>
  }

  /**
   * Issue createMany
   */
  export type IssueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Issues.
     */
    data: IssueCreateManyInput | IssueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Issue createManyAndReturn
   */
  export type IssueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * The data used to create many Issues.
     */
    data: IssueCreateManyInput | IssueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Issue update
   */
  export type IssueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * The data needed to update a Issue.
     */
    data: XOR<IssueUpdateInput, IssueUncheckedUpdateInput>
    /**
     * Choose, which Issue to update.
     */
    where: IssueWhereUniqueInput
  }

  /**
   * Issue updateMany
   */
  export type IssueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Issues.
     */
    data: XOR<IssueUpdateManyMutationInput, IssueUncheckedUpdateManyInput>
    /**
     * Filter which Issues to update
     */
    where?: IssueWhereInput
    /**
     * Limit how many Issues to update.
     */
    limit?: number
  }

  /**
   * Issue updateManyAndReturn
   */
  export type IssueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * The data used to update Issues.
     */
    data: XOR<IssueUpdateManyMutationInput, IssueUncheckedUpdateManyInput>
    /**
     * Filter which Issues to update
     */
    where?: IssueWhereInput
    /**
     * Limit how many Issues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Issue upsert
   */
  export type IssueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * The filter to search for the Issue to update in case it exists.
     */
    where: IssueWhereUniqueInput
    /**
     * In case the Issue found by the `where` argument doesn't exist, create a new Issue with this data.
     */
    create: XOR<IssueCreateInput, IssueUncheckedCreateInput>
    /**
     * In case the Issue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IssueUpdateInput, IssueUncheckedUpdateInput>
  }

  /**
   * Issue delete
   */
  export type IssueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
    /**
     * Filter which Issue to delete.
     */
    where: IssueWhereUniqueInput
  }

  /**
   * Issue deleteMany
   */
  export type IssueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Issues to delete
     */
    where?: IssueWhereInput
    /**
     * Limit how many Issues to delete.
     */
    limit?: number
  }

  /**
   * Issue without action
   */
  export type IssueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: IssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Issue
     */
    omit?: IssueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IssueInclude<ExtArgs> | null
  }


  /**
   * Model PullRequest
   */

  export type AggregatePullRequest = {
    _count: PullRequestCountAggregateOutputType | null
    _avg: PullRequestAvgAggregateOutputType | null
    _sum: PullRequestSumAggregateOutputType | null
    _min: PullRequestMinAggregateOutputType | null
    _max: PullRequestMaxAggregateOutputType | null
  }

  export type PullRequestAvgAggregateOutputType = {
    githubId: number | null
    number: number | null
    commentsCount: number | null
    reviewCommentsCount: number | null
    commitsCount: number | null
    additions: number | null
    deletions: number | null
    changedFiles: number | null
  }

  export type PullRequestSumAggregateOutputType = {
    githubId: bigint | null
    number: number | null
    commentsCount: number | null
    reviewCommentsCount: number | null
    commitsCount: number | null
    additions: number | null
    deletions: number | null
    changedFiles: number | null
  }

  export type PullRequestMinAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    number: number | null
    title: string | null
    body: string | null
    state: $Enums.PrState | null
    userLogin: string | null
    userAvatarUrl: string | null
    headRef: string | null
    baseRef: string | null
    mergeable: boolean | null
    merged: boolean | null
    mergedAt: Date | null
    mergedBy: string | null
    commentsCount: number | null
    reviewCommentsCount: number | null
    commitsCount: number | null
    additions: number | null
    deletions: number | null
    changedFiles: number | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    syncedAt: Date | null
  }

  export type PullRequestMaxAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    number: number | null
    title: string | null
    body: string | null
    state: $Enums.PrState | null
    userLogin: string | null
    userAvatarUrl: string | null
    headRef: string | null
    baseRef: string | null
    mergeable: boolean | null
    merged: boolean | null
    mergedAt: Date | null
    mergedBy: string | null
    commentsCount: number | null
    reviewCommentsCount: number | null
    commitsCount: number | null
    additions: number | null
    deletions: number | null
    changedFiles: number | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    syncedAt: Date | null
  }

  export type PullRequestCountAggregateOutputType = {
    id: number
    githubId: number
    repositoryId: number
    number: number
    title: number
    body: number
    state: number
    userLogin: number
    userAvatarUrl: number
    labels: number
    assignees: number
    requestedReviewers: number
    headRef: number
    baseRef: number
    mergeable: number
    merged: number
    mergedAt: number
    mergedBy: number
    commentsCount: number
    reviewCommentsCount: number
    commitsCount: number
    additions: number
    deletions: number
    changedFiles: number
    createdAt: number
    updatedAt: number
    closedAt: number
    syncedAt: number
    _all: number
  }


  export type PullRequestAvgAggregateInputType = {
    githubId?: true
    number?: true
    commentsCount?: true
    reviewCommentsCount?: true
    commitsCount?: true
    additions?: true
    deletions?: true
    changedFiles?: true
  }

  export type PullRequestSumAggregateInputType = {
    githubId?: true
    number?: true
    commentsCount?: true
    reviewCommentsCount?: true
    commitsCount?: true
    additions?: true
    deletions?: true
    changedFiles?: true
  }

  export type PullRequestMinAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    headRef?: true
    baseRef?: true
    mergeable?: true
    merged?: true
    mergedAt?: true
    mergedBy?: true
    commentsCount?: true
    reviewCommentsCount?: true
    commitsCount?: true
    additions?: true
    deletions?: true
    changedFiles?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
  }

  export type PullRequestMaxAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    headRef?: true
    baseRef?: true
    mergeable?: true
    merged?: true
    mergedAt?: true
    mergedBy?: true
    commentsCount?: true
    reviewCommentsCount?: true
    commitsCount?: true
    additions?: true
    deletions?: true
    changedFiles?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
  }

  export type PullRequestCountAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    number?: true
    title?: true
    body?: true
    state?: true
    userLogin?: true
    userAvatarUrl?: true
    labels?: true
    assignees?: true
    requestedReviewers?: true
    headRef?: true
    baseRef?: true
    mergeable?: true
    merged?: true
    mergedAt?: true
    mergedBy?: true
    commentsCount?: true
    reviewCommentsCount?: true
    commitsCount?: true
    additions?: true
    deletions?: true
    changedFiles?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type PullRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PullRequest to aggregate.
     */
    where?: PullRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PullRequests to fetch.
     */
    orderBy?: PullRequestOrderByWithRelationInput | PullRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PullRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PullRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PullRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PullRequests
    **/
    _count?: true | PullRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PullRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PullRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PullRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PullRequestMaxAggregateInputType
  }

  export type GetPullRequestAggregateType<T extends PullRequestAggregateArgs> = {
        [P in keyof T & keyof AggregatePullRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePullRequest[P]>
      : GetScalarType<T[P], AggregatePullRequest[P]>
  }




  export type PullRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PullRequestWhereInput
    orderBy?: PullRequestOrderByWithAggregationInput | PullRequestOrderByWithAggregationInput[]
    by: PullRequestScalarFieldEnum[] | PullRequestScalarFieldEnum
    having?: PullRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PullRequestCountAggregateInputType | true
    _avg?: PullRequestAvgAggregateInputType
    _sum?: PullRequestSumAggregateInputType
    _min?: PullRequestMinAggregateInputType
    _max?: PullRequestMaxAggregateInputType
  }

  export type PullRequestGroupByOutputType = {
    id: string
    githubId: bigint
    repositoryId: string
    number: number
    title: string
    body: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl: string | null
    labels: string[]
    assignees: string[]
    requestedReviewers: string[]
    headRef: string
    baseRef: string
    mergeable: boolean | null
    merged: boolean
    mergedAt: Date | null
    mergedBy: string | null
    commentsCount: number
    reviewCommentsCount: number
    commitsCount: number
    additions: number
    deletions: number
    changedFiles: number
    createdAt: Date
    updatedAt: Date
    closedAt: Date | null
    syncedAt: Date
    _count: PullRequestCountAggregateOutputType | null
    _avg: PullRequestAvgAggregateOutputType | null
    _sum: PullRequestSumAggregateOutputType | null
    _min: PullRequestMinAggregateOutputType | null
    _max: PullRequestMaxAggregateOutputType | null
  }

  type GetPullRequestGroupByPayload<T extends PullRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PullRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PullRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PullRequestGroupByOutputType[P]>
            : GetScalarType<T[P], PullRequestGroupByOutputType[P]>
        }
      >
    >


  export type PullRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    requestedReviewers?: boolean
    headRef?: boolean
    baseRef?: boolean
    mergeable?: boolean
    merged?: boolean
    mergedAt?: boolean
    mergedBy?: boolean
    commentsCount?: boolean
    reviewCommentsCount?: boolean
    commitsCount?: boolean
    additions?: boolean
    deletions?: boolean
    changedFiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pullRequest"]>

  export type PullRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    requestedReviewers?: boolean
    headRef?: boolean
    baseRef?: boolean
    mergeable?: boolean
    merged?: boolean
    mergedAt?: boolean
    mergedBy?: boolean
    commentsCount?: boolean
    reviewCommentsCount?: boolean
    commitsCount?: boolean
    additions?: boolean
    deletions?: boolean
    changedFiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pullRequest"]>

  export type PullRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    requestedReviewers?: boolean
    headRef?: boolean
    baseRef?: boolean
    mergeable?: boolean
    merged?: boolean
    mergedAt?: boolean
    mergedBy?: boolean
    commentsCount?: boolean
    reviewCommentsCount?: boolean
    commitsCount?: boolean
    additions?: boolean
    deletions?: boolean
    changedFiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pullRequest"]>

  export type PullRequestSelectScalar = {
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    number?: boolean
    title?: boolean
    body?: boolean
    state?: boolean
    userLogin?: boolean
    userAvatarUrl?: boolean
    labels?: boolean
    assignees?: boolean
    requestedReviewers?: boolean
    headRef?: boolean
    baseRef?: boolean
    mergeable?: boolean
    merged?: boolean
    mergedAt?: boolean
    mergedBy?: boolean
    commentsCount?: boolean
    reviewCommentsCount?: boolean
    commitsCount?: boolean
    additions?: boolean
    deletions?: boolean
    changedFiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    syncedAt?: boolean
  }

  export type PullRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "repositoryId" | "number" | "title" | "body" | "state" | "userLogin" | "userAvatarUrl" | "labels" | "assignees" | "requestedReviewers" | "headRef" | "baseRef" | "mergeable" | "merged" | "mergedAt" | "mergedBy" | "commentsCount" | "reviewCommentsCount" | "commitsCount" | "additions" | "deletions" | "changedFiles" | "createdAt" | "updatedAt" | "closedAt" | "syncedAt", ExtArgs["result"]["pullRequest"]>
  export type PullRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type PullRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type PullRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $PullRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PullRequest"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: bigint
      repositoryId: string
      number: number
      title: string
      body: string | null
      state: $Enums.PrState
      userLogin: string
      userAvatarUrl: string | null
      labels: string[]
      assignees: string[]
      requestedReviewers: string[]
      headRef: string
      baseRef: string
      mergeable: boolean | null
      merged: boolean
      mergedAt: Date | null
      mergedBy: string | null
      commentsCount: number
      reviewCommentsCount: number
      commitsCount: number
      additions: number
      deletions: number
      changedFiles: number
      createdAt: Date
      updatedAt: Date
      closedAt: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["pullRequest"]>
    composites: {}
  }

  type PullRequestGetPayload<S extends boolean | null | undefined | PullRequestDefaultArgs> = $Result.GetResult<Prisma.$PullRequestPayload, S>

  type PullRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PullRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PullRequestCountAggregateInputType | true
    }

  export interface PullRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PullRequest'], meta: { name: 'PullRequest' } }
    /**
     * Find zero or one PullRequest that matches the filter.
     * @param {PullRequestFindUniqueArgs} args - Arguments to find a PullRequest
     * @example
     * // Get one PullRequest
     * const pullRequest = await prisma.pullRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PullRequestFindUniqueArgs>(args: SelectSubset<T, PullRequestFindUniqueArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PullRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PullRequestFindUniqueOrThrowArgs} args - Arguments to find a PullRequest
     * @example
     * // Get one PullRequest
     * const pullRequest = await prisma.pullRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PullRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, PullRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PullRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestFindFirstArgs} args - Arguments to find a PullRequest
     * @example
     * // Get one PullRequest
     * const pullRequest = await prisma.pullRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PullRequestFindFirstArgs>(args?: SelectSubset<T, PullRequestFindFirstArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PullRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestFindFirstOrThrowArgs} args - Arguments to find a PullRequest
     * @example
     * // Get one PullRequest
     * const pullRequest = await prisma.pullRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PullRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, PullRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PullRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PullRequests
     * const pullRequests = await prisma.pullRequest.findMany()
     * 
     * // Get first 10 PullRequests
     * const pullRequests = await prisma.pullRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pullRequestWithIdOnly = await prisma.pullRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PullRequestFindManyArgs>(args?: SelectSubset<T, PullRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PullRequest.
     * @param {PullRequestCreateArgs} args - Arguments to create a PullRequest.
     * @example
     * // Create one PullRequest
     * const PullRequest = await prisma.pullRequest.create({
     *   data: {
     *     // ... data to create a PullRequest
     *   }
     * })
     * 
     */
    create<T extends PullRequestCreateArgs>(args: SelectSubset<T, PullRequestCreateArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PullRequests.
     * @param {PullRequestCreateManyArgs} args - Arguments to create many PullRequests.
     * @example
     * // Create many PullRequests
     * const pullRequest = await prisma.pullRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PullRequestCreateManyArgs>(args?: SelectSubset<T, PullRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PullRequests and returns the data saved in the database.
     * @param {PullRequestCreateManyAndReturnArgs} args - Arguments to create many PullRequests.
     * @example
     * // Create many PullRequests
     * const pullRequest = await prisma.pullRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PullRequests and only return the `id`
     * const pullRequestWithIdOnly = await prisma.pullRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PullRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, PullRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PullRequest.
     * @param {PullRequestDeleteArgs} args - Arguments to delete one PullRequest.
     * @example
     * // Delete one PullRequest
     * const PullRequest = await prisma.pullRequest.delete({
     *   where: {
     *     // ... filter to delete one PullRequest
     *   }
     * })
     * 
     */
    delete<T extends PullRequestDeleteArgs>(args: SelectSubset<T, PullRequestDeleteArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PullRequest.
     * @param {PullRequestUpdateArgs} args - Arguments to update one PullRequest.
     * @example
     * // Update one PullRequest
     * const pullRequest = await prisma.pullRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PullRequestUpdateArgs>(args: SelectSubset<T, PullRequestUpdateArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PullRequests.
     * @param {PullRequestDeleteManyArgs} args - Arguments to filter PullRequests to delete.
     * @example
     * // Delete a few PullRequests
     * const { count } = await prisma.pullRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PullRequestDeleteManyArgs>(args?: SelectSubset<T, PullRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PullRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PullRequests
     * const pullRequest = await prisma.pullRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PullRequestUpdateManyArgs>(args: SelectSubset<T, PullRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PullRequests and returns the data updated in the database.
     * @param {PullRequestUpdateManyAndReturnArgs} args - Arguments to update many PullRequests.
     * @example
     * // Update many PullRequests
     * const pullRequest = await prisma.pullRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PullRequests and only return the `id`
     * const pullRequestWithIdOnly = await prisma.pullRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PullRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, PullRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PullRequest.
     * @param {PullRequestUpsertArgs} args - Arguments to update or create a PullRequest.
     * @example
     * // Update or create a PullRequest
     * const pullRequest = await prisma.pullRequest.upsert({
     *   create: {
     *     // ... data to create a PullRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PullRequest we want to update
     *   }
     * })
     */
    upsert<T extends PullRequestUpsertArgs>(args: SelectSubset<T, PullRequestUpsertArgs<ExtArgs>>): Prisma__PullRequestClient<$Result.GetResult<Prisma.$PullRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PullRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestCountArgs} args - Arguments to filter PullRequests to count.
     * @example
     * // Count the number of PullRequests
     * const count = await prisma.pullRequest.count({
     *   where: {
     *     // ... the filter for the PullRequests we want to count
     *   }
     * })
    **/
    count<T extends PullRequestCountArgs>(
      args?: Subset<T, PullRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PullRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PullRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PullRequestAggregateArgs>(args: Subset<T, PullRequestAggregateArgs>): Prisma.PrismaPromise<GetPullRequestAggregateType<T>>

    /**
     * Group by PullRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PullRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PullRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PullRequestGroupByArgs['orderBy'] }
        : { orderBy?: PullRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PullRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPullRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PullRequest model
   */
  readonly fields: PullRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PullRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PullRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PullRequest model
   */
  interface PullRequestFieldRefs {
    readonly id: FieldRef<"PullRequest", 'String'>
    readonly githubId: FieldRef<"PullRequest", 'BigInt'>
    readonly repositoryId: FieldRef<"PullRequest", 'String'>
    readonly number: FieldRef<"PullRequest", 'Int'>
    readonly title: FieldRef<"PullRequest", 'String'>
    readonly body: FieldRef<"PullRequest", 'String'>
    readonly state: FieldRef<"PullRequest", 'PrState'>
    readonly userLogin: FieldRef<"PullRequest", 'String'>
    readonly userAvatarUrl: FieldRef<"PullRequest", 'String'>
    readonly labels: FieldRef<"PullRequest", 'String[]'>
    readonly assignees: FieldRef<"PullRequest", 'String[]'>
    readonly requestedReviewers: FieldRef<"PullRequest", 'String[]'>
    readonly headRef: FieldRef<"PullRequest", 'String'>
    readonly baseRef: FieldRef<"PullRequest", 'String'>
    readonly mergeable: FieldRef<"PullRequest", 'Boolean'>
    readonly merged: FieldRef<"PullRequest", 'Boolean'>
    readonly mergedAt: FieldRef<"PullRequest", 'DateTime'>
    readonly mergedBy: FieldRef<"PullRequest", 'String'>
    readonly commentsCount: FieldRef<"PullRequest", 'Int'>
    readonly reviewCommentsCount: FieldRef<"PullRequest", 'Int'>
    readonly commitsCount: FieldRef<"PullRequest", 'Int'>
    readonly additions: FieldRef<"PullRequest", 'Int'>
    readonly deletions: FieldRef<"PullRequest", 'Int'>
    readonly changedFiles: FieldRef<"PullRequest", 'Int'>
    readonly createdAt: FieldRef<"PullRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"PullRequest", 'DateTime'>
    readonly closedAt: FieldRef<"PullRequest", 'DateTime'>
    readonly syncedAt: FieldRef<"PullRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PullRequest findUnique
   */
  export type PullRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter, which PullRequest to fetch.
     */
    where: PullRequestWhereUniqueInput
  }

  /**
   * PullRequest findUniqueOrThrow
   */
  export type PullRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter, which PullRequest to fetch.
     */
    where: PullRequestWhereUniqueInput
  }

  /**
   * PullRequest findFirst
   */
  export type PullRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter, which PullRequest to fetch.
     */
    where?: PullRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PullRequests to fetch.
     */
    orderBy?: PullRequestOrderByWithRelationInput | PullRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PullRequests.
     */
    cursor?: PullRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PullRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PullRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PullRequests.
     */
    distinct?: PullRequestScalarFieldEnum | PullRequestScalarFieldEnum[]
  }

  /**
   * PullRequest findFirstOrThrow
   */
  export type PullRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter, which PullRequest to fetch.
     */
    where?: PullRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PullRequests to fetch.
     */
    orderBy?: PullRequestOrderByWithRelationInput | PullRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PullRequests.
     */
    cursor?: PullRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PullRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PullRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PullRequests.
     */
    distinct?: PullRequestScalarFieldEnum | PullRequestScalarFieldEnum[]
  }

  /**
   * PullRequest findMany
   */
  export type PullRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter, which PullRequests to fetch.
     */
    where?: PullRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PullRequests to fetch.
     */
    orderBy?: PullRequestOrderByWithRelationInput | PullRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PullRequests.
     */
    cursor?: PullRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PullRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PullRequests.
     */
    skip?: number
    distinct?: PullRequestScalarFieldEnum | PullRequestScalarFieldEnum[]
  }

  /**
   * PullRequest create
   */
  export type PullRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a PullRequest.
     */
    data: XOR<PullRequestCreateInput, PullRequestUncheckedCreateInput>
  }

  /**
   * PullRequest createMany
   */
  export type PullRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PullRequests.
     */
    data: PullRequestCreateManyInput | PullRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PullRequest createManyAndReturn
   */
  export type PullRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * The data used to create many PullRequests.
     */
    data: PullRequestCreateManyInput | PullRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PullRequest update
   */
  export type PullRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a PullRequest.
     */
    data: XOR<PullRequestUpdateInput, PullRequestUncheckedUpdateInput>
    /**
     * Choose, which PullRequest to update.
     */
    where: PullRequestWhereUniqueInput
  }

  /**
   * PullRequest updateMany
   */
  export type PullRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PullRequests.
     */
    data: XOR<PullRequestUpdateManyMutationInput, PullRequestUncheckedUpdateManyInput>
    /**
     * Filter which PullRequests to update
     */
    where?: PullRequestWhereInput
    /**
     * Limit how many PullRequests to update.
     */
    limit?: number
  }

  /**
   * PullRequest updateManyAndReturn
   */
  export type PullRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * The data used to update PullRequests.
     */
    data: XOR<PullRequestUpdateManyMutationInput, PullRequestUncheckedUpdateManyInput>
    /**
     * Filter which PullRequests to update
     */
    where?: PullRequestWhereInput
    /**
     * Limit how many PullRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PullRequest upsert
   */
  export type PullRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the PullRequest to update in case it exists.
     */
    where: PullRequestWhereUniqueInput
    /**
     * In case the PullRequest found by the `where` argument doesn't exist, create a new PullRequest with this data.
     */
    create: XOR<PullRequestCreateInput, PullRequestUncheckedCreateInput>
    /**
     * In case the PullRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PullRequestUpdateInput, PullRequestUncheckedUpdateInput>
  }

  /**
   * PullRequest delete
   */
  export type PullRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
    /**
     * Filter which PullRequest to delete.
     */
    where: PullRequestWhereUniqueInput
  }

  /**
   * PullRequest deleteMany
   */
  export type PullRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PullRequests to delete
     */
    where?: PullRequestWhereInput
    /**
     * Limit how many PullRequests to delete.
     */
    limit?: number
  }

  /**
   * PullRequest without action
   */
  export type PullRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PullRequest
     */
    select?: PullRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PullRequest
     */
    omit?: PullRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PullRequestInclude<ExtArgs> | null
  }


  /**
   * Model Commit
   */

  export type AggregateCommit = {
    _count: CommitCountAggregateOutputType | null
    _avg: CommitAvgAggregateOutputType | null
    _sum: CommitSumAggregateOutputType | null
    _min: CommitMinAggregateOutputType | null
    _max: CommitMaxAggregateOutputType | null
  }

  export type CommitAvgAggregateOutputType = {
    additions: number | null
    deletions: number | null
    totalChanges: number | null
  }

  export type CommitSumAggregateOutputType = {
    additions: number | null
    deletions: number | null
    totalChanges: number | null
  }

  export type CommitMinAggregateOutputType = {
    sha: string | null
    repositoryId: string | null
    message: string | null
    authorName: string | null
    authorEmail: string | null
    authorDate: Date | null
    committerName: string | null
    committerEmail: string | null
    committerDate: Date | null
    additions: number | null
    deletions: number | null
    totalChanges: number | null
    syncedAt: Date | null
  }

  export type CommitMaxAggregateOutputType = {
    sha: string | null
    repositoryId: string | null
    message: string | null
    authorName: string | null
    authorEmail: string | null
    authorDate: Date | null
    committerName: string | null
    committerEmail: string | null
    committerDate: Date | null
    additions: number | null
    deletions: number | null
    totalChanges: number | null
    syncedAt: Date | null
  }

  export type CommitCountAggregateOutputType = {
    sha: number
    repositoryId: number
    message: number
    authorName: number
    authorEmail: number
    authorDate: number
    committerName: number
    committerEmail: number
    committerDate: number
    additions: number
    deletions: number
    totalChanges: number
    syncedAt: number
    _all: number
  }


  export type CommitAvgAggregateInputType = {
    additions?: true
    deletions?: true
    totalChanges?: true
  }

  export type CommitSumAggregateInputType = {
    additions?: true
    deletions?: true
    totalChanges?: true
  }

  export type CommitMinAggregateInputType = {
    sha?: true
    repositoryId?: true
    message?: true
    authorName?: true
    authorEmail?: true
    authorDate?: true
    committerName?: true
    committerEmail?: true
    committerDate?: true
    additions?: true
    deletions?: true
    totalChanges?: true
    syncedAt?: true
  }

  export type CommitMaxAggregateInputType = {
    sha?: true
    repositoryId?: true
    message?: true
    authorName?: true
    authorEmail?: true
    authorDate?: true
    committerName?: true
    committerEmail?: true
    committerDate?: true
    additions?: true
    deletions?: true
    totalChanges?: true
    syncedAt?: true
  }

  export type CommitCountAggregateInputType = {
    sha?: true
    repositoryId?: true
    message?: true
    authorName?: true
    authorEmail?: true
    authorDate?: true
    committerName?: true
    committerEmail?: true
    committerDate?: true
    additions?: true
    deletions?: true
    totalChanges?: true
    syncedAt?: true
    _all?: true
  }

  export type CommitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commit to aggregate.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commits
    **/
    _count?: true | CommitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommitMaxAggregateInputType
  }

  export type GetCommitAggregateType<T extends CommitAggregateArgs> = {
        [P in keyof T & keyof AggregateCommit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommit[P]>
      : GetScalarType<T[P], AggregateCommit[P]>
  }




  export type CommitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitWhereInput
    orderBy?: CommitOrderByWithAggregationInput | CommitOrderByWithAggregationInput[]
    by: CommitScalarFieldEnum[] | CommitScalarFieldEnum
    having?: CommitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommitCountAggregateInputType | true
    _avg?: CommitAvgAggregateInputType
    _sum?: CommitSumAggregateInputType
    _min?: CommitMinAggregateInputType
    _max?: CommitMaxAggregateInputType
  }

  export type CommitGroupByOutputType = {
    sha: string
    repositoryId: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date
    committerName: string
    committerEmail: string
    committerDate: Date
    additions: number
    deletions: number
    totalChanges: number
    syncedAt: Date
    _count: CommitCountAggregateOutputType | null
    _avg: CommitAvgAggregateOutputType | null
    _sum: CommitSumAggregateOutputType | null
    _min: CommitMinAggregateOutputType | null
    _max: CommitMaxAggregateOutputType | null
  }

  type GetCommitGroupByPayload<T extends CommitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommitGroupByOutputType[P]>
            : GetScalarType<T[P], CommitGroupByOutputType[P]>
        }
      >
    >


  export type CommitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sha?: boolean
    repositoryId?: boolean
    message?: boolean
    authorName?: boolean
    authorEmail?: boolean
    authorDate?: boolean
    committerName?: boolean
    committerEmail?: boolean
    committerDate?: boolean
    additions?: boolean
    deletions?: boolean
    totalChanges?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sha?: boolean
    repositoryId?: boolean
    message?: boolean
    authorName?: boolean
    authorEmail?: boolean
    authorDate?: boolean
    committerName?: boolean
    committerEmail?: boolean
    committerDate?: boolean
    additions?: boolean
    deletions?: boolean
    totalChanges?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sha?: boolean
    repositoryId?: boolean
    message?: boolean
    authorName?: boolean
    authorEmail?: boolean
    authorDate?: boolean
    committerName?: boolean
    committerEmail?: boolean
    committerDate?: boolean
    additions?: boolean
    deletions?: boolean
    totalChanges?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectScalar = {
    sha?: boolean
    repositoryId?: boolean
    message?: boolean
    authorName?: boolean
    authorEmail?: boolean
    authorDate?: boolean
    committerName?: boolean
    committerEmail?: boolean
    committerDate?: boolean
    additions?: boolean
    deletions?: boolean
    totalChanges?: boolean
    syncedAt?: boolean
  }

  export type CommitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sha" | "repositoryId" | "message" | "authorName" | "authorEmail" | "authorDate" | "committerName" | "committerEmail" | "committerDate" | "additions" | "deletions" | "totalChanges" | "syncedAt", ExtArgs["result"]["commit"]>
  export type CommitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type CommitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type CommitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $CommitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commit"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sha: string
      repositoryId: string
      message: string
      authorName: string
      authorEmail: string
      authorDate: Date
      committerName: string
      committerEmail: string
      committerDate: Date
      additions: number
      deletions: number
      totalChanges: number
      syncedAt: Date
    }, ExtArgs["result"]["commit"]>
    composites: {}
  }

  type CommitGetPayload<S extends boolean | null | undefined | CommitDefaultArgs> = $Result.GetResult<Prisma.$CommitPayload, S>

  type CommitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommitCountAggregateInputType | true
    }

  export interface CommitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commit'], meta: { name: 'Commit' } }
    /**
     * Find zero or one Commit that matches the filter.
     * @param {CommitFindUniqueArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommitFindUniqueArgs>(args: SelectSubset<T, CommitFindUniqueArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommitFindUniqueOrThrowArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommitFindUniqueOrThrowArgs>(args: SelectSubset<T, CommitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindFirstArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommitFindFirstArgs>(args?: SelectSubset<T, CommitFindFirstArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindFirstOrThrowArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommitFindFirstOrThrowArgs>(args?: SelectSubset<T, CommitFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commits
     * const commits = await prisma.commit.findMany()
     * 
     * // Get first 10 Commits
     * const commits = await prisma.commit.findMany({ take: 10 })
     * 
     * // Only select the `sha`
     * const commitWithShaOnly = await prisma.commit.findMany({ select: { sha: true } })
     * 
     */
    findMany<T extends CommitFindManyArgs>(args?: SelectSubset<T, CommitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commit.
     * @param {CommitCreateArgs} args - Arguments to create a Commit.
     * @example
     * // Create one Commit
     * const Commit = await prisma.commit.create({
     *   data: {
     *     // ... data to create a Commit
     *   }
     * })
     * 
     */
    create<T extends CommitCreateArgs>(args: SelectSubset<T, CommitCreateArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commits.
     * @param {CommitCreateManyArgs} args - Arguments to create many Commits.
     * @example
     * // Create many Commits
     * const commit = await prisma.commit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommitCreateManyArgs>(args?: SelectSubset<T, CommitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commits and returns the data saved in the database.
     * @param {CommitCreateManyAndReturnArgs} args - Arguments to create many Commits.
     * @example
     * // Create many Commits
     * const commit = await prisma.commit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commits and only return the `sha`
     * const commitWithShaOnly = await prisma.commit.createManyAndReturn({
     *   select: { sha: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommitCreateManyAndReturnArgs>(args?: SelectSubset<T, CommitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commit.
     * @param {CommitDeleteArgs} args - Arguments to delete one Commit.
     * @example
     * // Delete one Commit
     * const Commit = await prisma.commit.delete({
     *   where: {
     *     // ... filter to delete one Commit
     *   }
     * })
     * 
     */
    delete<T extends CommitDeleteArgs>(args: SelectSubset<T, CommitDeleteArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commit.
     * @param {CommitUpdateArgs} args - Arguments to update one Commit.
     * @example
     * // Update one Commit
     * const commit = await prisma.commit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommitUpdateArgs>(args: SelectSubset<T, CommitUpdateArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commits.
     * @param {CommitDeleteManyArgs} args - Arguments to filter Commits to delete.
     * @example
     * // Delete a few Commits
     * const { count } = await prisma.commit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommitDeleteManyArgs>(args?: SelectSubset<T, CommitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commits
     * const commit = await prisma.commit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommitUpdateManyArgs>(args: SelectSubset<T, CommitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commits and returns the data updated in the database.
     * @param {CommitUpdateManyAndReturnArgs} args - Arguments to update many Commits.
     * @example
     * // Update many Commits
     * const commit = await prisma.commit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commits and only return the `sha`
     * const commitWithShaOnly = await prisma.commit.updateManyAndReturn({
     *   select: { sha: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommitUpdateManyAndReturnArgs>(args: SelectSubset<T, CommitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commit.
     * @param {CommitUpsertArgs} args - Arguments to update or create a Commit.
     * @example
     * // Update or create a Commit
     * const commit = await prisma.commit.upsert({
     *   create: {
     *     // ... data to create a Commit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commit we want to update
     *   }
     * })
     */
    upsert<T extends CommitUpsertArgs>(args: SelectSubset<T, CommitUpsertArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitCountArgs} args - Arguments to filter Commits to count.
     * @example
     * // Count the number of Commits
     * const count = await prisma.commit.count({
     *   where: {
     *     // ... the filter for the Commits we want to count
     *   }
     * })
    **/
    count<T extends CommitCountArgs>(
      args?: Subset<T, CommitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommitAggregateArgs>(args: Subset<T, CommitAggregateArgs>): Prisma.PrismaPromise<GetCommitAggregateType<T>>

    /**
     * Group by Commit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommitGroupByArgs['orderBy'] }
        : { orderBy?: CommitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commit model
   */
  readonly fields: CommitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commit model
   */
  interface CommitFieldRefs {
    readonly sha: FieldRef<"Commit", 'String'>
    readonly repositoryId: FieldRef<"Commit", 'String'>
    readonly message: FieldRef<"Commit", 'String'>
    readonly authorName: FieldRef<"Commit", 'String'>
    readonly authorEmail: FieldRef<"Commit", 'String'>
    readonly authorDate: FieldRef<"Commit", 'DateTime'>
    readonly committerName: FieldRef<"Commit", 'String'>
    readonly committerEmail: FieldRef<"Commit", 'String'>
    readonly committerDate: FieldRef<"Commit", 'DateTime'>
    readonly additions: FieldRef<"Commit", 'Int'>
    readonly deletions: FieldRef<"Commit", 'Int'>
    readonly totalChanges: FieldRef<"Commit", 'Int'>
    readonly syncedAt: FieldRef<"Commit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commit findUnique
   */
  export type CommitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit findUniqueOrThrow
   */
  export type CommitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit findFirst
   */
  export type CommitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commits.
     */
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit findFirstOrThrow
   */
  export type CommitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commits.
     */
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit findMany
   */
  export type CommitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commits to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit create
   */
  export type CommitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The data needed to create a Commit.
     */
    data: XOR<CommitCreateInput, CommitUncheckedCreateInput>
  }

  /**
   * Commit createMany
   */
  export type CommitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commits.
     */
    data: CommitCreateManyInput | CommitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commit createManyAndReturn
   */
  export type CommitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * The data used to create many Commits.
     */
    data: CommitCreateManyInput | CommitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commit update
   */
  export type CommitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The data needed to update a Commit.
     */
    data: XOR<CommitUpdateInput, CommitUncheckedUpdateInput>
    /**
     * Choose, which Commit to update.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit updateMany
   */
  export type CommitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commits.
     */
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyInput>
    /**
     * Filter which Commits to update
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to update.
     */
    limit?: number
  }

  /**
   * Commit updateManyAndReturn
   */
  export type CommitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * The data used to update Commits.
     */
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyInput>
    /**
     * Filter which Commits to update
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commit upsert
   */
  export type CommitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The filter to search for the Commit to update in case it exists.
     */
    where: CommitWhereUniqueInput
    /**
     * In case the Commit found by the `where` argument doesn't exist, create a new Commit with this data.
     */
    create: XOR<CommitCreateInput, CommitUncheckedCreateInput>
    /**
     * In case the Commit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommitUpdateInput, CommitUncheckedUpdateInput>
  }

  /**
   * Commit delete
   */
  export type CommitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter which Commit to delete.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit deleteMany
   */
  export type CommitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commits to delete
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to delete.
     */
    limit?: number
  }

  /**
   * Commit without action
   */
  export type CommitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
  }


  /**
   * Model Release
   */

  export type AggregateRelease = {
    _count: ReleaseCountAggregateOutputType | null
    _avg: ReleaseAvgAggregateOutputType | null
    _sum: ReleaseSumAggregateOutputType | null
    _min: ReleaseMinAggregateOutputType | null
    _max: ReleaseMaxAggregateOutputType | null
  }

  export type ReleaseAvgAggregateOutputType = {
    githubId: number | null
  }

  export type ReleaseSumAggregateOutputType = {
    githubId: bigint | null
  }

  export type ReleaseMinAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    tagName: string | null
    name: string | null
    body: string | null
    draft: boolean | null
    prerelease: boolean | null
    authorLogin: string | null
    authorAvatarUrl: string | null
    createdAt: Date | null
    publishedAt: Date | null
    syncedAt: Date | null
  }

  export type ReleaseMaxAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    repositoryId: string | null
    tagName: string | null
    name: string | null
    body: string | null
    draft: boolean | null
    prerelease: boolean | null
    authorLogin: string | null
    authorAvatarUrl: string | null
    createdAt: Date | null
    publishedAt: Date | null
    syncedAt: Date | null
  }

  export type ReleaseCountAggregateOutputType = {
    id: number
    githubId: number
    repositoryId: number
    tagName: number
    name: number
    body: number
    draft: number
    prerelease: number
    authorLogin: number
    authorAvatarUrl: number
    createdAt: number
    publishedAt: number
    syncedAt: number
    _all: number
  }


  export type ReleaseAvgAggregateInputType = {
    githubId?: true
  }

  export type ReleaseSumAggregateInputType = {
    githubId?: true
  }

  export type ReleaseMinAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    tagName?: true
    name?: true
    body?: true
    draft?: true
    prerelease?: true
    authorLogin?: true
    authorAvatarUrl?: true
    createdAt?: true
    publishedAt?: true
    syncedAt?: true
  }

  export type ReleaseMaxAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    tagName?: true
    name?: true
    body?: true
    draft?: true
    prerelease?: true
    authorLogin?: true
    authorAvatarUrl?: true
    createdAt?: true
    publishedAt?: true
    syncedAt?: true
  }

  export type ReleaseCountAggregateInputType = {
    id?: true
    githubId?: true
    repositoryId?: true
    tagName?: true
    name?: true
    body?: true
    draft?: true
    prerelease?: true
    authorLogin?: true
    authorAvatarUrl?: true
    createdAt?: true
    publishedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type ReleaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Release to aggregate.
     */
    where?: ReleaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Releases to fetch.
     */
    orderBy?: ReleaseOrderByWithRelationInput | ReleaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReleaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Releases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Releases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Releases
    **/
    _count?: true | ReleaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReleaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReleaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReleaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReleaseMaxAggregateInputType
  }

  export type GetReleaseAggregateType<T extends ReleaseAggregateArgs> = {
        [P in keyof T & keyof AggregateRelease]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRelease[P]>
      : GetScalarType<T[P], AggregateRelease[P]>
  }




  export type ReleaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReleaseWhereInput
    orderBy?: ReleaseOrderByWithAggregationInput | ReleaseOrderByWithAggregationInput[]
    by: ReleaseScalarFieldEnum[] | ReleaseScalarFieldEnum
    having?: ReleaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReleaseCountAggregateInputType | true
    _avg?: ReleaseAvgAggregateInputType
    _sum?: ReleaseSumAggregateInputType
    _min?: ReleaseMinAggregateInputType
    _max?: ReleaseMaxAggregateInputType
  }

  export type ReleaseGroupByOutputType = {
    id: string
    githubId: bigint
    repositoryId: string
    tagName: string
    name: string | null
    body: string | null
    draft: boolean
    prerelease: boolean
    authorLogin: string
    authorAvatarUrl: string | null
    createdAt: Date
    publishedAt: Date | null
    syncedAt: Date
    _count: ReleaseCountAggregateOutputType | null
    _avg: ReleaseAvgAggregateOutputType | null
    _sum: ReleaseSumAggregateOutputType | null
    _min: ReleaseMinAggregateOutputType | null
    _max: ReleaseMaxAggregateOutputType | null
  }

  type GetReleaseGroupByPayload<T extends ReleaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReleaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReleaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReleaseGroupByOutputType[P]>
            : GetScalarType<T[P], ReleaseGroupByOutputType[P]>
        }
      >
    >


  export type ReleaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    tagName?: boolean
    name?: boolean
    body?: boolean
    draft?: boolean
    prerelease?: boolean
    authorLogin?: boolean
    authorAvatarUrl?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["release"]>

  export type ReleaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    tagName?: boolean
    name?: boolean
    body?: boolean
    draft?: boolean
    prerelease?: boolean
    authorLogin?: boolean
    authorAvatarUrl?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["release"]>

  export type ReleaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    tagName?: boolean
    name?: boolean
    body?: boolean
    draft?: boolean
    prerelease?: boolean
    authorLogin?: boolean
    authorAvatarUrl?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["release"]>

  export type ReleaseSelectScalar = {
    id?: boolean
    githubId?: boolean
    repositoryId?: boolean
    tagName?: boolean
    name?: boolean
    body?: boolean
    draft?: boolean
    prerelease?: boolean
    authorLogin?: boolean
    authorAvatarUrl?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    syncedAt?: boolean
  }

  export type ReleaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "repositoryId" | "tagName" | "name" | "body" | "draft" | "prerelease" | "authorLogin" | "authorAvatarUrl" | "createdAt" | "publishedAt" | "syncedAt", ExtArgs["result"]["release"]>
  export type ReleaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type ReleaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type ReleaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $ReleasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Release"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: bigint
      repositoryId: string
      tagName: string
      name: string | null
      body: string | null
      draft: boolean
      prerelease: boolean
      authorLogin: string
      authorAvatarUrl: string | null
      createdAt: Date
      publishedAt: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["release"]>
    composites: {}
  }

  type ReleaseGetPayload<S extends boolean | null | undefined | ReleaseDefaultArgs> = $Result.GetResult<Prisma.$ReleasePayload, S>

  type ReleaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReleaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReleaseCountAggregateInputType | true
    }

  export interface ReleaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Release'], meta: { name: 'Release' } }
    /**
     * Find zero or one Release that matches the filter.
     * @param {ReleaseFindUniqueArgs} args - Arguments to find a Release
     * @example
     * // Get one Release
     * const release = await prisma.release.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReleaseFindUniqueArgs>(args: SelectSubset<T, ReleaseFindUniqueArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Release that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReleaseFindUniqueOrThrowArgs} args - Arguments to find a Release
     * @example
     * // Get one Release
     * const release = await prisma.release.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReleaseFindUniqueOrThrowArgs>(args: SelectSubset<T, ReleaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Release that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseFindFirstArgs} args - Arguments to find a Release
     * @example
     * // Get one Release
     * const release = await prisma.release.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReleaseFindFirstArgs>(args?: SelectSubset<T, ReleaseFindFirstArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Release that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseFindFirstOrThrowArgs} args - Arguments to find a Release
     * @example
     * // Get one Release
     * const release = await prisma.release.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReleaseFindFirstOrThrowArgs>(args?: SelectSubset<T, ReleaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Releases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Releases
     * const releases = await prisma.release.findMany()
     * 
     * // Get first 10 Releases
     * const releases = await prisma.release.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const releaseWithIdOnly = await prisma.release.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReleaseFindManyArgs>(args?: SelectSubset<T, ReleaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Release.
     * @param {ReleaseCreateArgs} args - Arguments to create a Release.
     * @example
     * // Create one Release
     * const Release = await prisma.release.create({
     *   data: {
     *     // ... data to create a Release
     *   }
     * })
     * 
     */
    create<T extends ReleaseCreateArgs>(args: SelectSubset<T, ReleaseCreateArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Releases.
     * @param {ReleaseCreateManyArgs} args - Arguments to create many Releases.
     * @example
     * // Create many Releases
     * const release = await prisma.release.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReleaseCreateManyArgs>(args?: SelectSubset<T, ReleaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Releases and returns the data saved in the database.
     * @param {ReleaseCreateManyAndReturnArgs} args - Arguments to create many Releases.
     * @example
     * // Create many Releases
     * const release = await prisma.release.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Releases and only return the `id`
     * const releaseWithIdOnly = await prisma.release.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReleaseCreateManyAndReturnArgs>(args?: SelectSubset<T, ReleaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Release.
     * @param {ReleaseDeleteArgs} args - Arguments to delete one Release.
     * @example
     * // Delete one Release
     * const Release = await prisma.release.delete({
     *   where: {
     *     // ... filter to delete one Release
     *   }
     * })
     * 
     */
    delete<T extends ReleaseDeleteArgs>(args: SelectSubset<T, ReleaseDeleteArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Release.
     * @param {ReleaseUpdateArgs} args - Arguments to update one Release.
     * @example
     * // Update one Release
     * const release = await prisma.release.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReleaseUpdateArgs>(args: SelectSubset<T, ReleaseUpdateArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Releases.
     * @param {ReleaseDeleteManyArgs} args - Arguments to filter Releases to delete.
     * @example
     * // Delete a few Releases
     * const { count } = await prisma.release.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReleaseDeleteManyArgs>(args?: SelectSubset<T, ReleaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Releases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Releases
     * const release = await prisma.release.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReleaseUpdateManyArgs>(args: SelectSubset<T, ReleaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Releases and returns the data updated in the database.
     * @param {ReleaseUpdateManyAndReturnArgs} args - Arguments to update many Releases.
     * @example
     * // Update many Releases
     * const release = await prisma.release.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Releases and only return the `id`
     * const releaseWithIdOnly = await prisma.release.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReleaseUpdateManyAndReturnArgs>(args: SelectSubset<T, ReleaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Release.
     * @param {ReleaseUpsertArgs} args - Arguments to update or create a Release.
     * @example
     * // Update or create a Release
     * const release = await prisma.release.upsert({
     *   create: {
     *     // ... data to create a Release
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Release we want to update
     *   }
     * })
     */
    upsert<T extends ReleaseUpsertArgs>(args: SelectSubset<T, ReleaseUpsertArgs<ExtArgs>>): Prisma__ReleaseClient<$Result.GetResult<Prisma.$ReleasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Releases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseCountArgs} args - Arguments to filter Releases to count.
     * @example
     * // Count the number of Releases
     * const count = await prisma.release.count({
     *   where: {
     *     // ... the filter for the Releases we want to count
     *   }
     * })
    **/
    count<T extends ReleaseCountArgs>(
      args?: Subset<T, ReleaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReleaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Release.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReleaseAggregateArgs>(args: Subset<T, ReleaseAggregateArgs>): Prisma.PrismaPromise<GetReleaseAggregateType<T>>

    /**
     * Group by Release.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReleaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReleaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReleaseGroupByArgs['orderBy'] }
        : { orderBy?: ReleaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReleaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReleaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Release model
   */
  readonly fields: ReleaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Release.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReleaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Release model
   */
  interface ReleaseFieldRefs {
    readonly id: FieldRef<"Release", 'String'>
    readonly githubId: FieldRef<"Release", 'BigInt'>
    readonly repositoryId: FieldRef<"Release", 'String'>
    readonly tagName: FieldRef<"Release", 'String'>
    readonly name: FieldRef<"Release", 'String'>
    readonly body: FieldRef<"Release", 'String'>
    readonly draft: FieldRef<"Release", 'Boolean'>
    readonly prerelease: FieldRef<"Release", 'Boolean'>
    readonly authorLogin: FieldRef<"Release", 'String'>
    readonly authorAvatarUrl: FieldRef<"Release", 'String'>
    readonly createdAt: FieldRef<"Release", 'DateTime'>
    readonly publishedAt: FieldRef<"Release", 'DateTime'>
    readonly syncedAt: FieldRef<"Release", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Release findUnique
   */
  export type ReleaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter, which Release to fetch.
     */
    where: ReleaseWhereUniqueInput
  }

  /**
   * Release findUniqueOrThrow
   */
  export type ReleaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter, which Release to fetch.
     */
    where: ReleaseWhereUniqueInput
  }

  /**
   * Release findFirst
   */
  export type ReleaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter, which Release to fetch.
     */
    where?: ReleaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Releases to fetch.
     */
    orderBy?: ReleaseOrderByWithRelationInput | ReleaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Releases.
     */
    cursor?: ReleaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Releases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Releases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Releases.
     */
    distinct?: ReleaseScalarFieldEnum | ReleaseScalarFieldEnum[]
  }

  /**
   * Release findFirstOrThrow
   */
  export type ReleaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter, which Release to fetch.
     */
    where?: ReleaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Releases to fetch.
     */
    orderBy?: ReleaseOrderByWithRelationInput | ReleaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Releases.
     */
    cursor?: ReleaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Releases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Releases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Releases.
     */
    distinct?: ReleaseScalarFieldEnum | ReleaseScalarFieldEnum[]
  }

  /**
   * Release findMany
   */
  export type ReleaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter, which Releases to fetch.
     */
    where?: ReleaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Releases to fetch.
     */
    orderBy?: ReleaseOrderByWithRelationInput | ReleaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Releases.
     */
    cursor?: ReleaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Releases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Releases.
     */
    skip?: number
    distinct?: ReleaseScalarFieldEnum | ReleaseScalarFieldEnum[]
  }

  /**
   * Release create
   */
  export type ReleaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Release.
     */
    data: XOR<ReleaseCreateInput, ReleaseUncheckedCreateInput>
  }

  /**
   * Release createMany
   */
  export type ReleaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Releases.
     */
    data: ReleaseCreateManyInput | ReleaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Release createManyAndReturn
   */
  export type ReleaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * The data used to create many Releases.
     */
    data: ReleaseCreateManyInput | ReleaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Release update
   */
  export type ReleaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Release.
     */
    data: XOR<ReleaseUpdateInput, ReleaseUncheckedUpdateInput>
    /**
     * Choose, which Release to update.
     */
    where: ReleaseWhereUniqueInput
  }

  /**
   * Release updateMany
   */
  export type ReleaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Releases.
     */
    data: XOR<ReleaseUpdateManyMutationInput, ReleaseUncheckedUpdateManyInput>
    /**
     * Filter which Releases to update
     */
    where?: ReleaseWhereInput
    /**
     * Limit how many Releases to update.
     */
    limit?: number
  }

  /**
   * Release updateManyAndReturn
   */
  export type ReleaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * The data used to update Releases.
     */
    data: XOR<ReleaseUpdateManyMutationInput, ReleaseUncheckedUpdateManyInput>
    /**
     * Filter which Releases to update
     */
    where?: ReleaseWhereInput
    /**
     * Limit how many Releases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Release upsert
   */
  export type ReleaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Release to update in case it exists.
     */
    where: ReleaseWhereUniqueInput
    /**
     * In case the Release found by the `where` argument doesn't exist, create a new Release with this data.
     */
    create: XOR<ReleaseCreateInput, ReleaseUncheckedCreateInput>
    /**
     * In case the Release was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReleaseUpdateInput, ReleaseUncheckedUpdateInput>
  }

  /**
   * Release delete
   */
  export type ReleaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
    /**
     * Filter which Release to delete.
     */
    where: ReleaseWhereUniqueInput
  }

  /**
   * Release deleteMany
   */
  export type ReleaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Releases to delete
     */
    where?: ReleaseWhereInput
    /**
     * Limit how many Releases to delete.
     */
    limit?: number
  }

  /**
   * Release without action
   */
  export type ReleaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Release
     */
    select?: ReleaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Release
     */
    omit?: ReleaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReleaseInclude<ExtArgs> | null
  }


  /**
   * Model VersionTag
   */

  export type AggregateVersionTag = {
    _count: VersionTagCountAggregateOutputType | null
    _min: VersionTagMinAggregateOutputType | null
    _max: VersionTagMaxAggregateOutputType | null
  }

  export type VersionTagMinAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    tagName: string | null
    commitSha: string | null
    isLatest: boolean | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type VersionTagMaxAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    tagName: string | null
    commitSha: string | null
    isLatest: boolean | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type VersionTagCountAggregateOutputType = {
    id: number
    repositoryId: number
    tagName: number
    commitSha: number
    isLatest: number
    createdAt: number
    syncedAt: number
    _all: number
  }


  export type VersionTagMinAggregateInputType = {
    id?: true
    repositoryId?: true
    tagName?: true
    commitSha?: true
    isLatest?: true
    createdAt?: true
    syncedAt?: true
  }

  export type VersionTagMaxAggregateInputType = {
    id?: true
    repositoryId?: true
    tagName?: true
    commitSha?: true
    isLatest?: true
    createdAt?: true
    syncedAt?: true
  }

  export type VersionTagCountAggregateInputType = {
    id?: true
    repositoryId?: true
    tagName?: true
    commitSha?: true
    isLatest?: true
    createdAt?: true
    syncedAt?: true
    _all?: true
  }

  export type VersionTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VersionTag to aggregate.
     */
    where?: VersionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionTags to fetch.
     */
    orderBy?: VersionTagOrderByWithRelationInput | VersionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VersionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VersionTags
    **/
    _count?: true | VersionTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VersionTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VersionTagMaxAggregateInputType
  }

  export type GetVersionTagAggregateType<T extends VersionTagAggregateArgs> = {
        [P in keyof T & keyof AggregateVersionTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVersionTag[P]>
      : GetScalarType<T[P], AggregateVersionTag[P]>
  }




  export type VersionTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VersionTagWhereInput
    orderBy?: VersionTagOrderByWithAggregationInput | VersionTagOrderByWithAggregationInput[]
    by: VersionTagScalarFieldEnum[] | VersionTagScalarFieldEnum
    having?: VersionTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VersionTagCountAggregateInputType | true
    _min?: VersionTagMinAggregateInputType
    _max?: VersionTagMaxAggregateInputType
  }

  export type VersionTagGroupByOutputType = {
    id: string
    repositoryId: string
    tagName: string
    commitSha: string
    isLatest: boolean
    createdAt: Date
    syncedAt: Date
    _count: VersionTagCountAggregateOutputType | null
    _min: VersionTagMinAggregateOutputType | null
    _max: VersionTagMaxAggregateOutputType | null
  }

  type GetVersionTagGroupByPayload<T extends VersionTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VersionTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VersionTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VersionTagGroupByOutputType[P]>
            : GetScalarType<T[P], VersionTagGroupByOutputType[P]>
        }
      >
    >


  export type VersionTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    tagName?: boolean
    commitSha?: boolean
    isLatest?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["versionTag"]>

  export type VersionTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    tagName?: boolean
    commitSha?: boolean
    isLatest?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["versionTag"]>

  export type VersionTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    tagName?: boolean
    commitSha?: boolean
    isLatest?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["versionTag"]>

  export type VersionTagSelectScalar = {
    id?: boolean
    repositoryId?: boolean
    tagName?: boolean
    commitSha?: boolean
    isLatest?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }

  export type VersionTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repositoryId" | "tagName" | "commitSha" | "isLatest" | "createdAt" | "syncedAt", ExtArgs["result"]["versionTag"]>
  export type VersionTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type VersionTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type VersionTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $VersionTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VersionTag"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repositoryId: string
      tagName: string
      commitSha: string
      isLatest: boolean
      createdAt: Date
      syncedAt: Date
    }, ExtArgs["result"]["versionTag"]>
    composites: {}
  }

  type VersionTagGetPayload<S extends boolean | null | undefined | VersionTagDefaultArgs> = $Result.GetResult<Prisma.$VersionTagPayload, S>

  type VersionTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VersionTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VersionTagCountAggregateInputType | true
    }

  export interface VersionTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VersionTag'], meta: { name: 'VersionTag' } }
    /**
     * Find zero or one VersionTag that matches the filter.
     * @param {VersionTagFindUniqueArgs} args - Arguments to find a VersionTag
     * @example
     * // Get one VersionTag
     * const versionTag = await prisma.versionTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VersionTagFindUniqueArgs>(args: SelectSubset<T, VersionTagFindUniqueArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VersionTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VersionTagFindUniqueOrThrowArgs} args - Arguments to find a VersionTag
     * @example
     * // Get one VersionTag
     * const versionTag = await prisma.versionTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VersionTagFindUniqueOrThrowArgs>(args: SelectSubset<T, VersionTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VersionTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagFindFirstArgs} args - Arguments to find a VersionTag
     * @example
     * // Get one VersionTag
     * const versionTag = await prisma.versionTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VersionTagFindFirstArgs>(args?: SelectSubset<T, VersionTagFindFirstArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VersionTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagFindFirstOrThrowArgs} args - Arguments to find a VersionTag
     * @example
     * // Get one VersionTag
     * const versionTag = await prisma.versionTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VersionTagFindFirstOrThrowArgs>(args?: SelectSubset<T, VersionTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VersionTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VersionTags
     * const versionTags = await prisma.versionTag.findMany()
     * 
     * // Get first 10 VersionTags
     * const versionTags = await prisma.versionTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const versionTagWithIdOnly = await prisma.versionTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VersionTagFindManyArgs>(args?: SelectSubset<T, VersionTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VersionTag.
     * @param {VersionTagCreateArgs} args - Arguments to create a VersionTag.
     * @example
     * // Create one VersionTag
     * const VersionTag = await prisma.versionTag.create({
     *   data: {
     *     // ... data to create a VersionTag
     *   }
     * })
     * 
     */
    create<T extends VersionTagCreateArgs>(args: SelectSubset<T, VersionTagCreateArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VersionTags.
     * @param {VersionTagCreateManyArgs} args - Arguments to create many VersionTags.
     * @example
     * // Create many VersionTags
     * const versionTag = await prisma.versionTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VersionTagCreateManyArgs>(args?: SelectSubset<T, VersionTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VersionTags and returns the data saved in the database.
     * @param {VersionTagCreateManyAndReturnArgs} args - Arguments to create many VersionTags.
     * @example
     * // Create many VersionTags
     * const versionTag = await prisma.versionTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VersionTags and only return the `id`
     * const versionTagWithIdOnly = await prisma.versionTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VersionTagCreateManyAndReturnArgs>(args?: SelectSubset<T, VersionTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VersionTag.
     * @param {VersionTagDeleteArgs} args - Arguments to delete one VersionTag.
     * @example
     * // Delete one VersionTag
     * const VersionTag = await prisma.versionTag.delete({
     *   where: {
     *     // ... filter to delete one VersionTag
     *   }
     * })
     * 
     */
    delete<T extends VersionTagDeleteArgs>(args: SelectSubset<T, VersionTagDeleteArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VersionTag.
     * @param {VersionTagUpdateArgs} args - Arguments to update one VersionTag.
     * @example
     * // Update one VersionTag
     * const versionTag = await prisma.versionTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VersionTagUpdateArgs>(args: SelectSubset<T, VersionTagUpdateArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VersionTags.
     * @param {VersionTagDeleteManyArgs} args - Arguments to filter VersionTags to delete.
     * @example
     * // Delete a few VersionTags
     * const { count } = await prisma.versionTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VersionTagDeleteManyArgs>(args?: SelectSubset<T, VersionTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VersionTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VersionTags
     * const versionTag = await prisma.versionTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VersionTagUpdateManyArgs>(args: SelectSubset<T, VersionTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VersionTags and returns the data updated in the database.
     * @param {VersionTagUpdateManyAndReturnArgs} args - Arguments to update many VersionTags.
     * @example
     * // Update many VersionTags
     * const versionTag = await prisma.versionTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VersionTags and only return the `id`
     * const versionTagWithIdOnly = await prisma.versionTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VersionTagUpdateManyAndReturnArgs>(args: SelectSubset<T, VersionTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VersionTag.
     * @param {VersionTagUpsertArgs} args - Arguments to update or create a VersionTag.
     * @example
     * // Update or create a VersionTag
     * const versionTag = await prisma.versionTag.upsert({
     *   create: {
     *     // ... data to create a VersionTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VersionTag we want to update
     *   }
     * })
     */
    upsert<T extends VersionTagUpsertArgs>(args: SelectSubset<T, VersionTagUpsertArgs<ExtArgs>>): Prisma__VersionTagClient<$Result.GetResult<Prisma.$VersionTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VersionTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagCountArgs} args - Arguments to filter VersionTags to count.
     * @example
     * // Count the number of VersionTags
     * const count = await prisma.versionTag.count({
     *   where: {
     *     // ... the filter for the VersionTags we want to count
     *   }
     * })
    **/
    count<T extends VersionTagCountArgs>(
      args?: Subset<T, VersionTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VersionTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VersionTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VersionTagAggregateArgs>(args: Subset<T, VersionTagAggregateArgs>): Prisma.PrismaPromise<GetVersionTagAggregateType<T>>

    /**
     * Group by VersionTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VersionTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VersionTagGroupByArgs['orderBy'] }
        : { orderBy?: VersionTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VersionTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VersionTag model
   */
  readonly fields: VersionTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VersionTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VersionTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VersionTag model
   */
  interface VersionTagFieldRefs {
    readonly id: FieldRef<"VersionTag", 'String'>
    readonly repositoryId: FieldRef<"VersionTag", 'String'>
    readonly tagName: FieldRef<"VersionTag", 'String'>
    readonly commitSha: FieldRef<"VersionTag", 'String'>
    readonly isLatest: FieldRef<"VersionTag", 'Boolean'>
    readonly createdAt: FieldRef<"VersionTag", 'DateTime'>
    readonly syncedAt: FieldRef<"VersionTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VersionTag findUnique
   */
  export type VersionTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter, which VersionTag to fetch.
     */
    where: VersionTagWhereUniqueInput
  }

  /**
   * VersionTag findUniqueOrThrow
   */
  export type VersionTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter, which VersionTag to fetch.
     */
    where: VersionTagWhereUniqueInput
  }

  /**
   * VersionTag findFirst
   */
  export type VersionTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter, which VersionTag to fetch.
     */
    where?: VersionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionTags to fetch.
     */
    orderBy?: VersionTagOrderByWithRelationInput | VersionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionTags.
     */
    cursor?: VersionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionTags.
     */
    distinct?: VersionTagScalarFieldEnum | VersionTagScalarFieldEnum[]
  }

  /**
   * VersionTag findFirstOrThrow
   */
  export type VersionTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter, which VersionTag to fetch.
     */
    where?: VersionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionTags to fetch.
     */
    orderBy?: VersionTagOrderByWithRelationInput | VersionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VersionTags.
     */
    cursor?: VersionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VersionTags.
     */
    distinct?: VersionTagScalarFieldEnum | VersionTagScalarFieldEnum[]
  }

  /**
   * VersionTag findMany
   */
  export type VersionTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter, which VersionTags to fetch.
     */
    where?: VersionTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VersionTags to fetch.
     */
    orderBy?: VersionTagOrderByWithRelationInput | VersionTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VersionTags.
     */
    cursor?: VersionTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VersionTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VersionTags.
     */
    skip?: number
    distinct?: VersionTagScalarFieldEnum | VersionTagScalarFieldEnum[]
  }

  /**
   * VersionTag create
   */
  export type VersionTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * The data needed to create a VersionTag.
     */
    data: XOR<VersionTagCreateInput, VersionTagUncheckedCreateInput>
  }

  /**
   * VersionTag createMany
   */
  export type VersionTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VersionTags.
     */
    data: VersionTagCreateManyInput | VersionTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VersionTag createManyAndReturn
   */
  export type VersionTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * The data used to create many VersionTags.
     */
    data: VersionTagCreateManyInput | VersionTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VersionTag update
   */
  export type VersionTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * The data needed to update a VersionTag.
     */
    data: XOR<VersionTagUpdateInput, VersionTagUncheckedUpdateInput>
    /**
     * Choose, which VersionTag to update.
     */
    where: VersionTagWhereUniqueInput
  }

  /**
   * VersionTag updateMany
   */
  export type VersionTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VersionTags.
     */
    data: XOR<VersionTagUpdateManyMutationInput, VersionTagUncheckedUpdateManyInput>
    /**
     * Filter which VersionTags to update
     */
    where?: VersionTagWhereInput
    /**
     * Limit how many VersionTags to update.
     */
    limit?: number
  }

  /**
   * VersionTag updateManyAndReturn
   */
  export type VersionTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * The data used to update VersionTags.
     */
    data: XOR<VersionTagUpdateManyMutationInput, VersionTagUncheckedUpdateManyInput>
    /**
     * Filter which VersionTags to update
     */
    where?: VersionTagWhereInput
    /**
     * Limit how many VersionTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VersionTag upsert
   */
  export type VersionTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * The filter to search for the VersionTag to update in case it exists.
     */
    where: VersionTagWhereUniqueInput
    /**
     * In case the VersionTag found by the `where` argument doesn't exist, create a new VersionTag with this data.
     */
    create: XOR<VersionTagCreateInput, VersionTagUncheckedCreateInput>
    /**
     * In case the VersionTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VersionTagUpdateInput, VersionTagUncheckedUpdateInput>
  }

  /**
   * VersionTag delete
   */
  export type VersionTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
    /**
     * Filter which VersionTag to delete.
     */
    where: VersionTagWhereUniqueInput
  }

  /**
   * VersionTag deleteMany
   */
  export type VersionTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VersionTags to delete
     */
    where?: VersionTagWhereInput
    /**
     * Limit how many VersionTags to delete.
     */
    limit?: number
  }

  /**
   * VersionTag without action
   */
  export type VersionTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionTag
     */
    select?: VersionTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VersionTag
     */
    omit?: VersionTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionTagInclude<ExtArgs> | null
  }


  /**
   * Model Contributor
   */

  export type AggregateContributor = {
    _count: ContributorCountAggregateOutputType | null
    _avg: ContributorAvgAggregateOutputType | null
    _sum: ContributorSumAggregateOutputType | null
    _min: ContributorMinAggregateOutputType | null
    _max: ContributorMaxAggregateOutputType | null
  }

  export type ContributorAvgAggregateOutputType = {
    githubId: number | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
  }

  export type ContributorSumAggregateOutputType = {
    githubId: bigint | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
  }

  export type ContributorMinAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    login: string | null
    avatarUrl: string | null
    htmlUrl: string | null
    type: string | null
    siteAdmin: boolean | null
    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    bio: string | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type ContributorMaxAggregateOutputType = {
    id: string | null
    githubId: bigint | null
    login: string | null
    avatarUrl: string | null
    htmlUrl: string | null
    type: string | null
    siteAdmin: boolean | null
    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    bio: string | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date | null
  }

  export type ContributorCountAggregateOutputType = {
    id: number
    githubId: number
    login: number
    avatarUrl: number
    htmlUrl: number
    type: number
    siteAdmin: number
    name: number
    company: number
    blog: number
    location: number
    email: number
    bio: number
    publicRepos: number
    publicGists: number
    followers: number
    following: number
    createdAt: number
    updatedAt: number
    syncedAt: number
    _all: number
  }


  export type ContributorAvgAggregateInputType = {
    githubId?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
  }

  export type ContributorSumAggregateInputType = {
    githubId?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
  }

  export type ContributorMinAggregateInputType = {
    id?: true
    githubId?: true
    login?: true
    avatarUrl?: true
    htmlUrl?: true
    type?: true
    siteAdmin?: true
    name?: true
    company?: true
    blog?: true
    location?: true
    email?: true
    bio?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type ContributorMaxAggregateInputType = {
    id?: true
    githubId?: true
    login?: true
    avatarUrl?: true
    htmlUrl?: true
    type?: true
    siteAdmin?: true
    name?: true
    company?: true
    blog?: true
    location?: true
    email?: true
    bio?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
  }

  export type ContributorCountAggregateInputType = {
    id?: true
    githubId?: true
    login?: true
    avatarUrl?: true
    htmlUrl?: true
    type?: true
    siteAdmin?: true
    name?: true
    company?: true
    blog?: true
    location?: true
    email?: true
    bio?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    syncedAt?: true
    _all?: true
  }

  export type ContributorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contributor to aggregate.
     */
    where?: ContributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contributors to fetch.
     */
    orderBy?: ContributorOrderByWithRelationInput | ContributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contributors
    **/
    _count?: true | ContributorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContributorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContributorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContributorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContributorMaxAggregateInputType
  }

  export type GetContributorAggregateType<T extends ContributorAggregateArgs> = {
        [P in keyof T & keyof AggregateContributor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContributor[P]>
      : GetScalarType<T[P], AggregateContributor[P]>
  }




  export type ContributorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributorWhereInput
    orderBy?: ContributorOrderByWithAggregationInput | ContributorOrderByWithAggregationInput[]
    by: ContributorScalarFieldEnum[] | ContributorScalarFieldEnum
    having?: ContributorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContributorCountAggregateInputType | true
    _avg?: ContributorAvgAggregateInputType
    _sum?: ContributorSumAggregateInputType
    _min?: ContributorMinAggregateInputType
    _max?: ContributorMaxAggregateInputType
  }

  export type ContributorGroupByOutputType = {
    id: string
    githubId: bigint
    login: string
    avatarUrl: string | null
    htmlUrl: string | null
    type: string
    siteAdmin: boolean
    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    bio: string | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    createdAt: Date | null
    updatedAt: Date | null
    syncedAt: Date
    _count: ContributorCountAggregateOutputType | null
    _avg: ContributorAvgAggregateOutputType | null
    _sum: ContributorSumAggregateOutputType | null
    _min: ContributorMinAggregateOutputType | null
    _max: ContributorMaxAggregateOutputType | null
  }

  type GetContributorGroupByPayload<T extends ContributorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContributorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContributorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContributorGroupByOutputType[P]>
            : GetScalarType<T[P], ContributorGroupByOutputType[P]>
        }
      >
    >


  export type ContributorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    login?: boolean
    avatarUrl?: boolean
    htmlUrl?: boolean
    type?: boolean
    siteAdmin?: boolean
    name?: boolean
    company?: boolean
    blog?: boolean
    location?: boolean
    email?: boolean
    bio?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
    contributions?: boolean | Contributor$contributionsArgs<ExtArgs>
    _count?: boolean | ContributorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributor"]>

  export type ContributorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    login?: boolean
    avatarUrl?: boolean
    htmlUrl?: boolean
    type?: boolean
    siteAdmin?: boolean
    name?: boolean
    company?: boolean
    blog?: boolean
    location?: boolean
    email?: boolean
    bio?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["contributor"]>

  export type ContributorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    login?: boolean
    avatarUrl?: boolean
    htmlUrl?: boolean
    type?: boolean
    siteAdmin?: boolean
    name?: boolean
    company?: boolean
    blog?: boolean
    location?: boolean
    email?: boolean
    bio?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["contributor"]>

  export type ContributorSelectScalar = {
    id?: boolean
    githubId?: boolean
    login?: boolean
    avatarUrl?: boolean
    htmlUrl?: boolean
    type?: boolean
    siteAdmin?: boolean
    name?: boolean
    company?: boolean
    blog?: boolean
    location?: boolean
    email?: boolean
    bio?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    syncedAt?: boolean
  }

  export type ContributorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "login" | "avatarUrl" | "htmlUrl" | "type" | "siteAdmin" | "name" | "company" | "blog" | "location" | "email" | "bio" | "publicRepos" | "publicGists" | "followers" | "following" | "createdAt" | "updatedAt" | "syncedAt", ExtArgs["result"]["contributor"]>
  export type ContributorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributions?: boolean | Contributor$contributionsArgs<ExtArgs>
    _count?: boolean | ContributorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContributorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContributorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContributorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contributor"
    objects: {
      contributions: Prisma.$ContributorContributionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: bigint
      login: string
      avatarUrl: string | null
      htmlUrl: string | null
      type: string
      siteAdmin: boolean
      name: string | null
      company: string | null
      blog: string | null
      location: string | null
      email: string | null
      bio: string | null
      publicRepos: number | null
      publicGists: number | null
      followers: number | null
      following: number | null
      createdAt: Date | null
      updatedAt: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["contributor"]>
    composites: {}
  }

  type ContributorGetPayload<S extends boolean | null | undefined | ContributorDefaultArgs> = $Result.GetResult<Prisma.$ContributorPayload, S>

  type ContributorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContributorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContributorCountAggregateInputType | true
    }

  export interface ContributorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contributor'], meta: { name: 'Contributor' } }
    /**
     * Find zero or one Contributor that matches the filter.
     * @param {ContributorFindUniqueArgs} args - Arguments to find a Contributor
     * @example
     * // Get one Contributor
     * const contributor = await prisma.contributor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContributorFindUniqueArgs>(args: SelectSubset<T, ContributorFindUniqueArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contributor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContributorFindUniqueOrThrowArgs} args - Arguments to find a Contributor
     * @example
     * // Get one Contributor
     * const contributor = await prisma.contributor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContributorFindUniqueOrThrowArgs>(args: SelectSubset<T, ContributorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contributor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorFindFirstArgs} args - Arguments to find a Contributor
     * @example
     * // Get one Contributor
     * const contributor = await prisma.contributor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContributorFindFirstArgs>(args?: SelectSubset<T, ContributorFindFirstArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contributor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorFindFirstOrThrowArgs} args - Arguments to find a Contributor
     * @example
     * // Get one Contributor
     * const contributor = await prisma.contributor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContributorFindFirstOrThrowArgs>(args?: SelectSubset<T, ContributorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contributors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contributors
     * const contributors = await prisma.contributor.findMany()
     * 
     * // Get first 10 Contributors
     * const contributors = await prisma.contributor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contributorWithIdOnly = await prisma.contributor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContributorFindManyArgs>(args?: SelectSubset<T, ContributorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contributor.
     * @param {ContributorCreateArgs} args - Arguments to create a Contributor.
     * @example
     * // Create one Contributor
     * const Contributor = await prisma.contributor.create({
     *   data: {
     *     // ... data to create a Contributor
     *   }
     * })
     * 
     */
    create<T extends ContributorCreateArgs>(args: SelectSubset<T, ContributorCreateArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contributors.
     * @param {ContributorCreateManyArgs} args - Arguments to create many Contributors.
     * @example
     * // Create many Contributors
     * const contributor = await prisma.contributor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContributorCreateManyArgs>(args?: SelectSubset<T, ContributorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contributors and returns the data saved in the database.
     * @param {ContributorCreateManyAndReturnArgs} args - Arguments to create many Contributors.
     * @example
     * // Create many Contributors
     * const contributor = await prisma.contributor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contributors and only return the `id`
     * const contributorWithIdOnly = await prisma.contributor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContributorCreateManyAndReturnArgs>(args?: SelectSubset<T, ContributorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contributor.
     * @param {ContributorDeleteArgs} args - Arguments to delete one Contributor.
     * @example
     * // Delete one Contributor
     * const Contributor = await prisma.contributor.delete({
     *   where: {
     *     // ... filter to delete one Contributor
     *   }
     * })
     * 
     */
    delete<T extends ContributorDeleteArgs>(args: SelectSubset<T, ContributorDeleteArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contributor.
     * @param {ContributorUpdateArgs} args - Arguments to update one Contributor.
     * @example
     * // Update one Contributor
     * const contributor = await prisma.contributor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContributorUpdateArgs>(args: SelectSubset<T, ContributorUpdateArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contributors.
     * @param {ContributorDeleteManyArgs} args - Arguments to filter Contributors to delete.
     * @example
     * // Delete a few Contributors
     * const { count } = await prisma.contributor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContributorDeleteManyArgs>(args?: SelectSubset<T, ContributorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contributors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contributors
     * const contributor = await prisma.contributor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContributorUpdateManyArgs>(args: SelectSubset<T, ContributorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contributors and returns the data updated in the database.
     * @param {ContributorUpdateManyAndReturnArgs} args - Arguments to update many Contributors.
     * @example
     * // Update many Contributors
     * const contributor = await prisma.contributor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contributors and only return the `id`
     * const contributorWithIdOnly = await prisma.contributor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContributorUpdateManyAndReturnArgs>(args: SelectSubset<T, ContributorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contributor.
     * @param {ContributorUpsertArgs} args - Arguments to update or create a Contributor.
     * @example
     * // Update or create a Contributor
     * const contributor = await prisma.contributor.upsert({
     *   create: {
     *     // ... data to create a Contributor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contributor we want to update
     *   }
     * })
     */
    upsert<T extends ContributorUpsertArgs>(args: SelectSubset<T, ContributorUpsertArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contributors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorCountArgs} args - Arguments to filter Contributors to count.
     * @example
     * // Count the number of Contributors
     * const count = await prisma.contributor.count({
     *   where: {
     *     // ... the filter for the Contributors we want to count
     *   }
     * })
    **/
    count<T extends ContributorCountArgs>(
      args?: Subset<T, ContributorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContributorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contributor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContributorAggregateArgs>(args: Subset<T, ContributorAggregateArgs>): Prisma.PrismaPromise<GetContributorAggregateType<T>>

    /**
     * Group by Contributor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContributorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContributorGroupByArgs['orderBy'] }
        : { orderBy?: ContributorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContributorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContributorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contributor model
   */
  readonly fields: ContributorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contributor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContributorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contributions<T extends Contributor$contributionsArgs<ExtArgs> = {}>(args?: Subset<T, Contributor$contributionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contributor model
   */
  interface ContributorFieldRefs {
    readonly id: FieldRef<"Contributor", 'String'>
    readonly githubId: FieldRef<"Contributor", 'BigInt'>
    readonly login: FieldRef<"Contributor", 'String'>
    readonly avatarUrl: FieldRef<"Contributor", 'String'>
    readonly htmlUrl: FieldRef<"Contributor", 'String'>
    readonly type: FieldRef<"Contributor", 'String'>
    readonly siteAdmin: FieldRef<"Contributor", 'Boolean'>
    readonly name: FieldRef<"Contributor", 'String'>
    readonly company: FieldRef<"Contributor", 'String'>
    readonly blog: FieldRef<"Contributor", 'String'>
    readonly location: FieldRef<"Contributor", 'String'>
    readonly email: FieldRef<"Contributor", 'String'>
    readonly bio: FieldRef<"Contributor", 'String'>
    readonly publicRepos: FieldRef<"Contributor", 'Int'>
    readonly publicGists: FieldRef<"Contributor", 'Int'>
    readonly followers: FieldRef<"Contributor", 'Int'>
    readonly following: FieldRef<"Contributor", 'Int'>
    readonly createdAt: FieldRef<"Contributor", 'DateTime'>
    readonly updatedAt: FieldRef<"Contributor", 'DateTime'>
    readonly syncedAt: FieldRef<"Contributor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contributor findUnique
   */
  export type ContributorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter, which Contributor to fetch.
     */
    where: ContributorWhereUniqueInput
  }

  /**
   * Contributor findUniqueOrThrow
   */
  export type ContributorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter, which Contributor to fetch.
     */
    where: ContributorWhereUniqueInput
  }

  /**
   * Contributor findFirst
   */
  export type ContributorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter, which Contributor to fetch.
     */
    where?: ContributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contributors to fetch.
     */
    orderBy?: ContributorOrderByWithRelationInput | ContributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contributors.
     */
    cursor?: ContributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contributors.
     */
    distinct?: ContributorScalarFieldEnum | ContributorScalarFieldEnum[]
  }

  /**
   * Contributor findFirstOrThrow
   */
  export type ContributorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter, which Contributor to fetch.
     */
    where?: ContributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contributors to fetch.
     */
    orderBy?: ContributorOrderByWithRelationInput | ContributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contributors.
     */
    cursor?: ContributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contributors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contributors.
     */
    distinct?: ContributorScalarFieldEnum | ContributorScalarFieldEnum[]
  }

  /**
   * Contributor findMany
   */
  export type ContributorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter, which Contributors to fetch.
     */
    where?: ContributorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contributors to fetch.
     */
    orderBy?: ContributorOrderByWithRelationInput | ContributorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contributors.
     */
    cursor?: ContributorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contributors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contributors.
     */
    skip?: number
    distinct?: ContributorScalarFieldEnum | ContributorScalarFieldEnum[]
  }

  /**
   * Contributor create
   */
  export type ContributorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * The data needed to create a Contributor.
     */
    data: XOR<ContributorCreateInput, ContributorUncheckedCreateInput>
  }

  /**
   * Contributor createMany
   */
  export type ContributorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contributors.
     */
    data: ContributorCreateManyInput | ContributorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contributor createManyAndReturn
   */
  export type ContributorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * The data used to create many Contributors.
     */
    data: ContributorCreateManyInput | ContributorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contributor update
   */
  export type ContributorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * The data needed to update a Contributor.
     */
    data: XOR<ContributorUpdateInput, ContributorUncheckedUpdateInput>
    /**
     * Choose, which Contributor to update.
     */
    where: ContributorWhereUniqueInput
  }

  /**
   * Contributor updateMany
   */
  export type ContributorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contributors.
     */
    data: XOR<ContributorUpdateManyMutationInput, ContributorUncheckedUpdateManyInput>
    /**
     * Filter which Contributors to update
     */
    where?: ContributorWhereInput
    /**
     * Limit how many Contributors to update.
     */
    limit?: number
  }

  /**
   * Contributor updateManyAndReturn
   */
  export type ContributorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * The data used to update Contributors.
     */
    data: XOR<ContributorUpdateManyMutationInput, ContributorUncheckedUpdateManyInput>
    /**
     * Filter which Contributors to update
     */
    where?: ContributorWhereInput
    /**
     * Limit how many Contributors to update.
     */
    limit?: number
  }

  /**
   * Contributor upsert
   */
  export type ContributorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * The filter to search for the Contributor to update in case it exists.
     */
    where: ContributorWhereUniqueInput
    /**
     * In case the Contributor found by the `where` argument doesn't exist, create a new Contributor with this data.
     */
    create: XOR<ContributorCreateInput, ContributorUncheckedCreateInput>
    /**
     * In case the Contributor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContributorUpdateInput, ContributorUncheckedUpdateInput>
  }

  /**
   * Contributor delete
   */
  export type ContributorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
    /**
     * Filter which Contributor to delete.
     */
    where: ContributorWhereUniqueInput
  }

  /**
   * Contributor deleteMany
   */
  export type ContributorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contributors to delete
     */
    where?: ContributorWhereInput
    /**
     * Limit how many Contributors to delete.
     */
    limit?: number
  }

  /**
   * Contributor.contributions
   */
  export type Contributor$contributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    where?: ContributorContributionWhereInput
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    cursor?: ContributorContributionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContributorContributionScalarFieldEnum | ContributorContributionScalarFieldEnum[]
  }

  /**
   * Contributor without action
   */
  export type ContributorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contributor
     */
    select?: ContributorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contributor
     */
    omit?: ContributorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorInclude<ExtArgs> | null
  }


  /**
   * Model ContributorContribution
   */

  export type AggregateContributorContribution = {
    _count: ContributorContributionCountAggregateOutputType | null
    _avg: ContributorContributionAvgAggregateOutputType | null
    _sum: ContributorContributionSumAggregateOutputType | null
    _min: ContributorContributionMinAggregateOutputType | null
    _max: ContributorContributionMaxAggregateOutputType | null
  }

  export type ContributorContributionAvgAggregateOutputType = {
    contributionsCount: number | null
  }

  export type ContributorContributionSumAggregateOutputType = {
    contributionsCount: number | null
  }

  export type ContributorContributionMinAggregateOutputType = {
    contributorId: string | null
    repositoryId: string | null
    contributionsCount: number | null
    syncedAt: Date | null
  }

  export type ContributorContributionMaxAggregateOutputType = {
    contributorId: string | null
    repositoryId: string | null
    contributionsCount: number | null
    syncedAt: Date | null
  }

  export type ContributorContributionCountAggregateOutputType = {
    contributorId: number
    repositoryId: number
    contributionsCount: number
    syncedAt: number
    _all: number
  }


  export type ContributorContributionAvgAggregateInputType = {
    contributionsCount?: true
  }

  export type ContributorContributionSumAggregateInputType = {
    contributionsCount?: true
  }

  export type ContributorContributionMinAggregateInputType = {
    contributorId?: true
    repositoryId?: true
    contributionsCount?: true
    syncedAt?: true
  }

  export type ContributorContributionMaxAggregateInputType = {
    contributorId?: true
    repositoryId?: true
    contributionsCount?: true
    syncedAt?: true
  }

  export type ContributorContributionCountAggregateInputType = {
    contributorId?: true
    repositoryId?: true
    contributionsCount?: true
    syncedAt?: true
    _all?: true
  }

  export type ContributorContributionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributorContribution to aggregate.
     */
    where?: ContributorContributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorContributions to fetch.
     */
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContributorContributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorContributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorContributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContributorContributions
    **/
    _count?: true | ContributorContributionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContributorContributionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContributorContributionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContributorContributionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContributorContributionMaxAggregateInputType
  }

  export type GetContributorContributionAggregateType<T extends ContributorContributionAggregateArgs> = {
        [P in keyof T & keyof AggregateContributorContribution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContributorContribution[P]>
      : GetScalarType<T[P], AggregateContributorContribution[P]>
  }




  export type ContributorContributionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributorContributionWhereInput
    orderBy?: ContributorContributionOrderByWithAggregationInput | ContributorContributionOrderByWithAggregationInput[]
    by: ContributorContributionScalarFieldEnum[] | ContributorContributionScalarFieldEnum
    having?: ContributorContributionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContributorContributionCountAggregateInputType | true
    _avg?: ContributorContributionAvgAggregateInputType
    _sum?: ContributorContributionSumAggregateInputType
    _min?: ContributorContributionMinAggregateInputType
    _max?: ContributorContributionMaxAggregateInputType
  }

  export type ContributorContributionGroupByOutputType = {
    contributorId: string
    repositoryId: string
    contributionsCount: number
    syncedAt: Date
    _count: ContributorContributionCountAggregateOutputType | null
    _avg: ContributorContributionAvgAggregateOutputType | null
    _sum: ContributorContributionSumAggregateOutputType | null
    _min: ContributorContributionMinAggregateOutputType | null
    _max: ContributorContributionMaxAggregateOutputType | null
  }

  type GetContributorContributionGroupByPayload<T extends ContributorContributionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContributorContributionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContributorContributionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContributorContributionGroupByOutputType[P]>
            : GetScalarType<T[P], ContributorContributionGroupByOutputType[P]>
        }
      >
    >


  export type ContributorContributionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contributorId?: boolean
    repositoryId?: boolean
    contributionsCount?: boolean
    syncedAt?: boolean
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorContribution"]>

  export type ContributorContributionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contributorId?: boolean
    repositoryId?: boolean
    contributionsCount?: boolean
    syncedAt?: boolean
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorContribution"]>

  export type ContributorContributionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contributorId?: boolean
    repositoryId?: boolean
    contributionsCount?: boolean
    syncedAt?: boolean
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorContribution"]>

  export type ContributorContributionSelectScalar = {
    contributorId?: boolean
    repositoryId?: boolean
    contributionsCount?: boolean
    syncedAt?: boolean
  }

  export type ContributorContributionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"contributorId" | "repositoryId" | "contributionsCount" | "syncedAt", ExtArgs["result"]["contributorContribution"]>
  export type ContributorContributionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type ContributorContributionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type ContributorContributionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | ContributorDefaultArgs<ExtArgs>
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $ContributorContributionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContributorContribution"
    objects: {
      contributor: Prisma.$ContributorPayload<ExtArgs>
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      contributorId: string
      repositoryId: string
      contributionsCount: number
      syncedAt: Date
    }, ExtArgs["result"]["contributorContribution"]>
    composites: {}
  }

  type ContributorContributionGetPayload<S extends boolean | null | undefined | ContributorContributionDefaultArgs> = $Result.GetResult<Prisma.$ContributorContributionPayload, S>

  type ContributorContributionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContributorContributionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContributorContributionCountAggregateInputType | true
    }

  export interface ContributorContributionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContributorContribution'], meta: { name: 'ContributorContribution' } }
    /**
     * Find zero or one ContributorContribution that matches the filter.
     * @param {ContributorContributionFindUniqueArgs} args - Arguments to find a ContributorContribution
     * @example
     * // Get one ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContributorContributionFindUniqueArgs>(args: SelectSubset<T, ContributorContributionFindUniqueArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContributorContribution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContributorContributionFindUniqueOrThrowArgs} args - Arguments to find a ContributorContribution
     * @example
     * // Get one ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContributorContributionFindUniqueOrThrowArgs>(args: SelectSubset<T, ContributorContributionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributorContribution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionFindFirstArgs} args - Arguments to find a ContributorContribution
     * @example
     * // Get one ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContributorContributionFindFirstArgs>(args?: SelectSubset<T, ContributorContributionFindFirstArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributorContribution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionFindFirstOrThrowArgs} args - Arguments to find a ContributorContribution
     * @example
     * // Get one ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContributorContributionFindFirstOrThrowArgs>(args?: SelectSubset<T, ContributorContributionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContributorContributions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContributorContributions
     * const contributorContributions = await prisma.contributorContribution.findMany()
     * 
     * // Get first 10 ContributorContributions
     * const contributorContributions = await prisma.contributorContribution.findMany({ take: 10 })
     * 
     * // Only select the `contributorId`
     * const contributorContributionWithContributorIdOnly = await prisma.contributorContribution.findMany({ select: { contributorId: true } })
     * 
     */
    findMany<T extends ContributorContributionFindManyArgs>(args?: SelectSubset<T, ContributorContributionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContributorContribution.
     * @param {ContributorContributionCreateArgs} args - Arguments to create a ContributorContribution.
     * @example
     * // Create one ContributorContribution
     * const ContributorContribution = await prisma.contributorContribution.create({
     *   data: {
     *     // ... data to create a ContributorContribution
     *   }
     * })
     * 
     */
    create<T extends ContributorContributionCreateArgs>(args: SelectSubset<T, ContributorContributionCreateArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContributorContributions.
     * @param {ContributorContributionCreateManyArgs} args - Arguments to create many ContributorContributions.
     * @example
     * // Create many ContributorContributions
     * const contributorContribution = await prisma.contributorContribution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContributorContributionCreateManyArgs>(args?: SelectSubset<T, ContributorContributionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContributorContributions and returns the data saved in the database.
     * @param {ContributorContributionCreateManyAndReturnArgs} args - Arguments to create many ContributorContributions.
     * @example
     * // Create many ContributorContributions
     * const contributorContribution = await prisma.contributorContribution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContributorContributions and only return the `contributorId`
     * const contributorContributionWithContributorIdOnly = await prisma.contributorContribution.createManyAndReturn({
     *   select: { contributorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContributorContributionCreateManyAndReturnArgs>(args?: SelectSubset<T, ContributorContributionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContributorContribution.
     * @param {ContributorContributionDeleteArgs} args - Arguments to delete one ContributorContribution.
     * @example
     * // Delete one ContributorContribution
     * const ContributorContribution = await prisma.contributorContribution.delete({
     *   where: {
     *     // ... filter to delete one ContributorContribution
     *   }
     * })
     * 
     */
    delete<T extends ContributorContributionDeleteArgs>(args: SelectSubset<T, ContributorContributionDeleteArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContributorContribution.
     * @param {ContributorContributionUpdateArgs} args - Arguments to update one ContributorContribution.
     * @example
     * // Update one ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContributorContributionUpdateArgs>(args: SelectSubset<T, ContributorContributionUpdateArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContributorContributions.
     * @param {ContributorContributionDeleteManyArgs} args - Arguments to filter ContributorContributions to delete.
     * @example
     * // Delete a few ContributorContributions
     * const { count } = await prisma.contributorContribution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContributorContributionDeleteManyArgs>(args?: SelectSubset<T, ContributorContributionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributorContributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContributorContributions
     * const contributorContribution = await prisma.contributorContribution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContributorContributionUpdateManyArgs>(args: SelectSubset<T, ContributorContributionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributorContributions and returns the data updated in the database.
     * @param {ContributorContributionUpdateManyAndReturnArgs} args - Arguments to update many ContributorContributions.
     * @example
     * // Update many ContributorContributions
     * const contributorContribution = await prisma.contributorContribution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContributorContributions and only return the `contributorId`
     * const contributorContributionWithContributorIdOnly = await prisma.contributorContribution.updateManyAndReturn({
     *   select: { contributorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContributorContributionUpdateManyAndReturnArgs>(args: SelectSubset<T, ContributorContributionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContributorContribution.
     * @param {ContributorContributionUpsertArgs} args - Arguments to update or create a ContributorContribution.
     * @example
     * // Update or create a ContributorContribution
     * const contributorContribution = await prisma.contributorContribution.upsert({
     *   create: {
     *     // ... data to create a ContributorContribution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContributorContribution we want to update
     *   }
     * })
     */
    upsert<T extends ContributorContributionUpsertArgs>(args: SelectSubset<T, ContributorContributionUpsertArgs<ExtArgs>>): Prisma__ContributorContributionClient<$Result.GetResult<Prisma.$ContributorContributionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContributorContributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionCountArgs} args - Arguments to filter ContributorContributions to count.
     * @example
     * // Count the number of ContributorContributions
     * const count = await prisma.contributorContribution.count({
     *   where: {
     *     // ... the filter for the ContributorContributions we want to count
     *   }
     * })
    **/
    count<T extends ContributorContributionCountArgs>(
      args?: Subset<T, ContributorContributionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContributorContributionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContributorContribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContributorContributionAggregateArgs>(args: Subset<T, ContributorContributionAggregateArgs>): Prisma.PrismaPromise<GetContributorContributionAggregateType<T>>

    /**
     * Group by ContributorContribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorContributionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContributorContributionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContributorContributionGroupByArgs['orderBy'] }
        : { orderBy?: ContributorContributionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContributorContributionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContributorContributionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContributorContribution model
   */
  readonly fields: ContributorContributionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContributorContribution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContributorContributionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contributor<T extends ContributorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContributorDefaultArgs<ExtArgs>>): Prisma__ContributorClient<$Result.GetResult<Prisma.$ContributorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContributorContribution model
   */
  interface ContributorContributionFieldRefs {
    readonly contributorId: FieldRef<"ContributorContribution", 'String'>
    readonly repositoryId: FieldRef<"ContributorContribution", 'String'>
    readonly contributionsCount: FieldRef<"ContributorContribution", 'Int'>
    readonly syncedAt: FieldRef<"ContributorContribution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContributorContribution findUnique
   */
  export type ContributorContributionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter, which ContributorContribution to fetch.
     */
    where: ContributorContributionWhereUniqueInput
  }

  /**
   * ContributorContribution findUniqueOrThrow
   */
  export type ContributorContributionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter, which ContributorContribution to fetch.
     */
    where: ContributorContributionWhereUniqueInput
  }

  /**
   * ContributorContribution findFirst
   */
  export type ContributorContributionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter, which ContributorContribution to fetch.
     */
    where?: ContributorContributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorContributions to fetch.
     */
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributorContributions.
     */
    cursor?: ContributorContributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorContributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorContributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributorContributions.
     */
    distinct?: ContributorContributionScalarFieldEnum | ContributorContributionScalarFieldEnum[]
  }

  /**
   * ContributorContribution findFirstOrThrow
   */
  export type ContributorContributionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter, which ContributorContribution to fetch.
     */
    where?: ContributorContributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorContributions to fetch.
     */
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributorContributions.
     */
    cursor?: ContributorContributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorContributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorContributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributorContributions.
     */
    distinct?: ContributorContributionScalarFieldEnum | ContributorContributionScalarFieldEnum[]
  }

  /**
   * ContributorContribution findMany
   */
  export type ContributorContributionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter, which ContributorContributions to fetch.
     */
    where?: ContributorContributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorContributions to fetch.
     */
    orderBy?: ContributorContributionOrderByWithRelationInput | ContributorContributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContributorContributions.
     */
    cursor?: ContributorContributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorContributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorContributions.
     */
    skip?: number
    distinct?: ContributorContributionScalarFieldEnum | ContributorContributionScalarFieldEnum[]
  }

  /**
   * ContributorContribution create
   */
  export type ContributorContributionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * The data needed to create a ContributorContribution.
     */
    data: XOR<ContributorContributionCreateInput, ContributorContributionUncheckedCreateInput>
  }

  /**
   * ContributorContribution createMany
   */
  export type ContributorContributionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContributorContributions.
     */
    data: ContributorContributionCreateManyInput | ContributorContributionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContributorContribution createManyAndReturn
   */
  export type ContributorContributionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * The data used to create many ContributorContributions.
     */
    data: ContributorContributionCreateManyInput | ContributorContributionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributorContribution update
   */
  export type ContributorContributionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * The data needed to update a ContributorContribution.
     */
    data: XOR<ContributorContributionUpdateInput, ContributorContributionUncheckedUpdateInput>
    /**
     * Choose, which ContributorContribution to update.
     */
    where: ContributorContributionWhereUniqueInput
  }

  /**
   * ContributorContribution updateMany
   */
  export type ContributorContributionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContributorContributions.
     */
    data: XOR<ContributorContributionUpdateManyMutationInput, ContributorContributionUncheckedUpdateManyInput>
    /**
     * Filter which ContributorContributions to update
     */
    where?: ContributorContributionWhereInput
    /**
     * Limit how many ContributorContributions to update.
     */
    limit?: number
  }

  /**
   * ContributorContribution updateManyAndReturn
   */
  export type ContributorContributionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * The data used to update ContributorContributions.
     */
    data: XOR<ContributorContributionUpdateManyMutationInput, ContributorContributionUncheckedUpdateManyInput>
    /**
     * Filter which ContributorContributions to update
     */
    where?: ContributorContributionWhereInput
    /**
     * Limit how many ContributorContributions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributorContribution upsert
   */
  export type ContributorContributionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * The filter to search for the ContributorContribution to update in case it exists.
     */
    where: ContributorContributionWhereUniqueInput
    /**
     * In case the ContributorContribution found by the `where` argument doesn't exist, create a new ContributorContribution with this data.
     */
    create: XOR<ContributorContributionCreateInput, ContributorContributionUncheckedCreateInput>
    /**
     * In case the ContributorContribution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContributorContributionUpdateInput, ContributorContributionUncheckedUpdateInput>
  }

  /**
   * ContributorContribution delete
   */
  export type ContributorContributionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
    /**
     * Filter which ContributorContribution to delete.
     */
    where: ContributorContributionWhereUniqueInput
  }

  /**
   * ContributorContribution deleteMany
   */
  export type ContributorContributionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributorContributions to delete
     */
    where?: ContributorContributionWhereInput
    /**
     * Limit how many ContributorContributions to delete.
     */
    limit?: number
  }

  /**
   * ContributorContribution without action
   */
  export type ContributorContributionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorContribution
     */
    select?: ContributorContributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorContribution
     */
    omit?: ContributorContributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorContributionInclude<ExtArgs> | null
  }


  /**
   * Model DocumentationContent
   */

  export type AggregateDocumentationContent = {
    _count: DocumentationContentCountAggregateOutputType | null
    _avg: DocumentationContentAvgAggregateOutputType | null
    _sum: DocumentationContentSumAggregateOutputType | null
    _min: DocumentationContentMinAggregateOutputType | null
    _max: DocumentationContentMaxAggregateOutputType | null
  }

  export type DocumentationContentAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type DocumentationContentSumAggregateOutputType = {
    orderIndex: number[]
  }

  export type DocumentationContentMinAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    filePath: string | null
    groupSlug: string | null
    title: string | null
    content: string | null
    description: string | null
    version: string | null
    status: string | null
    emoji: string | null
    faIcon: string | null
    hidden: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentationContentMaxAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    filePath: string | null
    groupSlug: string | null
    title: string | null
    content: string | null
    description: string | null
    version: string | null
    status: string | null
    emoji: string | null
    faIcon: string | null
    hidden: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentationContentCountAggregateOutputType = {
    id: number
    repositoryId: number
    filePath: number
    slug: number
    groupSlug: number
    title: number
    content: number
    description: number
    orderIndex: number
    version: number
    status: number
    emoji: number
    faIcon: number
    hidden: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentationContentAvgAggregateInputType = {
    orderIndex?: true
  }

  export type DocumentationContentSumAggregateInputType = {
    orderIndex?: true
  }

  export type DocumentationContentMinAggregateInputType = {
    id?: true
    repositoryId?: true
    filePath?: true
    groupSlug?: true
    title?: true
    content?: true
    description?: true
    version?: true
    status?: true
    emoji?: true
    faIcon?: true
    hidden?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentationContentMaxAggregateInputType = {
    id?: true
    repositoryId?: true
    filePath?: true
    groupSlug?: true
    title?: true
    content?: true
    description?: true
    version?: true
    status?: true
    emoji?: true
    faIcon?: true
    hidden?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentationContentCountAggregateInputType = {
    id?: true
    repositoryId?: true
    filePath?: true
    slug?: true
    groupSlug?: true
    title?: true
    content?: true
    description?: true
    orderIndex?: true
    version?: true
    status?: true
    emoji?: true
    faIcon?: true
    hidden?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentationContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentationContent to aggregate.
     */
    where?: DocumentationContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationContents to fetch.
     */
    orderBy?: DocumentationContentOrderByWithRelationInput | DocumentationContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentationContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentationContents
    **/
    _count?: true | DocumentationContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentationContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentationContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentationContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentationContentMaxAggregateInputType
  }

  export type GetDocumentationContentAggregateType<T extends DocumentationContentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentationContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentationContent[P]>
      : GetScalarType<T[P], AggregateDocumentationContent[P]>
  }




  export type DocumentationContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentationContentWhereInput
    orderBy?: DocumentationContentOrderByWithAggregationInput | DocumentationContentOrderByWithAggregationInput[]
    by: DocumentationContentScalarFieldEnum[] | DocumentationContentScalarFieldEnum
    having?: DocumentationContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentationContentCountAggregateInputType | true
    _avg?: DocumentationContentAvgAggregateInputType
    _sum?: DocumentationContentSumAggregateInputType
    _min?: DocumentationContentMinAggregateInputType
    _max?: DocumentationContentMaxAggregateInputType
  }

  export type DocumentationContentGroupByOutputType = {
    id: string
    repositoryId: string
    filePath: string
    slug: string[]
    groupSlug: string
    title: string
    content: string
    description: string | null
    orderIndex: number[]
    version: string | null
    status: string | null
    emoji: string | null
    faIcon: string | null
    hidden: boolean
    createdAt: Date
    updatedAt: Date
    _count: DocumentationContentCountAggregateOutputType | null
    _avg: DocumentationContentAvgAggregateOutputType | null
    _sum: DocumentationContentSumAggregateOutputType | null
    _min: DocumentationContentMinAggregateOutputType | null
    _max: DocumentationContentMaxAggregateOutputType | null
  }

  type GetDocumentationContentGroupByPayload<T extends DocumentationContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentationContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentationContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentationContentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentationContentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentationContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    filePath?: boolean
    slug?: boolean
    groupSlug?: boolean
    title?: boolean
    content?: boolean
    description?: boolean
    orderIndex?: boolean
    version?: boolean
    status?: boolean
    emoji?: boolean
    faIcon?: boolean
    hidden?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationContent"]>

  export type DocumentationContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    filePath?: boolean
    slug?: boolean
    groupSlug?: boolean
    title?: boolean
    content?: boolean
    description?: boolean
    orderIndex?: boolean
    version?: boolean
    status?: boolean
    emoji?: boolean
    faIcon?: boolean
    hidden?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationContent"]>

  export type DocumentationContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    filePath?: boolean
    slug?: boolean
    groupSlug?: boolean
    title?: boolean
    content?: boolean
    description?: boolean
    orderIndex?: boolean
    version?: boolean
    status?: boolean
    emoji?: boolean
    faIcon?: boolean
    hidden?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationContent"]>

  export type DocumentationContentSelectScalar = {
    id?: boolean
    repositoryId?: boolean
    filePath?: boolean
    slug?: boolean
    groupSlug?: boolean
    title?: boolean
    content?: boolean
    description?: boolean
    orderIndex?: boolean
    version?: boolean
    status?: boolean
    emoji?: boolean
    faIcon?: boolean
    hidden?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentationContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repositoryId" | "filePath" | "slug" | "groupSlug" | "title" | "content" | "description" | "orderIndex" | "version" | "status" | "emoji" | "faIcon" | "hidden" | "createdAt" | "updatedAt", ExtArgs["result"]["documentationContent"]>
  export type DocumentationContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type DocumentationContentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type DocumentationContentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $DocumentationContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentationContent"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repositoryId: string
      filePath: string
      slug: string[]
      groupSlug: string
      title: string
      content: string
      description: string | null
      orderIndex: number[]
      version: string | null
      status: string | null
      emoji: string | null
      faIcon: string | null
      hidden: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["documentationContent"]>
    composites: {}
  }

  type DocumentationContentGetPayload<S extends boolean | null | undefined | DocumentationContentDefaultArgs> = $Result.GetResult<Prisma.$DocumentationContentPayload, S>

  type DocumentationContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentationContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentationContentCountAggregateInputType | true
    }

  export interface DocumentationContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentationContent'], meta: { name: 'DocumentationContent' } }
    /**
     * Find zero or one DocumentationContent that matches the filter.
     * @param {DocumentationContentFindUniqueArgs} args - Arguments to find a DocumentationContent
     * @example
     * // Get one DocumentationContent
     * const documentationContent = await prisma.documentationContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentationContentFindUniqueArgs>(args: SelectSubset<T, DocumentationContentFindUniqueArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentationContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentationContentFindUniqueOrThrowArgs} args - Arguments to find a DocumentationContent
     * @example
     * // Get one DocumentationContent
     * const documentationContent = await prisma.documentationContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentationContentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentationContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentationContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentFindFirstArgs} args - Arguments to find a DocumentationContent
     * @example
     * // Get one DocumentationContent
     * const documentationContent = await prisma.documentationContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentationContentFindFirstArgs>(args?: SelectSubset<T, DocumentationContentFindFirstArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentationContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentFindFirstOrThrowArgs} args - Arguments to find a DocumentationContent
     * @example
     * // Get one DocumentationContent
     * const documentationContent = await prisma.documentationContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentationContentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentationContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentationContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentationContents
     * const documentationContents = await prisma.documentationContent.findMany()
     * 
     * // Get first 10 DocumentationContents
     * const documentationContents = await prisma.documentationContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentationContentWithIdOnly = await prisma.documentationContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentationContentFindManyArgs>(args?: SelectSubset<T, DocumentationContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentationContent.
     * @param {DocumentationContentCreateArgs} args - Arguments to create a DocumentationContent.
     * @example
     * // Create one DocumentationContent
     * const DocumentationContent = await prisma.documentationContent.create({
     *   data: {
     *     // ... data to create a DocumentationContent
     *   }
     * })
     * 
     */
    create<T extends DocumentationContentCreateArgs>(args: SelectSubset<T, DocumentationContentCreateArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentationContents.
     * @param {DocumentationContentCreateManyArgs} args - Arguments to create many DocumentationContents.
     * @example
     * // Create many DocumentationContents
     * const documentationContent = await prisma.documentationContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentationContentCreateManyArgs>(args?: SelectSubset<T, DocumentationContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentationContents and returns the data saved in the database.
     * @param {DocumentationContentCreateManyAndReturnArgs} args - Arguments to create many DocumentationContents.
     * @example
     * // Create many DocumentationContents
     * const documentationContent = await prisma.documentationContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentationContents and only return the `id`
     * const documentationContentWithIdOnly = await prisma.documentationContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentationContentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentationContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentationContent.
     * @param {DocumentationContentDeleteArgs} args - Arguments to delete one DocumentationContent.
     * @example
     * // Delete one DocumentationContent
     * const DocumentationContent = await prisma.documentationContent.delete({
     *   where: {
     *     // ... filter to delete one DocumentationContent
     *   }
     * })
     * 
     */
    delete<T extends DocumentationContentDeleteArgs>(args: SelectSubset<T, DocumentationContentDeleteArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentationContent.
     * @param {DocumentationContentUpdateArgs} args - Arguments to update one DocumentationContent.
     * @example
     * // Update one DocumentationContent
     * const documentationContent = await prisma.documentationContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentationContentUpdateArgs>(args: SelectSubset<T, DocumentationContentUpdateArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentationContents.
     * @param {DocumentationContentDeleteManyArgs} args - Arguments to filter DocumentationContents to delete.
     * @example
     * // Delete a few DocumentationContents
     * const { count } = await prisma.documentationContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentationContentDeleteManyArgs>(args?: SelectSubset<T, DocumentationContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentationContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentationContents
     * const documentationContent = await prisma.documentationContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentationContentUpdateManyArgs>(args: SelectSubset<T, DocumentationContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentationContents and returns the data updated in the database.
     * @param {DocumentationContentUpdateManyAndReturnArgs} args - Arguments to update many DocumentationContents.
     * @example
     * // Update many DocumentationContents
     * const documentationContent = await prisma.documentationContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentationContents and only return the `id`
     * const documentationContentWithIdOnly = await prisma.documentationContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentationContentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentationContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentationContent.
     * @param {DocumentationContentUpsertArgs} args - Arguments to update or create a DocumentationContent.
     * @example
     * // Update or create a DocumentationContent
     * const documentationContent = await prisma.documentationContent.upsert({
     *   create: {
     *     // ... data to create a DocumentationContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentationContent we want to update
     *   }
     * })
     */
    upsert<T extends DocumentationContentUpsertArgs>(args: SelectSubset<T, DocumentationContentUpsertArgs<ExtArgs>>): Prisma__DocumentationContentClient<$Result.GetResult<Prisma.$DocumentationContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentationContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentCountArgs} args - Arguments to filter DocumentationContents to count.
     * @example
     * // Count the number of DocumentationContents
     * const count = await prisma.documentationContent.count({
     *   where: {
     *     // ... the filter for the DocumentationContents we want to count
     *   }
     * })
    **/
    count<T extends DocumentationContentCountArgs>(
      args?: Subset<T, DocumentationContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentationContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentationContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentationContentAggregateArgs>(args: Subset<T, DocumentationContentAggregateArgs>): Prisma.PrismaPromise<GetDocumentationContentAggregateType<T>>

    /**
     * Group by DocumentationContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentationContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentationContentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentationContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentationContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentationContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentationContent model
   */
  readonly fields: DocumentationContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentationContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentationContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentationContent model
   */
  interface DocumentationContentFieldRefs {
    readonly id: FieldRef<"DocumentationContent", 'String'>
    readonly repositoryId: FieldRef<"DocumentationContent", 'String'>
    readonly filePath: FieldRef<"DocumentationContent", 'String'>
    readonly slug: FieldRef<"DocumentationContent", 'String[]'>
    readonly groupSlug: FieldRef<"DocumentationContent", 'String'>
    readonly title: FieldRef<"DocumentationContent", 'String'>
    readonly content: FieldRef<"DocumentationContent", 'String'>
    readonly description: FieldRef<"DocumentationContent", 'String'>
    readonly orderIndex: FieldRef<"DocumentationContent", 'Int[]'>
    readonly version: FieldRef<"DocumentationContent", 'String'>
    readonly status: FieldRef<"DocumentationContent", 'String'>
    readonly emoji: FieldRef<"DocumentationContent", 'String'>
    readonly faIcon: FieldRef<"DocumentationContent", 'String'>
    readonly hidden: FieldRef<"DocumentationContent", 'Boolean'>
    readonly createdAt: FieldRef<"DocumentationContent", 'DateTime'>
    readonly updatedAt: FieldRef<"DocumentationContent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentationContent findUnique
   */
  export type DocumentationContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationContent to fetch.
     */
    where: DocumentationContentWhereUniqueInput
  }

  /**
   * DocumentationContent findUniqueOrThrow
   */
  export type DocumentationContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationContent to fetch.
     */
    where: DocumentationContentWhereUniqueInput
  }

  /**
   * DocumentationContent findFirst
   */
  export type DocumentationContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationContent to fetch.
     */
    where?: DocumentationContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationContents to fetch.
     */
    orderBy?: DocumentationContentOrderByWithRelationInput | DocumentationContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentationContents.
     */
    cursor?: DocumentationContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentationContents.
     */
    distinct?: DocumentationContentScalarFieldEnum | DocumentationContentScalarFieldEnum[]
  }

  /**
   * DocumentationContent findFirstOrThrow
   */
  export type DocumentationContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationContent to fetch.
     */
    where?: DocumentationContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationContents to fetch.
     */
    orderBy?: DocumentationContentOrderByWithRelationInput | DocumentationContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentationContents.
     */
    cursor?: DocumentationContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentationContents.
     */
    distinct?: DocumentationContentScalarFieldEnum | DocumentationContentScalarFieldEnum[]
  }

  /**
   * DocumentationContent findMany
   */
  export type DocumentationContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationContents to fetch.
     */
    where?: DocumentationContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationContents to fetch.
     */
    orderBy?: DocumentationContentOrderByWithRelationInput | DocumentationContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentationContents.
     */
    cursor?: DocumentationContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationContents.
     */
    skip?: number
    distinct?: DocumentationContentScalarFieldEnum | DocumentationContentScalarFieldEnum[]
  }

  /**
   * DocumentationContent create
   */
  export type DocumentationContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentationContent.
     */
    data: XOR<DocumentationContentCreateInput, DocumentationContentUncheckedCreateInput>
  }

  /**
   * DocumentationContent createMany
   */
  export type DocumentationContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentationContents.
     */
    data: DocumentationContentCreateManyInput | DocumentationContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentationContent createManyAndReturn
   */
  export type DocumentationContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentationContents.
     */
    data: DocumentationContentCreateManyInput | DocumentationContentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentationContent update
   */
  export type DocumentationContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentationContent.
     */
    data: XOR<DocumentationContentUpdateInput, DocumentationContentUncheckedUpdateInput>
    /**
     * Choose, which DocumentationContent to update.
     */
    where: DocumentationContentWhereUniqueInput
  }

  /**
   * DocumentationContent updateMany
   */
  export type DocumentationContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentationContents.
     */
    data: XOR<DocumentationContentUpdateManyMutationInput, DocumentationContentUncheckedUpdateManyInput>
    /**
     * Filter which DocumentationContents to update
     */
    where?: DocumentationContentWhereInput
    /**
     * Limit how many DocumentationContents to update.
     */
    limit?: number
  }

  /**
   * DocumentationContent updateManyAndReturn
   */
  export type DocumentationContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * The data used to update DocumentationContents.
     */
    data: XOR<DocumentationContentUpdateManyMutationInput, DocumentationContentUncheckedUpdateManyInput>
    /**
     * Filter which DocumentationContents to update
     */
    where?: DocumentationContentWhereInput
    /**
     * Limit how many DocumentationContents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentationContent upsert
   */
  export type DocumentationContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentationContent to update in case it exists.
     */
    where: DocumentationContentWhereUniqueInput
    /**
     * In case the DocumentationContent found by the `where` argument doesn't exist, create a new DocumentationContent with this data.
     */
    create: XOR<DocumentationContentCreateInput, DocumentationContentUncheckedCreateInput>
    /**
     * In case the DocumentationContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentationContentUpdateInput, DocumentationContentUncheckedUpdateInput>
  }

  /**
   * DocumentationContent delete
   */
  export type DocumentationContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
    /**
     * Filter which DocumentationContent to delete.
     */
    where: DocumentationContentWhereUniqueInput
  }

  /**
   * DocumentationContent deleteMany
   */
  export type DocumentationContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentationContents to delete
     */
    where?: DocumentationContentWhereInput
    /**
     * Limit how many DocumentationContents to delete.
     */
    limit?: number
  }

  /**
   * DocumentationContent without action
   */
  export type DocumentationContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationContent
     */
    select?: DocumentationContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationContent
     */
    omit?: DocumentationContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationContentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentationMetadata
   */

  export type AggregateDocumentationMetadata = {
    _count: DocumentationMetadataCountAggregateOutputType | null
    _avg: DocumentationMetadataAvgAggregateOutputType | null
    _sum: DocumentationMetadataSumAggregateOutputType | null
    _min: DocumentationMetadataMinAggregateOutputType | null
    _max: DocumentationMetadataMaxAggregateOutputType | null
  }

  export type DocumentationMetadataAvgAggregateOutputType = {
    fileCount: number | null
    totalSize: number | null
  }

  export type DocumentationMetadataSumAggregateOutputType = {
    fileCount: number | null
    totalSize: number | null
  }

  export type DocumentationMetadataMinAggregateOutputType = {
    repositoryId: string | null
    version: string | null
    lastCommitSha: string | null
    lastSyncedAt: Date | null
    fileCount: number | null
    totalSize: number | null
  }

  export type DocumentationMetadataMaxAggregateOutputType = {
    repositoryId: string | null
    version: string | null
    lastCommitSha: string | null
    lastSyncedAt: Date | null
    fileCount: number | null
    totalSize: number | null
  }

  export type DocumentationMetadataCountAggregateOutputType = {
    repositoryId: number
    version: number
    lastCommitSha: number
    lastSyncedAt: number
    fileCount: number
    totalSize: number
    _all: number
  }


  export type DocumentationMetadataAvgAggregateInputType = {
    fileCount?: true
    totalSize?: true
  }

  export type DocumentationMetadataSumAggregateInputType = {
    fileCount?: true
    totalSize?: true
  }

  export type DocumentationMetadataMinAggregateInputType = {
    repositoryId?: true
    version?: true
    lastCommitSha?: true
    lastSyncedAt?: true
    fileCount?: true
    totalSize?: true
  }

  export type DocumentationMetadataMaxAggregateInputType = {
    repositoryId?: true
    version?: true
    lastCommitSha?: true
    lastSyncedAt?: true
    fileCount?: true
    totalSize?: true
  }

  export type DocumentationMetadataCountAggregateInputType = {
    repositoryId?: true
    version?: true
    lastCommitSha?: true
    lastSyncedAt?: true
    fileCount?: true
    totalSize?: true
    _all?: true
  }

  export type DocumentationMetadataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentationMetadata to aggregate.
     */
    where?: DocumentationMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationMetadata to fetch.
     */
    orderBy?: DocumentationMetadataOrderByWithRelationInput | DocumentationMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentationMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentationMetadata
    **/
    _count?: true | DocumentationMetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentationMetadataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentationMetadataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentationMetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentationMetadataMaxAggregateInputType
  }

  export type GetDocumentationMetadataAggregateType<T extends DocumentationMetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentationMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentationMetadata[P]>
      : GetScalarType<T[P], AggregateDocumentationMetadata[P]>
  }




  export type DocumentationMetadataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentationMetadataWhereInput
    orderBy?: DocumentationMetadataOrderByWithAggregationInput | DocumentationMetadataOrderByWithAggregationInput[]
    by: DocumentationMetadataScalarFieldEnum[] | DocumentationMetadataScalarFieldEnum
    having?: DocumentationMetadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentationMetadataCountAggregateInputType | true
    _avg?: DocumentationMetadataAvgAggregateInputType
    _sum?: DocumentationMetadataSumAggregateInputType
    _min?: DocumentationMetadataMinAggregateInputType
    _max?: DocumentationMetadataMaxAggregateInputType
  }

  export type DocumentationMetadataGroupByOutputType = {
    repositoryId: string
    version: string
    lastCommitSha: string | null
    lastSyncedAt: Date
    fileCount: number
    totalSize: number
    _count: DocumentationMetadataCountAggregateOutputType | null
    _avg: DocumentationMetadataAvgAggregateOutputType | null
    _sum: DocumentationMetadataSumAggregateOutputType | null
    _min: DocumentationMetadataMinAggregateOutputType | null
    _max: DocumentationMetadataMaxAggregateOutputType | null
  }

  type GetDocumentationMetadataGroupByPayload<T extends DocumentationMetadataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentationMetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentationMetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentationMetadataGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentationMetadataGroupByOutputType[P]>
        }
      >
    >


  export type DocumentationMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    repositoryId?: boolean
    version?: boolean
    lastCommitSha?: boolean
    lastSyncedAt?: boolean
    fileCount?: boolean
    totalSize?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationMetadata"]>

  export type DocumentationMetadataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    repositoryId?: boolean
    version?: boolean
    lastCommitSha?: boolean
    lastSyncedAt?: boolean
    fileCount?: boolean
    totalSize?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationMetadata"]>

  export type DocumentationMetadataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    repositoryId?: boolean
    version?: boolean
    lastCommitSha?: boolean
    lastSyncedAt?: boolean
    fileCount?: boolean
    totalSize?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentationMetadata"]>

  export type DocumentationMetadataSelectScalar = {
    repositoryId?: boolean
    version?: boolean
    lastCommitSha?: boolean
    lastSyncedAt?: boolean
    fileCount?: boolean
    totalSize?: boolean
  }

  export type DocumentationMetadataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"repositoryId" | "version" | "lastCommitSha" | "lastSyncedAt" | "fileCount" | "totalSize", ExtArgs["result"]["documentationMetadata"]>
  export type DocumentationMetadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type DocumentationMetadataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }
  export type DocumentationMetadataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
  }

  export type $DocumentationMetadataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentationMetadata"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      repositoryId: string
      version: string
      lastCommitSha: string | null
      lastSyncedAt: Date
      fileCount: number
      totalSize: number
    }, ExtArgs["result"]["documentationMetadata"]>
    composites: {}
  }

  type DocumentationMetadataGetPayload<S extends boolean | null | undefined | DocumentationMetadataDefaultArgs> = $Result.GetResult<Prisma.$DocumentationMetadataPayload, S>

  type DocumentationMetadataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentationMetadataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentationMetadataCountAggregateInputType | true
    }

  export interface DocumentationMetadataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentationMetadata'], meta: { name: 'DocumentationMetadata' } }
    /**
     * Find zero or one DocumentationMetadata that matches the filter.
     * @param {DocumentationMetadataFindUniqueArgs} args - Arguments to find a DocumentationMetadata
     * @example
     * // Get one DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentationMetadataFindUniqueArgs>(args: SelectSubset<T, DocumentationMetadataFindUniqueArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentationMetadata that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentationMetadataFindUniqueOrThrowArgs} args - Arguments to find a DocumentationMetadata
     * @example
     * // Get one DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentationMetadataFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentationMetadataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentationMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataFindFirstArgs} args - Arguments to find a DocumentationMetadata
     * @example
     * // Get one DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentationMetadataFindFirstArgs>(args?: SelectSubset<T, DocumentationMetadataFindFirstArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentationMetadata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataFindFirstOrThrowArgs} args - Arguments to find a DocumentationMetadata
     * @example
     * // Get one DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentationMetadataFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentationMetadataFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentationMetadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findMany()
     * 
     * // Get first 10 DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.findMany({ take: 10 })
     * 
     * // Only select the `repositoryId`
     * const documentationMetadataWithRepositoryIdOnly = await prisma.documentationMetadata.findMany({ select: { repositoryId: true } })
     * 
     */
    findMany<T extends DocumentationMetadataFindManyArgs>(args?: SelectSubset<T, DocumentationMetadataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentationMetadata.
     * @param {DocumentationMetadataCreateArgs} args - Arguments to create a DocumentationMetadata.
     * @example
     * // Create one DocumentationMetadata
     * const DocumentationMetadata = await prisma.documentationMetadata.create({
     *   data: {
     *     // ... data to create a DocumentationMetadata
     *   }
     * })
     * 
     */
    create<T extends DocumentationMetadataCreateArgs>(args: SelectSubset<T, DocumentationMetadataCreateArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentationMetadata.
     * @param {DocumentationMetadataCreateManyArgs} args - Arguments to create many DocumentationMetadata.
     * @example
     * // Create many DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentationMetadataCreateManyArgs>(args?: SelectSubset<T, DocumentationMetadataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentationMetadata and returns the data saved in the database.
     * @param {DocumentationMetadataCreateManyAndReturnArgs} args - Arguments to create many DocumentationMetadata.
     * @example
     * // Create many DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentationMetadata and only return the `repositoryId`
     * const documentationMetadataWithRepositoryIdOnly = await prisma.documentationMetadata.createManyAndReturn({
     *   select: { repositoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentationMetadataCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentationMetadataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentationMetadata.
     * @param {DocumentationMetadataDeleteArgs} args - Arguments to delete one DocumentationMetadata.
     * @example
     * // Delete one DocumentationMetadata
     * const DocumentationMetadata = await prisma.documentationMetadata.delete({
     *   where: {
     *     // ... filter to delete one DocumentationMetadata
     *   }
     * })
     * 
     */
    delete<T extends DocumentationMetadataDeleteArgs>(args: SelectSubset<T, DocumentationMetadataDeleteArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentationMetadata.
     * @param {DocumentationMetadataUpdateArgs} args - Arguments to update one DocumentationMetadata.
     * @example
     * // Update one DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentationMetadataUpdateArgs>(args: SelectSubset<T, DocumentationMetadataUpdateArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentationMetadata.
     * @param {DocumentationMetadataDeleteManyArgs} args - Arguments to filter DocumentationMetadata to delete.
     * @example
     * // Delete a few DocumentationMetadata
     * const { count } = await prisma.documentationMetadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentationMetadataDeleteManyArgs>(args?: SelectSubset<T, DocumentationMetadataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentationMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentationMetadataUpdateManyArgs>(args: SelectSubset<T, DocumentationMetadataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentationMetadata and returns the data updated in the database.
     * @param {DocumentationMetadataUpdateManyAndReturnArgs} args - Arguments to update many DocumentationMetadata.
     * @example
     * // Update many DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentationMetadata and only return the `repositoryId`
     * const documentationMetadataWithRepositoryIdOnly = await prisma.documentationMetadata.updateManyAndReturn({
     *   select: { repositoryId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentationMetadataUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentationMetadataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentationMetadata.
     * @param {DocumentationMetadataUpsertArgs} args - Arguments to update or create a DocumentationMetadata.
     * @example
     * // Update or create a DocumentationMetadata
     * const documentationMetadata = await prisma.documentationMetadata.upsert({
     *   create: {
     *     // ... data to create a DocumentationMetadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentationMetadata we want to update
     *   }
     * })
     */
    upsert<T extends DocumentationMetadataUpsertArgs>(args: SelectSubset<T, DocumentationMetadataUpsertArgs<ExtArgs>>): Prisma__DocumentationMetadataClient<$Result.GetResult<Prisma.$DocumentationMetadataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentationMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataCountArgs} args - Arguments to filter DocumentationMetadata to count.
     * @example
     * // Count the number of DocumentationMetadata
     * const count = await prisma.documentationMetadata.count({
     *   where: {
     *     // ... the filter for the DocumentationMetadata we want to count
     *   }
     * })
    **/
    count<T extends DocumentationMetadataCountArgs>(
      args?: Subset<T, DocumentationMetadataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentationMetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentationMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentationMetadataAggregateArgs>(args: Subset<T, DocumentationMetadataAggregateArgs>): Prisma.PrismaPromise<GetDocumentationMetadataAggregateType<T>>

    /**
     * Group by DocumentationMetadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentationMetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentationMetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentationMetadataGroupByArgs['orderBy'] }
        : { orderBy?: DocumentationMetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentationMetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentationMetadataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentationMetadata model
   */
  readonly fields: DocumentationMetadataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentationMetadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentationMetadataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentationMetadata model
   */
  interface DocumentationMetadataFieldRefs {
    readonly repositoryId: FieldRef<"DocumentationMetadata", 'String'>
    readonly version: FieldRef<"DocumentationMetadata", 'String'>
    readonly lastCommitSha: FieldRef<"DocumentationMetadata", 'String'>
    readonly lastSyncedAt: FieldRef<"DocumentationMetadata", 'DateTime'>
    readonly fileCount: FieldRef<"DocumentationMetadata", 'Int'>
    readonly totalSize: FieldRef<"DocumentationMetadata", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DocumentationMetadata findUnique
   */
  export type DocumentationMetadataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationMetadata to fetch.
     */
    where: DocumentationMetadataWhereUniqueInput
  }

  /**
   * DocumentationMetadata findUniqueOrThrow
   */
  export type DocumentationMetadataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationMetadata to fetch.
     */
    where: DocumentationMetadataWhereUniqueInput
  }

  /**
   * DocumentationMetadata findFirst
   */
  export type DocumentationMetadataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationMetadata to fetch.
     */
    where?: DocumentationMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationMetadata to fetch.
     */
    orderBy?: DocumentationMetadataOrderByWithRelationInput | DocumentationMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentationMetadata.
     */
    cursor?: DocumentationMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentationMetadata.
     */
    distinct?: DocumentationMetadataScalarFieldEnum | DocumentationMetadataScalarFieldEnum[]
  }

  /**
   * DocumentationMetadata findFirstOrThrow
   */
  export type DocumentationMetadataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationMetadata to fetch.
     */
    where?: DocumentationMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationMetadata to fetch.
     */
    orderBy?: DocumentationMetadataOrderByWithRelationInput | DocumentationMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentationMetadata.
     */
    cursor?: DocumentationMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationMetadata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentationMetadata.
     */
    distinct?: DocumentationMetadataScalarFieldEnum | DocumentationMetadataScalarFieldEnum[]
  }

  /**
   * DocumentationMetadata findMany
   */
  export type DocumentationMetadataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter, which DocumentationMetadata to fetch.
     */
    where?: DocumentationMetadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentationMetadata to fetch.
     */
    orderBy?: DocumentationMetadataOrderByWithRelationInput | DocumentationMetadataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentationMetadata.
     */
    cursor?: DocumentationMetadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentationMetadata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentationMetadata.
     */
    skip?: number
    distinct?: DocumentationMetadataScalarFieldEnum | DocumentationMetadataScalarFieldEnum[]
  }

  /**
   * DocumentationMetadata create
   */
  export type DocumentationMetadataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentationMetadata.
     */
    data: XOR<DocumentationMetadataCreateInput, DocumentationMetadataUncheckedCreateInput>
  }

  /**
   * DocumentationMetadata createMany
   */
  export type DocumentationMetadataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentationMetadata.
     */
    data: DocumentationMetadataCreateManyInput | DocumentationMetadataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentationMetadata createManyAndReturn
   */
  export type DocumentationMetadataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentationMetadata.
     */
    data: DocumentationMetadataCreateManyInput | DocumentationMetadataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentationMetadata update
   */
  export type DocumentationMetadataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentationMetadata.
     */
    data: XOR<DocumentationMetadataUpdateInput, DocumentationMetadataUncheckedUpdateInput>
    /**
     * Choose, which DocumentationMetadata to update.
     */
    where: DocumentationMetadataWhereUniqueInput
  }

  /**
   * DocumentationMetadata updateMany
   */
  export type DocumentationMetadataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentationMetadata.
     */
    data: XOR<DocumentationMetadataUpdateManyMutationInput, DocumentationMetadataUncheckedUpdateManyInput>
    /**
     * Filter which DocumentationMetadata to update
     */
    where?: DocumentationMetadataWhereInput
    /**
     * Limit how many DocumentationMetadata to update.
     */
    limit?: number
  }

  /**
   * DocumentationMetadata updateManyAndReturn
   */
  export type DocumentationMetadataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * The data used to update DocumentationMetadata.
     */
    data: XOR<DocumentationMetadataUpdateManyMutationInput, DocumentationMetadataUncheckedUpdateManyInput>
    /**
     * Filter which DocumentationMetadata to update
     */
    where?: DocumentationMetadataWhereInput
    /**
     * Limit how many DocumentationMetadata to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentationMetadata upsert
   */
  export type DocumentationMetadataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentationMetadata to update in case it exists.
     */
    where: DocumentationMetadataWhereUniqueInput
    /**
     * In case the DocumentationMetadata found by the `where` argument doesn't exist, create a new DocumentationMetadata with this data.
     */
    create: XOR<DocumentationMetadataCreateInput, DocumentationMetadataUncheckedCreateInput>
    /**
     * In case the DocumentationMetadata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentationMetadataUpdateInput, DocumentationMetadataUncheckedUpdateInput>
  }

  /**
   * DocumentationMetadata delete
   */
  export type DocumentationMetadataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
    /**
     * Filter which DocumentationMetadata to delete.
     */
    where: DocumentationMetadataWhereUniqueInput
  }

  /**
   * DocumentationMetadata deleteMany
   */
  export type DocumentationMetadataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentationMetadata to delete
     */
    where?: DocumentationMetadataWhereInput
    /**
     * Limit how many DocumentationMetadata to delete.
     */
    limit?: number
  }

  /**
   * DocumentationMetadata without action
   */
  export type DocumentationMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentationMetadata
     */
    select?: DocumentationMetadataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentationMetadata
     */
    omit?: DocumentationMetadataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentationMetadataInclude<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: string | null
    syncType: string | null
    repositoryId: string | null
    status: $Enums.SyncStatus | null
    startedAt: Date | null
    completedAt: Date | null
    errorMessage: string | null
    recordsProcessed: number | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: string | null
    syncType: string | null
    repositoryId: string | null
    status: $Enums.SyncStatus | null
    startedAt: Date | null
    completedAt: Date | null
    errorMessage: string | null
    recordsProcessed: number | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    syncType: number
    repositoryId: number
    status: number
    startedAt: number
    completedAt: number
    errorMessage: number
    recordsProcessed: number
    metadata: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    recordsProcessed?: true
  }

  export type SyncLogSumAggregateInputType = {
    recordsProcessed?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    syncType?: true
    repositoryId?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorMessage?: true
    recordsProcessed?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    syncType?: true
    repositoryId?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorMessage?: true
    recordsProcessed?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    syncType?: true
    repositoryId?: true
    status?: true
    startedAt?: true
    completedAt?: true
    errorMessage?: true
    recordsProcessed?: true
    metadata?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: string
    syncType: string
    repositoryId: string | null
    status: $Enums.SyncStatus
    startedAt: Date
    completedAt: Date | null
    errorMessage: string | null
    recordsProcessed: number | null
    metadata: JsonValue
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    syncType?: boolean
    repositoryId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
    recordsProcessed?: boolean
    metadata?: boolean
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    syncType?: boolean
    repositoryId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
    recordsProcessed?: boolean
    metadata?: boolean
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    syncType?: boolean
    repositoryId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
    recordsProcessed?: boolean
    metadata?: boolean
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    syncType?: boolean
    repositoryId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    errorMessage?: boolean
    recordsProcessed?: boolean
    metadata?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "syncType" | "repositoryId" | "status" | "startedAt" | "completedAt" | "errorMessage" | "recordsProcessed" | "metadata", ExtArgs["result"]["syncLog"]>
  export type SyncLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }
  export type SyncLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }
  export type SyncLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | SyncLog$repositoryArgs<ExtArgs>
  }

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      syncType: string
      repositoryId: string | null
      status: $Enums.SyncStatus
      startedAt: Date
      completedAt: Date | null
      errorMessage: string | null
      recordsProcessed: number | null
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends SyncLog$repositoryArgs<ExtArgs> = {}>(args?: Subset<T, SyncLog$repositoryArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'String'>
    readonly syncType: FieldRef<"SyncLog", 'String'>
    readonly repositoryId: FieldRef<"SyncLog", 'String'>
    readonly status: FieldRef<"SyncLog", 'SyncStatus'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly completedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly errorMessage: FieldRef<"SyncLog", 'String'>
    readonly recordsProcessed: FieldRef<"SyncLog", 'Int'>
    readonly metadata: FieldRef<"SyncLog", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog.repository
   */
  export type SyncLog$repositoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    where?: RepositoryWhereInput
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SyncLogInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    description: string | null
    section: string | null
    appliedTo: string | null
    type: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    description: string | null
    section: string | null
    appliedTo: string | null
    type: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    key: number
    title: number
    description: number
    section: number
    appliedTo: number
    type: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingsMinAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    section?: true
    appliedTo?: true
    type?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    section?: true
    appliedTo?: true
    type?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    section?: true
    appliedTo?: true
    type?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: string
    key: string
    title: string
    description: string
    section: string
    appliedTo: string
    type: string
    value: string
    createdAt: Date
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    section?: boolean
    appliedTo?: boolean
    type?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    section?: boolean
    appliedTo?: boolean
    type?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    section?: boolean
    appliedTo?: boolean
    type?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    section?: boolean
    appliedTo?: boolean
    type?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "title" | "description" | "section" | "appliedTo" | "type" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["settings"]>

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      title: string
      description: string
      section: string
      appliedTo: string
      type: string
      value: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingsUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'String'>
    readonly key: FieldRef<"Settings", 'String'>
    readonly title: FieldRef<"Settings", 'String'>
    readonly description: FieldRef<"Settings", 'String'>
    readonly section: FieldRef<"Settings", 'String'>
    readonly appliedTo: FieldRef<"Settings", 'String'>
    readonly type: FieldRef<"Settings", 'String'>
    readonly value: FieldRef<"Settings", 'String'>
    readonly createdAt: FieldRef<"Settings", 'DateTime'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings updateManyAndReturn
   */
  export type SettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RepositoryScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    name: 'name',
    fullName: 'fullName',
    owner: 'owner',
    description: 'description',
    private: 'private',
    published: 'published',
    fork: 'fork',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pushedAt: 'pushedAt',
    homepage: 'homepage',
    size: 'size',
    stargazersCount: 'stargazersCount',
    watchersCount: 'watchersCount',
    forksCount: 'forksCount',
    openIssuesCount: 'openIssuesCount',
    language: 'language',
    defaultBranch: 'defaultBranch',
    topics: 'topics',
    archived: 'archived',
    disabled: 'disabled',
    syncedAt: 'syncedAt',
    featured: 'featured',
    emoji: 'emoji',
    faIcon: 'faIcon',
    docsPath: 'docsPath'
  };

  export type RepositoryScalarFieldEnum = (typeof RepositoryScalarFieldEnum)[keyof typeof RepositoryScalarFieldEnum]


  export const IssueScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    repositoryId: 'repositoryId',
    number: 'number',
    title: 'title',
    body: 'body',
    state: 'state',
    userLogin: 'userLogin',
    userAvatarUrl: 'userAvatarUrl',
    labels: 'labels',
    assignees: 'assignees',
    commentsCount: 'commentsCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    closedAt: 'closedAt',
    syncedAt: 'syncedAt'
  };

  export type IssueScalarFieldEnum = (typeof IssueScalarFieldEnum)[keyof typeof IssueScalarFieldEnum]


  export const PullRequestScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    repositoryId: 'repositoryId',
    number: 'number',
    title: 'title',
    body: 'body',
    state: 'state',
    userLogin: 'userLogin',
    userAvatarUrl: 'userAvatarUrl',
    labels: 'labels',
    assignees: 'assignees',
    requestedReviewers: 'requestedReviewers',
    headRef: 'headRef',
    baseRef: 'baseRef',
    mergeable: 'mergeable',
    merged: 'merged',
    mergedAt: 'mergedAt',
    mergedBy: 'mergedBy',
    commentsCount: 'commentsCount',
    reviewCommentsCount: 'reviewCommentsCount',
    commitsCount: 'commitsCount',
    additions: 'additions',
    deletions: 'deletions',
    changedFiles: 'changedFiles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    closedAt: 'closedAt',
    syncedAt: 'syncedAt'
  };

  export type PullRequestScalarFieldEnum = (typeof PullRequestScalarFieldEnum)[keyof typeof PullRequestScalarFieldEnum]


  export const CommitScalarFieldEnum: {
    sha: 'sha',
    repositoryId: 'repositoryId',
    message: 'message',
    authorName: 'authorName',
    authorEmail: 'authorEmail',
    authorDate: 'authorDate',
    committerName: 'committerName',
    committerEmail: 'committerEmail',
    committerDate: 'committerDate',
    additions: 'additions',
    deletions: 'deletions',
    totalChanges: 'totalChanges',
    syncedAt: 'syncedAt'
  };

  export type CommitScalarFieldEnum = (typeof CommitScalarFieldEnum)[keyof typeof CommitScalarFieldEnum]


  export const ReleaseScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    repositoryId: 'repositoryId',
    tagName: 'tagName',
    name: 'name',
    body: 'body',
    draft: 'draft',
    prerelease: 'prerelease',
    authorLogin: 'authorLogin',
    authorAvatarUrl: 'authorAvatarUrl',
    createdAt: 'createdAt',
    publishedAt: 'publishedAt',
    syncedAt: 'syncedAt'
  };

  export type ReleaseScalarFieldEnum = (typeof ReleaseScalarFieldEnum)[keyof typeof ReleaseScalarFieldEnum]


  export const VersionTagScalarFieldEnum: {
    id: 'id',
    repositoryId: 'repositoryId',
    tagName: 'tagName',
    commitSha: 'commitSha',
    isLatest: 'isLatest',
    createdAt: 'createdAt',
    syncedAt: 'syncedAt'
  };

  export type VersionTagScalarFieldEnum = (typeof VersionTagScalarFieldEnum)[keyof typeof VersionTagScalarFieldEnum]


  export const ContributorScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    login: 'login',
    avatarUrl: 'avatarUrl',
    htmlUrl: 'htmlUrl',
    type: 'type',
    siteAdmin: 'siteAdmin',
    name: 'name',
    company: 'company',
    blog: 'blog',
    location: 'location',
    email: 'email',
    bio: 'bio',
    publicRepos: 'publicRepos',
    publicGists: 'publicGists',
    followers: 'followers',
    following: 'following',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    syncedAt: 'syncedAt'
  };

  export type ContributorScalarFieldEnum = (typeof ContributorScalarFieldEnum)[keyof typeof ContributorScalarFieldEnum]


  export const ContributorContributionScalarFieldEnum: {
    contributorId: 'contributorId',
    repositoryId: 'repositoryId',
    contributionsCount: 'contributionsCount',
    syncedAt: 'syncedAt'
  };

  export type ContributorContributionScalarFieldEnum = (typeof ContributorContributionScalarFieldEnum)[keyof typeof ContributorContributionScalarFieldEnum]


  export const DocumentationContentScalarFieldEnum: {
    id: 'id',
    repositoryId: 'repositoryId',
    filePath: 'filePath',
    slug: 'slug',
    groupSlug: 'groupSlug',
    title: 'title',
    content: 'content',
    description: 'description',
    orderIndex: 'orderIndex',
    version: 'version',
    status: 'status',
    emoji: 'emoji',
    faIcon: 'faIcon',
    hidden: 'hidden',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentationContentScalarFieldEnum = (typeof DocumentationContentScalarFieldEnum)[keyof typeof DocumentationContentScalarFieldEnum]


  export const DocumentationMetadataScalarFieldEnum: {
    repositoryId: 'repositoryId',
    version: 'version',
    lastCommitSha: 'lastCommitSha',
    lastSyncedAt: 'lastSyncedAt',
    fileCount: 'fileCount',
    totalSize: 'totalSize'
  };

  export type DocumentationMetadataScalarFieldEnum = (typeof DocumentationMetadataScalarFieldEnum)[keyof typeof DocumentationMetadataScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    syncType: 'syncType',
    repositoryId: 'repositoryId',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    errorMessage: 'errorMessage',
    recordsProcessed: 'recordsProcessed',
    metadata: 'metadata'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    key: 'key',
    title: 'title',
    description: 'description',
    section: 'section',
    appliedTo: 'appliedTo',
    type: 'type',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'IssueState'
   */
  export type EnumIssueStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IssueState'>
    


  /**
   * Reference to a field of type 'IssueState[]'
   */
  export type ListEnumIssueStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IssueState[]'>
    


  /**
   * Reference to a field of type 'PrState'
   */
  export type EnumPrStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrState'>
    


  /**
   * Reference to a field of type 'PrState[]'
   */
  export type ListEnumPrStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrState[]'>
    


  /**
   * Reference to a field of type 'SyncStatus'
   */
  export type EnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus'>
    


  /**
   * Reference to a field of type 'SyncStatus[]'
   */
  export type ListEnumSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SyncStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RepositoryWhereInput = {
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    id?: StringFilter<"Repository"> | string
    githubId?: BigIntFilter<"Repository"> | bigint | number
    name?: StringFilter<"Repository"> | string
    fullName?: StringFilter<"Repository"> | string
    owner?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    private?: BoolFilter<"Repository"> | boolean
    published?: BoolFilter<"Repository"> | boolean
    fork?: BoolFilter<"Repository"> | boolean
    createdAt?: DateTimeFilter<"Repository"> | Date | string
    updatedAt?: DateTimeFilter<"Repository"> | Date | string
    pushedAt?: DateTimeNullableFilter<"Repository"> | Date | string | null
    homepage?: StringNullableFilter<"Repository"> | string | null
    size?: IntFilter<"Repository"> | number
    stargazersCount?: IntFilter<"Repository"> | number
    watchersCount?: IntFilter<"Repository"> | number
    forksCount?: IntFilter<"Repository"> | number
    openIssuesCount?: IntFilter<"Repository"> | number
    language?: StringNullableFilter<"Repository"> | string | null
    defaultBranch?: StringFilter<"Repository"> | string
    topics?: StringNullableListFilter<"Repository">
    archived?: BoolFilter<"Repository"> | boolean
    disabled?: BoolFilter<"Repository"> | boolean
    syncedAt?: DateTimeFilter<"Repository"> | Date | string
    featured?: BoolFilter<"Repository"> | boolean
    emoji?: StringNullableFilter<"Repository"> | string | null
    faIcon?: StringNullableFilter<"Repository"> | string | null
    docsPath?: StringFilter<"Repository"> | string
    issues?: IssueListRelationFilter
    pullRequests?: PullRequestListRelationFilter
    commits?: CommitListRelationFilter
    releases?: ReleaseListRelationFilter
    versionTags?: VersionTagListRelationFilter
    contributions?: ContributorContributionListRelationFilter
    documentationContent?: DocumentationContentListRelationFilter
    documentationMetadata?: XOR<DocumentationMetadataNullableScalarRelationFilter, DocumentationMetadataWhereInput> | null
    syncLogs?: SyncLogListRelationFilter
  }

  export type RepositoryOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    owner?: SortOrder
    description?: SortOrderInput | SortOrder
    private?: SortOrder
    published?: SortOrder
    fork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pushedAt?: SortOrderInput | SortOrder
    homepage?: SortOrderInput | SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    language?: SortOrderInput | SortOrder
    defaultBranch?: SortOrder
    topics?: SortOrder
    archived?: SortOrder
    disabled?: SortOrder
    syncedAt?: SortOrder
    featured?: SortOrder
    emoji?: SortOrderInput | SortOrder
    faIcon?: SortOrderInput | SortOrder
    docsPath?: SortOrder
    issues?: IssueOrderByRelationAggregateInput
    pullRequests?: PullRequestOrderByRelationAggregateInput
    commits?: CommitOrderByRelationAggregateInput
    releases?: ReleaseOrderByRelationAggregateInput
    versionTags?: VersionTagOrderByRelationAggregateInput
    contributions?: ContributorContributionOrderByRelationAggregateInput
    documentationContent?: DocumentationContentOrderByRelationAggregateInput
    documentationMetadata?: DocumentationMetadataOrderByWithRelationInput
    syncLogs?: SyncLogOrderByRelationAggregateInput
  }

  export type RepositoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: bigint | number
    fullName?: string
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    name?: StringFilter<"Repository"> | string
    owner?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    private?: BoolFilter<"Repository"> | boolean
    published?: BoolFilter<"Repository"> | boolean
    fork?: BoolFilter<"Repository"> | boolean
    createdAt?: DateTimeFilter<"Repository"> | Date | string
    updatedAt?: DateTimeFilter<"Repository"> | Date | string
    pushedAt?: DateTimeNullableFilter<"Repository"> | Date | string | null
    homepage?: StringNullableFilter<"Repository"> | string | null
    size?: IntFilter<"Repository"> | number
    stargazersCount?: IntFilter<"Repository"> | number
    watchersCount?: IntFilter<"Repository"> | number
    forksCount?: IntFilter<"Repository"> | number
    openIssuesCount?: IntFilter<"Repository"> | number
    language?: StringNullableFilter<"Repository"> | string | null
    defaultBranch?: StringFilter<"Repository"> | string
    topics?: StringNullableListFilter<"Repository">
    archived?: BoolFilter<"Repository"> | boolean
    disabled?: BoolFilter<"Repository"> | boolean
    syncedAt?: DateTimeFilter<"Repository"> | Date | string
    featured?: BoolFilter<"Repository"> | boolean
    emoji?: StringNullableFilter<"Repository"> | string | null
    faIcon?: StringNullableFilter<"Repository"> | string | null
    docsPath?: StringFilter<"Repository"> | string
    issues?: IssueListRelationFilter
    pullRequests?: PullRequestListRelationFilter
    commits?: CommitListRelationFilter
    releases?: ReleaseListRelationFilter
    versionTags?: VersionTagListRelationFilter
    contributions?: ContributorContributionListRelationFilter
    documentationContent?: DocumentationContentListRelationFilter
    documentationMetadata?: XOR<DocumentationMetadataNullableScalarRelationFilter, DocumentationMetadataWhereInput> | null
    syncLogs?: SyncLogListRelationFilter
  }, "id" | "githubId" | "fullName">

  export type RepositoryOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    owner?: SortOrder
    description?: SortOrderInput | SortOrder
    private?: SortOrder
    published?: SortOrder
    fork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pushedAt?: SortOrderInput | SortOrder
    homepage?: SortOrderInput | SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    language?: SortOrderInput | SortOrder
    defaultBranch?: SortOrder
    topics?: SortOrder
    archived?: SortOrder
    disabled?: SortOrder
    syncedAt?: SortOrder
    featured?: SortOrder
    emoji?: SortOrderInput | SortOrder
    faIcon?: SortOrderInput | SortOrder
    docsPath?: SortOrder
    _count?: RepositoryCountOrderByAggregateInput
    _avg?: RepositoryAvgOrderByAggregateInput
    _max?: RepositoryMaxOrderByAggregateInput
    _min?: RepositoryMinOrderByAggregateInput
    _sum?: RepositorySumOrderByAggregateInput
  }

  export type RepositoryScalarWhereWithAggregatesInput = {
    AND?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    OR?: RepositoryScalarWhereWithAggregatesInput[]
    NOT?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Repository"> | string
    githubId?: BigIntWithAggregatesFilter<"Repository"> | bigint | number
    name?: StringWithAggregatesFilter<"Repository"> | string
    fullName?: StringWithAggregatesFilter<"Repository"> | string
    owner?: StringWithAggregatesFilter<"Repository"> | string
    description?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    private?: BoolWithAggregatesFilter<"Repository"> | boolean
    published?: BoolWithAggregatesFilter<"Repository"> | boolean
    fork?: BoolWithAggregatesFilter<"Repository"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    pushedAt?: DateTimeNullableWithAggregatesFilter<"Repository"> | Date | string | null
    homepage?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    size?: IntWithAggregatesFilter<"Repository"> | number
    stargazersCount?: IntWithAggregatesFilter<"Repository"> | number
    watchersCount?: IntWithAggregatesFilter<"Repository"> | number
    forksCount?: IntWithAggregatesFilter<"Repository"> | number
    openIssuesCount?: IntWithAggregatesFilter<"Repository"> | number
    language?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    defaultBranch?: StringWithAggregatesFilter<"Repository"> | string
    topics?: StringNullableListFilter<"Repository">
    archived?: BoolWithAggregatesFilter<"Repository"> | boolean
    disabled?: BoolWithAggregatesFilter<"Repository"> | boolean
    syncedAt?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    featured?: BoolWithAggregatesFilter<"Repository"> | boolean
    emoji?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    faIcon?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    docsPath?: StringWithAggregatesFilter<"Repository"> | string
  }

  export type IssueWhereInput = {
    AND?: IssueWhereInput | IssueWhereInput[]
    OR?: IssueWhereInput[]
    NOT?: IssueWhereInput | IssueWhereInput[]
    id?: StringFilter<"Issue"> | string
    githubId?: BigIntFilter<"Issue"> | bigint | number
    repositoryId?: StringFilter<"Issue"> | string
    number?: IntFilter<"Issue"> | number
    title?: StringFilter<"Issue"> | string
    body?: StringNullableFilter<"Issue"> | string | null
    state?: EnumIssueStateFilter<"Issue"> | $Enums.IssueState
    userLogin?: StringFilter<"Issue"> | string
    userAvatarUrl?: StringNullableFilter<"Issue"> | string | null
    labels?: StringNullableListFilter<"Issue">
    assignees?: StringNullableListFilter<"Issue">
    commentsCount?: IntFilter<"Issue"> | number
    createdAt?: DateTimeFilter<"Issue"> | Date | string
    updatedAt?: DateTimeFilter<"Issue"> | Date | string
    closedAt?: DateTimeNullableFilter<"Issue"> | Date | string | null
    syncedAt?: DateTimeFilter<"Issue"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type IssueOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrderInput | SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type IssueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: bigint | number
    repositoryId_number?: IssueRepositoryIdNumberCompoundUniqueInput
    AND?: IssueWhereInput | IssueWhereInput[]
    OR?: IssueWhereInput[]
    NOT?: IssueWhereInput | IssueWhereInput[]
    repositoryId?: StringFilter<"Issue"> | string
    number?: IntFilter<"Issue"> | number
    title?: StringFilter<"Issue"> | string
    body?: StringNullableFilter<"Issue"> | string | null
    state?: EnumIssueStateFilter<"Issue"> | $Enums.IssueState
    userLogin?: StringFilter<"Issue"> | string
    userAvatarUrl?: StringNullableFilter<"Issue"> | string | null
    labels?: StringNullableListFilter<"Issue">
    assignees?: StringNullableListFilter<"Issue">
    commentsCount?: IntFilter<"Issue"> | number
    createdAt?: DateTimeFilter<"Issue"> | Date | string
    updatedAt?: DateTimeFilter<"Issue"> | Date | string
    closedAt?: DateTimeNullableFilter<"Issue"> | Date | string | null
    syncedAt?: DateTimeFilter<"Issue"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "id" | "githubId" | "repositoryId_number">

  export type IssueOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrderInput | SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: IssueCountOrderByAggregateInput
    _avg?: IssueAvgOrderByAggregateInput
    _max?: IssueMaxOrderByAggregateInput
    _min?: IssueMinOrderByAggregateInput
    _sum?: IssueSumOrderByAggregateInput
  }

  export type IssueScalarWhereWithAggregatesInput = {
    AND?: IssueScalarWhereWithAggregatesInput | IssueScalarWhereWithAggregatesInput[]
    OR?: IssueScalarWhereWithAggregatesInput[]
    NOT?: IssueScalarWhereWithAggregatesInput | IssueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Issue"> | string
    githubId?: BigIntWithAggregatesFilter<"Issue"> | bigint | number
    repositoryId?: StringWithAggregatesFilter<"Issue"> | string
    number?: IntWithAggregatesFilter<"Issue"> | number
    title?: StringWithAggregatesFilter<"Issue"> | string
    body?: StringNullableWithAggregatesFilter<"Issue"> | string | null
    state?: EnumIssueStateWithAggregatesFilter<"Issue"> | $Enums.IssueState
    userLogin?: StringWithAggregatesFilter<"Issue"> | string
    userAvatarUrl?: StringNullableWithAggregatesFilter<"Issue"> | string | null
    labels?: StringNullableListFilter<"Issue">
    assignees?: StringNullableListFilter<"Issue">
    commentsCount?: IntWithAggregatesFilter<"Issue"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Issue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Issue"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"Issue"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"Issue"> | Date | string
  }

  export type PullRequestWhereInput = {
    AND?: PullRequestWhereInput | PullRequestWhereInput[]
    OR?: PullRequestWhereInput[]
    NOT?: PullRequestWhereInput | PullRequestWhereInput[]
    id?: StringFilter<"PullRequest"> | string
    githubId?: BigIntFilter<"PullRequest"> | bigint | number
    repositoryId?: StringFilter<"PullRequest"> | string
    number?: IntFilter<"PullRequest"> | number
    title?: StringFilter<"PullRequest"> | string
    body?: StringNullableFilter<"PullRequest"> | string | null
    state?: EnumPrStateFilter<"PullRequest"> | $Enums.PrState
    userLogin?: StringFilter<"PullRequest"> | string
    userAvatarUrl?: StringNullableFilter<"PullRequest"> | string | null
    labels?: StringNullableListFilter<"PullRequest">
    assignees?: StringNullableListFilter<"PullRequest">
    requestedReviewers?: StringNullableListFilter<"PullRequest">
    headRef?: StringFilter<"PullRequest"> | string
    baseRef?: StringFilter<"PullRequest"> | string
    mergeable?: BoolNullableFilter<"PullRequest"> | boolean | null
    merged?: BoolFilter<"PullRequest"> | boolean
    mergedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    mergedBy?: StringNullableFilter<"PullRequest"> | string | null
    commentsCount?: IntFilter<"PullRequest"> | number
    reviewCommentsCount?: IntFilter<"PullRequest"> | number
    commitsCount?: IntFilter<"PullRequest"> | number
    additions?: IntFilter<"PullRequest"> | number
    deletions?: IntFilter<"PullRequest"> | number
    changedFiles?: IntFilter<"PullRequest"> | number
    createdAt?: DateTimeFilter<"PullRequest"> | Date | string
    updatedAt?: DateTimeFilter<"PullRequest"> | Date | string
    closedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    syncedAt?: DateTimeFilter<"PullRequest"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type PullRequestOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrderInput | SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    requestedReviewers?: SortOrder
    headRef?: SortOrder
    baseRef?: SortOrder
    mergeable?: SortOrderInput | SortOrder
    merged?: SortOrder
    mergedAt?: SortOrderInput | SortOrder
    mergedBy?: SortOrderInput | SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type PullRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: bigint | number
    repositoryId_number?: PullRequestRepositoryIdNumberCompoundUniqueInput
    AND?: PullRequestWhereInput | PullRequestWhereInput[]
    OR?: PullRequestWhereInput[]
    NOT?: PullRequestWhereInput | PullRequestWhereInput[]
    repositoryId?: StringFilter<"PullRequest"> | string
    number?: IntFilter<"PullRequest"> | number
    title?: StringFilter<"PullRequest"> | string
    body?: StringNullableFilter<"PullRequest"> | string | null
    state?: EnumPrStateFilter<"PullRequest"> | $Enums.PrState
    userLogin?: StringFilter<"PullRequest"> | string
    userAvatarUrl?: StringNullableFilter<"PullRequest"> | string | null
    labels?: StringNullableListFilter<"PullRequest">
    assignees?: StringNullableListFilter<"PullRequest">
    requestedReviewers?: StringNullableListFilter<"PullRequest">
    headRef?: StringFilter<"PullRequest"> | string
    baseRef?: StringFilter<"PullRequest"> | string
    mergeable?: BoolNullableFilter<"PullRequest"> | boolean | null
    merged?: BoolFilter<"PullRequest"> | boolean
    mergedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    mergedBy?: StringNullableFilter<"PullRequest"> | string | null
    commentsCount?: IntFilter<"PullRequest"> | number
    reviewCommentsCount?: IntFilter<"PullRequest"> | number
    commitsCount?: IntFilter<"PullRequest"> | number
    additions?: IntFilter<"PullRequest"> | number
    deletions?: IntFilter<"PullRequest"> | number
    changedFiles?: IntFilter<"PullRequest"> | number
    createdAt?: DateTimeFilter<"PullRequest"> | Date | string
    updatedAt?: DateTimeFilter<"PullRequest"> | Date | string
    closedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    syncedAt?: DateTimeFilter<"PullRequest"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "id" | "githubId" | "repositoryId_number">

  export type PullRequestOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrderInput | SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    requestedReviewers?: SortOrder
    headRef?: SortOrder
    baseRef?: SortOrder
    mergeable?: SortOrderInput | SortOrder
    merged?: SortOrder
    mergedAt?: SortOrderInput | SortOrder
    mergedBy?: SortOrderInput | SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: PullRequestCountOrderByAggregateInput
    _avg?: PullRequestAvgOrderByAggregateInput
    _max?: PullRequestMaxOrderByAggregateInput
    _min?: PullRequestMinOrderByAggregateInput
    _sum?: PullRequestSumOrderByAggregateInput
  }

  export type PullRequestScalarWhereWithAggregatesInput = {
    AND?: PullRequestScalarWhereWithAggregatesInput | PullRequestScalarWhereWithAggregatesInput[]
    OR?: PullRequestScalarWhereWithAggregatesInput[]
    NOT?: PullRequestScalarWhereWithAggregatesInput | PullRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PullRequest"> | string
    githubId?: BigIntWithAggregatesFilter<"PullRequest"> | bigint | number
    repositoryId?: StringWithAggregatesFilter<"PullRequest"> | string
    number?: IntWithAggregatesFilter<"PullRequest"> | number
    title?: StringWithAggregatesFilter<"PullRequest"> | string
    body?: StringNullableWithAggregatesFilter<"PullRequest"> | string | null
    state?: EnumPrStateWithAggregatesFilter<"PullRequest"> | $Enums.PrState
    userLogin?: StringWithAggregatesFilter<"PullRequest"> | string
    userAvatarUrl?: StringNullableWithAggregatesFilter<"PullRequest"> | string | null
    labels?: StringNullableListFilter<"PullRequest">
    assignees?: StringNullableListFilter<"PullRequest">
    requestedReviewers?: StringNullableListFilter<"PullRequest">
    headRef?: StringWithAggregatesFilter<"PullRequest"> | string
    baseRef?: StringWithAggregatesFilter<"PullRequest"> | string
    mergeable?: BoolNullableWithAggregatesFilter<"PullRequest"> | boolean | null
    merged?: BoolWithAggregatesFilter<"PullRequest"> | boolean
    mergedAt?: DateTimeNullableWithAggregatesFilter<"PullRequest"> | Date | string | null
    mergedBy?: StringNullableWithAggregatesFilter<"PullRequest"> | string | null
    commentsCount?: IntWithAggregatesFilter<"PullRequest"> | number
    reviewCommentsCount?: IntWithAggregatesFilter<"PullRequest"> | number
    commitsCount?: IntWithAggregatesFilter<"PullRequest"> | number
    additions?: IntWithAggregatesFilter<"PullRequest"> | number
    deletions?: IntWithAggregatesFilter<"PullRequest"> | number
    changedFiles?: IntWithAggregatesFilter<"PullRequest"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PullRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PullRequest"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"PullRequest"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"PullRequest"> | Date | string
  }

  export type CommitWhereInput = {
    AND?: CommitWhereInput | CommitWhereInput[]
    OR?: CommitWhereInput[]
    NOT?: CommitWhereInput | CommitWhereInput[]
    sha?: StringFilter<"Commit"> | string
    repositoryId?: StringFilter<"Commit"> | string
    message?: StringFilter<"Commit"> | string
    authorName?: StringFilter<"Commit"> | string
    authorEmail?: StringFilter<"Commit"> | string
    authorDate?: DateTimeFilter<"Commit"> | Date | string
    committerName?: StringFilter<"Commit"> | string
    committerEmail?: StringFilter<"Commit"> | string
    committerDate?: DateTimeFilter<"Commit"> | Date | string
    additions?: IntFilter<"Commit"> | number
    deletions?: IntFilter<"Commit"> | number
    totalChanges?: IntFilter<"Commit"> | number
    syncedAt?: DateTimeFilter<"Commit"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type CommitOrderByWithRelationInput = {
    sha?: SortOrder
    repositoryId?: SortOrder
    message?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    authorDate?: SortOrder
    committerName?: SortOrder
    committerEmail?: SortOrder
    committerDate?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
    syncedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type CommitWhereUniqueInput = Prisma.AtLeast<{
    sha?: string
    AND?: CommitWhereInput | CommitWhereInput[]
    OR?: CommitWhereInput[]
    NOT?: CommitWhereInput | CommitWhereInput[]
    repositoryId?: StringFilter<"Commit"> | string
    message?: StringFilter<"Commit"> | string
    authorName?: StringFilter<"Commit"> | string
    authorEmail?: StringFilter<"Commit"> | string
    authorDate?: DateTimeFilter<"Commit"> | Date | string
    committerName?: StringFilter<"Commit"> | string
    committerEmail?: StringFilter<"Commit"> | string
    committerDate?: DateTimeFilter<"Commit"> | Date | string
    additions?: IntFilter<"Commit"> | number
    deletions?: IntFilter<"Commit"> | number
    totalChanges?: IntFilter<"Commit"> | number
    syncedAt?: DateTimeFilter<"Commit"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "sha">

  export type CommitOrderByWithAggregationInput = {
    sha?: SortOrder
    repositoryId?: SortOrder
    message?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    authorDate?: SortOrder
    committerName?: SortOrder
    committerEmail?: SortOrder
    committerDate?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
    syncedAt?: SortOrder
    _count?: CommitCountOrderByAggregateInput
    _avg?: CommitAvgOrderByAggregateInput
    _max?: CommitMaxOrderByAggregateInput
    _min?: CommitMinOrderByAggregateInput
    _sum?: CommitSumOrderByAggregateInput
  }

  export type CommitScalarWhereWithAggregatesInput = {
    AND?: CommitScalarWhereWithAggregatesInput | CommitScalarWhereWithAggregatesInput[]
    OR?: CommitScalarWhereWithAggregatesInput[]
    NOT?: CommitScalarWhereWithAggregatesInput | CommitScalarWhereWithAggregatesInput[]
    sha?: StringWithAggregatesFilter<"Commit"> | string
    repositoryId?: StringWithAggregatesFilter<"Commit"> | string
    message?: StringWithAggregatesFilter<"Commit"> | string
    authorName?: StringWithAggregatesFilter<"Commit"> | string
    authorEmail?: StringWithAggregatesFilter<"Commit"> | string
    authorDate?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
    committerName?: StringWithAggregatesFilter<"Commit"> | string
    committerEmail?: StringWithAggregatesFilter<"Commit"> | string
    committerDate?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
    additions?: IntWithAggregatesFilter<"Commit"> | number
    deletions?: IntWithAggregatesFilter<"Commit"> | number
    totalChanges?: IntWithAggregatesFilter<"Commit"> | number
    syncedAt?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
  }

  export type ReleaseWhereInput = {
    AND?: ReleaseWhereInput | ReleaseWhereInput[]
    OR?: ReleaseWhereInput[]
    NOT?: ReleaseWhereInput | ReleaseWhereInput[]
    id?: StringFilter<"Release"> | string
    githubId?: BigIntFilter<"Release"> | bigint | number
    repositoryId?: StringFilter<"Release"> | string
    tagName?: StringFilter<"Release"> | string
    name?: StringNullableFilter<"Release"> | string | null
    body?: StringNullableFilter<"Release"> | string | null
    draft?: BoolFilter<"Release"> | boolean
    prerelease?: BoolFilter<"Release"> | boolean
    authorLogin?: StringFilter<"Release"> | string
    authorAvatarUrl?: StringNullableFilter<"Release"> | string | null
    createdAt?: DateTimeFilter<"Release"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Release"> | Date | string | null
    syncedAt?: DateTimeFilter<"Release"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type ReleaseOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    name?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    draft?: SortOrder
    prerelease?: SortOrder
    authorLogin?: SortOrder
    authorAvatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type ReleaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: bigint | number
    repositoryId_tagName?: ReleaseRepositoryIdTagNameCompoundUniqueInput
    AND?: ReleaseWhereInput | ReleaseWhereInput[]
    OR?: ReleaseWhereInput[]
    NOT?: ReleaseWhereInput | ReleaseWhereInput[]
    repositoryId?: StringFilter<"Release"> | string
    tagName?: StringFilter<"Release"> | string
    name?: StringNullableFilter<"Release"> | string | null
    body?: StringNullableFilter<"Release"> | string | null
    draft?: BoolFilter<"Release"> | boolean
    prerelease?: BoolFilter<"Release"> | boolean
    authorLogin?: StringFilter<"Release"> | string
    authorAvatarUrl?: StringNullableFilter<"Release"> | string | null
    createdAt?: DateTimeFilter<"Release"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Release"> | Date | string | null
    syncedAt?: DateTimeFilter<"Release"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "id" | "githubId" | "repositoryId_tagName">

  export type ReleaseOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    name?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    draft?: SortOrder
    prerelease?: SortOrder
    authorLogin?: SortOrder
    authorAvatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: ReleaseCountOrderByAggregateInput
    _avg?: ReleaseAvgOrderByAggregateInput
    _max?: ReleaseMaxOrderByAggregateInput
    _min?: ReleaseMinOrderByAggregateInput
    _sum?: ReleaseSumOrderByAggregateInput
  }

  export type ReleaseScalarWhereWithAggregatesInput = {
    AND?: ReleaseScalarWhereWithAggregatesInput | ReleaseScalarWhereWithAggregatesInput[]
    OR?: ReleaseScalarWhereWithAggregatesInput[]
    NOT?: ReleaseScalarWhereWithAggregatesInput | ReleaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Release"> | string
    githubId?: BigIntWithAggregatesFilter<"Release"> | bigint | number
    repositoryId?: StringWithAggregatesFilter<"Release"> | string
    tagName?: StringWithAggregatesFilter<"Release"> | string
    name?: StringNullableWithAggregatesFilter<"Release"> | string | null
    body?: StringNullableWithAggregatesFilter<"Release"> | string | null
    draft?: BoolWithAggregatesFilter<"Release"> | boolean
    prerelease?: BoolWithAggregatesFilter<"Release"> | boolean
    authorLogin?: StringWithAggregatesFilter<"Release"> | string
    authorAvatarUrl?: StringNullableWithAggregatesFilter<"Release"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Release"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Release"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"Release"> | Date | string
  }

  export type VersionTagWhereInput = {
    AND?: VersionTagWhereInput | VersionTagWhereInput[]
    OR?: VersionTagWhereInput[]
    NOT?: VersionTagWhereInput | VersionTagWhereInput[]
    id?: StringFilter<"VersionTag"> | string
    repositoryId?: StringFilter<"VersionTag"> | string
    tagName?: StringFilter<"VersionTag"> | string
    commitSha?: StringFilter<"VersionTag"> | string
    isLatest?: BoolFilter<"VersionTag"> | boolean
    createdAt?: DateTimeFilter<"VersionTag"> | Date | string
    syncedAt?: DateTimeFilter<"VersionTag"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type VersionTagOrderByWithRelationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    commitSha?: SortOrder
    isLatest?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type VersionTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    repositoryId_tagName?: VersionTagRepositoryIdTagNameCompoundUniqueInput
    AND?: VersionTagWhereInput | VersionTagWhereInput[]
    OR?: VersionTagWhereInput[]
    NOT?: VersionTagWhereInput | VersionTagWhereInput[]
    repositoryId?: StringFilter<"VersionTag"> | string
    tagName?: StringFilter<"VersionTag"> | string
    commitSha?: StringFilter<"VersionTag"> | string
    isLatest?: BoolFilter<"VersionTag"> | boolean
    createdAt?: DateTimeFilter<"VersionTag"> | Date | string
    syncedAt?: DateTimeFilter<"VersionTag"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "id" | "repositoryId_tagName">

  export type VersionTagOrderByWithAggregationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    commitSha?: SortOrder
    isLatest?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    _count?: VersionTagCountOrderByAggregateInput
    _max?: VersionTagMaxOrderByAggregateInput
    _min?: VersionTagMinOrderByAggregateInput
  }

  export type VersionTagScalarWhereWithAggregatesInput = {
    AND?: VersionTagScalarWhereWithAggregatesInput | VersionTagScalarWhereWithAggregatesInput[]
    OR?: VersionTagScalarWhereWithAggregatesInput[]
    NOT?: VersionTagScalarWhereWithAggregatesInput | VersionTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VersionTag"> | string
    repositoryId?: StringWithAggregatesFilter<"VersionTag"> | string
    tagName?: StringWithAggregatesFilter<"VersionTag"> | string
    commitSha?: StringWithAggregatesFilter<"VersionTag"> | string
    isLatest?: BoolWithAggregatesFilter<"VersionTag"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"VersionTag"> | Date | string
    syncedAt?: DateTimeWithAggregatesFilter<"VersionTag"> | Date | string
  }

  export type ContributorWhereInput = {
    AND?: ContributorWhereInput | ContributorWhereInput[]
    OR?: ContributorWhereInput[]
    NOT?: ContributorWhereInput | ContributorWhereInput[]
    id?: StringFilter<"Contributor"> | string
    githubId?: BigIntFilter<"Contributor"> | bigint | number
    login?: StringFilter<"Contributor"> | string
    avatarUrl?: StringNullableFilter<"Contributor"> | string | null
    htmlUrl?: StringNullableFilter<"Contributor"> | string | null
    type?: StringFilter<"Contributor"> | string
    siteAdmin?: BoolFilter<"Contributor"> | boolean
    name?: StringNullableFilter<"Contributor"> | string | null
    company?: StringNullableFilter<"Contributor"> | string | null
    blog?: StringNullableFilter<"Contributor"> | string | null
    location?: StringNullableFilter<"Contributor"> | string | null
    email?: StringNullableFilter<"Contributor"> | string | null
    bio?: StringNullableFilter<"Contributor"> | string | null
    publicRepos?: IntNullableFilter<"Contributor"> | number | null
    publicGists?: IntNullableFilter<"Contributor"> | number | null
    followers?: IntNullableFilter<"Contributor"> | number | null
    following?: IntNullableFilter<"Contributor"> | number | null
    createdAt?: DateTimeNullableFilter<"Contributor"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Contributor"> | Date | string | null
    syncedAt?: DateTimeFilter<"Contributor"> | Date | string
    contributions?: ContributorContributionListRelationFilter
  }

  export type ContributorOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    htmlUrl?: SortOrderInput | SortOrder
    type?: SortOrder
    siteAdmin?: SortOrder
    name?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    blog?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    publicRepos?: SortOrderInput | SortOrder
    publicGists?: SortOrderInput | SortOrder
    followers?: SortOrderInput | SortOrder
    following?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    contributions?: ContributorContributionOrderByRelationAggregateInput
  }

  export type ContributorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: bigint | number
    login?: string
    AND?: ContributorWhereInput | ContributorWhereInput[]
    OR?: ContributorWhereInput[]
    NOT?: ContributorWhereInput | ContributorWhereInput[]
    avatarUrl?: StringNullableFilter<"Contributor"> | string | null
    htmlUrl?: StringNullableFilter<"Contributor"> | string | null
    type?: StringFilter<"Contributor"> | string
    siteAdmin?: BoolFilter<"Contributor"> | boolean
    name?: StringNullableFilter<"Contributor"> | string | null
    company?: StringNullableFilter<"Contributor"> | string | null
    blog?: StringNullableFilter<"Contributor"> | string | null
    location?: StringNullableFilter<"Contributor"> | string | null
    email?: StringNullableFilter<"Contributor"> | string | null
    bio?: StringNullableFilter<"Contributor"> | string | null
    publicRepos?: IntNullableFilter<"Contributor"> | number | null
    publicGists?: IntNullableFilter<"Contributor"> | number | null
    followers?: IntNullableFilter<"Contributor"> | number | null
    following?: IntNullableFilter<"Contributor"> | number | null
    createdAt?: DateTimeNullableFilter<"Contributor"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Contributor"> | Date | string | null
    syncedAt?: DateTimeFilter<"Contributor"> | Date | string
    contributions?: ContributorContributionListRelationFilter
  }, "id" | "githubId" | "login">

  export type ContributorOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    htmlUrl?: SortOrderInput | SortOrder
    type?: SortOrder
    siteAdmin?: SortOrder
    name?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    blog?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    publicRepos?: SortOrderInput | SortOrder
    publicGists?: SortOrderInput | SortOrder
    followers?: SortOrderInput | SortOrder
    following?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: ContributorCountOrderByAggregateInput
    _avg?: ContributorAvgOrderByAggregateInput
    _max?: ContributorMaxOrderByAggregateInput
    _min?: ContributorMinOrderByAggregateInput
    _sum?: ContributorSumOrderByAggregateInput
  }

  export type ContributorScalarWhereWithAggregatesInput = {
    AND?: ContributorScalarWhereWithAggregatesInput | ContributorScalarWhereWithAggregatesInput[]
    OR?: ContributorScalarWhereWithAggregatesInput[]
    NOT?: ContributorScalarWhereWithAggregatesInput | ContributorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contributor"> | string
    githubId?: BigIntWithAggregatesFilter<"Contributor"> | bigint | number
    login?: StringWithAggregatesFilter<"Contributor"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    htmlUrl?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    type?: StringWithAggregatesFilter<"Contributor"> | string
    siteAdmin?: BoolWithAggregatesFilter<"Contributor"> | boolean
    name?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    company?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    blog?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    location?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    email?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Contributor"> | string | null
    publicRepos?: IntNullableWithAggregatesFilter<"Contributor"> | number | null
    publicGists?: IntNullableWithAggregatesFilter<"Contributor"> | number | null
    followers?: IntNullableWithAggregatesFilter<"Contributor"> | number | null
    following?: IntNullableWithAggregatesFilter<"Contributor"> | number | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Contributor"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Contributor"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"Contributor"> | Date | string
  }

  export type ContributorContributionWhereInput = {
    AND?: ContributorContributionWhereInput | ContributorContributionWhereInput[]
    OR?: ContributorContributionWhereInput[]
    NOT?: ContributorContributionWhereInput | ContributorContributionWhereInput[]
    contributorId?: StringFilter<"ContributorContribution"> | string
    repositoryId?: StringFilter<"ContributorContribution"> | string
    contributionsCount?: IntFilter<"ContributorContribution"> | number
    syncedAt?: DateTimeFilter<"ContributorContribution"> | Date | string
    contributor?: XOR<ContributorScalarRelationFilter, ContributorWhereInput>
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type ContributorContributionOrderByWithRelationInput = {
    contributorId?: SortOrder
    repositoryId?: SortOrder
    contributionsCount?: SortOrder
    syncedAt?: SortOrder
    contributor?: ContributorOrderByWithRelationInput
    repository?: RepositoryOrderByWithRelationInput
  }

  export type ContributorContributionWhereUniqueInput = Prisma.AtLeast<{
    contributorId_repositoryId?: ContributorContributionContributorIdRepositoryIdCompoundUniqueInput
    AND?: ContributorContributionWhereInput | ContributorContributionWhereInput[]
    OR?: ContributorContributionWhereInput[]
    NOT?: ContributorContributionWhereInput | ContributorContributionWhereInput[]
    contributorId?: StringFilter<"ContributorContribution"> | string
    repositoryId?: StringFilter<"ContributorContribution"> | string
    contributionsCount?: IntFilter<"ContributorContribution"> | number
    syncedAt?: DateTimeFilter<"ContributorContribution"> | Date | string
    contributor?: XOR<ContributorScalarRelationFilter, ContributorWhereInput>
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "contributorId_repositoryId">

  export type ContributorContributionOrderByWithAggregationInput = {
    contributorId?: SortOrder
    repositoryId?: SortOrder
    contributionsCount?: SortOrder
    syncedAt?: SortOrder
    _count?: ContributorContributionCountOrderByAggregateInput
    _avg?: ContributorContributionAvgOrderByAggregateInput
    _max?: ContributorContributionMaxOrderByAggregateInput
    _min?: ContributorContributionMinOrderByAggregateInput
    _sum?: ContributorContributionSumOrderByAggregateInput
  }

  export type ContributorContributionScalarWhereWithAggregatesInput = {
    AND?: ContributorContributionScalarWhereWithAggregatesInput | ContributorContributionScalarWhereWithAggregatesInput[]
    OR?: ContributorContributionScalarWhereWithAggregatesInput[]
    NOT?: ContributorContributionScalarWhereWithAggregatesInput | ContributorContributionScalarWhereWithAggregatesInput[]
    contributorId?: StringWithAggregatesFilter<"ContributorContribution"> | string
    repositoryId?: StringWithAggregatesFilter<"ContributorContribution"> | string
    contributionsCount?: IntWithAggregatesFilter<"ContributorContribution"> | number
    syncedAt?: DateTimeWithAggregatesFilter<"ContributorContribution"> | Date | string
  }

  export type DocumentationContentWhereInput = {
    AND?: DocumentationContentWhereInput | DocumentationContentWhereInput[]
    OR?: DocumentationContentWhereInput[]
    NOT?: DocumentationContentWhereInput | DocumentationContentWhereInput[]
    id?: StringFilter<"DocumentationContent"> | string
    repositoryId?: StringFilter<"DocumentationContent"> | string
    filePath?: StringFilter<"DocumentationContent"> | string
    slug?: StringNullableListFilter<"DocumentationContent">
    groupSlug?: StringFilter<"DocumentationContent"> | string
    title?: StringFilter<"DocumentationContent"> | string
    content?: StringFilter<"DocumentationContent"> | string
    description?: StringNullableFilter<"DocumentationContent"> | string | null
    orderIndex?: IntNullableListFilter<"DocumentationContent">
    version?: StringNullableFilter<"DocumentationContent"> | string | null
    status?: StringNullableFilter<"DocumentationContent"> | string | null
    emoji?: StringNullableFilter<"DocumentationContent"> | string | null
    faIcon?: StringNullableFilter<"DocumentationContent"> | string | null
    hidden?: BoolFilter<"DocumentationContent"> | boolean
    createdAt?: DateTimeFilter<"DocumentationContent"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentationContent"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type DocumentationContentOrderByWithRelationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    filePath?: SortOrder
    slug?: SortOrder
    groupSlug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    description?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    version?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    faIcon?: SortOrderInput | SortOrder
    hidden?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type DocumentationContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    repositoryId_filePath?: DocumentationContentRepositoryIdFilePathCompoundUniqueInput
    AND?: DocumentationContentWhereInput | DocumentationContentWhereInput[]
    OR?: DocumentationContentWhereInput[]
    NOT?: DocumentationContentWhereInput | DocumentationContentWhereInput[]
    repositoryId?: StringFilter<"DocumentationContent"> | string
    filePath?: StringFilter<"DocumentationContent"> | string
    slug?: StringNullableListFilter<"DocumentationContent">
    groupSlug?: StringFilter<"DocumentationContent"> | string
    title?: StringFilter<"DocumentationContent"> | string
    content?: StringFilter<"DocumentationContent"> | string
    description?: StringNullableFilter<"DocumentationContent"> | string | null
    orderIndex?: IntNullableListFilter<"DocumentationContent">
    version?: StringNullableFilter<"DocumentationContent"> | string | null
    status?: StringNullableFilter<"DocumentationContent"> | string | null
    emoji?: StringNullableFilter<"DocumentationContent"> | string | null
    faIcon?: StringNullableFilter<"DocumentationContent"> | string | null
    hidden?: BoolFilter<"DocumentationContent"> | boolean
    createdAt?: DateTimeFilter<"DocumentationContent"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentationContent"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "id" | "repositoryId_filePath">

  export type DocumentationContentOrderByWithAggregationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    filePath?: SortOrder
    slug?: SortOrder
    groupSlug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    description?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    version?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    faIcon?: SortOrderInput | SortOrder
    hidden?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentationContentCountOrderByAggregateInput
    _avg?: DocumentationContentAvgOrderByAggregateInput
    _max?: DocumentationContentMaxOrderByAggregateInput
    _min?: DocumentationContentMinOrderByAggregateInput
    _sum?: DocumentationContentSumOrderByAggregateInput
  }

  export type DocumentationContentScalarWhereWithAggregatesInput = {
    AND?: DocumentationContentScalarWhereWithAggregatesInput | DocumentationContentScalarWhereWithAggregatesInput[]
    OR?: DocumentationContentScalarWhereWithAggregatesInput[]
    NOT?: DocumentationContentScalarWhereWithAggregatesInput | DocumentationContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentationContent"> | string
    repositoryId?: StringWithAggregatesFilter<"DocumentationContent"> | string
    filePath?: StringWithAggregatesFilter<"DocumentationContent"> | string
    slug?: StringNullableListFilter<"DocumentationContent">
    groupSlug?: StringWithAggregatesFilter<"DocumentationContent"> | string
    title?: StringWithAggregatesFilter<"DocumentationContent"> | string
    content?: StringWithAggregatesFilter<"DocumentationContent"> | string
    description?: StringNullableWithAggregatesFilter<"DocumentationContent"> | string | null
    orderIndex?: IntNullableListFilter<"DocumentationContent">
    version?: StringNullableWithAggregatesFilter<"DocumentationContent"> | string | null
    status?: StringNullableWithAggregatesFilter<"DocumentationContent"> | string | null
    emoji?: StringNullableWithAggregatesFilter<"DocumentationContent"> | string | null
    faIcon?: StringNullableWithAggregatesFilter<"DocumentationContent"> | string | null
    hidden?: BoolWithAggregatesFilter<"DocumentationContent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DocumentationContent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocumentationContent"> | Date | string
  }

  export type DocumentationMetadataWhereInput = {
    AND?: DocumentationMetadataWhereInput | DocumentationMetadataWhereInput[]
    OR?: DocumentationMetadataWhereInput[]
    NOT?: DocumentationMetadataWhereInput | DocumentationMetadataWhereInput[]
    repositoryId?: StringFilter<"DocumentationMetadata"> | string
    version?: StringFilter<"DocumentationMetadata"> | string
    lastCommitSha?: StringNullableFilter<"DocumentationMetadata"> | string | null
    lastSyncedAt?: DateTimeFilter<"DocumentationMetadata"> | Date | string
    fileCount?: IntFilter<"DocumentationMetadata"> | number
    totalSize?: IntFilter<"DocumentationMetadata"> | number
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }

  export type DocumentationMetadataOrderByWithRelationInput = {
    repositoryId?: SortOrder
    version?: SortOrder
    lastCommitSha?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    fileCount?: SortOrder
    totalSize?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type DocumentationMetadataWhereUniqueInput = Prisma.AtLeast<{
    repositoryId?: string
    AND?: DocumentationMetadataWhereInput | DocumentationMetadataWhereInput[]
    OR?: DocumentationMetadataWhereInput[]
    NOT?: DocumentationMetadataWhereInput | DocumentationMetadataWhereInput[]
    version?: StringFilter<"DocumentationMetadata"> | string
    lastCommitSha?: StringNullableFilter<"DocumentationMetadata"> | string | null
    lastSyncedAt?: DateTimeFilter<"DocumentationMetadata"> | Date | string
    fileCount?: IntFilter<"DocumentationMetadata"> | number
    totalSize?: IntFilter<"DocumentationMetadata"> | number
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
  }, "repositoryId">

  export type DocumentationMetadataOrderByWithAggregationInput = {
    repositoryId?: SortOrder
    version?: SortOrder
    lastCommitSha?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    fileCount?: SortOrder
    totalSize?: SortOrder
    _count?: DocumentationMetadataCountOrderByAggregateInput
    _avg?: DocumentationMetadataAvgOrderByAggregateInput
    _max?: DocumentationMetadataMaxOrderByAggregateInput
    _min?: DocumentationMetadataMinOrderByAggregateInput
    _sum?: DocumentationMetadataSumOrderByAggregateInput
  }

  export type DocumentationMetadataScalarWhereWithAggregatesInput = {
    AND?: DocumentationMetadataScalarWhereWithAggregatesInput | DocumentationMetadataScalarWhereWithAggregatesInput[]
    OR?: DocumentationMetadataScalarWhereWithAggregatesInput[]
    NOT?: DocumentationMetadataScalarWhereWithAggregatesInput | DocumentationMetadataScalarWhereWithAggregatesInput[]
    repositoryId?: StringWithAggregatesFilter<"DocumentationMetadata"> | string
    version?: StringWithAggregatesFilter<"DocumentationMetadata"> | string
    lastCommitSha?: StringNullableWithAggregatesFilter<"DocumentationMetadata"> | string | null
    lastSyncedAt?: DateTimeWithAggregatesFilter<"DocumentationMetadata"> | Date | string
    fileCount?: IntWithAggregatesFilter<"DocumentationMetadata"> | number
    totalSize?: IntWithAggregatesFilter<"DocumentationMetadata"> | number
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    syncType?: StringFilter<"SyncLog"> | string
    repositoryId?: StringNullableFilter<"SyncLog"> | string | null
    status?: EnumSyncStatusFilter<"SyncLog"> | $Enums.SyncStatus
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    recordsProcessed?: IntNullableFilter<"SyncLog"> | number | null
    metadata?: JsonFilter<"SyncLog">
    repository?: XOR<RepositoryNullableScalarRelationFilter, RepositoryWhereInput> | null
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    syncType?: SortOrder
    repositoryId?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrderInput | SortOrder
    metadata?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    syncType?: StringFilter<"SyncLog"> | string
    repositoryId?: StringNullableFilter<"SyncLog"> | string | null
    status?: EnumSyncStatusFilter<"SyncLog"> | $Enums.SyncStatus
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    recordsProcessed?: IntNullableFilter<"SyncLog"> | number | null
    metadata?: JsonFilter<"SyncLog">
    repository?: XOR<RepositoryNullableScalarRelationFilter, RepositoryWhereInput> | null
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    syncType?: SortOrder
    repositoryId?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrderInput | SortOrder
    metadata?: SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncLog"> | string
    syncType?: StringWithAggregatesFilter<"SyncLog"> | string
    repositoryId?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    status?: EnumSyncStatusWithAggregatesFilter<"SyncLog"> | $Enums.SyncStatus
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"SyncLog"> | Date | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    recordsProcessed?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    metadata?: JsonWithAggregatesFilter<"SyncLog">
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: StringFilter<"Settings"> | string
    key?: StringFilter<"Settings"> | string
    title?: StringFilter<"Settings"> | string
    description?: StringFilter<"Settings"> | string
    section?: StringFilter<"Settings"> | string
    appliedTo?: StringFilter<"Settings"> | string
    type?: StringFilter<"Settings"> | string
    value?: StringFilter<"Settings"> | string
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    section?: SortOrder
    appliedTo?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    title?: StringFilter<"Settings"> | string
    description?: StringFilter<"Settings"> | string
    section?: StringFilter<"Settings"> | string
    appliedTo?: StringFilter<"Settings"> | string
    type?: StringFilter<"Settings"> | string
    value?: StringFilter<"Settings"> | string
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }, "id" | "key">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    section?: SortOrder
    appliedTo?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settings"> | string
    key?: StringWithAggregatesFilter<"Settings"> | string
    title?: StringWithAggregatesFilter<"Settings"> | string
    description?: StringWithAggregatesFilter<"Settings"> | string
    section?: StringWithAggregatesFilter<"Settings"> | string
    appliedTo?: StringWithAggregatesFilter<"Settings"> | string
    type?: StringWithAggregatesFilter<"Settings"> | string
    value?: StringWithAggregatesFilter<"Settings"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type RepositoryCreateInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateManyInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
  }

  export type RepositoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
  }

  export type RepositoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
  }

  export type IssueCreateInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutIssuesInput
  }

  export type IssueUncheckedCreateInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type IssueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutIssuesNestedInput
  }

  export type IssueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssueCreateManyInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type IssueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestCreateInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutPullRequestsInput
  }

  export type PullRequestUncheckedCreateInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type PullRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutPullRequestsNestedInput
  }

  export type PullRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestCreateManyInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type PullRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitCreateInput = {
    sha: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutCommitsInput
  }

  export type CommitUncheckedCreateInput = {
    sha: string
    repositoryId: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
  }

  export type CommitUpdateInput = {
    sha?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutCommitsNestedInput
  }

  export type CommitUncheckedUpdateInput = {
    sha?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitCreateManyInput = {
    sha: string
    repositoryId: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
  }

  export type CommitUpdateManyMutationInput = {
    sha?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitUncheckedUpdateManyInput = {
    sha?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseCreateInput = {
    id?: string
    githubId: bigint | number
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutReleasesInput
  }

  export type ReleaseUncheckedCreateInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ReleaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutReleasesNestedInput
  }

  export type ReleaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseCreateManyInput = {
    id?: string
    githubId: bigint | number
    repositoryId: string
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ReleaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    repositoryId?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagCreateInput = {
    id?: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutVersionTagsInput
  }

  export type VersionTagUncheckedCreateInput = {
    id?: string
    repositoryId: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
  }

  export type VersionTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutVersionTagsNestedInput
  }

  export type VersionTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagCreateManyInput = {
    id?: string
    repositoryId: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
  }

  export type VersionTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorCreateInput = {
    id?: string
    githubId: bigint | number
    login: string
    avatarUrl?: string | null
    htmlUrl?: string | null
    type: string
    siteAdmin?: boolean
    name?: string | null
    company?: string | null
    blog?: string | null
    location?: string | null
    email?: string | null
    bio?: string | null
    publicRepos?: number | null
    publicGists?: number | null
    followers?: number | null
    following?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    syncedAt?: Date | string
    contributions?: ContributorContributionCreateNestedManyWithoutContributorInput
  }

  export type ContributorUncheckedCreateInput = {
    id?: string
    githubId: bigint | number
    login: string
    avatarUrl?: string | null
    htmlUrl?: string | null
    type: string
    siteAdmin?: boolean
    name?: string | null
    company?: string | null
    blog?: string | null
    location?: string | null
    email?: string | null
    bio?: string | null
    publicRepos?: number | null
    publicGists?: number | null
    followers?: number | null
    following?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    syncedAt?: Date | string
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutContributorInput
  }

  export type ContributorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributions?: ContributorContributionUpdateManyWithoutContributorNestedInput
  }

  export type ContributorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributions?: ContributorContributionUncheckedUpdateManyWithoutContributorNestedInput
  }

  export type ContributorCreateManyInput = {
    id?: string
    githubId: bigint | number
    login: string
    avatarUrl?: string | null
    htmlUrl?: string | null
    type: string
    siteAdmin?: boolean
    name?: string | null
    company?: string | null
    blog?: string | null
    location?: string | null
    email?: string | null
    bio?: string | null
    publicRepos?: number | null
    publicGists?: number | null
    followers?: number | null
    following?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ContributorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionCreateInput = {
    contributionsCount?: number
    syncedAt?: Date | string
    contributor: ContributorCreateNestedOneWithoutContributionsInput
    repository: RepositoryCreateNestedOneWithoutContributionsInput
  }

  export type ContributorContributionUncheckedCreateInput = {
    contributorId: string
    repositoryId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type ContributorContributionUpdateInput = {
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributor?: ContributorUpdateOneRequiredWithoutContributionsNestedInput
    repository?: RepositoryUpdateOneRequiredWithoutContributionsNestedInput
  }

  export type ContributorContributionUncheckedUpdateInput = {
    contributorId?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionCreateManyInput = {
    contributorId: string
    repositoryId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type ContributorContributionUpdateManyMutationInput = {
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionUncheckedUpdateManyInput = {
    contributorId?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentCreateInput = {
    id?: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutDocumentationContentInput
  }

  export type DocumentationContentUncheckedCreateInput = {
    id?: string
    repositoryId: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentationContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutDocumentationContentNestedInput
  }

  export type DocumentationContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentCreateManyInput = {
    id?: string
    repositoryId: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentationContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationMetadataCreateInput = {
    version: string
    lastCommitSha?: string | null
    lastSyncedAt?: Date | string
    fileCount?: number
    totalSize?: number
    repository: RepositoryCreateNestedOneWithoutDocumentationMetadataInput
  }

  export type DocumentationMetadataUncheckedCreateInput = {
    repositoryId: string
    version: string
    lastCommitSha?: string | null
    lastSyncedAt?: Date | string
    fileCount?: number
    totalSize?: number
  }

  export type DocumentationMetadataUpdateInput = {
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
    repository?: RepositoryUpdateOneRequiredWithoutDocumentationMetadataNestedInput
  }

  export type DocumentationMetadataUncheckedUpdateInput = {
    repositoryId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentationMetadataCreateManyInput = {
    repositoryId: string
    version: string
    lastCommitSha?: string | null
    lastSyncedAt?: Date | string
    fileCount?: number
    totalSize?: number
  }

  export type DocumentationMetadataUpdateManyMutationInput = {
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentationMetadataUncheckedUpdateManyInput = {
    repositoryId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
  }

  export type SyncLogCreateInput = {
    id?: string
    syncType: string
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
    repository?: RepositoryCreateNestedOneWithoutSyncLogsInput
  }

  export type SyncLogUncheckedCreateInput = {
    id?: string
    syncType: string
    repositoryId?: string | null
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    repository?: RepositoryUpdateOneWithoutSyncLogsNestedInput
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogCreateManyInput = {
    id?: string
    syncType: string
    repositoryId?: string | null
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    repositoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SettingsCreateInput = {
    id?: string
    key: string
    title: string
    description: string
    section: string
    appliedTo: string
    type: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    key: string
    title: string
    description: string
    section: string
    appliedTo: string
    type: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    appliedTo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    appliedTo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: string
    key: string
    title: string
    description: string
    section: string
    appliedTo: string
    type: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    appliedTo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    appliedTo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IssueListRelationFilter = {
    every?: IssueWhereInput
    some?: IssueWhereInput
    none?: IssueWhereInput
  }

  export type PullRequestListRelationFilter = {
    every?: PullRequestWhereInput
    some?: PullRequestWhereInput
    none?: PullRequestWhereInput
  }

  export type CommitListRelationFilter = {
    every?: CommitWhereInput
    some?: CommitWhereInput
    none?: CommitWhereInput
  }

  export type ReleaseListRelationFilter = {
    every?: ReleaseWhereInput
    some?: ReleaseWhereInput
    none?: ReleaseWhereInput
  }

  export type VersionTagListRelationFilter = {
    every?: VersionTagWhereInput
    some?: VersionTagWhereInput
    none?: VersionTagWhereInput
  }

  export type ContributorContributionListRelationFilter = {
    every?: ContributorContributionWhereInput
    some?: ContributorContributionWhereInput
    none?: ContributorContributionWhereInput
  }

  export type DocumentationContentListRelationFilter = {
    every?: DocumentationContentWhereInput
    some?: DocumentationContentWhereInput
    none?: DocumentationContentWhereInput
  }

  export type DocumentationMetadataNullableScalarRelationFilter = {
    is?: DocumentationMetadataWhereInput | null
    isNot?: DocumentationMetadataWhereInput | null
  }

  export type SyncLogListRelationFilter = {
    every?: SyncLogWhereInput
    some?: SyncLogWhereInput
    none?: SyncLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type IssueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PullRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReleaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VersionTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContributorContributionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentationContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SyncLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepositoryCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    owner?: SortOrder
    description?: SortOrder
    private?: SortOrder
    published?: SortOrder
    fork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pushedAt?: SortOrder
    homepage?: SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    language?: SortOrder
    defaultBranch?: SortOrder
    topics?: SortOrder
    archived?: SortOrder
    disabled?: SortOrder
    syncedAt?: SortOrder
    featured?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    docsPath?: SortOrder
  }

  export type RepositoryAvgOrderByAggregateInput = {
    githubId?: SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
  }

  export type RepositoryMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    owner?: SortOrder
    description?: SortOrder
    private?: SortOrder
    published?: SortOrder
    fork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pushedAt?: SortOrder
    homepage?: SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    language?: SortOrder
    defaultBranch?: SortOrder
    archived?: SortOrder
    disabled?: SortOrder
    syncedAt?: SortOrder
    featured?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    docsPath?: SortOrder
  }

  export type RepositoryMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    owner?: SortOrder
    description?: SortOrder
    private?: SortOrder
    published?: SortOrder
    fork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pushedAt?: SortOrder
    homepage?: SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    language?: SortOrder
    defaultBranch?: SortOrder
    archived?: SortOrder
    disabled?: SortOrder
    syncedAt?: SortOrder
    featured?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    docsPath?: SortOrder
  }

  export type RepositorySumOrderByAggregateInput = {
    githubId?: SortOrder
    size?: SortOrder
    stargazersCount?: SortOrder
    watchersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumIssueStateFilter<$PrismaModel = never> = {
    equals?: $Enums.IssueState | EnumIssueStateFieldRefInput<$PrismaModel>
    in?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    not?: NestedEnumIssueStateFilter<$PrismaModel> | $Enums.IssueState
  }

  export type RepositoryScalarRelationFilter = {
    is?: RepositoryWhereInput
    isNot?: RepositoryWhereInput
  }

  export type IssueRepositoryIdNumberCompoundUniqueInput = {
    repositoryId: string
    number: number
  }

  export type IssueCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type IssueAvgOrderByAggregateInput = {
    githubId?: SortOrder
    number?: SortOrder
    commentsCount?: SortOrder
  }

  export type IssueMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type IssueMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    commentsCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type IssueSumOrderByAggregateInput = {
    githubId?: SortOrder
    number?: SortOrder
    commentsCount?: SortOrder
  }

  export type EnumIssueStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IssueState | EnumIssueStateFieldRefInput<$PrismaModel>
    in?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    not?: NestedEnumIssueStateWithAggregatesFilter<$PrismaModel> | $Enums.IssueState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIssueStateFilter<$PrismaModel>
    _max?: NestedEnumIssueStateFilter<$PrismaModel>
  }

  export type EnumPrStateFilter<$PrismaModel = never> = {
    equals?: $Enums.PrState | EnumPrStateFieldRefInput<$PrismaModel>
    in?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPrStateFilter<$PrismaModel> | $Enums.PrState
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type PullRequestRepositoryIdNumberCompoundUniqueInput = {
    repositoryId: string
    number: number
  }

  export type PullRequestCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    labels?: SortOrder
    assignees?: SortOrder
    requestedReviewers?: SortOrder
    headRef?: SortOrder
    baseRef?: SortOrder
    mergeable?: SortOrder
    merged?: SortOrder
    mergedAt?: SortOrder
    mergedBy?: SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type PullRequestAvgOrderByAggregateInput = {
    githubId?: SortOrder
    number?: SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
  }

  export type PullRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    headRef?: SortOrder
    baseRef?: SortOrder
    mergeable?: SortOrder
    merged?: SortOrder
    mergedAt?: SortOrder
    mergedBy?: SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type PullRequestMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    number?: SortOrder
    title?: SortOrder
    body?: SortOrder
    state?: SortOrder
    userLogin?: SortOrder
    userAvatarUrl?: SortOrder
    headRef?: SortOrder
    baseRef?: SortOrder
    mergeable?: SortOrder
    merged?: SortOrder
    mergedAt?: SortOrder
    mergedBy?: SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type PullRequestSumOrderByAggregateInput = {
    githubId?: SortOrder
    number?: SortOrder
    commentsCount?: SortOrder
    reviewCommentsCount?: SortOrder
    commitsCount?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    changedFiles?: SortOrder
  }

  export type EnumPrStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrState | EnumPrStateFieldRefInput<$PrismaModel>
    in?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPrStateWithAggregatesFilter<$PrismaModel> | $Enums.PrState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrStateFilter<$PrismaModel>
    _max?: NestedEnumPrStateFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type CommitCountOrderByAggregateInput = {
    sha?: SortOrder
    repositoryId?: SortOrder
    message?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    authorDate?: SortOrder
    committerName?: SortOrder
    committerEmail?: SortOrder
    committerDate?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
    syncedAt?: SortOrder
  }

  export type CommitAvgOrderByAggregateInput = {
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
  }

  export type CommitMaxOrderByAggregateInput = {
    sha?: SortOrder
    repositoryId?: SortOrder
    message?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    authorDate?: SortOrder
    committerName?: SortOrder
    committerEmail?: SortOrder
    committerDate?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
    syncedAt?: SortOrder
  }

  export type CommitMinOrderByAggregateInput = {
    sha?: SortOrder
    repositoryId?: SortOrder
    message?: SortOrder
    authorName?: SortOrder
    authorEmail?: SortOrder
    authorDate?: SortOrder
    committerName?: SortOrder
    committerEmail?: SortOrder
    committerDate?: SortOrder
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
    syncedAt?: SortOrder
  }

  export type CommitSumOrderByAggregateInput = {
    additions?: SortOrder
    deletions?: SortOrder
    totalChanges?: SortOrder
  }

  export type ReleaseRepositoryIdTagNameCompoundUniqueInput = {
    repositoryId: string
    tagName: string
  }

  export type ReleaseCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    name?: SortOrder
    body?: SortOrder
    draft?: SortOrder
    prerelease?: SortOrder
    authorLogin?: SortOrder
    authorAvatarUrl?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ReleaseAvgOrderByAggregateInput = {
    githubId?: SortOrder
  }

  export type ReleaseMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    name?: SortOrder
    body?: SortOrder
    draft?: SortOrder
    prerelease?: SortOrder
    authorLogin?: SortOrder
    authorAvatarUrl?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ReleaseMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    name?: SortOrder
    body?: SortOrder
    draft?: SortOrder
    prerelease?: SortOrder
    authorLogin?: SortOrder
    authorAvatarUrl?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ReleaseSumOrderByAggregateInput = {
    githubId?: SortOrder
  }

  export type VersionTagRepositoryIdTagNameCompoundUniqueInput = {
    repositoryId: string
    tagName: string
  }

  export type VersionTagCountOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    commitSha?: SortOrder
    isLatest?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type VersionTagMaxOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    commitSha?: SortOrder
    isLatest?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type VersionTagMinOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    tagName?: SortOrder
    commitSha?: SortOrder
    isLatest?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ContributorCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    avatarUrl?: SortOrder
    htmlUrl?: SortOrder
    type?: SortOrder
    siteAdmin?: SortOrder
    name?: SortOrder
    company?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorAvgOrderByAggregateInput = {
    githubId?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
  }

  export type ContributorMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    avatarUrl?: SortOrder
    htmlUrl?: SortOrder
    type?: SortOrder
    siteAdmin?: SortOrder
    name?: SortOrder
    company?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    avatarUrl?: SortOrder
    htmlUrl?: SortOrder
    type?: SortOrder
    siteAdmin?: SortOrder
    name?: SortOrder
    company?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    email?: SortOrder
    bio?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorSumOrderByAggregateInput = {
    githubId?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ContributorScalarRelationFilter = {
    is?: ContributorWhereInput
    isNot?: ContributorWhereInput
  }

  export type ContributorContributionContributorIdRepositoryIdCompoundUniqueInput = {
    contributorId: string
    repositoryId: string
  }

  export type ContributorContributionCountOrderByAggregateInput = {
    contributorId?: SortOrder
    repositoryId?: SortOrder
    contributionsCount?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorContributionAvgOrderByAggregateInput = {
    contributionsCount?: SortOrder
  }

  export type ContributorContributionMaxOrderByAggregateInput = {
    contributorId?: SortOrder
    repositoryId?: SortOrder
    contributionsCount?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorContributionMinOrderByAggregateInput = {
    contributorId?: SortOrder
    repositoryId?: SortOrder
    contributionsCount?: SortOrder
    syncedAt?: SortOrder
  }

  export type ContributorContributionSumOrderByAggregateInput = {
    contributionsCount?: SortOrder
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DocumentationContentRepositoryIdFilePathCompoundUniqueInput = {
    repositoryId: string
    filePath: string
  }

  export type DocumentationContentCountOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    filePath?: SortOrder
    slug?: SortOrder
    groupSlug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    description?: SortOrder
    orderIndex?: SortOrder
    version?: SortOrder
    status?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    hidden?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentationContentAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type DocumentationContentMaxOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    filePath?: SortOrder
    groupSlug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    description?: SortOrder
    version?: SortOrder
    status?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    hidden?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentationContentMinOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    filePath?: SortOrder
    groupSlug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    description?: SortOrder
    version?: SortOrder
    status?: SortOrder
    emoji?: SortOrder
    faIcon?: SortOrder
    hidden?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentationContentSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type DocumentationMetadataCountOrderByAggregateInput = {
    repositoryId?: SortOrder
    version?: SortOrder
    lastCommitSha?: SortOrder
    lastSyncedAt?: SortOrder
    fileCount?: SortOrder
    totalSize?: SortOrder
  }

  export type DocumentationMetadataAvgOrderByAggregateInput = {
    fileCount?: SortOrder
    totalSize?: SortOrder
  }

  export type DocumentationMetadataMaxOrderByAggregateInput = {
    repositoryId?: SortOrder
    version?: SortOrder
    lastCommitSha?: SortOrder
    lastSyncedAt?: SortOrder
    fileCount?: SortOrder
    totalSize?: SortOrder
  }

  export type DocumentationMetadataMinOrderByAggregateInput = {
    repositoryId?: SortOrder
    version?: SortOrder
    lastCommitSha?: SortOrder
    lastSyncedAt?: SortOrder
    fileCount?: SortOrder
    totalSize?: SortOrder
  }

  export type DocumentationMetadataSumOrderByAggregateInput = {
    fileCount?: SortOrder
    totalSize?: SortOrder
  }

  export type EnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RepositoryNullableScalarRelationFilter = {
    is?: RepositoryWhereInput | null
    isNot?: RepositoryWhereInput | null
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    syncType?: SortOrder
    repositoryId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
    recordsProcessed?: SortOrder
    metadata?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    recordsProcessed?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    syncType?: SortOrder
    repositoryId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
    recordsProcessed?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    syncType?: SortOrder
    repositoryId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    errorMessage?: SortOrder
    recordsProcessed?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    recordsProcessed?: SortOrder
  }

  export type EnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    section?: SortOrder
    appliedTo?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    section?: SortOrder
    appliedTo?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    section?: SortOrder
    appliedTo?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RepositoryCreatetopicsInput = {
    set: string[]
  }

  export type IssueCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput> | IssueCreateWithoutRepositoryInput[] | IssueUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: IssueCreateOrConnectWithoutRepositoryInput | IssueCreateOrConnectWithoutRepositoryInput[]
    createMany?: IssueCreateManyRepositoryInputEnvelope
    connect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
  }

  export type PullRequestCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput> | PullRequestCreateWithoutRepositoryInput[] | PullRequestUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: PullRequestCreateOrConnectWithoutRepositoryInput | PullRequestCreateOrConnectWithoutRepositoryInput[]
    createMany?: PullRequestCreateManyRepositoryInputEnvelope
    connect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
  }

  export type CommitCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput> | CommitCreateWithoutRepositoryInput[] | CommitUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutRepositoryInput | CommitCreateOrConnectWithoutRepositoryInput[]
    createMany?: CommitCreateManyRepositoryInputEnvelope
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
  }

  export type ReleaseCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput> | ReleaseCreateWithoutRepositoryInput[] | ReleaseUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ReleaseCreateOrConnectWithoutRepositoryInput | ReleaseCreateOrConnectWithoutRepositoryInput[]
    createMany?: ReleaseCreateManyRepositoryInputEnvelope
    connect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
  }

  export type VersionTagCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput> | VersionTagCreateWithoutRepositoryInput[] | VersionTagUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: VersionTagCreateOrConnectWithoutRepositoryInput | VersionTagCreateOrConnectWithoutRepositoryInput[]
    createMany?: VersionTagCreateManyRepositoryInputEnvelope
    connect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
  }

  export type ContributorContributionCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput> | ContributorContributionCreateWithoutRepositoryInput[] | ContributorContributionUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutRepositoryInput | ContributorContributionCreateOrConnectWithoutRepositoryInput[]
    createMany?: ContributorContributionCreateManyRepositoryInputEnvelope
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
  }

  export type DocumentationContentCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput> | DocumentationContentCreateWithoutRepositoryInput[] | DocumentationContentUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: DocumentationContentCreateOrConnectWithoutRepositoryInput | DocumentationContentCreateOrConnectWithoutRepositoryInput[]
    createMany?: DocumentationContentCreateManyRepositoryInputEnvelope
    connect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
  }

  export type DocumentationMetadataCreateNestedOneWithoutRepositoryInput = {
    create?: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
    connectOrCreate?: DocumentationMetadataCreateOrConnectWithoutRepositoryInput
    connect?: DocumentationMetadataWhereUniqueInput
  }

  export type SyncLogCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput> | SyncLogCreateWithoutRepositoryInput[] | SyncLogUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: SyncLogCreateOrConnectWithoutRepositoryInput | SyncLogCreateOrConnectWithoutRepositoryInput[]
    createMany?: SyncLogCreateManyRepositoryInputEnvelope
    connect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
  }

  export type IssueUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput> | IssueCreateWithoutRepositoryInput[] | IssueUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: IssueCreateOrConnectWithoutRepositoryInput | IssueCreateOrConnectWithoutRepositoryInput[]
    createMany?: IssueCreateManyRepositoryInputEnvelope
    connect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
  }

  export type PullRequestUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput> | PullRequestCreateWithoutRepositoryInput[] | PullRequestUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: PullRequestCreateOrConnectWithoutRepositoryInput | PullRequestCreateOrConnectWithoutRepositoryInput[]
    createMany?: PullRequestCreateManyRepositoryInputEnvelope
    connect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
  }

  export type CommitUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput> | CommitCreateWithoutRepositoryInput[] | CommitUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutRepositoryInput | CommitCreateOrConnectWithoutRepositoryInput[]
    createMany?: CommitCreateManyRepositoryInputEnvelope
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
  }

  export type ReleaseUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput> | ReleaseCreateWithoutRepositoryInput[] | ReleaseUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ReleaseCreateOrConnectWithoutRepositoryInput | ReleaseCreateOrConnectWithoutRepositoryInput[]
    createMany?: ReleaseCreateManyRepositoryInputEnvelope
    connect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
  }

  export type VersionTagUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput> | VersionTagCreateWithoutRepositoryInput[] | VersionTagUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: VersionTagCreateOrConnectWithoutRepositoryInput | VersionTagCreateOrConnectWithoutRepositoryInput[]
    createMany?: VersionTagCreateManyRepositoryInputEnvelope
    connect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
  }

  export type ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput> | ContributorContributionCreateWithoutRepositoryInput[] | ContributorContributionUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutRepositoryInput | ContributorContributionCreateOrConnectWithoutRepositoryInput[]
    createMany?: ContributorContributionCreateManyRepositoryInputEnvelope
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
  }

  export type DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput> | DocumentationContentCreateWithoutRepositoryInput[] | DocumentationContentUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: DocumentationContentCreateOrConnectWithoutRepositoryInput | DocumentationContentCreateOrConnectWithoutRepositoryInput[]
    createMany?: DocumentationContentCreateManyRepositoryInputEnvelope
    connect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
  }

  export type DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput = {
    create?: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
    connectOrCreate?: DocumentationMetadataCreateOrConnectWithoutRepositoryInput
    connect?: DocumentationMetadataWhereUniqueInput
  }

  export type SyncLogUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput> | SyncLogCreateWithoutRepositoryInput[] | SyncLogUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: SyncLogCreateOrConnectWithoutRepositoryInput | SyncLogCreateOrConnectWithoutRepositoryInput[]
    createMany?: SyncLogCreateManyRepositoryInputEnvelope
    connect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RepositoryUpdatetopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IssueUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput> | IssueCreateWithoutRepositoryInput[] | IssueUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: IssueCreateOrConnectWithoutRepositoryInput | IssueCreateOrConnectWithoutRepositoryInput[]
    upsert?: IssueUpsertWithWhereUniqueWithoutRepositoryInput | IssueUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: IssueCreateManyRepositoryInputEnvelope
    set?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    disconnect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    delete?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    connect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    update?: IssueUpdateWithWhereUniqueWithoutRepositoryInput | IssueUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: IssueUpdateManyWithWhereWithoutRepositoryInput | IssueUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: IssueScalarWhereInput | IssueScalarWhereInput[]
  }

  export type PullRequestUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput> | PullRequestCreateWithoutRepositoryInput[] | PullRequestUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: PullRequestCreateOrConnectWithoutRepositoryInput | PullRequestCreateOrConnectWithoutRepositoryInput[]
    upsert?: PullRequestUpsertWithWhereUniqueWithoutRepositoryInput | PullRequestUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: PullRequestCreateManyRepositoryInputEnvelope
    set?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    disconnect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    delete?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    connect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    update?: PullRequestUpdateWithWhereUniqueWithoutRepositoryInput | PullRequestUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: PullRequestUpdateManyWithWhereWithoutRepositoryInput | PullRequestUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: PullRequestScalarWhereInput | PullRequestScalarWhereInput[]
  }

  export type CommitUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput> | CommitCreateWithoutRepositoryInput[] | CommitUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutRepositoryInput | CommitCreateOrConnectWithoutRepositoryInput[]
    upsert?: CommitUpsertWithWhereUniqueWithoutRepositoryInput | CommitUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: CommitCreateManyRepositoryInputEnvelope
    set?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    disconnect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    delete?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    update?: CommitUpdateWithWhereUniqueWithoutRepositoryInput | CommitUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: CommitUpdateManyWithWhereWithoutRepositoryInput | CommitUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: CommitScalarWhereInput | CommitScalarWhereInput[]
  }

  export type ReleaseUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput> | ReleaseCreateWithoutRepositoryInput[] | ReleaseUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ReleaseCreateOrConnectWithoutRepositoryInput | ReleaseCreateOrConnectWithoutRepositoryInput[]
    upsert?: ReleaseUpsertWithWhereUniqueWithoutRepositoryInput | ReleaseUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: ReleaseCreateManyRepositoryInputEnvelope
    set?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    disconnect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    delete?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    connect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    update?: ReleaseUpdateWithWhereUniqueWithoutRepositoryInput | ReleaseUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: ReleaseUpdateManyWithWhereWithoutRepositoryInput | ReleaseUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: ReleaseScalarWhereInput | ReleaseScalarWhereInput[]
  }

  export type VersionTagUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput> | VersionTagCreateWithoutRepositoryInput[] | VersionTagUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: VersionTagCreateOrConnectWithoutRepositoryInput | VersionTagCreateOrConnectWithoutRepositoryInput[]
    upsert?: VersionTagUpsertWithWhereUniqueWithoutRepositoryInput | VersionTagUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: VersionTagCreateManyRepositoryInputEnvelope
    set?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    disconnect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    delete?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    connect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    update?: VersionTagUpdateWithWhereUniqueWithoutRepositoryInput | VersionTagUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: VersionTagUpdateManyWithWhereWithoutRepositoryInput | VersionTagUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: VersionTagScalarWhereInput | VersionTagScalarWhereInput[]
  }

  export type ContributorContributionUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput> | ContributorContributionCreateWithoutRepositoryInput[] | ContributorContributionUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutRepositoryInput | ContributorContributionCreateOrConnectWithoutRepositoryInput[]
    upsert?: ContributorContributionUpsertWithWhereUniqueWithoutRepositoryInput | ContributorContributionUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: ContributorContributionCreateManyRepositoryInputEnvelope
    set?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    disconnect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    delete?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    update?: ContributorContributionUpdateWithWhereUniqueWithoutRepositoryInput | ContributorContributionUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: ContributorContributionUpdateManyWithWhereWithoutRepositoryInput | ContributorContributionUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
  }

  export type DocumentationContentUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput> | DocumentationContentCreateWithoutRepositoryInput[] | DocumentationContentUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: DocumentationContentCreateOrConnectWithoutRepositoryInput | DocumentationContentCreateOrConnectWithoutRepositoryInput[]
    upsert?: DocumentationContentUpsertWithWhereUniqueWithoutRepositoryInput | DocumentationContentUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: DocumentationContentCreateManyRepositoryInputEnvelope
    set?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    disconnect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    delete?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    connect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    update?: DocumentationContentUpdateWithWhereUniqueWithoutRepositoryInput | DocumentationContentUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: DocumentationContentUpdateManyWithWhereWithoutRepositoryInput | DocumentationContentUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: DocumentationContentScalarWhereInput | DocumentationContentScalarWhereInput[]
  }

  export type DocumentationMetadataUpdateOneWithoutRepositoryNestedInput = {
    create?: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
    connectOrCreate?: DocumentationMetadataCreateOrConnectWithoutRepositoryInput
    upsert?: DocumentationMetadataUpsertWithoutRepositoryInput
    disconnect?: DocumentationMetadataWhereInput | boolean
    delete?: DocumentationMetadataWhereInput | boolean
    connect?: DocumentationMetadataWhereUniqueInput
    update?: XOR<XOR<DocumentationMetadataUpdateToOneWithWhereWithoutRepositoryInput, DocumentationMetadataUpdateWithoutRepositoryInput>, DocumentationMetadataUncheckedUpdateWithoutRepositoryInput>
  }

  export type SyncLogUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput> | SyncLogCreateWithoutRepositoryInput[] | SyncLogUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: SyncLogCreateOrConnectWithoutRepositoryInput | SyncLogCreateOrConnectWithoutRepositoryInput[]
    upsert?: SyncLogUpsertWithWhereUniqueWithoutRepositoryInput | SyncLogUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: SyncLogCreateManyRepositoryInputEnvelope
    set?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    disconnect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    delete?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    connect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    update?: SyncLogUpdateWithWhereUniqueWithoutRepositoryInput | SyncLogUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: SyncLogUpdateManyWithWhereWithoutRepositoryInput | SyncLogUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: SyncLogScalarWhereInput | SyncLogScalarWhereInput[]
  }

  export type IssueUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput> | IssueCreateWithoutRepositoryInput[] | IssueUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: IssueCreateOrConnectWithoutRepositoryInput | IssueCreateOrConnectWithoutRepositoryInput[]
    upsert?: IssueUpsertWithWhereUniqueWithoutRepositoryInput | IssueUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: IssueCreateManyRepositoryInputEnvelope
    set?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    disconnect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    delete?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    connect?: IssueWhereUniqueInput | IssueWhereUniqueInput[]
    update?: IssueUpdateWithWhereUniqueWithoutRepositoryInput | IssueUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: IssueUpdateManyWithWhereWithoutRepositoryInput | IssueUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: IssueScalarWhereInput | IssueScalarWhereInput[]
  }

  export type PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput> | PullRequestCreateWithoutRepositoryInput[] | PullRequestUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: PullRequestCreateOrConnectWithoutRepositoryInput | PullRequestCreateOrConnectWithoutRepositoryInput[]
    upsert?: PullRequestUpsertWithWhereUniqueWithoutRepositoryInput | PullRequestUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: PullRequestCreateManyRepositoryInputEnvelope
    set?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    disconnect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    delete?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    connect?: PullRequestWhereUniqueInput | PullRequestWhereUniqueInput[]
    update?: PullRequestUpdateWithWhereUniqueWithoutRepositoryInput | PullRequestUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: PullRequestUpdateManyWithWhereWithoutRepositoryInput | PullRequestUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: PullRequestScalarWhereInput | PullRequestScalarWhereInput[]
  }

  export type CommitUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput> | CommitCreateWithoutRepositoryInput[] | CommitUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutRepositoryInput | CommitCreateOrConnectWithoutRepositoryInput[]
    upsert?: CommitUpsertWithWhereUniqueWithoutRepositoryInput | CommitUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: CommitCreateManyRepositoryInputEnvelope
    set?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    disconnect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    delete?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    update?: CommitUpdateWithWhereUniqueWithoutRepositoryInput | CommitUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: CommitUpdateManyWithWhereWithoutRepositoryInput | CommitUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: CommitScalarWhereInput | CommitScalarWhereInput[]
  }

  export type ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput> | ReleaseCreateWithoutRepositoryInput[] | ReleaseUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ReleaseCreateOrConnectWithoutRepositoryInput | ReleaseCreateOrConnectWithoutRepositoryInput[]
    upsert?: ReleaseUpsertWithWhereUniqueWithoutRepositoryInput | ReleaseUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: ReleaseCreateManyRepositoryInputEnvelope
    set?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    disconnect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    delete?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    connect?: ReleaseWhereUniqueInput | ReleaseWhereUniqueInput[]
    update?: ReleaseUpdateWithWhereUniqueWithoutRepositoryInput | ReleaseUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: ReleaseUpdateManyWithWhereWithoutRepositoryInput | ReleaseUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: ReleaseScalarWhereInput | ReleaseScalarWhereInput[]
  }

  export type VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput> | VersionTagCreateWithoutRepositoryInput[] | VersionTagUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: VersionTagCreateOrConnectWithoutRepositoryInput | VersionTagCreateOrConnectWithoutRepositoryInput[]
    upsert?: VersionTagUpsertWithWhereUniqueWithoutRepositoryInput | VersionTagUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: VersionTagCreateManyRepositoryInputEnvelope
    set?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    disconnect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    delete?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    connect?: VersionTagWhereUniqueInput | VersionTagWhereUniqueInput[]
    update?: VersionTagUpdateWithWhereUniqueWithoutRepositoryInput | VersionTagUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: VersionTagUpdateManyWithWhereWithoutRepositoryInput | VersionTagUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: VersionTagScalarWhereInput | VersionTagScalarWhereInput[]
  }

  export type ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput> | ContributorContributionCreateWithoutRepositoryInput[] | ContributorContributionUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutRepositoryInput | ContributorContributionCreateOrConnectWithoutRepositoryInput[]
    upsert?: ContributorContributionUpsertWithWhereUniqueWithoutRepositoryInput | ContributorContributionUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: ContributorContributionCreateManyRepositoryInputEnvelope
    set?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    disconnect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    delete?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    update?: ContributorContributionUpdateWithWhereUniqueWithoutRepositoryInput | ContributorContributionUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: ContributorContributionUpdateManyWithWhereWithoutRepositoryInput | ContributorContributionUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
  }

  export type DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput> | DocumentationContentCreateWithoutRepositoryInput[] | DocumentationContentUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: DocumentationContentCreateOrConnectWithoutRepositoryInput | DocumentationContentCreateOrConnectWithoutRepositoryInput[]
    upsert?: DocumentationContentUpsertWithWhereUniqueWithoutRepositoryInput | DocumentationContentUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: DocumentationContentCreateManyRepositoryInputEnvelope
    set?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    disconnect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    delete?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    connect?: DocumentationContentWhereUniqueInput | DocumentationContentWhereUniqueInput[]
    update?: DocumentationContentUpdateWithWhereUniqueWithoutRepositoryInput | DocumentationContentUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: DocumentationContentUpdateManyWithWhereWithoutRepositoryInput | DocumentationContentUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: DocumentationContentScalarWhereInput | DocumentationContentScalarWhereInput[]
  }

  export type DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput = {
    create?: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
    connectOrCreate?: DocumentationMetadataCreateOrConnectWithoutRepositoryInput
    upsert?: DocumentationMetadataUpsertWithoutRepositoryInput
    disconnect?: DocumentationMetadataWhereInput | boolean
    delete?: DocumentationMetadataWhereInput | boolean
    connect?: DocumentationMetadataWhereUniqueInput
    update?: XOR<XOR<DocumentationMetadataUpdateToOneWithWhereWithoutRepositoryInput, DocumentationMetadataUpdateWithoutRepositoryInput>, DocumentationMetadataUncheckedUpdateWithoutRepositoryInput>
  }

  export type SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput> | SyncLogCreateWithoutRepositoryInput[] | SyncLogUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: SyncLogCreateOrConnectWithoutRepositoryInput | SyncLogCreateOrConnectWithoutRepositoryInput[]
    upsert?: SyncLogUpsertWithWhereUniqueWithoutRepositoryInput | SyncLogUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: SyncLogCreateManyRepositoryInputEnvelope
    set?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    disconnect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    delete?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    connect?: SyncLogWhereUniqueInput | SyncLogWhereUniqueInput[]
    update?: SyncLogUpdateWithWhereUniqueWithoutRepositoryInput | SyncLogUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: SyncLogUpdateManyWithWhereWithoutRepositoryInput | SyncLogUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: SyncLogScalarWhereInput | SyncLogScalarWhereInput[]
  }

  export type IssueCreatelabelsInput = {
    set: string[]
  }

  export type IssueCreateassigneesInput = {
    set: string[]
  }

  export type RepositoryCreateNestedOneWithoutIssuesInput = {
    create?: XOR<RepositoryCreateWithoutIssuesInput, RepositoryUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutIssuesInput
    connect?: RepositoryWhereUniqueInput
  }

  export type EnumIssueStateFieldUpdateOperationsInput = {
    set?: $Enums.IssueState
  }

  export type IssueUpdatelabelsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IssueUpdateassigneesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RepositoryUpdateOneRequiredWithoutIssuesNestedInput = {
    create?: XOR<RepositoryCreateWithoutIssuesInput, RepositoryUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutIssuesInput
    upsert?: RepositoryUpsertWithoutIssuesInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutIssuesInput, RepositoryUpdateWithoutIssuesInput>, RepositoryUncheckedUpdateWithoutIssuesInput>
  }

  export type PullRequestCreatelabelsInput = {
    set: string[]
  }

  export type PullRequestCreateassigneesInput = {
    set: string[]
  }

  export type PullRequestCreaterequestedReviewersInput = {
    set: string[]
  }

  export type RepositoryCreateNestedOneWithoutPullRequestsInput = {
    create?: XOR<RepositoryCreateWithoutPullRequestsInput, RepositoryUncheckedCreateWithoutPullRequestsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutPullRequestsInput
    connect?: RepositoryWhereUniqueInput
  }

  export type EnumPrStateFieldUpdateOperationsInput = {
    set?: $Enums.PrState
  }

  export type PullRequestUpdatelabelsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PullRequestUpdateassigneesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PullRequestUpdaterequestedReviewersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type RepositoryUpdateOneRequiredWithoutPullRequestsNestedInput = {
    create?: XOR<RepositoryCreateWithoutPullRequestsInput, RepositoryUncheckedCreateWithoutPullRequestsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutPullRequestsInput
    upsert?: RepositoryUpsertWithoutPullRequestsInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutPullRequestsInput, RepositoryUpdateWithoutPullRequestsInput>, RepositoryUncheckedUpdateWithoutPullRequestsInput>
  }

  export type RepositoryCreateNestedOneWithoutCommitsInput = {
    create?: XOR<RepositoryCreateWithoutCommitsInput, RepositoryUncheckedCreateWithoutCommitsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutCommitsInput
    connect?: RepositoryWhereUniqueInput
  }

  export type RepositoryUpdateOneRequiredWithoutCommitsNestedInput = {
    create?: XOR<RepositoryCreateWithoutCommitsInput, RepositoryUncheckedCreateWithoutCommitsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutCommitsInput
    upsert?: RepositoryUpsertWithoutCommitsInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutCommitsInput, RepositoryUpdateWithoutCommitsInput>, RepositoryUncheckedUpdateWithoutCommitsInput>
  }

  export type RepositoryCreateNestedOneWithoutReleasesInput = {
    create?: XOR<RepositoryCreateWithoutReleasesInput, RepositoryUncheckedCreateWithoutReleasesInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutReleasesInput
    connect?: RepositoryWhereUniqueInput
  }

  export type RepositoryUpdateOneRequiredWithoutReleasesNestedInput = {
    create?: XOR<RepositoryCreateWithoutReleasesInput, RepositoryUncheckedCreateWithoutReleasesInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutReleasesInput
    upsert?: RepositoryUpsertWithoutReleasesInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutReleasesInput, RepositoryUpdateWithoutReleasesInput>, RepositoryUncheckedUpdateWithoutReleasesInput>
  }

  export type RepositoryCreateNestedOneWithoutVersionTagsInput = {
    create?: XOR<RepositoryCreateWithoutVersionTagsInput, RepositoryUncheckedCreateWithoutVersionTagsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutVersionTagsInput
    connect?: RepositoryWhereUniqueInput
  }

  export type RepositoryUpdateOneRequiredWithoutVersionTagsNestedInput = {
    create?: XOR<RepositoryCreateWithoutVersionTagsInput, RepositoryUncheckedCreateWithoutVersionTagsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutVersionTagsInput
    upsert?: RepositoryUpsertWithoutVersionTagsInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutVersionTagsInput, RepositoryUpdateWithoutVersionTagsInput>, RepositoryUncheckedUpdateWithoutVersionTagsInput>
  }

  export type ContributorContributionCreateNestedManyWithoutContributorInput = {
    create?: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput> | ContributorContributionCreateWithoutContributorInput[] | ContributorContributionUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutContributorInput | ContributorContributionCreateOrConnectWithoutContributorInput[]
    createMany?: ContributorContributionCreateManyContributorInputEnvelope
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
  }

  export type ContributorContributionUncheckedCreateNestedManyWithoutContributorInput = {
    create?: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput> | ContributorContributionCreateWithoutContributorInput[] | ContributorContributionUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutContributorInput | ContributorContributionCreateOrConnectWithoutContributorInput[]
    createMany?: ContributorContributionCreateManyContributorInputEnvelope
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContributorContributionUpdateManyWithoutContributorNestedInput = {
    create?: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput> | ContributorContributionCreateWithoutContributorInput[] | ContributorContributionUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutContributorInput | ContributorContributionCreateOrConnectWithoutContributorInput[]
    upsert?: ContributorContributionUpsertWithWhereUniqueWithoutContributorInput | ContributorContributionUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: ContributorContributionCreateManyContributorInputEnvelope
    set?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    disconnect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    delete?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    update?: ContributorContributionUpdateWithWhereUniqueWithoutContributorInput | ContributorContributionUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: ContributorContributionUpdateManyWithWhereWithoutContributorInput | ContributorContributionUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
  }

  export type ContributorContributionUncheckedUpdateManyWithoutContributorNestedInput = {
    create?: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput> | ContributorContributionCreateWithoutContributorInput[] | ContributorContributionUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: ContributorContributionCreateOrConnectWithoutContributorInput | ContributorContributionCreateOrConnectWithoutContributorInput[]
    upsert?: ContributorContributionUpsertWithWhereUniqueWithoutContributorInput | ContributorContributionUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: ContributorContributionCreateManyContributorInputEnvelope
    set?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    disconnect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    delete?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    connect?: ContributorContributionWhereUniqueInput | ContributorContributionWhereUniqueInput[]
    update?: ContributorContributionUpdateWithWhereUniqueWithoutContributorInput | ContributorContributionUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: ContributorContributionUpdateManyWithWhereWithoutContributorInput | ContributorContributionUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
  }

  export type ContributorCreateNestedOneWithoutContributionsInput = {
    create?: XOR<ContributorCreateWithoutContributionsInput, ContributorUncheckedCreateWithoutContributionsInput>
    connectOrCreate?: ContributorCreateOrConnectWithoutContributionsInput
    connect?: ContributorWhereUniqueInput
  }

  export type RepositoryCreateNestedOneWithoutContributionsInput = {
    create?: XOR<RepositoryCreateWithoutContributionsInput, RepositoryUncheckedCreateWithoutContributionsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutContributionsInput
    connect?: RepositoryWhereUniqueInput
  }

  export type ContributorUpdateOneRequiredWithoutContributionsNestedInput = {
    create?: XOR<ContributorCreateWithoutContributionsInput, ContributorUncheckedCreateWithoutContributionsInput>
    connectOrCreate?: ContributorCreateOrConnectWithoutContributionsInput
    upsert?: ContributorUpsertWithoutContributionsInput
    connect?: ContributorWhereUniqueInput
    update?: XOR<XOR<ContributorUpdateToOneWithWhereWithoutContributionsInput, ContributorUpdateWithoutContributionsInput>, ContributorUncheckedUpdateWithoutContributionsInput>
  }

  export type RepositoryUpdateOneRequiredWithoutContributionsNestedInput = {
    create?: XOR<RepositoryCreateWithoutContributionsInput, RepositoryUncheckedCreateWithoutContributionsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutContributionsInput
    upsert?: RepositoryUpsertWithoutContributionsInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutContributionsInput, RepositoryUpdateWithoutContributionsInput>, RepositoryUncheckedUpdateWithoutContributionsInput>
  }

  export type DocumentationContentCreateslugInput = {
    set: string[]
  }

  export type DocumentationContentCreateorderIndexInput = {
    set: number[]
  }

  export type RepositoryCreateNestedOneWithoutDocumentationContentInput = {
    create?: XOR<RepositoryCreateWithoutDocumentationContentInput, RepositoryUncheckedCreateWithoutDocumentationContentInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutDocumentationContentInput
    connect?: RepositoryWhereUniqueInput
  }

  export type DocumentationContentUpdateslugInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DocumentationContentUpdateorderIndexInput = {
    set?: number[]
    push?: number | number[]
  }

  export type RepositoryUpdateOneRequiredWithoutDocumentationContentNestedInput = {
    create?: XOR<RepositoryCreateWithoutDocumentationContentInput, RepositoryUncheckedCreateWithoutDocumentationContentInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutDocumentationContentInput
    upsert?: RepositoryUpsertWithoutDocumentationContentInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutDocumentationContentInput, RepositoryUpdateWithoutDocumentationContentInput>, RepositoryUncheckedUpdateWithoutDocumentationContentInput>
  }

  export type RepositoryCreateNestedOneWithoutDocumentationMetadataInput = {
    create?: XOR<RepositoryCreateWithoutDocumentationMetadataInput, RepositoryUncheckedCreateWithoutDocumentationMetadataInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutDocumentationMetadataInput
    connect?: RepositoryWhereUniqueInput
  }

  export type RepositoryUpdateOneRequiredWithoutDocumentationMetadataNestedInput = {
    create?: XOR<RepositoryCreateWithoutDocumentationMetadataInput, RepositoryUncheckedCreateWithoutDocumentationMetadataInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutDocumentationMetadataInput
    upsert?: RepositoryUpsertWithoutDocumentationMetadataInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutDocumentationMetadataInput, RepositoryUpdateWithoutDocumentationMetadataInput>, RepositoryUncheckedUpdateWithoutDocumentationMetadataInput>
  }

  export type RepositoryCreateNestedOneWithoutSyncLogsInput = {
    create?: XOR<RepositoryCreateWithoutSyncLogsInput, RepositoryUncheckedCreateWithoutSyncLogsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutSyncLogsInput
    connect?: RepositoryWhereUniqueInput
  }

  export type EnumSyncStatusFieldUpdateOperationsInput = {
    set?: $Enums.SyncStatus
  }

  export type RepositoryUpdateOneWithoutSyncLogsNestedInput = {
    create?: XOR<RepositoryCreateWithoutSyncLogsInput, RepositoryUncheckedCreateWithoutSyncLogsInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutSyncLogsInput
    upsert?: RepositoryUpsertWithoutSyncLogsInput
    disconnect?: RepositoryWhereInput | boolean
    delete?: RepositoryWhereInput | boolean
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutSyncLogsInput, RepositoryUpdateWithoutSyncLogsInput>, RepositoryUncheckedUpdateWithoutSyncLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumIssueStateFilter<$PrismaModel = never> = {
    equals?: $Enums.IssueState | EnumIssueStateFieldRefInput<$PrismaModel>
    in?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    not?: NestedEnumIssueStateFilter<$PrismaModel> | $Enums.IssueState
  }

  export type NestedEnumIssueStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IssueState | EnumIssueStateFieldRefInput<$PrismaModel>
    in?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.IssueState[] | ListEnumIssueStateFieldRefInput<$PrismaModel>
    not?: NestedEnumIssueStateWithAggregatesFilter<$PrismaModel> | $Enums.IssueState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIssueStateFilter<$PrismaModel>
    _max?: NestedEnumIssueStateFilter<$PrismaModel>
  }

  export type NestedEnumPrStateFilter<$PrismaModel = never> = {
    equals?: $Enums.PrState | EnumPrStateFieldRefInput<$PrismaModel>
    in?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPrStateFilter<$PrismaModel> | $Enums.PrState
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumPrStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrState | EnumPrStateFieldRefInput<$PrismaModel>
    in?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrState[] | ListEnumPrStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPrStateWithAggregatesFilter<$PrismaModel> | $Enums.PrState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrStateFilter<$PrismaModel>
    _max?: NestedEnumPrStateFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusFilter<$PrismaModel> | $Enums.SyncStatus
  }

  export type NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SyncStatus | EnumSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SyncStatus[] | ListEnumSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSyncStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IssueCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type IssueUncheckedCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type IssueCreateOrConnectWithoutRepositoryInput = {
    where: IssueWhereUniqueInput
    create: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput>
  }

  export type IssueCreateManyRepositoryInputEnvelope = {
    data: IssueCreateManyRepositoryInput | IssueCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type PullRequestCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type PullRequestUncheckedCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type PullRequestCreateOrConnectWithoutRepositoryInput = {
    where: PullRequestWhereUniqueInput
    create: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput>
  }

  export type PullRequestCreateManyRepositoryInputEnvelope = {
    data: PullRequestCreateManyRepositoryInput | PullRequestCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type CommitCreateWithoutRepositoryInput = {
    sha: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
  }

  export type CommitUncheckedCreateWithoutRepositoryInput = {
    sha: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
  }

  export type CommitCreateOrConnectWithoutRepositoryInput = {
    where: CommitWhereUniqueInput
    create: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput>
  }

  export type CommitCreateManyRepositoryInputEnvelope = {
    data: CommitCreateManyRepositoryInput | CommitCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type ReleaseCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ReleaseUncheckedCreateWithoutRepositoryInput = {
    id?: string
    githubId: bigint | number
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ReleaseCreateOrConnectWithoutRepositoryInput = {
    where: ReleaseWhereUniqueInput
    create: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput>
  }

  export type ReleaseCreateManyRepositoryInputEnvelope = {
    data: ReleaseCreateManyRepositoryInput | ReleaseCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type VersionTagCreateWithoutRepositoryInput = {
    id?: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
  }

  export type VersionTagUncheckedCreateWithoutRepositoryInput = {
    id?: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
  }

  export type VersionTagCreateOrConnectWithoutRepositoryInput = {
    where: VersionTagWhereUniqueInput
    create: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput>
  }

  export type VersionTagCreateManyRepositoryInputEnvelope = {
    data: VersionTagCreateManyRepositoryInput | VersionTagCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type ContributorContributionCreateWithoutRepositoryInput = {
    contributionsCount?: number
    syncedAt?: Date | string
    contributor: ContributorCreateNestedOneWithoutContributionsInput
  }

  export type ContributorContributionUncheckedCreateWithoutRepositoryInput = {
    contributorId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type ContributorContributionCreateOrConnectWithoutRepositoryInput = {
    where: ContributorContributionWhereUniqueInput
    create: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput>
  }

  export type ContributorContributionCreateManyRepositoryInputEnvelope = {
    data: ContributorContributionCreateManyRepositoryInput | ContributorContributionCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type DocumentationContentCreateWithoutRepositoryInput = {
    id?: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentationContentUncheckedCreateWithoutRepositoryInput = {
    id?: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentationContentCreateOrConnectWithoutRepositoryInput = {
    where: DocumentationContentWhereUniqueInput
    create: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput>
  }

  export type DocumentationContentCreateManyRepositoryInputEnvelope = {
    data: DocumentationContentCreateManyRepositoryInput | DocumentationContentCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type DocumentationMetadataCreateWithoutRepositoryInput = {
    version: string
    lastCommitSha?: string | null
    lastSyncedAt?: Date | string
    fileCount?: number
    totalSize?: number
  }

  export type DocumentationMetadataUncheckedCreateWithoutRepositoryInput = {
    version: string
    lastCommitSha?: string | null
    lastSyncedAt?: Date | string
    fileCount?: number
    totalSize?: number
  }

  export type DocumentationMetadataCreateOrConnectWithoutRepositoryInput = {
    where: DocumentationMetadataWhereUniqueInput
    create: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
  }

  export type SyncLogCreateWithoutRepositoryInput = {
    id?: string
    syncType: string
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedCreateWithoutRepositoryInput = {
    id?: string
    syncType: string
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogCreateOrConnectWithoutRepositoryInput = {
    where: SyncLogWhereUniqueInput
    create: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput>
  }

  export type SyncLogCreateManyRepositoryInputEnvelope = {
    data: SyncLogCreateManyRepositoryInput | SyncLogCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type IssueUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: IssueWhereUniqueInput
    update: XOR<IssueUpdateWithoutRepositoryInput, IssueUncheckedUpdateWithoutRepositoryInput>
    create: XOR<IssueCreateWithoutRepositoryInput, IssueUncheckedCreateWithoutRepositoryInput>
  }

  export type IssueUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: IssueWhereUniqueInput
    data: XOR<IssueUpdateWithoutRepositoryInput, IssueUncheckedUpdateWithoutRepositoryInput>
  }

  export type IssueUpdateManyWithWhereWithoutRepositoryInput = {
    where: IssueScalarWhereInput
    data: XOR<IssueUpdateManyMutationInput, IssueUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type IssueScalarWhereInput = {
    AND?: IssueScalarWhereInput | IssueScalarWhereInput[]
    OR?: IssueScalarWhereInput[]
    NOT?: IssueScalarWhereInput | IssueScalarWhereInput[]
    id?: StringFilter<"Issue"> | string
    githubId?: BigIntFilter<"Issue"> | bigint | number
    repositoryId?: StringFilter<"Issue"> | string
    number?: IntFilter<"Issue"> | number
    title?: StringFilter<"Issue"> | string
    body?: StringNullableFilter<"Issue"> | string | null
    state?: EnumIssueStateFilter<"Issue"> | $Enums.IssueState
    userLogin?: StringFilter<"Issue"> | string
    userAvatarUrl?: StringNullableFilter<"Issue"> | string | null
    labels?: StringNullableListFilter<"Issue">
    assignees?: StringNullableListFilter<"Issue">
    commentsCount?: IntFilter<"Issue"> | number
    createdAt?: DateTimeFilter<"Issue"> | Date | string
    updatedAt?: DateTimeFilter<"Issue"> | Date | string
    closedAt?: DateTimeNullableFilter<"Issue"> | Date | string | null
    syncedAt?: DateTimeFilter<"Issue"> | Date | string
  }

  export type PullRequestUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: PullRequestWhereUniqueInput
    update: XOR<PullRequestUpdateWithoutRepositoryInput, PullRequestUncheckedUpdateWithoutRepositoryInput>
    create: XOR<PullRequestCreateWithoutRepositoryInput, PullRequestUncheckedCreateWithoutRepositoryInput>
  }

  export type PullRequestUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: PullRequestWhereUniqueInput
    data: XOR<PullRequestUpdateWithoutRepositoryInput, PullRequestUncheckedUpdateWithoutRepositoryInput>
  }

  export type PullRequestUpdateManyWithWhereWithoutRepositoryInput = {
    where: PullRequestScalarWhereInput
    data: XOR<PullRequestUpdateManyMutationInput, PullRequestUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type PullRequestScalarWhereInput = {
    AND?: PullRequestScalarWhereInput | PullRequestScalarWhereInput[]
    OR?: PullRequestScalarWhereInput[]
    NOT?: PullRequestScalarWhereInput | PullRequestScalarWhereInput[]
    id?: StringFilter<"PullRequest"> | string
    githubId?: BigIntFilter<"PullRequest"> | bigint | number
    repositoryId?: StringFilter<"PullRequest"> | string
    number?: IntFilter<"PullRequest"> | number
    title?: StringFilter<"PullRequest"> | string
    body?: StringNullableFilter<"PullRequest"> | string | null
    state?: EnumPrStateFilter<"PullRequest"> | $Enums.PrState
    userLogin?: StringFilter<"PullRequest"> | string
    userAvatarUrl?: StringNullableFilter<"PullRequest"> | string | null
    labels?: StringNullableListFilter<"PullRequest">
    assignees?: StringNullableListFilter<"PullRequest">
    requestedReviewers?: StringNullableListFilter<"PullRequest">
    headRef?: StringFilter<"PullRequest"> | string
    baseRef?: StringFilter<"PullRequest"> | string
    mergeable?: BoolNullableFilter<"PullRequest"> | boolean | null
    merged?: BoolFilter<"PullRequest"> | boolean
    mergedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    mergedBy?: StringNullableFilter<"PullRequest"> | string | null
    commentsCount?: IntFilter<"PullRequest"> | number
    reviewCommentsCount?: IntFilter<"PullRequest"> | number
    commitsCount?: IntFilter<"PullRequest"> | number
    additions?: IntFilter<"PullRequest"> | number
    deletions?: IntFilter<"PullRequest"> | number
    changedFiles?: IntFilter<"PullRequest"> | number
    createdAt?: DateTimeFilter<"PullRequest"> | Date | string
    updatedAt?: DateTimeFilter<"PullRequest"> | Date | string
    closedAt?: DateTimeNullableFilter<"PullRequest"> | Date | string | null
    syncedAt?: DateTimeFilter<"PullRequest"> | Date | string
  }

  export type CommitUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: CommitWhereUniqueInput
    update: XOR<CommitUpdateWithoutRepositoryInput, CommitUncheckedUpdateWithoutRepositoryInput>
    create: XOR<CommitCreateWithoutRepositoryInput, CommitUncheckedCreateWithoutRepositoryInput>
  }

  export type CommitUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: CommitWhereUniqueInput
    data: XOR<CommitUpdateWithoutRepositoryInput, CommitUncheckedUpdateWithoutRepositoryInput>
  }

  export type CommitUpdateManyWithWhereWithoutRepositoryInput = {
    where: CommitScalarWhereInput
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type CommitScalarWhereInput = {
    AND?: CommitScalarWhereInput | CommitScalarWhereInput[]
    OR?: CommitScalarWhereInput[]
    NOT?: CommitScalarWhereInput | CommitScalarWhereInput[]
    sha?: StringFilter<"Commit"> | string
    repositoryId?: StringFilter<"Commit"> | string
    message?: StringFilter<"Commit"> | string
    authorName?: StringFilter<"Commit"> | string
    authorEmail?: StringFilter<"Commit"> | string
    authorDate?: DateTimeFilter<"Commit"> | Date | string
    committerName?: StringFilter<"Commit"> | string
    committerEmail?: StringFilter<"Commit"> | string
    committerDate?: DateTimeFilter<"Commit"> | Date | string
    additions?: IntFilter<"Commit"> | number
    deletions?: IntFilter<"Commit"> | number
    totalChanges?: IntFilter<"Commit"> | number
    syncedAt?: DateTimeFilter<"Commit"> | Date | string
  }

  export type ReleaseUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: ReleaseWhereUniqueInput
    update: XOR<ReleaseUpdateWithoutRepositoryInput, ReleaseUncheckedUpdateWithoutRepositoryInput>
    create: XOR<ReleaseCreateWithoutRepositoryInput, ReleaseUncheckedCreateWithoutRepositoryInput>
  }

  export type ReleaseUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: ReleaseWhereUniqueInput
    data: XOR<ReleaseUpdateWithoutRepositoryInput, ReleaseUncheckedUpdateWithoutRepositoryInput>
  }

  export type ReleaseUpdateManyWithWhereWithoutRepositoryInput = {
    where: ReleaseScalarWhereInput
    data: XOR<ReleaseUpdateManyMutationInput, ReleaseUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type ReleaseScalarWhereInput = {
    AND?: ReleaseScalarWhereInput | ReleaseScalarWhereInput[]
    OR?: ReleaseScalarWhereInput[]
    NOT?: ReleaseScalarWhereInput | ReleaseScalarWhereInput[]
    id?: StringFilter<"Release"> | string
    githubId?: BigIntFilter<"Release"> | bigint | number
    repositoryId?: StringFilter<"Release"> | string
    tagName?: StringFilter<"Release"> | string
    name?: StringNullableFilter<"Release"> | string | null
    body?: StringNullableFilter<"Release"> | string | null
    draft?: BoolFilter<"Release"> | boolean
    prerelease?: BoolFilter<"Release"> | boolean
    authorLogin?: StringFilter<"Release"> | string
    authorAvatarUrl?: StringNullableFilter<"Release"> | string | null
    createdAt?: DateTimeFilter<"Release"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Release"> | Date | string | null
    syncedAt?: DateTimeFilter<"Release"> | Date | string
  }

  export type VersionTagUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: VersionTagWhereUniqueInput
    update: XOR<VersionTagUpdateWithoutRepositoryInput, VersionTagUncheckedUpdateWithoutRepositoryInput>
    create: XOR<VersionTagCreateWithoutRepositoryInput, VersionTagUncheckedCreateWithoutRepositoryInput>
  }

  export type VersionTagUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: VersionTagWhereUniqueInput
    data: XOR<VersionTagUpdateWithoutRepositoryInput, VersionTagUncheckedUpdateWithoutRepositoryInput>
  }

  export type VersionTagUpdateManyWithWhereWithoutRepositoryInput = {
    where: VersionTagScalarWhereInput
    data: XOR<VersionTagUpdateManyMutationInput, VersionTagUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type VersionTagScalarWhereInput = {
    AND?: VersionTagScalarWhereInput | VersionTagScalarWhereInput[]
    OR?: VersionTagScalarWhereInput[]
    NOT?: VersionTagScalarWhereInput | VersionTagScalarWhereInput[]
    id?: StringFilter<"VersionTag"> | string
    repositoryId?: StringFilter<"VersionTag"> | string
    tagName?: StringFilter<"VersionTag"> | string
    commitSha?: StringFilter<"VersionTag"> | string
    isLatest?: BoolFilter<"VersionTag"> | boolean
    createdAt?: DateTimeFilter<"VersionTag"> | Date | string
    syncedAt?: DateTimeFilter<"VersionTag"> | Date | string
  }

  export type ContributorContributionUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: ContributorContributionWhereUniqueInput
    update: XOR<ContributorContributionUpdateWithoutRepositoryInput, ContributorContributionUncheckedUpdateWithoutRepositoryInput>
    create: XOR<ContributorContributionCreateWithoutRepositoryInput, ContributorContributionUncheckedCreateWithoutRepositoryInput>
  }

  export type ContributorContributionUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: ContributorContributionWhereUniqueInput
    data: XOR<ContributorContributionUpdateWithoutRepositoryInput, ContributorContributionUncheckedUpdateWithoutRepositoryInput>
  }

  export type ContributorContributionUpdateManyWithWhereWithoutRepositoryInput = {
    where: ContributorContributionScalarWhereInput
    data: XOR<ContributorContributionUpdateManyMutationInput, ContributorContributionUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type ContributorContributionScalarWhereInput = {
    AND?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
    OR?: ContributorContributionScalarWhereInput[]
    NOT?: ContributorContributionScalarWhereInput | ContributorContributionScalarWhereInput[]
    contributorId?: StringFilter<"ContributorContribution"> | string
    repositoryId?: StringFilter<"ContributorContribution"> | string
    contributionsCount?: IntFilter<"ContributorContribution"> | number
    syncedAt?: DateTimeFilter<"ContributorContribution"> | Date | string
  }

  export type DocumentationContentUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: DocumentationContentWhereUniqueInput
    update: XOR<DocumentationContentUpdateWithoutRepositoryInput, DocumentationContentUncheckedUpdateWithoutRepositoryInput>
    create: XOR<DocumentationContentCreateWithoutRepositoryInput, DocumentationContentUncheckedCreateWithoutRepositoryInput>
  }

  export type DocumentationContentUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: DocumentationContentWhereUniqueInput
    data: XOR<DocumentationContentUpdateWithoutRepositoryInput, DocumentationContentUncheckedUpdateWithoutRepositoryInput>
  }

  export type DocumentationContentUpdateManyWithWhereWithoutRepositoryInput = {
    where: DocumentationContentScalarWhereInput
    data: XOR<DocumentationContentUpdateManyMutationInput, DocumentationContentUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type DocumentationContentScalarWhereInput = {
    AND?: DocumentationContentScalarWhereInput | DocumentationContentScalarWhereInput[]
    OR?: DocumentationContentScalarWhereInput[]
    NOT?: DocumentationContentScalarWhereInput | DocumentationContentScalarWhereInput[]
    id?: StringFilter<"DocumentationContent"> | string
    repositoryId?: StringFilter<"DocumentationContent"> | string
    filePath?: StringFilter<"DocumentationContent"> | string
    slug?: StringNullableListFilter<"DocumentationContent">
    groupSlug?: StringFilter<"DocumentationContent"> | string
    title?: StringFilter<"DocumentationContent"> | string
    content?: StringFilter<"DocumentationContent"> | string
    description?: StringNullableFilter<"DocumentationContent"> | string | null
    orderIndex?: IntNullableListFilter<"DocumentationContent">
    version?: StringNullableFilter<"DocumentationContent"> | string | null
    status?: StringNullableFilter<"DocumentationContent"> | string | null
    emoji?: StringNullableFilter<"DocumentationContent"> | string | null
    faIcon?: StringNullableFilter<"DocumentationContent"> | string | null
    hidden?: BoolFilter<"DocumentationContent"> | boolean
    createdAt?: DateTimeFilter<"DocumentationContent"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentationContent"> | Date | string
  }

  export type DocumentationMetadataUpsertWithoutRepositoryInput = {
    update: XOR<DocumentationMetadataUpdateWithoutRepositoryInput, DocumentationMetadataUncheckedUpdateWithoutRepositoryInput>
    create: XOR<DocumentationMetadataCreateWithoutRepositoryInput, DocumentationMetadataUncheckedCreateWithoutRepositoryInput>
    where?: DocumentationMetadataWhereInput
  }

  export type DocumentationMetadataUpdateToOneWithWhereWithoutRepositoryInput = {
    where?: DocumentationMetadataWhereInput
    data: XOR<DocumentationMetadataUpdateWithoutRepositoryInput, DocumentationMetadataUncheckedUpdateWithoutRepositoryInput>
  }

  export type DocumentationMetadataUpdateWithoutRepositoryInput = {
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentationMetadataUncheckedUpdateWithoutRepositoryInput = {
    version?: StringFieldUpdateOperationsInput | string
    lastCommitSha?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileCount?: IntFieldUpdateOperationsInput | number
    totalSize?: IntFieldUpdateOperationsInput | number
  }

  export type SyncLogUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: SyncLogWhereUniqueInput
    update: XOR<SyncLogUpdateWithoutRepositoryInput, SyncLogUncheckedUpdateWithoutRepositoryInput>
    create: XOR<SyncLogCreateWithoutRepositoryInput, SyncLogUncheckedCreateWithoutRepositoryInput>
  }

  export type SyncLogUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: SyncLogWhereUniqueInput
    data: XOR<SyncLogUpdateWithoutRepositoryInput, SyncLogUncheckedUpdateWithoutRepositoryInput>
  }

  export type SyncLogUpdateManyWithWhereWithoutRepositoryInput = {
    where: SyncLogScalarWhereInput
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type SyncLogScalarWhereInput = {
    AND?: SyncLogScalarWhereInput | SyncLogScalarWhereInput[]
    OR?: SyncLogScalarWhereInput[]
    NOT?: SyncLogScalarWhereInput | SyncLogScalarWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    syncType?: StringFilter<"SyncLog"> | string
    repositoryId?: StringNullableFilter<"SyncLog"> | string | null
    status?: EnumSyncStatusFilter<"SyncLog"> | $Enums.SyncStatus
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    recordsProcessed?: IntNullableFilter<"SyncLog"> | number | null
    metadata?: JsonFilter<"SyncLog">
  }

  export type RepositoryCreateWithoutIssuesInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutIssuesInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutIssuesInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutIssuesInput, RepositoryUncheckedCreateWithoutIssuesInput>
  }

  export type RepositoryUpsertWithoutIssuesInput = {
    update: XOR<RepositoryUpdateWithoutIssuesInput, RepositoryUncheckedUpdateWithoutIssuesInput>
    create: XOR<RepositoryCreateWithoutIssuesInput, RepositoryUncheckedCreateWithoutIssuesInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutIssuesInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutIssuesInput, RepositoryUncheckedUpdateWithoutIssuesInput>
  }

  export type RepositoryUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutPullRequestsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutPullRequestsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutPullRequestsInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutPullRequestsInput, RepositoryUncheckedCreateWithoutPullRequestsInput>
  }

  export type RepositoryUpsertWithoutPullRequestsInput = {
    update: XOR<RepositoryUpdateWithoutPullRequestsInput, RepositoryUncheckedUpdateWithoutPullRequestsInput>
    create: XOR<RepositoryCreateWithoutPullRequestsInput, RepositoryUncheckedCreateWithoutPullRequestsInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutPullRequestsInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutPullRequestsInput, RepositoryUncheckedUpdateWithoutPullRequestsInput>
  }

  export type RepositoryUpdateWithoutPullRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutPullRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutCommitsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutCommitsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutCommitsInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutCommitsInput, RepositoryUncheckedCreateWithoutCommitsInput>
  }

  export type RepositoryUpsertWithoutCommitsInput = {
    update: XOR<RepositoryUpdateWithoutCommitsInput, RepositoryUncheckedUpdateWithoutCommitsInput>
    create: XOR<RepositoryCreateWithoutCommitsInput, RepositoryUncheckedCreateWithoutCommitsInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutCommitsInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutCommitsInput, RepositoryUncheckedUpdateWithoutCommitsInput>
  }

  export type RepositoryUpdateWithoutCommitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutCommitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutReleasesInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutReleasesInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutReleasesInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutReleasesInput, RepositoryUncheckedCreateWithoutReleasesInput>
  }

  export type RepositoryUpsertWithoutReleasesInput = {
    update: XOR<RepositoryUpdateWithoutReleasesInput, RepositoryUncheckedUpdateWithoutReleasesInput>
    create: XOR<RepositoryCreateWithoutReleasesInput, RepositoryUncheckedCreateWithoutReleasesInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutReleasesInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutReleasesInput, RepositoryUncheckedUpdateWithoutReleasesInput>
  }

  export type RepositoryUpdateWithoutReleasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutReleasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutVersionTagsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutVersionTagsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutVersionTagsInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutVersionTagsInput, RepositoryUncheckedCreateWithoutVersionTagsInput>
  }

  export type RepositoryUpsertWithoutVersionTagsInput = {
    update: XOR<RepositoryUpdateWithoutVersionTagsInput, RepositoryUncheckedUpdateWithoutVersionTagsInput>
    create: XOR<RepositoryCreateWithoutVersionTagsInput, RepositoryUncheckedCreateWithoutVersionTagsInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutVersionTagsInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutVersionTagsInput, RepositoryUncheckedUpdateWithoutVersionTagsInput>
  }

  export type RepositoryUpdateWithoutVersionTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutVersionTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type ContributorContributionCreateWithoutContributorInput = {
    contributionsCount?: number
    syncedAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutContributionsInput
  }

  export type ContributorContributionUncheckedCreateWithoutContributorInput = {
    repositoryId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type ContributorContributionCreateOrConnectWithoutContributorInput = {
    where: ContributorContributionWhereUniqueInput
    create: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput>
  }

  export type ContributorContributionCreateManyContributorInputEnvelope = {
    data: ContributorContributionCreateManyContributorInput | ContributorContributionCreateManyContributorInput[]
    skipDuplicates?: boolean
  }

  export type ContributorContributionUpsertWithWhereUniqueWithoutContributorInput = {
    where: ContributorContributionWhereUniqueInput
    update: XOR<ContributorContributionUpdateWithoutContributorInput, ContributorContributionUncheckedUpdateWithoutContributorInput>
    create: XOR<ContributorContributionCreateWithoutContributorInput, ContributorContributionUncheckedCreateWithoutContributorInput>
  }

  export type ContributorContributionUpdateWithWhereUniqueWithoutContributorInput = {
    where: ContributorContributionWhereUniqueInput
    data: XOR<ContributorContributionUpdateWithoutContributorInput, ContributorContributionUncheckedUpdateWithoutContributorInput>
  }

  export type ContributorContributionUpdateManyWithWhereWithoutContributorInput = {
    where: ContributorContributionScalarWhereInput
    data: XOR<ContributorContributionUpdateManyMutationInput, ContributorContributionUncheckedUpdateManyWithoutContributorInput>
  }

  export type ContributorCreateWithoutContributionsInput = {
    id?: string
    githubId: bigint | number
    login: string
    avatarUrl?: string | null
    htmlUrl?: string | null
    type: string
    siteAdmin?: boolean
    name?: string | null
    company?: string | null
    blog?: string | null
    location?: string | null
    email?: string | null
    bio?: string | null
    publicRepos?: number | null
    publicGists?: number | null
    followers?: number | null
    following?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ContributorUncheckedCreateWithoutContributionsInput = {
    id?: string
    githubId: bigint | number
    login: string
    avatarUrl?: string | null
    htmlUrl?: string | null
    type: string
    siteAdmin?: boolean
    name?: string | null
    company?: string | null
    blog?: string | null
    location?: string | null
    email?: string | null
    bio?: string | null
    publicRepos?: number | null
    publicGists?: number | null
    followers?: number | null
    following?: number | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type ContributorCreateOrConnectWithoutContributionsInput = {
    where: ContributorWhereUniqueInput
    create: XOR<ContributorCreateWithoutContributionsInput, ContributorUncheckedCreateWithoutContributionsInput>
  }

  export type RepositoryCreateWithoutContributionsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutContributionsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutContributionsInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutContributionsInput, RepositoryUncheckedCreateWithoutContributionsInput>
  }

  export type ContributorUpsertWithoutContributionsInput = {
    update: XOR<ContributorUpdateWithoutContributionsInput, ContributorUncheckedUpdateWithoutContributionsInput>
    create: XOR<ContributorCreateWithoutContributionsInput, ContributorUncheckedCreateWithoutContributionsInput>
    where?: ContributorWhereInput
  }

  export type ContributorUpdateToOneWithWhereWithoutContributionsInput = {
    where?: ContributorWhereInput
    data: XOR<ContributorUpdateWithoutContributionsInput, ContributorUncheckedUpdateWithoutContributionsInput>
  }

  export type ContributorUpdateWithoutContributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorUncheckedUpdateWithoutContributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    login?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    siteAdmin?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: NullableIntFieldUpdateOperationsInput | number | null
    publicGists?: NullableIntFieldUpdateOperationsInput | number | null
    followers?: NullableIntFieldUpdateOperationsInput | number | null
    following?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryUpsertWithoutContributionsInput = {
    update: XOR<RepositoryUpdateWithoutContributionsInput, RepositoryUncheckedUpdateWithoutContributionsInput>
    create: XOR<RepositoryCreateWithoutContributionsInput, RepositoryUncheckedCreateWithoutContributionsInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutContributionsInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutContributionsInput, RepositoryUncheckedUpdateWithoutContributionsInput>
  }

  export type RepositoryUpdateWithoutContributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutContributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutDocumentationContentInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutDocumentationContentInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutDocumentationContentInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutDocumentationContentInput, RepositoryUncheckedCreateWithoutDocumentationContentInput>
  }

  export type RepositoryUpsertWithoutDocumentationContentInput = {
    update: XOR<RepositoryUpdateWithoutDocumentationContentInput, RepositoryUncheckedUpdateWithoutDocumentationContentInput>
    create: XOR<RepositoryCreateWithoutDocumentationContentInput, RepositoryUncheckedCreateWithoutDocumentationContentInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutDocumentationContentInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutDocumentationContentInput, RepositoryUncheckedUpdateWithoutDocumentationContentInput>
  }

  export type RepositoryUpdateWithoutDocumentationContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutDocumentationContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutDocumentationMetadataInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    syncLogs?: SyncLogCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutDocumentationMetadataInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    syncLogs?: SyncLogUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutDocumentationMetadataInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutDocumentationMetadataInput, RepositoryUncheckedCreateWithoutDocumentationMetadataInput>
  }

  export type RepositoryUpsertWithoutDocumentationMetadataInput = {
    update: XOR<RepositoryUpdateWithoutDocumentationMetadataInput, RepositoryUncheckedUpdateWithoutDocumentationMetadataInput>
    create: XOR<RepositoryCreateWithoutDocumentationMetadataInput, RepositoryUncheckedCreateWithoutDocumentationMetadataInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutDocumentationMetadataInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutDocumentationMetadataInput, RepositoryUncheckedUpdateWithoutDocumentationMetadataInput>
  }

  export type RepositoryUpdateWithoutDocumentationMetadataInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    syncLogs?: SyncLogUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutDocumentationMetadataInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    syncLogs?: SyncLogUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryCreateWithoutSyncLogsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestCreateNestedManyWithoutRepositoryInput
    commits?: CommitCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataCreateNestedOneWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutSyncLogsInput = {
    id?: string
    githubId: bigint | number
    name: string
    fullName: string
    owner: string
    description?: string | null
    private?: boolean
    published?: boolean
    fork?: boolean
    createdAt: Date | string
    updatedAt: Date | string
    pushedAt?: Date | string | null
    homepage?: string | null
    size?: number
    stargazersCount?: number
    watchersCount?: number
    forksCount?: number
    openIssuesCount?: number
    language?: string | null
    defaultBranch?: string
    topics?: RepositoryCreatetopicsInput | string[]
    archived?: boolean
    disabled?: boolean
    syncedAt: Date | string
    featured?: boolean
    emoji?: string | null
    faIcon?: string | null
    docsPath?: string
    issues?: IssueUncheckedCreateNestedManyWithoutRepositoryInput
    pullRequests?: PullRequestUncheckedCreateNestedManyWithoutRepositoryInput
    commits?: CommitUncheckedCreateNestedManyWithoutRepositoryInput
    releases?: ReleaseUncheckedCreateNestedManyWithoutRepositoryInput
    versionTags?: VersionTagUncheckedCreateNestedManyWithoutRepositoryInput
    contributions?: ContributorContributionUncheckedCreateNestedManyWithoutRepositoryInput
    documentationContent?: DocumentationContentUncheckedCreateNestedManyWithoutRepositoryInput
    documentationMetadata?: DocumentationMetadataUncheckedCreateNestedOneWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutSyncLogsInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutSyncLogsInput, RepositoryUncheckedCreateWithoutSyncLogsInput>
  }

  export type RepositoryUpsertWithoutSyncLogsInput = {
    update: XOR<RepositoryUpdateWithoutSyncLogsInput, RepositoryUncheckedUpdateWithoutSyncLogsInput>
    create: XOR<RepositoryCreateWithoutSyncLogsInput, RepositoryUncheckedCreateWithoutSyncLogsInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutSyncLogsInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutSyncLogsInput, RepositoryUncheckedUpdateWithoutSyncLogsInput>
  }

  export type RepositoryUpdateWithoutSyncLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUpdateOneWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutSyncLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    private?: BoolFieldUpdateOperationsInput | boolean
    published?: BoolFieldUpdateOperationsInput | boolean
    fork?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    size?: IntFieldUpdateOperationsInput | number
    stargazersCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBranch?: StringFieldUpdateOperationsInput | string
    topics?: RepositoryUpdatetopicsInput | string[]
    archived?: BoolFieldUpdateOperationsInput | boolean
    disabled?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featured?: BoolFieldUpdateOperationsInput | boolean
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    docsPath?: StringFieldUpdateOperationsInput | string
    issues?: IssueUncheckedUpdateManyWithoutRepositoryNestedInput
    pullRequests?: PullRequestUncheckedUpdateManyWithoutRepositoryNestedInput
    commits?: CommitUncheckedUpdateManyWithoutRepositoryNestedInput
    releases?: ReleaseUncheckedUpdateManyWithoutRepositoryNestedInput
    versionTags?: VersionTagUncheckedUpdateManyWithoutRepositoryNestedInput
    contributions?: ContributorContributionUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationContent?: DocumentationContentUncheckedUpdateManyWithoutRepositoryNestedInput
    documentationMetadata?: DocumentationMetadataUncheckedUpdateOneWithoutRepositoryNestedInput
  }

  export type IssueCreateManyRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.IssueState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: IssueCreatelabelsInput | string[]
    assignees?: IssueCreateassigneesInput | string[]
    commentsCount?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type PullRequestCreateManyRepositoryInput = {
    id?: string
    githubId: bigint | number
    number: number
    title: string
    body?: string | null
    state: $Enums.PrState
    userLogin: string
    userAvatarUrl?: string | null
    labels?: PullRequestCreatelabelsInput | string[]
    assignees?: PullRequestCreateassigneesInput | string[]
    requestedReviewers?: PullRequestCreaterequestedReviewersInput | string[]
    headRef: string
    baseRef: string
    mergeable?: boolean | null
    merged?: boolean
    mergedAt?: Date | string | null
    mergedBy?: string | null
    commentsCount?: number
    reviewCommentsCount?: number
    commitsCount?: number
    additions?: number
    deletions?: number
    changedFiles?: number
    createdAt: Date | string
    updatedAt: Date | string
    closedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type CommitCreateManyRepositoryInput = {
    sha: string
    message: string
    authorName: string
    authorEmail: string
    authorDate: Date | string
    committerName: string
    committerEmail: string
    committerDate: Date | string
    additions?: number
    deletions?: number
    totalChanges?: number
    syncedAt?: Date | string
  }

  export type ReleaseCreateManyRepositoryInput = {
    id?: string
    githubId: bigint | number
    tagName: string
    name?: string | null
    body?: string | null
    draft?: boolean
    prerelease?: boolean
    authorLogin: string
    authorAvatarUrl?: string | null
    createdAt: Date | string
    publishedAt?: Date | string | null
    syncedAt?: Date | string
  }

  export type VersionTagCreateManyRepositoryInput = {
    id?: string
    tagName: string
    commitSha: string
    isLatest?: boolean
    createdAt: Date | string
    syncedAt?: Date | string
  }

  export type ContributorContributionCreateManyRepositoryInput = {
    contributorId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type DocumentationContentCreateManyRepositoryInput = {
    id?: string
    filePath: string
    slug?: DocumentationContentCreateslugInput | string[]
    groupSlug: string
    title: string
    content: string
    description?: string | null
    orderIndex?: DocumentationContentCreateorderIndexInput | number[]
    version?: string | null
    status?: string | null
    emoji?: string | null
    faIcon?: string | null
    hidden?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncLogCreateManyRepositoryInput = {
    id?: string
    syncType: string
    status: $Enums.SyncStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    errorMessage?: string | null
    recordsProcessed?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type IssueUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssueUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IssueUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumIssueStateFieldUpdateOperationsInput | $Enums.IssueState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: IssueUpdatelabelsInput | string[]
    assignees?: IssueUpdateassigneesInput | string[]
    commentsCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PullRequestUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    state?: EnumPrStateFieldUpdateOperationsInput | $Enums.PrState
    userLogin?: StringFieldUpdateOperationsInput | string
    userAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: PullRequestUpdatelabelsInput | string[]
    assignees?: PullRequestUpdateassigneesInput | string[]
    requestedReviewers?: PullRequestUpdaterequestedReviewersInput | string[]
    headRef?: StringFieldUpdateOperationsInput | string
    baseRef?: StringFieldUpdateOperationsInput | string
    mergeable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    merged?: BoolFieldUpdateOperationsInput | boolean
    mergedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mergedBy?: NullableStringFieldUpdateOperationsInput | string | null
    commentsCount?: IntFieldUpdateOperationsInput | number
    reviewCommentsCount?: IntFieldUpdateOperationsInput | number
    commitsCount?: IntFieldUpdateOperationsInput | number
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    changedFiles?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitUpdateWithoutRepositoryInput = {
    sha?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitUncheckedUpdateWithoutRepositoryInput = {
    sha?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitUncheckedUpdateManyWithoutRepositoryInput = {
    sha?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorEmail?: StringFieldUpdateOperationsInput | string
    authorDate?: DateTimeFieldUpdateOperationsInput | Date | string
    committerName?: StringFieldUpdateOperationsInput | string
    committerEmail?: StringFieldUpdateOperationsInput | string
    committerDate?: DateTimeFieldUpdateOperationsInput | Date | string
    additions?: IntFieldUpdateOperationsInput | number
    deletions?: IntFieldUpdateOperationsInput | number
    totalChanges?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReleaseUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: BigIntFieldUpdateOperationsInput | bigint | number
    tagName?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    draft?: BoolFieldUpdateOperationsInput | boolean
    prerelease?: BoolFieldUpdateOperationsInput | boolean
    authorLogin?: StringFieldUpdateOperationsInput | string
    authorAvatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionTagUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagName?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    isLatest?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionUpdateWithoutRepositoryInput = {
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributor?: ContributorUpdateOneRequiredWithoutContributionsNestedInput
  }

  export type ContributorContributionUncheckedUpdateWithoutRepositoryInput = {
    contributorId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionUncheckedUpdateManyWithoutRepositoryInput = {
    contributorId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentationContentUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    slug?: DocumentationContentUpdateslugInput | string[]
    groupSlug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: DocumentationContentUpdateorderIndexInput | number[]
    version?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    faIcon?: NullableStringFieldUpdateOperationsInput | string | null
    hidden?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    syncType?: StringFieldUpdateOperationsInput | string
    status?: EnumSyncStatusFieldUpdateOperationsInput | $Enums.SyncStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    recordsProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type ContributorContributionCreateManyContributorInput = {
    repositoryId: string
    contributionsCount?: number
    syncedAt?: Date | string
  }

  export type ContributorContributionUpdateWithoutContributorInput = {
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutContributionsNestedInput
  }

  export type ContributorContributionUncheckedUpdateWithoutContributorInput = {
    repositoryId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorContributionUncheckedUpdateManyWithoutContributorInput = {
    repositoryId?: StringFieldUpdateOperationsInput | string
    contributionsCount?: IntFieldUpdateOperationsInput | number
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}