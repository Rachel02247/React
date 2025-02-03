export type User = {
     firstName: string;
     lastName: string;
     email: string;
     password: string;
     address?: string;
     phone?: string;
};

export type action = {
     type: 'DELETE' | 'CREATE' | 'UPDATE',
     data: Partial<User>
}

export type typingType = {
     text: string; speed: number; delay: number
};

export type RecipeType = {
     id: number,
     title: string,
     description: string,
     authorId: number,
     ingredients: string[],
     instructions: string,
};

export type statusButton = 'register' | 'login';

export type loginStatus = "before" | "in" | "after";

