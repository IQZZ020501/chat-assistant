import {LRUCache} from 'lru-cache';

const options = {
    max: 500,
    ttl: 1000 * 60 * 60 // 1小时
};

const cache = new LRUCache<string, any>(options);

export function setCache(key: any, value: any, ttl?: number): void {
    if (ttl !== undefined) {
        cache.set(key, value, {ttl});
    } else {
        cache.set(key, value);
    }
}

export function getCache(key: any): any {
    return cache.get(key);
}

export function deleteCache(key: any): void {
    cache.delete(key);
}