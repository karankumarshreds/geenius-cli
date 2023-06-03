import fs from 'fs/promises';
const INITIAL_JSON = JSON.stringify([]);

type TodoItem = {
    id: number,
    message: string,
    status: 'completed' | 'pending' | 'progress',
}

export class ReadFromFS {
    fileName: string;
    constructor(fileName: string) {
        this.fileName = fileName;
        this.makeSureFileExists(this.fileName);
    }

    private async makeSureFileExists(fileName: string) {
        if (!fileName) throw new Error('Filename not given');
        try {
            const files = await fs.readdir('.');
            if (!files.includes(fileName)) throw new Error();
        } catch (_) {
            console.log('File not there, creating one');
            await fs.writeFile(fileName, INITIAL_JSON);
        }
    }

    private async getTodoItems(): Promise<TodoItem[]> {
        try {
            const content = await fs.readFile(this.fileName);
            return JSON.parse(content.toString()) as TodoItem[]
        } catch (error) {
            console.error('Could not read from file', error);
        }
        return [];
    }

    private async getValidId(): Promise<number> {
        return (await this.getTodoItems()).length;
    }

    private async writeToFile(todoItems: TodoItem[]) {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(todoItems));
        } catch (error) {
            throw new Error('Cannot write to file' + error);
        }
    }

    public async addItem(message: string) {
        const item: TodoItem = {
            id: await this.getValidId(),
            message,
            status: 'pending',
        };
        const items = await this.getTodoItems();
        items.push(item);
        await this.writeToFile(items);
    }

    public async updateItemStatus(id: number, status: TodoItem['status']) {
        const items = await this.getTodoItems();
        for (let item of items) {
            if (item.id === id) {
                item.status = status;
                break;
            }
        }
        this.writeToFile(items);
    }

}

