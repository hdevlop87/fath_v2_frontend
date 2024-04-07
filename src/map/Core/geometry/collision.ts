export function isBboxColliding(bbox1, bbox2) {
    return (
        bbox1.x < bbox2.x2 &&
        bbox1.x2 > bbox2.x &&
        bbox1.y < bbox2.y2 &&
        bbox1.y2 > bbox2.y
    )
}