interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
};

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Est et culpa veniam dolore consequat quis.',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'Progress: Pariatur nulla dolore aute voluptate sint.',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            description: 'Terminada: Quis aute dolor mollit officia deserunt minim anim ex officia amet incididunt Lorem.',
            createdAt: Date.now() - 100000,
            status: 'finished'
        }
    ]
}