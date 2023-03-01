interface Files {
    fileName: string;
}

export interface Package {
    name: string;
    numberOfFiles: number;
    files: Files[];
};
