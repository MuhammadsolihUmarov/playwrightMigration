export function getLastPathSegments(url: string, count: number = 2): string {
    const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
    return pathSegments.slice(-count).join('/');
}
