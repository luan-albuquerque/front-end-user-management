export enum AccessLevel {
    ADMIN = 1,
    STANDARD = 2,
}


export interface User {
    id: string;
    props :{
        name: string;
        surname: string;
        email: string;
        password: string;
        access_level: AccessLevel;
        is_enabled: boolean;
        createdAt: Date;
        updatedAt?: Date | null;
    }
  }