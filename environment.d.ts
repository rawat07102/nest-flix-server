declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string
    DB_URL?: string
    ORIGIN?: string
    SESSION_SECRET?: string
  }
}