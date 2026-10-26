export default function textSummary(content, length = 90) {
    return String(content || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ').trim().slice(0, length);
}
