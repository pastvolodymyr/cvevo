type ValidationResult = {
    isValid: boolean;
    message: string;
};
export const validateFile = (allowedTypes: string[], maxSize: number, file?: File): ValidationResult => {
    if(!file) {
        return {
            isValid: false,
            message: 'File not provided',
        };
    }

    const isValidType = allowedTypes.includes(file.type);

    if (!isValidType) {
        return {
            isValid: false,
            message: `Please upload file in ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join('/')} format`,
        };
    }

    // Check if the file size is within the limit
    const isValidSize = file.size <= maxSize;

    if (!isValidSize) {
        return {
            isValid: false,
            message: `Max file size is ${maxSize / 1024 / 1024} MB`,
        };
    }

    return {
        isValid: true,
        message: 'File is valid',
    };
};
