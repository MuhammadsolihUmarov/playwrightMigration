export type LocaleStrings = {
    okCookie: string;
    addToEstimate: string;
    instancesHeader: string;
    computeEngine: string;
    add: string;
};

const locales: Record<string, LocaleStrings> = {
    en: {
        okCookie: 'OK, got it',
        addToEstimate: 'Add to estimate',
        instancesHeader: 'Instances',
        computeEngine: 'Compute Engine',
        add: 'add',
    },
    es: {
        okCookie: 'OK',
        addToEstimate: 'Agregar a la estimación',
        instancesHeader: 'Instancias',
        computeEngine: 'Motor de cómputo',
        add: 'agregar',
    }
};

const currentLang = process.env.LOCALE || 'en';

export function getText(key: keyof LocaleStrings): string {
    const strings = locales[currentLang] || locales.en;
    return strings[key];
}
